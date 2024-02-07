import React, { useState } from "react";

import { Avatar, Box, Button, Grid, Toolbar, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { LoadingButton } from "@mui/lab";

import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Input from "@mui/joy/Input";
import Textarea from "@mui/joy/Textarea";
import { useFormik } from "formik";
import { GallaryDataItem } from "../../../../typings/formData";

import { VisuallyHiddenInput } from "../../../utils/textFieldStyle";
import {
  initialValues,
  validationSchema,
} from "../../../utils/gallaryValidation";
import api from "../../../api";
import { doOnSubscribe } from "../../../utils/rxjs.utils";
import { finalize } from "rxjs/operators";

const primry = {
  event: "",
  id: 1,
  picture: [],
};
const GalleryScreen = () => {
  const [loading, setLoading] = useState(false);

  const [reportData, setReportData] = React.useState<GallaryDataItem>(primry);

  const formik = useFormik({
    initialValues,
    validationSchema,
    // validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      console.log(values);
      setLoading(true);
        api.gallary
          .setGallary$(values)
          .pipe(
            doOnSubscribe(() => setLoading(true)),
            finalize(() => setLoading(false))
          )
          .subscribe({
            next: async (report) => {
              formik.resetForm();
              setLoading(false);
              alert("Gallary ssubmit successfully");
            },
            error: (error: any) => {
              // console.log(error)
              setLoading(false);
            },
          });
    },
  });

  const dataHandler = (e: { target: { value: any; id: any } }) => {
    formik.setFieldValue(e.target.id, e.target.value);
  };
  const fileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const pic = e.target.files;
      let picArr = [];
      for (let i = 0; i < pic.length; i++) {
        picArr.push(pic[i]);
      }

      formik.setFieldValue("picture", [...picArr, ...reportData.picture]);
    }
  };
  const DelFile = (name: string) => {
    const pic = reportData.picture;
    let picArr = [];
    for (let i = 0; i < pic.length; i++) {
      if (pic[i].name !== name) picArr.push(pic[i]);
    }

    formik.setFieldValue("picture", picArr);
  };

  // console.log('formik', formik.values)

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid
        container
        spacing={2}
        sx={{
          boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)!important;",
          padding: 2,
        }}
      >
        <Grid item xs={12}>
          <FormControl id="event" size="sm" color="primary">
            <FormLabel>ইভেন্টের নাম</FormLabel>
            <Input
              id="event"
              placeholder="ইভেন্টের নাম"
              type="text"
              autoComplete="on"
              //   autoFocus
              value={formik.values.event}
              error={
                Boolean(formik.errors.event) && Boolean(formik.touched.event)
              }
              onChange={dataHandler}
              variant="outlined"
            />
            {formik.errors.event && (
              <FormHelperText sx={{ color: "red" }}>
                {formik.errors.event}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Toolbar
            variant="dense"
            sx={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>সংযুক্তি</Typography>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              href="#file-upload"
            >
              Upload Images
              <VisuallyHiddenInput
                type="file"
                accept="image/png, image/gif, image/jpeg"
                onChange={fileChange}
                multiple
              />
            </Button>
          </Toolbar>
          {formik.errors.picture && (
            <FormHelperText sx={{ color: "red" }}>
              ফাইল বাছাই করুন
            </FormHelperText>
          )}
        </Grid>
        {formik.values.picture.map((value: any) => (
          <Grid item xs={12} key={value.name}>
            <Toolbar
              sx={{
                flexDirection: "row",
                justifyContent: "space-between",
                borderBottom: 1,
                borderColor: "grayText",
              }}
            >
              <Box
                sx={{
                    display:'flex',
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems:"center"
                }}
              >
                <Box>
                  <Avatar
                  sx={{height:60,width:60,borderRadius:0}}
                   
                   src={URL.createObjectURL(value)} 
                   alt="your image" />
                </Box>
                <Box marginLeft={5}>
                  <Typography>{value.name}</Typography>
                </Box>
              </Box>

              <Box>
                <Button onClick={() => DelFile(value.name)}>
                  <DeleteOutlineIcon sx={{ color: "red" }} />
                </Button>
              </Box>
            </Toolbar>
          </Grid>
        ))}
        <Grid item xs={12}>
          <LoadingButton
            loading={loading}
            // loadingPosition="start"
            color="secondary"
            variant="contained"
            // onClick={formik.handleSubmit}
            type="submit"
          >
            SUBMIT
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default GalleryScreen;

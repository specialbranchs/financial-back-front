import React, { useEffect, useState } from "react";

import {
  Avatar,
  Box,
  Button,
  Grid,
  OutlinedInput,
  Toolbar,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

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
import SinglePreview from "./gallaryPreview/signlePreview";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../../state/actions";
import { RootState } from "../../../state/reducer";
import { size, toArray } from "lodash";
import { sxStyle } from "../search/editsearch/PersonDetails";

const primry = {
  event: "",
  id: 1,
  picture: [],
};
const GalleryScreen = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { fileProgress } = useSelector(
    (state: RootState) => state.currentgallaryState
  );

  const formik = useFormik({
    initialValues,
    validationSchema,
    // validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      api.gallary
        .setGallaryEventName(values.event)
        .pipe(
          doOnSubscribe(() => setLoading(true)),
          finalize(() => {})
        )
        .subscribe({
          next: async (res) => {
            // console.log("res", res);
            dispatch(actions.gallary.resetUploadFile());
            dispatch(
              actions.gallary.SaveUploadFile({
                id: res.id,
                files: values.picture,
              })
            );
            // setLoading(true);
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

      formik.setFieldValue("picture", [...picArr]);
    }
    e.target.value = "";
  };
  const DelFile = (name: string) => {
    const pic = formik.values.picture;
    let picArr = [];
    for (let i = 0; i < pic.length; i++) {
      if (pic[i].name !== name) picArr.push(pic[i]);
    }

    formik.setFieldValue("picture", picArr);
  };

  const numberOfUploadedFileArr = toArray(fileProgress).filter(
    (file) => file.progress === 100
  );

  const reset = () => {
    setLoading(false);

    dispatch(actions.gallary.resetUploadFile());
    formik.resetForm();
  };
  useEffect(() => {
    return () => {
      dispatch(actions.gallary.resetUploadFile());
    };
  }, []);
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid
        container
        sx={{
          boxShadow:1,
          padding: 2,
          borderRadius: 3,
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            boxShadow: 1,
            padding: 2,
            margin: 1,
          }}
        >
          <Grid item xs={12}>
            <FormControl id="event" size="sm" color="primary">
              <FormLabel sx={{ ...sxStyle, fontWeight: "200" }} required>
                ইভেন্টের নাম
              </FormLabel>
              <OutlinedInput
                id="event"
                // placeholder="ইভেন্টের নাম"
                type="text"
                autoComplete="on"
                //   autoFocus
                value={formik.values.event}
                sx={sxStyle}
                error={
                  Boolean(formik.errors.event) && Boolean(formik.touched.event)
                }
                onChange={dataHandler}
              />

              {formik.errors.event && (
                <FormHelperText
                  sx={{ ...sxStyle, fontWeight: "200", color: "red" }}
                >
                  {formik.errors.event}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Toolbar
              disableGutters
              variant="dense"
              sx={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography sx={{ ...sxStyle, fontWeight: "200" }}>
                সংযুক্তি
              </Typography>
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                href="#file-upload"
                sx={sxStyle}
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
              <FormHelperText sx={{ color: "red", ...sxStyle }}>
                ফাইল বাছাই করুন
              </FormHelperText>
            )}
          </Grid>
        </Grid>
        <SinglePreview
          direction={"gallary"}
          value={formik.values.picture}
          DelFile={DelFile}
        />

        <Grid item xs={12} mt={2}>
          <LoadingButton
            loading={loading}
            color="secondary"
            variant="contained"
            type="submit"
            sx={{
              ...sxStyle,
              display:
                formik.values.picture.length > 0 &&
                formik.values.picture.length === numberOfUploadedFileArr.length
                  ? "none"
                  : "unset",
            }}
          >
            SUBMIT
          </LoadingButton>

          {formik.values.picture.length > 0 &&
            formik.values.picture.length === numberOfUploadedFileArr.length && (
              <Toolbar
                sx={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  boxShadow: 2,
                  borderRadius: 2,
                  p: 1,
                }}
              >
                <Typography color={"green"} sx={sxStyle}>
                  Upload Completed
                </Typography>
                <LoadingButton
                  color="primary"
                  variant="contained"
                  onClick={() => reset()}
                  sx={sxStyle}
                >
                  RESET
                </LoadingButton>
              </Toolbar>
            )}
        </Grid>
      </Grid>
    </form>
  );
};

export default GalleryScreen;

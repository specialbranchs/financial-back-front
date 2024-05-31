import React, { useState } from "react";
import useDoronList from "../../../../hooks/useDoron";
import { ReportDataItem } from "../../../../../typings/formData";
import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Toolbar,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import BootstrapInput, {
  Item,
  StyledTextarea,
  VisuallyHiddenInput,
} from "../../../../utils/textFieldStyle";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { LoadingButton } from "@mui/lab";
import api from "../../../../api";
import { doOnSubscribe } from "../../../../utils/rxjs.utils";
import { finalize } from "rxjs/operators";

import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Input from "@mui/joy/Input";
import Textarea from "@mui/joy/Textarea";
import { useFormik } from "formik";
import {
  initialValues,
  validationSchema,
} from "../../../../utils/reportValidation";
import { sxStyle } from "../../search/editsearch/PersonDetails";
import SinglePreview from "../../gallery/gallaryPreview/signlePreview";
import { title } from "process";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../../../state/actions";
import { RootState } from "../../../../state/reducer";
import { toArray } from "lodash";

const primry = {
  doron: "ধরণ বাছাই করুন",
  title: "",
  body: "",
  id: 1,
  picture: [],
};
const AddReportScreen = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { designations } = useDoronList();
  const { fileProgress } = useSelector(
    (state: RootState) => state.currentgallaryState
  );


  const formik = useFormik({
    initialValues,
    validationSchema,
    // validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      api.report
        .setReportbody$({
          title: values.title,
          body: values.body,
          doron: values.doron,
        })
        .pipe(
          doOnSubscribe(() => setLoading(true)),
          finalize(() => setLoading(false))
        )
        .subscribe({
          next: async (res) => {
            dispatch(actions.gallary.resetUploadFile());
            dispatch(
              actions.gallary.SaveUploadFile({
                id: res.id,
                files: values.picture,
              })
            );
          },
          error: (error: any) => {
            // console.log(error)
            setLoading(false);
          },
        });
    },
  });
  const selectChange = (e: SelectChangeEvent) => {
    formik.setFieldValue("doron", e.target.value);
  };
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
  };
  const DelFile = (name: string) => {
    const pic = formik.values.picture;
    let picArr = [];
    for (let i = 0; i < pic.length; i++) {
      if (pic[i].name !== name) picArr.push(pic[i]);
    }

    formik.setFieldValue("picture", picArr);
  };

  // console.log('formik', formik.values)
  const files = [...formik.values.picture];

  const numberOfUploadedFileArr = toArray(fileProgress).filter(
    (file) => file.progress === 100
  );

  const reset = () => {
    setLoading(false);

    dispatch(actions.gallary.resetUploadFile());
    formik.resetForm();
  };
  
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid
        container
        spacing={2}
        sx={{
          boxShadow: 1,
          padding: 2,
        }}
      >
        <Grid item xs={12}>
          <FormControl>
            <FormLabel sx={sxStyle} required>
              ক্যাটাগরি বাছাই
            </FormLabel>
            <Select
              id="doron"
              value={formik.values.doron + ""}
              label=""
              sx={{
                width: "100%",
                height: 50,
                backgroundColor: "white",
                ...sxStyle,
              }}
              onChange={selectChange}
              error={
                Boolean(formik.errors.doron) && Boolean(formik.touched.doron)
              }
            >
              {designations.map((value) => (
                <MenuItem sx={sxStyle} value={value.title}>
                  {value.title}
                </MenuItem>
              ))}
            </Select>
            {formik.errors.doron && (
              <FormHelperText
                sx={{ color: "red", ...sxStyle, fontWeight: "100" }}
              >
                {formik.errors.doron}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl id="title" size="sm" color="primary">
            <FormLabel sx={sxStyle} required>
              শিরোনাম
            </FormLabel>
            <OutlinedInput
              id="title"
              placeholder="শিরোনাম"
              type="text"
              autoComplete="on"
              autoFocus
              value={formik.values.title}
              error={
                Boolean(formik.errors.title) && Boolean(formik.touched.title)
              }
              onChange={dataHandler}
              sx={sxStyle}
            />
            {formik.errors.title && (
              <FormHelperText
                sx={{ color: "red", ...sxStyle, fontWeight: "100" }}
              >
                {formik.errors.title}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl id="body" size="sm" color="primary">
            <FormLabel sx={sxStyle} required>
              রিপোর্ট
            </FormLabel>
            <Textarea
              placeholder={"লিখুন"}
              onChange={dataHandler}
              sx={{ fontWeight: "100", ...sxStyle }}
              error={
                Boolean(formik.errors.body) && Boolean(formik.touched.body)
              }
              minRows={2}
              value={formik.values.body}
            />
          </FormControl>
          {formik.errors.body && (
            <FormHelperText
              sx={{ color: "red", ...sxStyle, fontWeight: "100", marginTop: 1 }}
            >
              {formik.errors.body}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12}>
          <Toolbar
            variant="dense"
            disableGutters
            sx={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography sx={sxStyle}>সংযুক্তি</Typography>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              href="#file-upload"
              sx={sxStyle}
            >
              Upload files
              <VisuallyHiddenInput type="file" onChange={fileChange} multiple />
            </Button>
          </Toolbar>
          {formik.errors.picture && (
            <FormHelperText
              sx={{ color: "red", ...sxStyle, fontWeight: "100" }}
            >
              ফাইল বাছাই করুন
            </FormHelperText>
          )}
        </Grid>
        <SinglePreview direction={"report"} value={files} DelFile={DelFile} />
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

export default AddReportScreen;

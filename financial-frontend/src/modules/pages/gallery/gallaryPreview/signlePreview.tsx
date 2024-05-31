import { Avatar, Box, Button, Grid, Toolbar, Typography } from "@mui/material";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useSelector } from "react-redux";
import { RootState } from "../../../../state/reducer";
import { size, toArray } from "lodash";
import { useEffect } from "react";
import api from "../../../../api";
import UploadItem from "./uploadItem";
import { sxStyle } from "../../search/editsearch/PersonDetails";
import React from "react";

const SinglePreview = ({ value, DelFile, direction }: any) => {
  const { fileProgress } = useSelector(
    (state: RootState) => state.currentgallaryState
  );
  const uploadedFileAmount = size(fileProgress);

  useEffect(() => {
    const fileToUpload = toArray(fileProgress).filter(
      (file) => file.progress === 0
    );
    if (direction === "gallary") api.gallary.uploadFileOnebyOne(fileToUpload)
    else api.report.setreportFile(fileToUpload)
  }, [uploadedFileAmount]);

  const updateFilelist = toArray(fileProgress);

  return (
    <Grid item xs={12}>
      {updateFilelist.length === 0
        ? value.map((item: any) => (
            <Toolbar
              key={item.name}
              sx={{
                flexDirection: "row",
                justifyContent: "space-between",
                boxShadow: 2,
                my: 2,
                p: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Avatar
                    sx={{ height: 60, width: 60, borderRadius: 0 }}
                    src={URL.createObjectURL(item)}
                    alt="your image"
                  />
                </Box>
                <Box marginLeft={5}>
                  <Typography sx={sxStyle}>{item.name}</Typography>
                </Box>
              </Box>

              <Box>
                <Button onClick={() => DelFile(item.name)}>
                  <DeleteOutlineIcon sx={{ color: "red" }} />
                </Button>
              </Box>
            </Toolbar>
          ))
        : updateFilelist.map((file) => (
            <UploadItem key={file.id} file={file} retryUpload={() => {}} />
          ))}
    </Grid>
  );
};

export default React.memo(SinglePreview);

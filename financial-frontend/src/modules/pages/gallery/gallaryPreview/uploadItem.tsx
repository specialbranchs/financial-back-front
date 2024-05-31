import React, { useMemo } from "react";
import { STATUS_UPLOAD } from "../../../../utils/constants";
import { Toolbar, Box, Avatar, Typography, Button } from "@mui/material";
import { sxStyle } from "../../search/editsearch/PersonDetails";

const UploadItem = (props: any) => {
  const { file, progress, cancelSource, status } = props.file;

  const renderIcon = useMemo(() => {
    const cancelUpload = () => {
      cancelSource.cancel("Cancelled by user");
    };

    if (status === STATUS_UPLOAD.uploading) {
      return (
        <span
          title="Cancel upload"
          style={{ color: "red" }}
          onClick={cancelUpload}
        >
          ✕
        </span>
      );
    } else if (status === STATUS_UPLOAD.success) {
      return (
        <span
          title="Success upload"
          style={{ color: "green", cursor: "initial" }}
        >
          ✓
        </span>
      );
    } else if (status === STATUS_UPLOAD.failed) {
      return (
        <span
          title="Retry upload"
          style={{ color: "orange" }}
          onClick={props.retryUpload}
        >
          ↩︎
        </span>
      );
    }

    return null;
  }, [status]);

  return (
    <Toolbar
      disableGutters
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        boxShadow: 2,
        my: 2,
        p: 1,
        borderBottom: "2px solid",
        borderImage: `linear-gradient(90deg, green ${progress}%, red 0%, red 0%) 1`,
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
            src={URL.createObjectURL(file)}
            alt="your image"
          />
        </Box>
        <Box marginLeft={5}>
          <Typography  sx={sxStyle}>{file.name}</Typography>
        </Box>
      </Box>

      <Box>
        <Typography color={"green"}  sx={sxStyle}>{progress} %</Typography>
      </Box>
    </Toolbar>
  );
};

export default UploadItem;

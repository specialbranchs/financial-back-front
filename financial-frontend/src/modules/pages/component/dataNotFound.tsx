import { Toolbar, Typography } from "@mui/material";
import React from "react";
import NotificationsOffOutlinedIcon from "@mui/icons-material/NotificationsOffOutlined";
import { sxStyle } from "../search/editsearch/PersonDetails";
const DataNotFound = () => {
  return (
    <Toolbar
      sx={{
        height: "70vh",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <NotificationsOffOutlinedIcon />
      <Typography
        sx={{
          fontSize: 20,
          color: "GrayText",
          padding: "2px",
          fontFamily: sxStyle.fontFamily,
          marginBottom: 2,
        }}
      >
        Data not found
      </Typography>
    </Toolbar>
  );
};

export default DataNotFound;

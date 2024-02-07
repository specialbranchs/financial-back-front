import {
  Box,
  CircularProgress,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";

import { finalize } from "rxjs/operators";
import { ReportSearch } from "../../../../../typings/structures";
import api from "../../../../api";
import { ReportResponseData } from "../../../../api/report";
import { doOnSubscribe } from "../../../../utils/rxjs.utils";
import { gallaryResponseData } from "../../../../api/gallary";
import { BACKEND_URL } from "../../../../utils/config";
import Gallery from "react-photo-gallery";

//import * as types from '../../../../typings/formData';
type props = {
  catagory: string;
};

const GallaryPreviewScreen = () => {
  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState<gallaryResponseData>([]);
  const [item, setItem] = useState<string>("");

  useEffect(() => {}, []);

  useEffect(() => {
    submit();
  }, []);

  const dataHandler = (e: { target: { value: any; id: any } }) => {
    setItem(e.target.value);
  };

  const submit = () => {
    setLoading(true);
    api.gallary
      .searchGallaryList$(item)
      .pipe(
        doOnSubscribe(() => setLoading(true)),
        finalize(() => setLoading(false))
      )
      .subscribe({
        next: async (report) => {
          console.log("user", report);
          setEvent(report);
          setLoading(false);
        },
        error: (error: any) => {
          // console.log(error)
          setLoading(false);
        },
      });
  };
  //console.log("podok list", designations)
  const photosArr = [];
  for (var i = 0; i < event.length; i++) {
    const photos = event[i]?.photo_gallary;
    let TmArr = [];
    for (var j = 0; j < photos.length; j++) {
      let obj = {
        src: BACKEND_URL + photos[j].picture,
        width: 1,
        height: 1,
      };
      TmArr.push(obj);
    }
    let tmObj = {
      event: event[i].event,
      created: event[i].created,
      photos: TmArr,
    };
    photosArr.push(tmObj);
  }
  return (
    <>
      <Toolbar
        sx={{
          flexWrap: "wrap",
          boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)!important;",
          backgroundColor: "white",
        }}
      >
        <Box m={1}>
          <TextField
            onChange={dataHandler}
            value={item}
            label={"search gallary"}
            id="keyword"
            variant="outlined"
            size="small"
            sx={{
              "&.MuiTextField-root": {},
            }}
          />
        </Box>
        <LoadingButton
          loading={loading}
          // loadingPosition="start"
          color="primary"
          variant="contained"
          onClick={() => submit()}
        >
          SEARCH
        </LoadingButton>
      </Toolbar>
      {loading && (
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CircularProgress />
        </Toolbar>
      )}
      {photosArr.map((item) => (
        <Paper elevation={3} sx={{ padding: 5,marginTop:5 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginY:1
            }}
          >
            <Typography>{item.event}</Typography>
            <Typography>{item.created.slice(0,10)}</Typography>
          </Box>
          <Gallery photos={item.photos} />
        </Paper>
      ))}
    </>
  );
};

export default GallaryPreviewScreen;

import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Box,
  ListItemButton,
  Modal,
  OutlinedInput,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useDesignation from "../../../hooks/useCatagoris";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Button from "@mui/joy/Button";
import api from "../../../api";
import { doOnSubscribe } from "../../../utils/rxjs.utils";
import { finalize } from "rxjs/operators";
import { Designation } from "../../../../typings/structures";
import { style } from "../search/editsearch/EditPodok";
import SubCatagory from "./subCatagory";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../state/reducer";
import { sxStyle } from "../search/editsearch/PersonDetails";
import { bolToRole } from "../../../utils/convertions";

const CatagoryScreen = () => {
  const { user } = useSelector((state: RootState) => state.currentUser);

  const [loading, setLoading] = useState(false);
  const [podokName, setPodokName] = useState("");
  const dsns = useDesignation();
  const { catagories } = useSelector(
    (state: RootState) => state.currentcatagoryState
  );
  const [podokList, setPodokList] = useState<Array<Designation>>(catagories);

  const [modalfull, setmodalfull] = useState<boolean>(false);

  const [error, seterror] = useState("");
  const [text, settext] = useState("");
  const [id, setId] = useState<number>(0);
  const handleOpen = (id: number) => {
    setmodalfull(true);
    setId(id);
  };
  const handleClose = () => setmodalfull(false);

  const dataHandler = (e: { target: { value: any; id: any } }) => {
    setPodokName(e.target.value);
  };
  useEffect(() => {
    setPodokList(catagories);
  }, [catagories]);

  const Submit = () => {
    setLoading(true);
    if (podokName === "") {
      setLoading(false);
      return;
    }
    api.catagory
      .setCatagory$(podokName)
      .pipe(
        doOnSubscribe(() => setLoading(true)),
        finalize(() => setLoading(false))
      )
      .subscribe({
        next: async (res) => {
          //   console.log('res', res)
          const podok: Designation = {
            id: res.id,
            title: podokName,
          };
          setPodokList([...podokList, podok]);
          setLoading(false);
          setPodokName("");
        },
        error: (error: any) => {
          // console.log(error)

          setLoading(false);
        },
      });
  };
  const DelCat = (id: number) => {
    api.catagory
      .delCatagory$(id)
      .pipe(
        doOnSubscribe(() => {}),
        finalize(() => {})
      )
      .subscribe({
        next: async (res) => {
          // console.log('res', res)

          if (res.del) {
            let newPdkList = podokList.filter((item) => item.id !== res.id);
            setPodokList(newPdkList);
          } else {
            alert(res.mess);
          }
        },
        error: (error: any) => {
          // console.log(error)
        },
      });
  };
  const submitSub = (id: number, title: string) => {
    setLoading(true);
    if (text === "") {
      setLoading(false);
      return;
    }
    api.catagory
      .addSubCatagory$(id, title)
      .pipe(
        doOnSubscribe(() => setLoading(true)),
        finalize(() => setLoading(false))
      )
      .subscribe({
        next: async (res) => {
          // console.log('res', res)
          alert("added succefully");
          settext("");
          const podList = podokList;
          setPodokList([]);
          setTimeout(() => {
            setPodokList(podList);
          }, 10);
          setmodalfull(false);
        },
        error: (error: any) => {
          // console.log(error)

          setLoading(false);
        },
      });
  };

  return (
    <>
      <Toolbar
        sx={{
          flexWrap: "wrap",
          boxShadow: 2,
          backgroundColor: "white",
        }}
      >
        <Box m={1}>
          <OutlinedInput
            onChange={dataHandler}
            value={podokName}
            placeholder={"পদকের নাম লিখুন"}
            id="keyword"
            size="small"
            sx={{ ...sxStyle }}
          />
        </Box>

        <LoadingButton
          loading={loading}
          sx={sxStyle} // loadingPosition="start"
          color="primary"
          variant="contained"
          onClick={() => Submit()}
        >
          আপলোড
        </LoadingButton>
      </Toolbar>
      {podokList
        .slice(1, podokList.length)
        .reverse()
        .map((value) => (
          <Toolbar
            key={value.id}
            variant="dense"
            sx={{
              flexDirection: "row",
              justifyContent: "space-between",
              boxShadow: 1,
              borderRadius: 2,
              padding: 1,
              marginY: 1,
            }}
          >
            <Box>
              <ListItemButton onClick={() => handleOpen(value.id)}>
                <Typography
                  sx={{
                    ...sxStyle,
                    textDecoration: "underline",
                  }}
                >
                  {value.title}
                </Typography>
              </ListItemButton>
              <SubCatagory id={value.id} role={bolToRole(user)} />
            </Box>
            {(bolToRole(user) === 7 || bolToRole(user) === 6) && (
              <Box>
                <Button
                  onClick={() => DelCat(value.id)}
                  size="sm"
                  variant="soft"
                >
                  <DeleteOutlineIcon sx={{ color: "red" }} />
                </Button>
              </Box>
            )}
          </Toolbar>
        ))}

      <Modal
        sx={{ overflow: "auto" }}
        open={modalfull}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        hideBackdrop={true}
      >
        <Box sx={style}>
          <Button
            onClick={handleClose}
            variant="soft"
            sx={{ fontWeight: "100", ...sxStyle }}
            size="sm"
          >
            CLOSE
          </Button>
          <Toolbar
            sx={{
              //   flexDirection: "column",
              boxShadow: 1,
              padding: "6px",
            }}
          >
            <Typography component={"h6"} sx={{ fontWeight: "100", ...sxStyle }}>
              {error}
            </Typography>

            <Box m={1}>
              <OutlinedInput
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  settext(e.target.value)
                }
                value={text}
                placeholder={"উপ-ক্যাটাগরি"}
                id="keyword"
                sx={{ fontWeight: "100", ...sxStyle }}
                size="small"
              />
            </Box>

            <LoadingButton
              loading={loading}
              loadingPosition="start"
              color="primary"
              variant="contained"
              sx={{ fontWeight: "100", ...sxStyle, fontSize: 12 }}
              onClick={() => submitSub(id, text)}
            >
              sumbit
            </LoadingButton>
          </Toolbar>
        </Box>
      </Modal>
    </>
  );
};

export default CatagoryScreen;

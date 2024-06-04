import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardActions from "@mui/joy/CardActions";
// import Typography from '@mui/joy/Typography';
import { Typography } from "@mui/material";
import AirplayOutlinedIcon from "@mui/icons-material/AirplayOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { ReportResponseData } from "../../../../api/report";
import { Box, Modal, Toolbar } from "@mui/material";

import React, { useState } from "react";
import { BACKEND_URL } from "../../../../utils/config";
import TextAreaPropsForReport from "./TextAreaForList";
import FileViewerScreen from "../../../../components/file-viewer";
import api from "../../../../api";
import { doOnSubscribe } from "../../../../utils/rxjs.utils";
import { finalize } from "rxjs/operators";
import { sxStyle } from "../../search/editsearch/PersonDetails";
import { DeleteOutline } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../../../../state/reducer";
import { bolToRole } from "../../../../utils/convertions";

export const style = {
  position: "fixed",
  top: "5%",
  left: "10%",
  width: "70%",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  // overflow:'auto'
};
type props = {
  report: ReportResponseData;
};
const ReportList = ({ report }: props) => {
  const user = useSelector((state: RootState) => state.currentUser.user);
  const [fileShow, setFileshow] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [reportData, setreportData] = useState<ReportResponseData>(report);
  const [fileStatus, setfileStatus] = useState<any>({
    file: "",
    type: "",
  });
  const [modalfull, setmodalfull] = React.useState<boolean>(false);
  const handleOpen = () => setmodalfull(true);
  const handleClose = () => setmodalfull(false);
  const [modalItem, setModalItem] = React.useState({ title: "", body: "" });
  const deleteFile = (id: number) => {
    api.report
      .deleteReportFile(id)
      .pipe(
        doOnSubscribe(() => {}),
        finalize(() => {})
      )
      .subscribe({
        next: async (res) => {
          const reportTempData = [...reportData];
          for (let i in reportTempData) {
            for (let j in reportTempData[i].user_report) {
              if (reportTempData[i].user_report[j].id === id) {
                delete reportTempData[i].user_report[j];
              }
            }
          }
          setreportData(reportTempData);
        },
        error: (error: any) => {
          // console.log(error)
        },
      });
  };
  const download = (url: string) => {
    const type = url.split(".").pop();
    var filename = url.replace(/^.*[\\/]/, "");
    api.catagory
      .downloadFile(BACKEND_URL + url)
      .pipe(
        doOnSubscribe(() => {}),
        finalize(() => {})
      )
      .subscribe({
        next: async (file) => {
          const url = window.URL.createObjectURL(new Blob([file]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", filename);
          document.body.appendChild(link);
          link.click();
        },
        error: (error: any) => {
          // console.log(error)
        },
      });
  };
 
  return (
    <>
      {reportData.map((item) => (
        <Card
          variant="solid"
          key={item.id}
          sx={{ my: 1, backgroundColor: "white" }}
        >
          <CardContent orientation="horizontal">
            <CardContent>
              <Typography
                sx={{
                  fontSize: 18,
                  color: "GrayText",
                  fontWeight: "500",

                  fontFamily: sxStyle.fontFamily,
                }}
              >
                {item.title}
              </Typography>
              <Typography
                paragraph={false}
                sx={{
                  fontSize: 14,
                  color: "GrayText",
                  padding: "2px",
                  fontFamily: sxStyle.fontFamily,
                  marginBottom: 2,
                }}
              >
                {item.body.slice(0, 200)} {"   "}
                {item.body.length > 200 && (
                  <Typography
                    component={"span"}
                    color={"green"}
                    sx={{
                      ...sxStyle,
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    onClick={() => {
                      setmodalfull(true);
                      setModalItem({
                        title: item.title,
                        body: item.body,
                      });
                    }}
                  >
                    show details
                  </Typography>
                )}
              </Typography>
              {item.user_report.map((value) => (
                <Toolbar
                  variant="dense"
                  key={value.id}
                  sx={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    boxShadow: 1,
                    borderRadius: 1,
                    marginBottom: ".3rem",
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontSize: 12,
                        fontFamily: sxStyle.fontFamily,
                        textDecoration: "underline",
                        color: "GrayText",
                      }}
                    >
                      {value.picture.replace(/^.*(\\|\/|\:)/, "").slice(-60)}
                    </Typography>
                  </Box>
                  <Box>
                    <Button
                      onClick={() => {
                        setFileshow(true);
                        setfileStatus({
                          file: BACKEND_URL + value.picture,
                          type: value.picture.split(".").pop(),
                        });
                      }}
                      size="sm"
                      variant="soft"
                    >
                      <AirplayOutlinedIcon color="primary" fontSize={"small"} />
                    </Button>

                    <a
                      onClick={() => {
                        download(value.picture);
                      }}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button size="sm" sx={{ marginLeft: 3 }} variant="soft">
                        <DownloadOutlinedIcon
                          color="secondary"
                          fontSize={"small"}
                        />
                      </Button>
                    </a>
                    {(bolToRole(user) === 7 || bolToRole(user) === 6) && (
                      <Button
                        onClick={() => deleteFile(value.id)}
                        size="sm"
                        sx={{ marginLeft: 3 }}
                        variant="soft"
                      >
                        <DeleteOutline fontSize={"small"} color="error" />
                      </Button>
                    )}
                  </Box>
                </Toolbar>
              ))}
            </CardContent>
          </CardContent>
        </Card>
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
          <Button onClick={handleClose} variant="soft">
            CLOSE
          </Button>

          <Card variant="solid" sx={{ my: 1, backgroundColor: "white" }}>
            <CardContent orientation="horizontal">
              <CardContent sx={{ overflowY: "scroll", maxHeight: 400 }}>
                <Typography
                  sx={{
                    fontSize: 18,
                    color: "#0a355f",
                    fontWeight: "bold",

                    fontFamily: sxStyle.fontFamily,
                  }}
                >
                  {modalItem.title}
                </Typography>

                <TextAreaPropsForReport
                  value={modalItem.body}
                  id="123"
                  placeholder="hello"
                  error={false}
                  TextAreaChange={() => {}}
                  label=""
                />
              </CardContent>
            </CardContent>
          </Card>
        </Box>
      </Modal>

      <Modal
        // sx={{ overflow: 'auto' }}
        hideBackdrop={true}
        open={fileShow}
        onClose={() => setFileshow(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Button size="sm" onClick={() => setFileshow(false)} variant="soft">
            CLOSE
          </Button>

          <Card variant="solid" sx={{ my: 1 }}>
            <CardContent orientation="horizontal">
              <CardContent sx={{ minHeight: 300, maxHeight: 400 }}>
                <FileViewerScreen
                  type={fileStatus.type}
                  file={fileStatus.file}
                />
              </CardContent>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </>
  );
};

export default ReportList;

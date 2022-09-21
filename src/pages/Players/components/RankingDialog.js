import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RankingCard from "./RankingCard";
import FetchData from "../../../assets/utils/FetchData";

export default function RankingDialog({ eventName, open, handleClose }) {
  // params =
  //   "caller=" +
  //   caller +
  //   "&apiKey=" +
  //   apiKey +
  //   "&sportID=" +
  //   sportID +
  //   "&eventName=" +
  //   name +
  //   "&filterData=" +
  //   userid +
  //   "&playerId=" +
  //   id;

  // params =
  //   "caller=" +
  //   caller +
  //   "&apiKey=" +
  //   apiKey +
  //   "&sportID=" +
  //   sportID +
  //   "&eventName=" +
  //   optionSelected +
  //   "&filterData=" +
  //   userid;

  const { data, loading } = FetchData({
    method: "POST",
    url: "fetchRankData",
    payload: {
      caller: process.env.REACT_APP_CALLER,
      sportID: process.env.REACT_APP_SPORT_ID,
      eventName: eventName,
      filterData: process.env.REACT_APP_USER_ID,
    },
    pathname: eventName,
  });

  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth='lg'
        open={open}
        onClose={handleClose}
        sx={{ margin: "-1.5rem" }}
      >
        <DialogActions
          sx={{
            padding: "1rem",
            marginBottom: {
              xs: "-2rem",
              md: "-3rem",
            },
            zIndex: "3000",
            cursor: "pointer",
          }}
        >
          <CloseIcon onClick={handleClose} />
        </DialogActions>
        <DialogTitle sx={{ textAlign: "center" }}>
          {eventName.toUpperCase()}
        </DialogTitle>
        <Divider sx={{ margin: "0 1rem" }} />
        <DialogContent>
          <RankingCard loading={loading} eventData={data.data} />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

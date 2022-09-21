import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Box } from "@mui/material";
import LoadingComponent from "../../../../../assets/utils/LoadingComponent";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const EntriesComponent = (props) => {
  const { open, handleClose } = props;

  return (
    <Dialog
      open={open && open !== "give"}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby='alert-dialog-slide-description'
    >
      <DialogTitle>{props.open.eventName}</DialogTitle>
      <DialogContent>
        <DialogContentText
          id='alert-dialog-slide-description'
          sx={{
            padding: "1rem 0",
          }}
        >
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Select event</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={props.eventId}
              label='Select event'
              inputProps={{
                style: {
                  "&:hover": {
                    border: "#1px solid #64748b",
                  },
                  "&:click": {
                    border: "#1px solid #64748b",
                  },
                },
              }}
              onChange={(event) => props.setEventId(event.target.value)}
            >
              {props &&
                props.open &&
                props.open.eventsUnderTournament.map((event, index) => (
                  <MenuItem value={event} key={index}>
                    {event}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <Box
            sx={{
              width: "100%",
              bgcolor: "background.paper",
            }}
          >
            <List>
              {!props.loading ? (
                props.playersData.length > 0 &&
                props.playersData.map((players, index) => (
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText primary={players.playerName} />
                    </ListItemButton>
                  </ListItem>
                ))
              ) : (
                <Box sx={{ margin: "2rem 0", textAlign: "center" }}>
                  <LoadingComponent />
                </Box>
              )}
            </List>
            <Divider />
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EntriesComponent;

/* This functional component is used to get the subscription tournament list 
for the logged in users based on upcoming tournaments with event name and price */
import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { useHistory } from "react-router-dom";
import {
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
} from "@mui/material";
import {
  RequestData,
} from "../../../../../assets/utils/RequestData";
import useRazorpay from "react-razorpay";
// import "../../Register/login/LoginStyles.css";

import { handleTournamentId } from "../../../../../assets/utils/UserLoginContext";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, eventName, theme) {
  return {
    fontWeight:
      eventName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const SubscribeTournament = ({ open, handleClose, getUser }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const [events, setEvents] = useState([]);
  const [eventFees, setEventFees] = useState([]);
  const [subscribedEvents, setSubscribedEvents] = useState([]);

  // constant state for error / success message
  const [message, setMessage] = useState("");
  // Constant state used to get total amount based on check uncheck
  const [totalAmount, setTotalAmount] = useState(0);
  // constant state for event names response from api
  const [eventName, setEventName] = useState([]);

  const history = useHistory();
  const [disableFlag, setDisableFlag] = useState(false);
  const [checked, setChecked] = useState([]);
  let subData = [],
    unSubData = [];
  const tournamentId = handleTournamentId.getTournId();
  const Razorpay = useRazorpay();

  //razor pay for payment
  // api response for testing
  // const events = [
  //   "HBU11",
  //   "HGU11",
  //   "BU13",
  //   "GU13",
  //   "BU15",
  //   "GU15",
  //   "BU17",
  //   "GU17",
  //   "BU19",
  //   "GU19",
  //   "Men",
  //   "Women",
  //   "NMS",
  // ];
  // const eventFees = [
  //   "200",
  //   "200",
  //   "200",
  //   "200",
  //   "200",
  //   "200",
  //   "300",
  //   "300",
  //   "300",
  //   "300",
  //   "300",
  //   "300",
  //   "300",
  // ];
  // const subscribedEvents = [
  //   "0",
  //   "200",
  //   "0",
  //   "0",
  //   "0",
  //   "0",
  //   "0",
  //   "300",
  //   "0",
  //   "0",
  //   "0",
  //   "0",
  //   "0",
  // ];

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setMessage("");
    setDisableFlag(value.length === 3);
    if (value && value.length <= 3) {
      setEventName(typeof value === "string" ? value.split(",") : value);
      let amountList = 0;
      value.forEach((val, index) => {
        amountList += parseInt(eventFees[events.indexOf(val)]);
      });
      setTotalAmount(amountList);
    } else {
      setMessage("Cannot select more than 3 events!");
    }
    setDisableFlag(eventName.includes(event) ? false : disableFlag);
  };

  // This is to call renewal player api if player payment is expired
  //Transaction id with amount is passed from payment gateway after payment is successfull
  const paySubscribtion = async (transactionId) => {
    // variables to pass subscribed and unsubscribed data to api

    setMessage("");
    events &&
      events.forEach((eventName, index) => {
        checked[index] === true
          ? (subData[index] = eventName)
          : (unSubData[index] = eventName);
      });
    //parameters passed as object to HTTP method POST
    let content = {
      caller: process.env.REACT_APP_CALLER,
      data: {
        userId: getUser.userId,
        tournamentId: tournamentId,
        subscribeID: subData,
        unSubscribeID: unSubData,
        transactionID: transactionId,
        transactionAmount: 100,
        // transactionAmount: totalAmount,
        transactionType: "none",
        oldSubscribeID: [],
      },
    };
    // Calling HTTP method by passing Api Type and Api URL and object params
    await RequestData("POST", "eventSubscription", content)
      // Getting the Response object which holds the data of Previous tournaments
      .then((response) => {
        //Checking weather response data is null
        if (response.result) {
          // Setting success message
          alert("Subscription Sucessfull");
          //redirection to home component
          history.push("/");
        } else {
          response.result.message
            ? setMessage(response.result.message)
            : setMessage("Failed");
        }
      })
      .catch((er) => {
        er && er.result && er.result.message
          ? setMessage(er.result.message)
          : setMessage("Failed Please try again later");
      });
  };

  //Constant asynchronous api method call used to fetch data for subscribed tournaments
  // using Axios GET method

  const getSubscribeTournamentList = async () => {
    await RequestData(
      "GET",
      `eventListUnderTourn?caller=${process.env.REACT_APP_CALLER}&apiKey=${process.env.REACT_APP_API_KEY}&tournamentId=${tournamentId}&userId=${getUser.userId}`
    )
      // `eventListUnderTourn?caller=${process.env.REACT_APP_CALLER}&apiKey=${process.env.REACT_APP_API_KEY}&tournamentId=${tournamentId}&userId=${process.env.filterData}`
      .then((response) => {
        // Checking the response before changing the state
        if (response && response.result) {
          setEventFees(response.result.eventFeeSettings.eventFees);
          setEvents(response.result.eventFeeSettings.events);
        } else {
          // error message in case of no response
          setMessage("Failed to retrieve data. Please try again later");
        }
      })
      .catch((error) => {
        // error in api call
        error.result && error.result.message
          ? setMessage(error.result.message)
          : setMessage("Something went wrong! Please try again later.");
      });
  };

  // This is for the integration of payment gateway using Rasor pay
  const handlePayment = async () => {
    let options = {};
    options = {
      key: process.env.REACT_APP_RAZORPAY_PAYMENT_KEY_ID, // ID from razor pay account
      amount: 100, // total amount to pay
      // amount: totalAmount * 100, // total amount to pay
      currency: "INR",
      name: process.env.REACT_APP_CALLER,
      description: "Test Transaction",
      image: ``,
      handler: (response) => {
        // On razor pay response setting transaction id using usestate
        paySubscribtion(response.razorpay_payment_id);
        // need to send transaction id to subscribe api
      },
      prefill: {
        // name and email id passed as props from registration component
        name: getUser.userName,
        email: getUser.userId,
        contact: getUser.phoneNumber,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#332861",
      },
    };
    // if (totalAmount > 0) {
    //   options = {
    //     key: process.env.REACT_APP_RAZORPAY_PAYMENT_KEY_ID, // ID from razor pay account
    //     amount: totalAmount * 100, // total amount to pay
    //     // amount: totalAmount * 100, // total amount to pay
    //     currency: "INR",
    //     name: process.env.REACT_APP_CALLER,
    //     description: "Test Transaction",
    //     image: ``,
    //     handler: (response) => {
    //       // On razor pay response setting transaction id using usestate
    //       paySubscribtion(response.razorpay_payment_id);
    //       // need to send transaction id to subscribe api
    //     },
    //     prefill: {
    //       // name and email id passed as props from registration component
    //       name: getUser.userName,
    //       email: getUser.userId,
    //       contact: getUser.phoneNumber,
    //     },
    //     notes: {
    //       address: "Razorpay Corporate Office",
    //     },
    //     theme: {
    //       color: "#332861",
    //     },
    //   };
    // } else {
    //   setMessage("Select atleast one event to subscribe!");
    // }
    const rzp1 = new Razorpay(options);
    // On payment failure showing the issue to the user
    rzp1.on("Payment Failed", function (response) {
      setMessage(response.error.description);
      // redirecting to login
    });
    rzp1.open();
  };

  useEffect(() => {
    let checks = [];
    const eventsSubscribed = subscribedEvents
      .forEach((d, index) => {
        if (d != 0) {
          // eslint-disable-line
          checks[index] = true;
          return events[index];
        } else {
          checks[index] = false;
        }
      })
      .filter((doc) => doc !== undefined);
    setEventName(eventsSubscribed);
    setTotalAmount(
      subscribedEvents.reduce(
        (partialSum, a) => parseInt(partialSum) + parseInt(a),
        0
      )
    );
    setChecked(checks);
    if (tournamentId && getUser._id) getSubscribeTournamentList();
  }, [getUser && getUser._id && tournamentId]); // eslint-disable-line

  return (
    <Box>
      <Dialog
        fullScreen={fullScreen}
        open={open && open === "give"}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle id='responsive-dialog-title'>
          Choose your events
          <Typography
            sx={{
              color: "orangeRed",
            }}
          >
            {message}
          </Typography>
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id='demo-multiple-chip-label'>
                Select Events
              </InputLabel>
              <Select
                labelId='demo-multiple-chip-label'
                id='demo-multiple-chip'
                multiple
                value={eventName}
                onChange={handleChange}
                input={
                  <OutlinedInput
                    id='select-multiple-chip'
                    label='Select Events'
                  />
                }
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {events.map((event, index) => (
                  <MenuItem
                    key={event}
                    value={event}
                    // disabled={
                    //   //subscribedEvents[index] != "0" &&
                    //   disableFlag === false ? true : false
                    // }

                    style={getStyles(event, eventName, theme)}
                  >
                    <Grid container>
                      <Box sx={{ float: "left" }}>{event}</Box>
                      <Box sx={{ flexGrow: 1 }}></Box>
                      <Box sx={{ float: "right" }}>₹{eventFees[index]}</Box>
                    </Grid>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Table sx={{ width: "100%" }}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant='h5'>Event Name</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='h5'>Fee</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              {eventName.map((row, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ margin: "0 1rem", border: "none" }}>
                    {row}
                  </TableCell>
                  <TableCell
                    sx={{
                      margin: "0 1rem",
                      border: "none",
                      fontWeight: "bolder",
                    }}
                  >
                    ₹&nbsp;{eventFees[events.indexOf(row)]}
                  </TableCell>
                </TableRow>
              ))}
              <Divider />
              <TableRow>
                <TableCell
                  sx={{
                    margin: "0 1rem",
                    border: "none",
                    fontWeight: "bolder",
                  }}
                >
                  Total
                </TableCell>
                <TableCell
                  sx={{
                    margin: "0 1rem",
                    border: "none",
                    fontWeight: "bolder",
                  }}
                >
                  ₹&nbsp;{totalAmount}
                </TableCell>
              </TableRow>
            </Table>
          </DialogContentText>
        </DialogContent>
        {/* <DialogActions> */}
        <Box sx={{ margin: "1rem" }}>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button
            autoFocus
            variant='contained'
            disabled={!totalAmount}
            onClick={handlePayment} //handling payment onclick by rendering razor pay
            sx={{ float: "right" }}
          >
            Pay&nbsp;-&nbsp;₹&nbsp;{totalAmount}
          </Button>
        </Box>
        {/* </DialogActions> */}
      </Dialog>
    </Box>
  );
};
export default SubscribeTournament;

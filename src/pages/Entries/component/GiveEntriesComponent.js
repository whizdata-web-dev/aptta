import { Box, Button, Card, Divider, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { RequestData, urlConsts } from "../../../assets/utils/RequestData";
import { useLoginContext } from "../../../assets/utils/UserLoginContext";
import EntriesTable from "./EntriesTable";
import useRazorpay from "react-razorpay";
import { handleTournamentId } from "../../../assets/utils/UserLoginContext";
import CreditCardIcon from "@mui/icons-material/CreditCard";

function subtotal(list) {
  return list.map(({ fee }) => parseInt(fee)).reduce((sum, i) => sum + i, 0);
}

const GiveEntriesComponent = ({ tournamentData }) => {
  const { getLoginUser } = useLoginContext();
  const getUser = getLoginUser();

  const [tournamentName, setTournamentName] = useState([]);
  const [eventFees, setEventFees] = useState([]);
  const [selected, setSelected] = useState([]);
  const [invoiceSubtotal, setInvoiceSubtotal] = useState(0);
  const Razorpay = useRazorpay();

  const dcf = 100;
  const invoiceTotal = invoiceSubtotal + dcf;

  const getSubscribeTournamentList = async () => {
    await RequestData(
      "GET",
      `eventListUnderTourn?caller=${urlConsts.caller}&apiKey=${urlConsts.apiKey}&tournamentId=${tournamentData.tournamentList[0].tournamentId}&userId=${getUser.userId}`
    )
      .then((response) => {
        if (response && response.result) {
          let feeList = [];
          response.result.data.forEach((event) => {
            feeList.push({
              id: event._id,
              name: event.abbName,
              fullName: event.eventName,
              fee: event.prize,
            });
          });
          setEventFees(feeList);
        } else {
          localStorage.setItem(
            "erMsg",
            "Something went wrong while fetching data! Please try again later."
          );
        }
      })
      .catch((error) => {
        // error in api call
        localStorage.setItem(
          "erMsg",
          "Something went wrong! Please try again later."
        );
      });
  };

  useEffect(() => {
    if (Object.keys(tournamentData).length > 0) {
      setTournamentName(tournamentData.tournamentList[0].tournamentName);
      getSubscribeTournamentList();
    }
  }, [tournamentData]); // eslint-disable-line

  useEffect(() => {
    // if (selected.length > 0) paymentTransaction();
    let filteredList = selected.map(
      (eventName) =>
        eventFees.filter((eventDetails) => eventName === eventDetails.name)[0]
    );
    setInvoiceSubtotal(subtotal(filteredList));
  }, [selected]); // eslint-disable-line

  const paymentTransaction = async (transactionId) => {
    let subscribedTournamentId = selected.map(
      (eventName) =>
        eventFees.filter((eventDetails) => eventName === eventDetails.name)[0]
          .id
    );

    
    let content = {
      caller: urlConsts.caller,
      data: {
        userId: getUser.userId,
        tournamentId: handleTournamentId.getTournId(),
        subscribeID: subscribedTournamentId,
        unSubscribeID: [],
        transactionID: transactionId,
        transactionAmount: invoiceTotal * 100,
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
          localStorage.setItem("sMsg", "Subscription sucessful!");
        } else {
          // response.result.message
          //   ? setMessage(response.result.message)
          //   : setMessage("Failed");
          console.error("Response error");
          localStorage.setItem("sMsg", "Subscription sucessful!");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // This is for the integration of payment gateway using Rasor pay
  const handlePayment = async () => {
    let options = {};
    options = {
      key: urlConsts.paymentKeyId, // ID from razor pay account
      amount: 100, // total amount to pay
      // amount: invoiceTotal * 100, // total amount to pay
      currency: "INR",
      name: "Andhra Pradesh Table Tennis Association",
      description: tournamentName,
      image: ``,
      handler: (response) => {
        // On razor pay response setting transaction id using usestate
        paymentTransaction(response.razorpay_payment_id);
        // need to send transaction id to subscribe api
      },
      prefill: {
        // name and email id passed as props from registration component
        name: getUser.userName,
        email: getUser.emailAddress,
        contact: getUser.phoneNumber,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#332861",
      },
    };
    const rzp1 = new Razorpay(options);
    // On payment failure showing the issue to the user
    rzp1.on("Payment Failed", function (response) {
      localStorage.setItem("erMsg", "Payment Failed. Please try again.");
    });
    rzp1.open();
  };

  return (
    <Card sx={{ borderRadius: "4px", padding: "2rem" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant='h5'>{tournamentName}</Typography>
      </Box>
      <Box sx={{ marginBlock: "1rem 1rem" }}>
        <Divider />
      </Box>
      <Box
        sx={{
          textAlign: "left",
          marginBlock: "0.5rem",
        }}
      >
        <Typography variant='body1' fontWeight={"bold"}>
          Your Unique registration Number : {getUser?.affiliationId}
        </Typography>
      </Box>
      <Box
        sx={{
          textAlign: "justify",
          marginBlock: "0.5rem",
        }}
      >
        <Typography variant='body2'>
          Based on your registration details, you are eligible to play in the
          following events.Please choose your events (Select or de-select as
          desired ) and click 'Submit' to confirm your participation. You will
          recieve an email confirming your entries soon.
        </Typography>
      </Box>
      <Box sx={{ marginBlock: "1rem 0.5rem" }}>
        <EntriesTable
          rows={eventFees}
          selected={selected}
          setSelected={setSelected}
          payment={{
            invoiceSubtotal,
            invoiceTotal,
            dcf,
          }}
        />
      </Box>
      <Box
        sx={{
          marginBlock: "1rem 0.5rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          variant='contained'
          disabled={invoiceSubtotal > 0 ? false : true}
          onClick={handlePayment}
          sx={{
            borderRadius: "0px",
            minWidth: "320px",
            background:
              invoiceSubtotal > 0
                ? "#332861 !important"
                : "rgba(0, 0, 0, 0.26)",
            color:
              invoiceSubtotal > 0
                ? "#FFFFFF !important"
                : "rgba(0, 0, 0, 0.12)",
          }}
        >
          <CreditCardIcon sx={{ marginRight: "0.5rem" }} />
          Pay Amount
        </Button>
      </Box>
    </Card>
  );
};

export default GiveEntriesComponent;

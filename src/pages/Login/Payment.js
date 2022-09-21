/* This component is used for Payment for registration.
Payment gateway using Razorpay
*/
import React, { useState } from "react";
import useRazorpay from "react-razorpay";
import { RequestData, urlConsts } from "../../assets/utils/RequestData";

const Payment = (props) => {
  const [message, setMessage] = useState("");
  const Razorpay = useRazorpay();

  // razor pay for payment while registering
  React.useEffect(() => {
    handleRegPayment(); // Payment gateway call in useeffect
  }, [props && props.playerDetails.verificationCode]); // eslint-disable-line

  const registerPlayer = async (transactionId) => {
    //parameters passed as object to HTTP method POST
    let content = {
      caller: urlConsts.caller,
      userName: props.playerDetails && props.playerDetails.userName,
      verificationCode:
        props.playerDetails && props.playerDetails.verificationCode,
      emailAddress: props.playerDetails && props.playerDetails.emailAddress,
      password: props.playerDetails && props.playerDetails.password,

      clubNameId: "",
      regOverride: true,
      transactionID: transactionId, // this is generated on succesfull transaction
      transactionAmount: urlConsts.amountLabel,
      approvalCode: urlConsts.caller,
      role: "Player",
      academy: "None",
      associationId: urlConsts.filterData,
      phoneNumber: props.playerDetails && props.playerDetails.phoneNumber,
      dob: props.playerDetails && props.playerDetails.dob,
    };
    // Calling HTTP method by passing Api Type and Api URL and object params
    await RequestData("POST", "playerRegisterUnderAssoc", content)
      // Getting the Response object which holds the data of player registration
      .then((response) => {
        //Checking weather response data is null
        if (response.result) {
          setMessage(
            "Registration Succesfull! Please Login to subscribe the tournament."
          );
          setTimeout(() => {
            window.location.reload();
          }, 4000);
        } else {
          setMessage("Something went wrong! Please try again later.");
        }
      })
      .catch((error) => {
        error && error.result.message
          ? setMessage(error.result.message)
          : setMessage("Registration failed! Please try again later.");
      });
  };
  // Payment gateway at the time of registration
  const handleRegPayment = async () => {
    const options = {
      key: urlConsts.paymentKeyId, // ID from razor pay account
      amount: urlConsts.amount, //Constant amount declared in HTTP method
      currency: "INR",
      name: urlConsts.caller,
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      handler: (response) => {
        if (response && response.razorpay_payment_id) {
          // On razor pay response setting transaction id using usestate
          registerPlayer(response.razorpay_payment_id); // register player on registration amount paid
        }
      },
      prefill: {
        //name and email id passed as props from registration component
        name: props.userName,
        email: props.userId,
        contact: props.phoneNumber,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new Razorpay(options);
    // On payment failure showing the issue to the player
    rzp1.on("payment.failed", function (response) {
      alert(response.error.description);
      alert(response.error.reason);
    });

    rzp1.open();
  };

  return (
    <div>
      <p
        style={{
          fontSize: "18px",
        }}
      >
        {message}
      </p>
    </div>
  );
};

export default Payment;

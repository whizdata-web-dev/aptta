/* This component is used for Payment for registration.
Payment gateway using Razorpay
*/
import React, { useState } from "react";
import useRazorpay from "react-razorpay";
import { RequestData, urlConsts } from "../../assets/utils/RequestData";

const RazorPayment = (props) => {
  const [message, setMessage] = useState("");
  const Razorpay = useRazorpay();
  // razor pay for payment while registering

  React.useEffect(() => {
    handleRegPayment(); // Payment gateway call in useeffect
  }, [props && props.amount]); //checking props

  const registerPlayer = async (transactionId) => {
    //parameters passed as object to HTTP method POST
    let content = {
      caller: urlConsts.caller,
      userName: props.userName,
      password: props.password,
      verificationCode: props.OTP,
      emailAddress: props.userId,
      clubNameId: "",
      regOverride: true,
      transactionID: transactionId, // this is generated on succesfull transaction
      transactionAmount: urlConsts.amountLabel,
      approvalCode: urlConsts.caller,
      role: "Player",
      academy: "None",
      associationId: urlConsts.filterData,
      phoneNumber: props.phoneNumber,
      dob: props.dob,
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
  // This is to call razorpay in case of payment renewal
  // This is rendered once payment of player expires.
  // Player details is passed as object
  const renewPayment = async (player) => {
    const options = {
      key: urlConsts.paymentKeyId, // payment key declared in HTTP method
      amount: "100", //Constant amount declared in HTTP method
      // amount: urlConsts.amount, //Constant amount declared in HTTP method
      currency: "INR",
      name: urlConsts.caller, // caller id declared in HTTP method
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      handler: (response) => {
        // On razor pay response setting transaction id using usestate
        //checking if response and transaction id null
        if (response && response.razorpay_payment_id) {
          renewPlayer(player, response.razorpay_payment_id); //  player renewal on amount paid
        }
      },
      prefill: {
        //name, phone number and email id passed from login response
        name: player.userName,
        email: player.emailAddress,
        contact: player.phoneNumber,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new Razorpay(options);
    // On payment failure showing the issue to the player and redirecting to login
    rzp1.on("payment.failed", function (response) {
      setLoginValue({
        errorMessage: response.error.description,
      });
      // history.push("/");
      // setOpen(false)
    });
    rzp1.open();
  };
  // Payment gateway at the time of registration
  const handleRegPayment = async () => {
    const options = {
      key: urlConsts.paymentKeyId, // ID from razor pay account
      amount: "100", //Constant amount declared in HTTP method
      // amount: props.amount, //Constant amount declared in HTTP method
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

export default RazorPayment;

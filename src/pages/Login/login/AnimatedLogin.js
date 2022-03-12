import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import useRazorpay from "react-razorpay";
import "./LoginStyles.css";
import Register from "../Register";
import { useHistory, useLocation } from "react-router-dom";
import { RequestData, urlConsts } from "../../../assets/utils/RequestData";
import ForgotPassword from "../ForgotPassword";
import {
  useLoginContext,
  handleTournamentId,
} from "../../../assets/utils/UserLoginContext";

const AnimatedLogin = () => {
  const [activeClass, setActiveClass] = useState("login_container");
  const location = useLocation();
  const history = useHistory();
  // calling context api methods for setting user and tournament id
  const { setLoginUser } = useLoginContext();
  // Declaring Razor pay for payment
  const Razorpay = useRazorpay();
  //declaring states for input fields with error message
  const [loginValues, setLoginValue] = useState([
    {
      email: "",
      password: "",
      forgotPwdFlag: false,
      error: "",
      errorMessage: "",
    },
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // This is to call razorpay in case of payment renewal
  // This is rendered once payment of player expires.
  // Player details is passed as object
  const renewPayment = async (player) => {
    const options = {
      key: urlConsts.paymentKeyId, // payment key declared in HTTP method
      amount: urlConsts.amount, //Constant amount declared in HTTP method
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
      history.push("/");
    });
    rzp1.open();
  };

  const handleRespLogin = (response) => {
    // multiple condition check using ternary operator
    // checking weather user is invalid or password is incorrect
    //if invalid setting error to error button class defined in Loginstyles.css
    // error message is displayed to end user
    response === "Invalid user"
      ? setLoginValue({
          error: "errorButton",
          errorMessage: "Invalid user",
        })
      : response === "Incorrect password"
      ? setLoginValue({
          error: "pwdError",
          errorMessage: "Incorrect password",
        })
      : response.paymentStatus === false
      ? renewPayment(response)
      : response._id
      ? setLoginUser(response)
      : setLoginUser(null);
  };

  // This is to call renewal player api if player payment is expired
  //Transaction id with amount is passed from payment gateway after payment is successfull
  const renewPlayer = async (player, transactionId) => {
    //parameters passed as object to HTTP method POST
    let content = {
      caller: urlConsts.caller,
      userId: player._id,
      associationId: urlConsts.filterData,
      approvalCode: urlConsts.caller,
      transactionID: transactionId,
      transactionAmount: urlConsts.amountLabel,
    };

    // Calling HTTP method by passing Api Type and Api URL and object params
    await RequestData("POST", "renewalUnderAssoc", content)
      // Getting the Response object which holds the data of Previous tournaments
      .then((response) => {
        //Checking weather response data is null
        if (response.result) {
          setLoginUser(player); // setting data to context api
          if (location.state) {
            //setting tournament id to local storage is defined in Login context api
            handleTournamentId.setTournId(location.state.tournamentId);
            // return <Redirect to="/subscribeTournament" />;
          }
          history.push("/");
        } else {
          setLoginValue({
            errorMessage: "Response Time Out! Please try again later.",
          });
        }
      })
      .catch((er) => {
        setLoginValue({
          errorMessage:
            er.result && er.result.message
              ? er.result.message
              : "Error! Please try again later",
        });
      });
  };

  // Async function to fetch login data using Axios method api call
  const playerLogin = async () => {
    //Data object defined for passing parameters to POST api.
    // and assigning all parameters as object and passing to POST api
    const content = {
      //Constant declared in HTTP method
      caller: urlConsts.caller,
      userName: loginValues.email,
      userPassword: loginValues.password,
      emailOrPhoneFlag: "1",
      loginRole: "Player",
      paymentValid: "yes",
      associationId: urlConsts.filterData,
    };
    //Calling POST api for getting Player data
    await RequestData("POST", "playerUserLoginUnderAssoc", content)
      // Getting the Response object which holds the data of Player
      .then((response) => {
        // Checking the response before changing the state
        if (response && response.result) {
          handleRespLogin(response.result);
          // checking state of Link from Home component
          // Setting tournament id of upcoming tournament to local storage -
          //on Give Entry button click
          if (location.state) {
            //setting tournament id to local storage is defined in Login context api
            handleTournamentId.setTournId(location.state.tournamentId);
            // return <Redirect to="/subscribeTournament" />;
          }
          history.push("/");
        } else {
          setLoginValue({
            errorMessage: "Something went wrong! Please try again later.",
          });
        }
      })
      .catch((er) => {
        setLoginValue({
          errorMessage:
            (er.result && er.result.message) ||
            "Something went wrong! Please try again later.",
        });
      });
  };

  // This is to handle cancel click from forgot pwd component
  const cancelFgtPwd = () => {
    setLoginValue({ forgotPwdFlag: false });
  };

  // Calling submit event on form submit with email address and password
  const submitLogin = (event) => {
    event.preventDefault(); // denaid for not assigning the default values
    // isnan in case of phone number
    const pattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@([a-z]+)+(?:\.[a-zA-Z0-9-]+)*$/;
    //pattern check for Email ID
    //check is based on ternary operator
    // if pattern mismatch then button animation and error message is displayed to user.
    !pattern.test(loginValues.email)
      ? setLoginValue({
          error: "emailError",
          errorMessage: "Invalid Email Address!",
        })
      : // checking if password length is less than 5
      // then button animation and error message is displayed to user.
      String(loginValues.password).length <= 5
      ? setLoginValue({
          error: "pwdError",
          errorMessage: "Password should contain atleast 6 charecters!",
        })
      : // if both email id and password are valid entries then calling the api method
        playerLogin(); // calling Api
  };

  // on click of forgot password changing the state
  const handleForgotPassword = () => {
    setLoginValue({ forgotPwdFlag: true });
  };

  // This is on change of input fields - email id and password - setting the state
  const handleInputChange = (event) => {
    setLoginValue({
      ...loginValues,
      [event.target.name]: event.target.value,
      error: "",
      errorMessage: "",
    });
  };

  return (
    <Box className='loginroot'>
      <Box className='loginbody'>
        <Box className={activeClass} id='container'>
          <Box className='form-container sign-up-container'>
            <Box className='login-form'>
              <Register />
            </Box>
          </Box>
          <Box
            className='form-container sign-in-container'
            sx={{
              "@media screen and (max-width: 301px)": {
                overflow: "auto",
                width: "120%",
                padding: "-1rem 0",
                paddingRight: "1rem",
              },
            }}
          >
            {/* 
            checking weather forgot password is clicked - true / false
            if clicked forgot password component is rendered
             */}
            {loginValues.forgotPwdFlag === true ? (
              <ForgotPassword onChange={cancelFgtPwd} />
            ) : (
              <form className='login-form' onSubmit={submitLogin}>
                <h1 className='login-h1'>Sign in</h1>
                <TextField
                  id='emailLogin'
                  required
                  value={loginValues.email}
                  type='email'
                  variant='filled'
                  className={
                    loginValues.error === "emailError" ? "error" : "textWidth"
                  }
                  sx={{
                    paddingTop: "1rem",
                  }}
                  placeholder='Email Address'
                  name='email'
                  onChange={handleInputChange}
                />
                <TextField
                  id='password'
                  required
                  type='password'
                  variant='filled'
                  value={loginValues.password}
                  placeholder='Password'
                  name='password'
                  className={
                    loginValues.error === "pwdError" ? "error" : "textWidth"
                  }
                  sx={{
                    paddingTop: "1rem",
                  }}
                  onChange={handleInputChange}
                />

                {/* showing the error message in case of error */}
                {loginValues.errorMessage ? (
                  <p
                    style={{
                      color: "orangered",
                      fontSize: "16px",
                    }}
                  >
                    {loginValues.errorMessage}
                  </p>
                ) : (
                  ""
                )}
                <button
                  className='signin login-button'
                  style={{
                    marginTop: "1rem",
                  }}
                  id='signIn'
                >
                  Sign In
                </button>
                <Box sx={{ margin: "1rem" }}>
                  <Button
                    variant='text'
                    onClick={handleForgotPassword}
                    sx={{
                      border: "none",
                      background: "white",
                      margin: "-0.5rem 0.5rem",
                      "@media screen and (max-width: 931px)": {
                        padding: "0 0",
                        overflow: "auto",
                        paddingLeft: "-2rem",
                        margin: "0 0",
                      },
                      "@media screen and (max-width: 301px)": {
                        overflow: "hidden",
                        marginLeft: "-1.5rem",
                      },
                    }}
                  >
                    <Typography
                      variant='body2'
                      sx={{
                        fontWeight: "bold",
                        color: "#616161",
                        textDecoration: "none",
                        transition: "0.3s all ease",
                        "&:hover": {
                          color: "#333",
                          transform: "scale(1.01)",
                          textDecoration: "underLine",
                        },
                      }}
                    >
                      Forgot password?
                    </Typography>
                  </Button>
                </Box>
              </form>
            )}
          </Box>
          <Box className='overlay-container'>
            <Box className='overlay'>
              <Box className='overlay-panel overlay-left'>
                <h1 className='login-h1'>Welcome Back Player!</h1>
                <p className='login-p'>Please login to give entries.</p>
                <button
                  className='ghost signin login-button'
                  id='signIn1'
                  onClick={() => setActiveClass("login_container")}
                >
                  Sign In
                </button>
              </Box>
              <Box className='overlay-panel overlay-right'>
                <h1 className='login-h1'>Hello, Player!</h1>
                <p className='login-p'>
                  Enter your personal details and start journey in the
                  competitive world of Table Tennis!
                </p>
                <button
                  className='ghost signup login-button'
                  id='signUp'
                  onClick={() =>
                    setActiveClass("login_container right-panel-active")
                  }
                >
                  Sign Up
                </button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AnimatedLogin;

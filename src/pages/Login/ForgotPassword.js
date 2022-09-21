/* 
This component is used for Password reset
The user is validated with email address - OTP is sent to email 
On validation player is allowed to create new Password
*/
import React, { useState } from "react";
import { RequestData } from "../../assets/utils/RequestData";
import OtpInput from "react-otp-input";
import { Box, Button, CardHeader, TextField, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import pwdLogo from "../../assets/img/pwd.gif";

export default function ResetPassword(props) {
  const [resetPwdValues, setresetPwdValues] = useState([
    {
      email: "",
      password: "",
      confirmPassword: "",
      verificationCode: "",
      message: "",
      errorClass: "",
      errorMessage: "",
    },
  ]);
  const [OTP, setOTP] = useState("");

  // This method is for sending the OTP for email address
  const sendOTPClick = (event) => {
    event.preventDefault();
    if (isNaN(resetPwdValues.email)) {
      const pattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
      //pattern check for Email ID
      //check is based on ternary operator
      // if pattern mismatch then button animation and error message is displayed to user.
      !pattern.test(resetPwdValues.email)
        ? setresetPwdValues({
            errorClass: "emailError",
            errorMessage: "Invalid Email Address!",
          })
        : getPasswordReset(); // this is the http api method for OTP
    }
  };

  const confirmClick = (event) => {
    event.preventDefault();
    
    if ((OTP) === String(resetPwdValues.verificationCode)) {
      resetPwdValues.password === resetPwdValues.confirmPassword
        ? getPasswordResetValidation()
        : setresetPwdValues({
            ...resetPwdValues,
            errorClass: "passwordError",
            errorMessage: "Password mismatch with confirm password!",
          });
    } else {
      String(OTP).length < 4
        ? setresetPwdValues({
            ...resetPwdValues,
            errorClass: "OTPLengthError",
            errorMessage: "4 digit OTP required!",
          })
        : OTP != resetPwdValues.verificationCode // eslint-disable-line
        ? setresetPwdValues({
            ...resetPwdValues,
            errorClass: "OTPError",
            errorMessage: "OTP mismatch!",
          })
        : setresetPwdValues({
            ...resetPwdValues,
            errorClass: "",
            errorMessage: "",
          });
    }
  };

  // This is the asynchronous method used to get Previous tournaments data
  //based by calling HTTP GET Api method
  const getPasswordReset = async () => {
    // Calling HTTP method by passing Api Type and Api URL
    await RequestData(
      "GET",
      `otpForgotPassword?caller=${process.env.REACT_APP_CALLER}&apiKey=${process.env.REACT_APP_API_KEY}&emailId=${resetPwdValues.email}`
    )
      // Getting the Response object which holds the data of Previous tournaments
      .then((response) => {
        //Checking weather response data is null
        if (response.result) {
          //Changing the state of tournament data - setting state to response data
          if (response.result.message === "User is invalid") {
            setresetPwdValues({
              error: "errorButton",
              errorMessage: "Invalid user",
            });
          } else {
            //Setting verification code to state
            setresetPwdValues({
              ...resetPwdValues,
              verificationCode: response.result.verificationCode,
              message: response.result.message,
            });
          }
        }
      })
      .catch((er) => {
        setresetPwdValues({
          errorMessage: er.result,
        });
      });
  };
  // This is the asynchronous method used to get password validation data
  //based by calling HTTP POST Api method
  const getPasswordResetValidation = async () => {
    let content = {
      //Constant declared in HTTP method
      caller: process.env.REACT_APP_CALLER,
      // parameters sent as object to HTTP method.
      // email address password and verification code is taken from state
      userId: resetPwdValues.email,
      password: resetPwdValues.password,
      verificationCode: resetPwdValues.verificationCode,
    };
    // Calling HTTP method by passing Api Type and Api URL
    await RequestData("POST", "setNewPassword", content)
      // Getting the Response object which holds the data of Previous tournaments
      .then((response) => {
        //Checking weather response data is null

        if (response.result && response.result.status === "success") {
          setresetPwdValues({
            ...resetPwdValues,
            message: "Password Reset successful! \n Login to proceed.",
            errorClass: "success",
          });
        } else {
          setresetPwdValues({
            error: "errorButton",
            errorMessage: response.result.message
              ? response.result.message
              : "Something went wrong! Please try again later.",
          });
        }
      })
      .catch((er) => {
        setresetPwdValues({
          errorClass: "errorButton",
          errorMessage: er.result,
        });
      });
  };
  // This is on cancel redirect to login - changing parent state-login to false
  const cancelFgtPwd = () => {
    props.onChange(false);
  };

  const otpInputChange = (event) => {
    setOTP(event);
    setresetPwdValues({
      ...resetPwdValues,
      errorMessage: "",
    });
  };
  // This is for sending OTP to email by taking email address from player
  const renderResetForm = () => {
    return (
      <form
        className="login-form"
        style={{
          marginTop: "40%",
          width: "100%"
        }}
        onSubmit={sendOTPClick}
      >
        <h2 className="login-h1">Password Reset</h2>
        <TextField
          required
          type="email"
          id="emailId"
          label="Email Address"
          variant="filled"
          inputProps={{
            maxLength: 30,
            style: { width: '100%', backgroundColor: "#fff" },
          }}
          sx={{
            width: "100%",
            margin: "1rem 0",
            backgroundColor: "#fff",
          }}
          value={resetPwdValues.email}
          onChange={(event) => {
            setresetPwdValues({ ...resetPwdValues, email: event.target.value });
          }}
        />
        <div>
          {resetPwdValues.errorClass === "emailError" &&
          resetPwdValues.errorMessage &&
          !resetPwdValues.verificationCode ? (
            <p
              style={{
                color: "orangered",
                fontSize: "14px",
              }}
            >
              {resetPwdValues.errorMessage}
            </p>
          ) : (
            ""
          )}
          <Box>
            <button
              className="signin login-button"
              style={{
                marginTop: "1rem",
              }}
              id="signIn"
            >
              Next
            </button>
          </Box>
          <Box>
            <Button
              variant="text"
              onClick={cancelFgtPwd}
              sx={{
                margin: "1rem 0.5rem",
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
                variant="body2"
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
                Sign In
              </Typography>
            </Button>
          </Box>
        </div>
      </form>
    );
  };
  // This is to validate OTP and allow player to set New Password
  const renderOTPConfirmationForm = () => {
    return (
      <form
        className='login-form'
        onSubmit={confirmClick}
        style={{
          textAlign: "center",
          marginTop: "15%",
        }}
      >
        <CardHeader
          style={{
            color: "orangeRed",
            textAlign: "left",
          }}
          // /broken-image.jpg
          avatar={
            <Avatar
              src={pwdLogo}
              sx={{
                height: "4rem",
                width: "4rem",
              }}
            />
          }
        />
        <h3 className='login-h1'>Verify your Account</h3>
        {/* OTP type input field to filling OTP recieved in email */}
        {resetPwdValues.verificationCode ? (
          <p
            style={{
              color: "green",
              fontSize: "14px",
              marginBottom: "1px",
            }}
          >
            {resetPwdValues.message}
          </p>
        ) : (
          ""
        )}
        <Box>
          <OtpInput
            inputStyle={{
              border: "1px solid transparent",
              borderRadius: "12px",
              width: "3rem",
              margin: "0.5rem 0",
            }}
            autoFocus
            value={OTP}
            onChange={otpInputChange}
            OTPLength={4}
            otpType='number'
            separator={<span>&nbsp;</span>}
            secure
          />
        </Box>
        <TextField
          required
          type='password'
          label='New Password'
          variant='filled'
          value={resetPwdValues.password}
          onChange={(event) =>
            setresetPwdValues({
              ...resetPwdValues,
              password: event.target.value,
              errorMessage: "",
            })
          }
          sx={{
            margin: "0.5rem 0",
          }}
        />

        <TextField
          required
          id='cPassword'
          type='password'
          variant='filled'
          label='Confirm Password'
          value={resetPwdValues.confirmPassword}
          onChange={(event) =>
            setresetPwdValues({
              ...resetPwdValues,
              confirmPassword: event.target.value,
              errorMessage: "",
            })
          }
          sx={{
            margin: "0.5rem 0",
          }}
        />
        {resetPwdValues.errorMessage ? (
          <p
            style={{
              color: "orangered",
              fontSize: "14px",
            }}
          >
            {resetPwdValues.errorMessage}
          </p>
        ) : (
          ""
        )}
        <Button
          block
          type='submit'
          sx={{
            borderRadius: "20px",
            color: "white",
            margin: "1rem 0.5rem",
            padding: "10px 55px",
            marginBottom: "2px",
            fontweight: "bold",
            letterspacing: "1px",
            texttransform: "uppercase",
            transition: "transform 80ms ease-in",
          }}
          className={resetPwdValues.error ? resetPwdValues.error : "forgotPwd"}
        >
          Submit
        </Button>
        <button
          onClick={cancelFgtPwd}
          className='signin login-button'
          style={{
            marginTop: "1rem",
          }}
          id='signIn'
        >
          Sign In
        </button>
        {/* <Button
          onClick={cancelFgtPwd}
          style={{
            border: "none",
            background: "white",
            margin: "0 0.5rem",
            padding: "0 35%",
          }}
          className='signin'
        >
          <Typography
            style={{
              fontWeight: "bold",
              background: "white",
              textDecorationLine: "underLine",
              marginBottom: "2px",
            }}
          >
            Sign In
          </Typography>
        </Button> */}
      </form>
    );
  };

  const renderPasswordReset = () => {
    return (
      <form
        className='login-form'
        style={{
          textAlign: "center",
          marginTop: "15%",
        }}
      >
        <CardHeader
          style={{
            color: "orangeRed",
            textAlign: "left",
          }}
          // /broken-image.jpg
        />

        <p
          style={{
            color: "green",
            fontSize: "26px",
            fontweight: "700",
            marginBottom: "1px",
          }}
        >
          {resetPwdValues.message}
        </p>

        <button
          onClick={cancelFgtPwd}
          className='signin login-button'
          style={{
            marginTop: "1rem",
          }}
          id='signIn'
        >
          Sign In
        </button>
      </form>
    );
  };

  return (
    <Box
      sx={{
        height: "80%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      {!resetPwdValues.verificationCode
        ? // renderResetForm is returned in case of OTP is not sent
          renderResetForm()
        : resetPwdValues.errorClass != "success" // eslint-disable-line
        ? // renderOTPConfirmationForm is returned in case of OTP is not Confirmed
          renderOTPConfirmationForm()
        : renderPasswordReset()}
    </Box>
  );
}

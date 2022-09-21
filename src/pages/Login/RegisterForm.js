import React, { useState } from "react";
import { RequestData } from "../../assets/utils/RequestData";
// import "./login/LoginStyles.css";
import Password from "./Password";
import {
  Box,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";

const RegisterForm = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  dob,
  setDOB,
  email,
  setEmail,
  phoneNumber,
  setPhoneNumber,
  errorClass,
  setErrorClass,
  errorMessage,
  setErrorMessage,
}) => {
  // State for OTP code response
  const [verifyCode, setverifyCode] = useState("");
  // this is to send props as object to password component
  const pwdProps = {
    email,
    verifyCode,
    firstName,
    lastName,
    dob,
    phoneNumber,
  };

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    return () => {
      setDisabled(false);
    };
  }, []);

  // checking for DOB validation
  const checkDOB = (date) => {
    let today = new Date();
    let birthDate = new Date(date);
    let dob = today.getFullYear() - birthDate.getFullYear();
    if (dob < 5) {
      return false;
    } else {
      return true;
    }
  };

  // GET api call for sending OTP
  const getRegistrationOTP = async () => {
    // Calling HTTP method by passing Api Type and Api URL
    await RequestData(
      "GET",
      `registerOtp?caller=${process.env.REACT_APP_CALLER}&apiKey=${process.env.REACT_APP_API_KEY}&emailId=${email}`
    )
      // Getting the Response object which holds the data of registration
      .then((response) => {
        //Checking weather response data is null
        if (response.result) {
          //checking email is valid
          if (response.result.status === "failure") {
            setErrorClass("errorButton"); // setting error state if user is invalid
            setErrorMessage(
              response.result.registerStatus
                ? response.result.registerStatus
                : "Invalid User"
            );
          } else {
            // setting verificationcode to state
            setverifyCode(response.result.verificationCode);
          }
        } else {
          // setting error in case response failed
          setErrorClass("errorButton");
          setErrorMessage("Something went wrong! Please try again later.");
        }
      })
      .catch((error) => {
        setErrorMessage(
          error.result && error.result.message
            ? error.result.message
            : "Please try again later!"
        );
        //catch block error
      });
    setDisabled(false);
  };

  // on submit click validationg email address and age and calling api
  const validateUser = (event) => {
    event.preventDefault();

    setDisabled(true);
    const pattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@([a-z]+)+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!pattern.test(email)) {
      // checking valid email address - if fails setting error state
      setErrorClass("emailError");
      setErrorMessage("Invalid Email Address");
      setDisabled(false);
    } else {
      if (checkDOB(dob) === true) {
        // checking age - should be more than 15yrs
        // checking error state if null then api is called
        getRegistrationOTP(); //calling api
      } else {
        setErrorClass("dobError"); // setting error state in case age is below 16yrs
        setErrorMessage("Age should be greater than 5 years");
        setDisabled(false);
      }
    }
  };

  // This is to handle back click from pwd component
  const handleBackButton = () => {
    setverifyCode("");
  };
  return (
    <Grid
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justifyContent='center'
      sx={{ zIndex: 50 }}
    >
      <CardContent
        sx={{
          // maxWidth: { sm: "40vw", md: "25vw", lg: "40vw" },
          width: "100%",
        }}
      >
        {/* checking OTP code is null */}
        {!verifyCode ? (
          <form onSubmit={validateUser} autoComplete='off'>
            <Grid
              container
              spacing={{ xs: 0, md: 0 }}
              sx={{ justifyContent: "center", alignItems: "center" }}
            >
              {/* On form submit calling submit method */}
              <Grid item xs={12} sm={12} md={12}>
                <CardHeader
                  sx={{
                    textAlign: "center",
                    padding: "0 0",
                  }}
                  title={
                    <Typography
                      variant='h2'
                      sx={{
                        fontSize: "1.5rem",
                        margin: "0.5rem",
                        textTransform: "uppercase",
                        fontWeight: 600,
                      }}
                    >
                      Create Account
                    </Typography>
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <TextField
                  required
                  type='email'
                  variant='outlined'
                  value={email}
                  className={
                    errorClass === "emailError" ? "error" : "textWidth"
                  }
                  // checking error for email if error then assigning to error animated
                  //class defined in css
                  label='Email Address'
                  sx={{
                    margin: "0.5rem 0",
                    width: "100%",
                  }}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <TextField
                  required
                  type='text'
                  variant='outlined'
                  value={firstName}
                  label='First Name'
                  className='textWidth'
                  sx={{
                    margin: "0.5rem 0",
                  }}
                  onChange={(event) => {
                    setFirstName(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <TextField
                  type='text'
                  value={lastName}
                  variant='outlined'
                  label='Last Name'
                  onChange={(event) => {
                    setLastName(event.target.value);
                  }}
                  sx={{ margin: "0.5rem 0" }}
                  className='textWidth'
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <TextField
                  required
                  id='dob'
                  label='Date of Birth'
                  type='date'
                  value={dob}
                  sx={{ width: "100%", margin: "0.5rem 0" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(event) => setDOB(event.target.value)}
                  className={errorClass === "dobError" ? "error" : "textWidth"}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <TextField
                  required
                  id='phone'
                  maxLength='10'
                  pattern='^\d{10}$'
                  InputProps={{
                    inputProps: { maxLength: "10" },
                  }}
                  type='tel'
                  value={phoneNumber}
                  variant='outlined'
                  label='Mobile Number'
                  sx={{ margin: "0.5rem 0" }}
                  className='textWidth'
                  onChange={(event) => {
                    setPhoneNumber(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                {errorMessage ? (
                  <p
                    style={{
                      color: "orangered",
                      fontSize: "16px",
                    }}
                  >
                    {errorMessage}
                  </p>
                ) : (
                  ""
                )}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "-1rem",
                  }}
                >
                  <Box sx={{ flex: "1" }} />
                  <button
                    disabled={disabled}
                    style={{
                      borderRadius: "20px",
                      margin: "1.5rem 0",
                      fontWeight: "bolder",
                      padding: "10px 45px",
                      letterspacing: "1px",
                      texttransform: "uppercase",
                      transition: "transform 80ms ease-in",
                    }}
                    className='signup login-button'
                    type='submit'
                  >
                    Next
                  </button>
                </Box>
              </Grid>
            </Grid>
          </form>
        ) : (
          // if response for api for OTP is success then Payment component is rendered
          //here otp userid name and dob is sent as props
          <Password onChange={handleBackButton} regValues={pwdProps} />
        )}
      </CardContent>
    </Grid>
  );
};

export default RegisterForm;

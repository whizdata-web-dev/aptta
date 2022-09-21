import * as React from "react";
import Box from "@mui/material/Box";
import { useRef } from "react";
import RegisterForm from "./RegisterForm";

export default function Register() {
  const childFunc = useRef();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [dob, setDOB] = React.useState("");
  const [errorClass, setErrorClass] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [verifyCode, setverifyCode] = React.useState("");

  return (
    <Box sx={{ margin: "1rem 0" }}>
      <RegisterForm
        childFunc={childFunc}
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        email={email}
        setEmail={setEmail}
        dob={dob}
        setDOB={setDOB}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        verifyCode={verifyCode}
        setverifyCode={setverifyCode}
        errorClass={errorClass}
        setErrorClass={setErrorClass}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </Box>
  );
}

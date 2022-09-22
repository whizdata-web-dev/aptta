import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { Dialog as MuiDialog, DialogContent } from "@mui/material";

export default function AlertDialog() {
  const [alertProps, setAlertProps] = useState({
    variant: null,
    message: null,
    open: false,
  });

  const errorMessage = localStorage.getItem("erMsg");
  const successMessage = localStorage.getItem("sMsg");
  const location = useLocation();

  useEffect(() => {
    if (errorMessage) {
      setAlertProps({
        variant: "rgb(211, 47, 47)",
        message: errorMessage,
        open: true,
      });
      setTimeout(() => {
        localStorage.removeItem("erMsg");
        setAlertProps({
          variant: null,
          message: null,
          open: false,
        });
      }, 3000);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (successMessage) {
      setAlertProps({
        variant: "rgb(56, 142, 60)",
        message: successMessage,
        open: true,
      });
      setTimeout(() => {
        localStorage.removeItem("sMsg");
        setAlertProps({
          variant: null,
          message: null,
          open: false,
        });
      }, 3000);
    }
  }, [successMessage]);

  useEffect(() => {
    setTimeout(() => {
      if (location.pathname.split("/")[1] === "entries") {
      } else if (location.pathname.split("/")[1] !== "login") {
        setAlertProps({ ...alertProps, open: false });
      } else {
      }
    }, 500);
  }, [location.pathname]);

  return (
    <MuiDialog
      fullWidth={true}
      maxWidth={"xs"}
      open={alertProps.open}
      onClose={() => setAlertProps({ ...alertProps, open: false })}
      sx={{
        justifyContent: "center",
        "& *": {
          color: "#fff",
        },
      }}
    >
      <DialogContent
        sx={{
          background: alertProps.variant,
          borderRadius: "4px",
          textAlign: "center",
        }}
      >
        {alertProps.message}
      </DialogContent>
    </MuiDialog>
  );
}

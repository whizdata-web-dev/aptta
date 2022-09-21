import { Avatar, Box } from "@mui/material";
import React from "react";
import winIcon from "../img/loading.gif";

const LoadingComponent = () => {
  return (
    <Box
      sx={{
        background: "transparent",
        marginBottom: "10rem",
      }}
    >
      <Avatar
        src={winIcon}
        variant='rounded'
        sx={{
          position: "relative",
          left: "50%",
          top: "50%",
          transform: "translate(-50%)",
          height: "16rem",
          width: "20rem",
        }}
      />
    </Box>
  );
};

export default LoadingComponent;

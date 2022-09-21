import * as React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant='determinate'
        {...props}
        sx={{ color: "#e53935" }}
      />
      <Box
        sx={{
          top: 10,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "top",
          justifyContent: "center",
        }}
      >
        <Typography variant='caption' component='div' sx={{ color: "#777" }}>
          {props.points}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function Points({ points, total }) {
  const progress = (points * 100) / total;

  return <CircularProgressWithLabel value={progress} points={points} />;
}

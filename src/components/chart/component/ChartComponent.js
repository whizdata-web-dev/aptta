import React from "react";
import { Box } from "@mui/material";

export default function ChartComponent({ id, classes, heading, headingClasses, subHeading }) {
  return (
    <>
      <Box className={classes[0]}>
        <Box className={classes[1]}>
          <Box className={classes[2]}>
            <Box className={classes[3]}>
              <h6 className={`tailwind_h6 ${headingClasses[0]}`}>{heading}</h6>
              <h2
                className={`tailwind_h2 uppercase ${headingClasses[1]}`}
                style={{ color: "rgba(148, 163, 184, 1)" }}
              >
                {subHeading}
              </h2>
            </Box>
          </Box>
        </Box>
        <Box className={classes[4]}>
          <Box className={classes[5]}>
            <canvas id={id}></canvas>
          </Box>
        </Box>
      </Box>
    </>
  );
}

import { Box, Card } from "@mui/material";
import React from "react";
import CarouselItem from "./CarouselItem";

const CarouselComponent = () => {
  return (
    <Card
      sx={{
        borderRadius: "0px",
        paddingInline: "1rem 1rem",
        paddingBlock: { xs: "1rem 1rem", md: "1rem 2rem" },
        height: "300px",
        overflowX: "auto",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "inline-flex",
          "& :not(:first-of-type)": {
            marginLeft: "1rem",
          },
          "& :last-child": {
            marginRight: "0.5rem",
          },
        }}
      >
        {[...new Array(5)].map((_, index) => {
          return (
            <Box key={index} sx={{ width: "100%" }}>
              <CarouselItem />
            </Box>
          );
        })}
      </Box>
    </Card>
  );
};

export default CarouselComponent;

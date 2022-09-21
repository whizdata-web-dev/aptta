import { Alert, Box, Collapse, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import CarouselContainer from "../../components/carousel/container/CarouselContainer";
import ChartContainer from "../../components/chart/container/ChartContainer";
import { ChartContainerModel } from "../../components/chart/model/ChartContainerModel";
// import SocialContainer from "../../components/social/container/SocialContainer";
import TournamentUpdatesContainer from "./components/TournamentUpdates/container/TournamentUpdatesContainer";
import UpcomingTournamentsContainer from "./components/UpcomingTournaments/container/UpcomingTournamentsContainer";
import backgroundImage from "../../assets/img/home_bg.jpg";

import CloseIcon from "@mui/icons-material/Close";

import { useLocation } from "react-router-dom";

const Home = () => {
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const errorMessage = localStorage.getItem("erMsg");
  const successMessage = localStorage.getItem("sMsg");
  const location = useLocation();

  useEffect(() => {
    if (errorMessage) {
      setOpenError(true);
      setTimeout(() => {
        setOpenError(false);
        localStorage.removeItem("erMsg");
      }, 3000);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (successMessage) {
      setOpenSuccess(true);
      setTimeout(() => {
        setOpenSuccess(false);
        localStorage.removeItem("sMsg");
      }, 3000);
    }
  }, [successMessage]);

  useEffect(() => {
    setTimeout(() => {
      if (location.pathname.split("/")[1] === "entries") {
      } else if (location.pathname.split("/")[1] !== "login") {
        setOpenError(false);
        setOpenSuccess(false);
      } else {
      }
    }, 500);
  }, [location.pathname]);

  return (
    <>
      {/* add snackbar to display error message if not logged in before giving entry */}
      <Box
        sx={{
          paddingBlock: "2rem 0rem",
          display: errorMessage ? "flex" : "none",
          justifyContent: "center",
        }}
      >
        <Collapse in={openError}>
          <Alert
            severity='warning'
            sx={{
              width: "fit-content",
              marginInline: "auto",
              display: errorMessage ? "flex" : "none",
            }}
            action={
              <IconButton
                aria-label='close'
                color='inherit'
                size='small'
                onClick={() => {
                  setOpenError(false);
                }}
              >
                <CloseIcon fontSize='inherit' />
              </IconButton>
            }
          >
            {errorMessage}
          </Alert>
        </Collapse>
      </Box>
      <Box
        sx={{
          paddingBlock: "2rem 0rem",
          display: successMessage ? "flex" : "none",
          justifyContent: "center",
        }}
      >
        <Collapse in={openSuccess}>
          <Alert
            severity='success'
            sx={{
              width: "fit-content",
              marginInline: "auto",
              display: successMessage ? "flex" : "none",
            }}
            action={
              <IconButton
                aria-label='close'
                color='inherit'
                size='small'
                onClick={() => {
                  setOpenSuccess(false);
                }}
              >
                <CloseIcon fontSize='inherit' />
              </IconButton>
            }
          >
            {successMessage}
          </Alert>
        </Collapse>
      </Box>
      <Box
        className='relative md:pt-32'
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          top: "-6rem",
          boxShadow: "0 0 10px rgb(0 0 0 / 80%) inset",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center top",
        }}
      >
        <Box
          className='px-4 md:px-10 pb-32 mx-auto w-full'
          sx={{ paddingTop: { xs: "12rem", md: "18rem" } }}
        >
          <TournamentUpdatesContainer />
        </Box>
      </Box>

      <Box
        className='px-4 md:px-10 pt-16 mx-auto w-full'
        sx={{ marginTop: "-10rem" }}
      >
        <Box>
          <Box className='flex flex-wrap -mt-24'>
            <div className='w-full xl:w-4/12 mb-4 xl:mb-0 px-4'>
              <UpcomingTournamentsContainer />
            </div>
            {ChartContainerModel.map((chart, index) => (
              <Box className={chart.container} key={index}>
                <ChartContainer {...chart} />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      {/* <Box className='px-4 md:px-10 mx-auto w-full'>
        <Box className='flex flex-wrap mt-2 mb-4'>
          <Box className='w-full xl:w-12 mb-0 xl:mb-0 px-4'>
            <CarouselContainer />
          </Box>
        </Box>
      </Box> */}
    </>
  );
};

export default Home;

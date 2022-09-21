import React, { useState } from "react";
import { Box, Card, Grid, Tooltip, Typography } from "@mui/material";
import RankingDialog from "./RankingDialog";
import backgroundImage from "../../../assets/img/home_bg.jpg";

const PlayersComponents = () => {
  const [open, setOpen] = useState(false);
  const [eventName, setEventName] = useState("");

  const event = [
    "Cadet Singles",
    "Sub-junior Singles",
    "Junior Singles",
    "Youth Singles",
    "Women/Men Singles",
  ];

  const events = {
    "Cadet Singles boy": "Cadet Boy's Singles",
    "Cadet Singles girl": "Cadet Girl's Singles",
    "Sub-junior Singles boy": "Sub-junior Boy's Singles",
    "Sub-junior Singles girl": "Sub-junior Girl's Singles",
    "U21 Singles Men's": "U21 Men's Singles",
    "Junior Singles boy": "Junior Boy's Singles",
    "Junior Singles girl": "Junior Girl's Singles",
    "Youth Singles boy": "Youth Boy's Singles",
    "Youth Singles girl": "Youth Girl's Singles",
    "Women/Men Singles boy": "Men's Singles",
    "Women/Men Singles girl": "Women's Singles",
    "Junior Boy's Singles": "Junior Boy's Singles",
    "Senior Boy's Singles": "Senior Boy's Singles",
    "Sub Junior Girls": "Sub Junior Girls",
    "Even Junior Boy's Team": "Even Junior Boy's Team",
    "Junior Doubles": "Junior Doubles",
    "Open Doubles": "Open Doubles",
  };

  const handleOpen = (name, cat) => {
    setOpen(true);
    setEventName(events[`${name} ${cat}`]);
  };

  const handleClose = () => {
    setOpen(false);
    setEventName("");
  };

  return (
    <>
      <main className='profile-page'>
        <section className='relative block h-600-px'>
          <Box
            className='absolute top-0 w-full h-full bg-center bg-cover'
            sx={{
              backgroundImage: `url(${backgroundImage})`,
              top: "-6rem",
              boxShadow: "0 0 10px rgb(0 0 0 / 80%) inset",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center top",
            }}
          >
            <span
              id='blackOverlay'
              className='w-full h-full absolute opacity-50 bg-black'
            ></span>
          </Box>
        </section>
        <section className='relative py-16 bg-blueGray-200'>
          <Box className='container mx-auto px-4'>
            <Box
              className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-xl -mt-80'
              sx={{ backgroundColor: "#F1F1F1" }}
            >
              <Box className='px-6 mt-8 mb-8'>
                <Box>
                  <Grid container sx={{ justifyContent: "center" }}>
                    {eventName && (
                      <RankingDialog
                        eventName={eventName}
                        open={open}
                        setOpen={setOpen}
                        handleClose={handleClose}
                      />
                    )}
                    {[2021].map((value) => (
                      <Grid item xs={12} sm={6} md={6} xl={4} key={value}>
                        <Card
                          sx={{
                            borderRadius: 0,
                            background: "rgba(255, 255, 255, 0.6)",
                            backdropFilter: "blur(5px)",
                            WebkitBackdropFilter: "blur(5px)",
                            padding: "2rem",
                            margin: { xs: "0.5rem", md: "1rem" },
                          }}
                        >
                          <Typography
                            variant='h5'
                            sx={{
                              color: "#333",
                              textAlign: "center",
                              animation: "1s moveInLeft",
                              marginBottom: "1rem",
                            }}
                          >
                            Players Ranking - {value}
                          </Typography>
                          <Grid
                            container
                            sx={{ display: "flex", animation: "1s moveInTop" }}
                          >
                            {event.map((event, index) => (
                              <React.Fragment key={index}>
                                <Grid
                                  item
                                  xs={1}
                                  sx={{
                                    margin: "0.5vh 0",
                                  }}
                                >
                                  <Tooltip
                                    title={
                                      event === "Women/Men Singles"
                                        ? "Women's"
                                        : `Girls`
                                    }
                                    placement='left'
                                  >
                                    <Box
                                      className='material-icons'
                                      sx={{
                                        textAlign: "center",
                                        color: "#C62368",
                                        cursor: "pointer",
                                        transition: "0.2s ease",
                                        "&:hover": {
                                          transform: "scale(1.3)",
                                        },
                                      }}
                                      onClick={(e) =>
                                        handleOpen(event, e.target.innerText)
                                      }
                                    >
                                      girl
                                    </Box>
                                  </Tooltip>
                                </Grid>
                                <Grid item xs={10} sx={{ margin: "0.5vh 0" }}>
                                  <Typography
                                    variant='body1'
                                    sx={{
                                      textAlign: "center",
                                      borderBottom: "1px solid #999",
                                      width: "80%",
                                      margin: "0.1rem auto",
                                    }}
                                  >
                                    {event}
                                  </Typography>
                                </Grid>
                                <Grid item xs={1} sx={{ margin: "0.5vh 0" }}>
                                  <Tooltip
                                    title={
                                      event === "Women/Men Singles"
                                        ? "Men's"
                                        : `Boys`
                                    }
                                    placement='right'
                                  >
                                    <Box
                                      className='material-icons'
                                      sx={{
                                        textAlign: "center",
                                        color: "#001220",
                                        cursor: "pointer",
                                        transition: "0.2s ease",
                                        "&:hover": {
                                          transform: "scale(1.3)",
                                        },
                                      }}
                                      onClick={(e) =>
                                        handleOpen(event, e.target.innerText)
                                      }
                                    >
                                      boy
                                    </Box>
                                  </Tooltip>
                                </Grid>
                              </React.Fragment>
                            ))}
                          </Grid>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Box>
            </Box>
          </Box>
        </section>
      </main>
    </>
  );
};

export default PlayersComponents;

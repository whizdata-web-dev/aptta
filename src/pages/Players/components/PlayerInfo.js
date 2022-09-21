import { Box } from "@mui/material";
import React, { useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ProfileImage from "../../../assets/img/team-1-800x800.jpg";
import { RequestData } from "../../../assets/utils/RequestData";
import { useParams } from "react-router";

const PlayerInfo = () => {
  const [tournament, setTournament] = React.useState("");
  const [tournamentEvent, setTournamentEvent] = React.useState("");

  const [playerData, setPlayerData] = React.useState({
    tournamentList: [],
    eventList: [],
  });

  const params = useParams();

  const handleTournamentChange = (event) => {
    setTournament(event.target.value);
  };

  const handleTournamentEventChange = (event) => {
    setTournamentEvent(event.target.value);
  };

  // const { data } = FetchData({
  //   method: "POST",
  //   url: "getListOfTournamentsForStateAndPlayer",
  //   payload: {
  //     caller: "KTTA1",
  //     apiKey: process.env.REACT_APP_API_KEY,
  //     data: {
  //       eveType: "1",
  //       stateId: "8va5A8N3EKAeKtmeB",
  //       teamId: params.id,
  //       playerId: params.id,
  //     },
  //   },
  // });

  useEffect(() => {
    async function getData() {
      await RequestData("POST", "getListOfTournamentsForStateAndPlayer", {
        caller: "KTTA1",
        apiKey: process.env.REACT_APP_API_KEY,
        data: {
          eveType: "1",
          stateId: "8va5A8N3EKAeKtmeB",
          teamId: params.id,
          playerId: params.id,
        },
      }).then((response) => {
        setPlayerData({ ...playerData, tournamentList: response.result.data });
      });
    }
    getData();
  }, []); // eslint-disable-line

  return (
    <main className='profile-page'>
      <section className='relative block h-500-px'>
        <Box
          className='absolute top-0 w-full h-full bg-center bg-cover'
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
          }}
        >
          <span
            id='blackOverlay'
            className='w-full h-full absolute opacity-50 bg-black'
          ></span>
        </Box>
        <Box
          className='top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px'
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className='absolute bottom-0 overflow-hidden'
            xmlns='http://www.w3.org/2000/svg'
            preserveAspectRatio='none'
            version='1.1'
            viewBox='0 0 2560 100'
            x='0'
            y='0'
          >
            <polygon
              className='text-blueGray-200 fill-current'
              points='2560 0 2560 100 0 100'
            ></polygon>
          </svg>
        </Box>
      </section>
      <section className='relative py-16 bg-blueGray-200'>
        <Box className='container mx-auto px-4'>
          <Box className='relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl -mt-64'>
            <Box className='px-6'>
              <Box className='flex flex-wrap justify-center'>
                <Box className='w-full lg:w-3/12 px-4 lg:order-2 flex justify-center'>
                  <Box
                    className='relative'
                    sx={{
                      marginTop: "-4rem",
                      marginLeft: {
                        xs: "-9rem",
                        md: "-7rem",
                        lg: "-7rem",
                        xl: "-8rem",
                      },
                    }}
                  >
                    <img
                      alt='...'
                      src={ProfileImage}
                      className='tailwind_img shadow-xl rounded-full h-auto align-middle border-none absolute max-w-150-px'
                    />
                  </Box>
                </Box>
                <Box className='w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center'>
                  <Box className='px-3 mt-0 sm:mt-0'>&nbsp;</Box>
                </Box>
                <Box className='w-full lg:w-4/12 px-4 lg:order-1'>
                  <Box className='flex justify-center lg:pt-4 pt-8'>&nbsp;</Box>
                </Box>
              </Box>
              <Box
                className='text-center'
                sx={{
                  marginLeft: { md: "2rem" },
                  marginTop: { xs: "2rem", md: "4rem", lg: "6rem" },
                }}
              >
                <h3 className='tailwind_h3 text-4xl font-semibold leading-normal mb-2 text-blueGray-700'>
                  Player Name
                </h3>
                <Box className='text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase'>
                  <i className='fas fa-map-marker-alt mr-2 text-lg text-blueGray-400'></i>{" "}
                  Academy
                </Box>
              </Box>
              <Box className='mt-10 py-10 border-t border-blueGray-200 text-center'>
                <Box className='flex flex-wrap justify-center'>
                  <Box className='w-full px-4'>
                    <Box className='lg-py-6 px-3 lg-mt-32 mt-8'>
                      <Box>
                        <FormControl fullWidth>
                          <InputLabel id='tournament-select-label'>
                            Tournament
                          </InputLabel>
                          <Select
                            labelId='tournament-select-label'
                            id='tournament-select'
                            value={tournament}
                            label='Tournament'
                            onChange={handleTournamentChange}
                          >
                            {playerData.tournamentList.length > 0 &&
                              playerData.tournamentList.map(
                                (tournamentName, index) => (
                                  <MenuItem
                                    value={tournamentName.eventName}
                                    key={index}
                                  >
                                    {tournamentName.eventName}
                                  </MenuItem>
                                )
                              )}
                          </Select>
                        </FormControl>
                      </Box>
                    </Box>
                  </Box>
                  <Box className='w-full px-4'>
                    <Box className='lg-py-6 px-3 lg-mt-32 mt-8'>
                      <Box>
                        <FormControl fullWidth>
                          <InputLabel id='event-select-label'>Event</InputLabel>
                          <Select
                            labelId='event-select-label'
                            id='event-select'
                            value={tournamentEvent}
                            label='Event'
                            onChange={handleTournamentEventChange}
                            disabled={!Boolean(tournament)}
                          >
                            {["Event 1", "Event 2", "Event 3"].map(
                              (eventName, index) => (
                                <MenuItem value={eventName} key={index}>
                                  {eventName}
                                </MenuItem>
                              )
                            )}
                          </Select>
                        </FormControl>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </section>
    </main>
  );
};

export default PlayerInfo;

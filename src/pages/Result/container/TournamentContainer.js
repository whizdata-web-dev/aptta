import { Box } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import React from "react";
import Draw from "../components/Draw";
import ttTable from "../../../assets/img/tt_table.jpg";

const TournamentContainer = ({
  eventList,
  result,
  tournamentId,
  eventName,
  handleEventNameChange,
}) => {
  return (
    <main className='profile-page'>
      <section className='relative block h-350-px'>
        <Box
          className='absolute top-0 w-full h-full bg-center bg-cover'
          sx={{
            background: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1012%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='rgba(33%2c 25%2c 64%2c 1)'%3e%3c/rect%3e%3cpath d='M375 452L125 702' stroke-width='8' stroke='url(%23SvgjsLinearGradient1013)' stroke-linecap='round' class='BottomLeft'%3e%3c/path%3e%3cpath d='M1375 395L1698 72' stroke-width='8' stroke='url(%23SvgjsLinearGradient1014)' stroke-linecap='round' class='TopRight'%3e%3c/path%3e%3cpath d='M1275 538L1124 689' stroke-width='6' stroke='url(%23SvgjsLinearGradient1014)' stroke-linecap='round' class='TopRight'%3e%3c/path%3e%3cpath d='M314 455L546 223' stroke-width='6' stroke='url(%23SvgjsLinearGradient1013)' stroke-linecap='round' class='BottomLeft'%3e%3c/path%3e%3cpath d='M1058 371L1433 -4' stroke-width='10' stroke='url(%23SvgjsLinearGradient1014)' stroke-linecap='round' class='TopRight'%3e%3c/path%3e%3cpath d='M1077 530L832 775' stroke-width='8' stroke='url(%23SvgjsLinearGradient1013)' stroke-linecap='round' class='BottomLeft'%3e%3c/path%3e%3cpath d='M1346 415L1722 39' stroke-width='8' stroke='url(%23SvgjsLinearGradient1013)' stroke-linecap='round' class='BottomLeft'%3e%3c/path%3e%3cpath d='M1299 549L1624 224' stroke-width='10' stroke='url(%23SvgjsLinearGradient1013)' stroke-linecap='round' class='BottomLeft'%3e%3c/path%3e%3cpath d='M698 236L429 505' stroke-width='6' stroke='url(%23SvgjsLinearGradient1014)' stroke-linecap='round' class='TopRight'%3e%3c/path%3e%3cpath d='M1433 236L1792 -123' stroke-width='6' stroke='url(%23SvgjsLinearGradient1013)' stroke-linecap='round' class='BottomLeft'%3e%3c/path%3e%3cpath d='M442 296L661 77' stroke-width='6' stroke='url(%23SvgjsLinearGradient1013)' stroke-linecap='round' class='BottomLeft'%3e%3c/path%3e%3cpath d='M425 526L152 799' stroke-width='10' stroke='url(%23SvgjsLinearGradient1014)' stroke-linecap='round' class='TopRight'%3e%3c/path%3e%3cpath d='M987 519L600 906' stroke-width='8' stroke='url(%23SvgjsLinearGradient1013)' stroke-linecap='round' class='BottomLeft'%3e%3c/path%3e%3cpath d='M122 220L-243 585' stroke-width='6' stroke='url(%23SvgjsLinearGradient1013)' stroke-linecap='round' class='BottomLeft'%3e%3c/path%3e%3cpath d='M203 265L406 62' stroke-width='6' stroke='url(%23SvgjsLinearGradient1013)' stroke-linecap='round' class='BottomLeft'%3e%3c/path%3e%3cpath d='M408 287L748 -53' stroke-width='8' stroke='url(%23SvgjsLinearGradient1014)' stroke-linecap='round' class='TopRight'%3e%3c/path%3e%3cpath d='M527 558L692 393' stroke-width='6' stroke='url(%23SvgjsLinearGradient1014)' stroke-linecap='round' class='TopRight'%3e%3c/path%3e%3cpath d='M1265 153L1612 -194' stroke-width='8' stroke='url(%23SvgjsLinearGradient1013)' stroke-linecap='round' class='BottomLeft'%3e%3c/path%3e%3cpath d='M1090 18L834 274' stroke-width='6' stroke='url(%23SvgjsLinearGradient1014)' stroke-linecap='round' class='TopRight'%3e%3c/path%3e%3cpath d='M558 373L792 139' stroke-width='6' stroke='url(%23SvgjsLinearGradient1013)' stroke-linecap='round' class='BottomLeft'%3e%3c/path%3e%3cpath d='M1253 442L1506 189' stroke-width='8' stroke='url(%23SvgjsLinearGradient1013)' stroke-linecap='round' class='BottomLeft'%3e%3c/path%3e%3cpath d='M1023 223L1421 -175' stroke-width='8' stroke='url(%23SvgjsLinearGradient1013)' stroke-linecap='round' class='BottomLeft'%3e%3c/path%3e%3cpath d='M438 459L267 630' stroke-width='10' stroke='url(%23SvgjsLinearGradient1013)' stroke-linecap='round' class='BottomLeft'%3e%3c/path%3e%3cpath d='M646 334L1037 -57' stroke-width='6' stroke='url(%23SvgjsLinearGradient1014)' stroke-linecap='round' class='TopRight'%3e%3c/path%3e%3cpath d='M1258 502L856 904' stroke-width='10' stroke='url(%23SvgjsLinearGradient1013)' stroke-linecap='round' class='BottomLeft'%3e%3c/path%3e%3cpath d='M27 532L-172 731' stroke-width='8' stroke='url(%23SvgjsLinearGradient1014)' stroke-linecap='round' class='TopRight'%3e%3c/path%3e%3cpath d='M730 497L376 851' stroke-width='10' stroke='url(%23SvgjsLinearGradient1014)' stroke-linecap='round' class='TopRight'%3e%3c/path%3e%3cpath d='M992 32L584 440' stroke-width='6' stroke='url(%23SvgjsLinearGradient1013)' stroke-linecap='round' class='BottomLeft'%3e%3c/path%3e%3cpath d='M121 143L-59 323' stroke-width='6' stroke='url(%23SvgjsLinearGradient1013)' stroke-linecap='round' class='BottomLeft'%3e%3c/path%3e%3cpath d='M94 388L-145 627' stroke-width='6' stroke='url(%23SvgjsLinearGradient1013)' stroke-linecap='round' class='BottomLeft'%3e%3c/path%3e%3cpath d='M723 470L1021 172' stroke-width='6' stroke='url(%23SvgjsLinearGradient1014)' stroke-linecap='round' class='TopRight'%3e%3c/path%3e%3cpath d='M715 473L459 729' stroke-width='10' stroke='url(%23SvgjsLinearGradient1013)' stroke-linecap='round' class='BottomLeft'%3e%3c/path%3e%3cpath d='M737 396L350 783' stroke-width='10' stroke='url(%23SvgjsLinearGradient1013)' stroke-linecap='round' class='BottomLeft'%3e%3c/path%3e%3cpath d='M1226 40L838 428' stroke-width='6' stroke='url(%23SvgjsLinearGradient1014)' stroke-linecap='round' class='TopRight'%3e%3c/path%3e%3cpath d='M812 464L440 836' stroke-width='10' stroke='url(%23SvgjsLinearGradient1013)' stroke-linecap='round' class='BottomLeft'%3e%3c/path%3e%3cpath d='M532 481L716 297' stroke-width='10' stroke='url(%23SvgjsLinearGradient1014)' stroke-linecap='round' class='TopRight'%3e%3c/path%3e%3cpath d='M352 398L723 27' stroke-width='8' stroke='url(%23SvgjsLinearGradient1013)' stroke-linecap='round' class='BottomLeft'%3e%3c/path%3e%3cpath d='M1286 538L1578 246' stroke-width='8' stroke='url(%23SvgjsLinearGradient1014)' stroke-linecap='round' class='TopRight'%3e%3c/path%3e%3cpath d='M485 289L808 -34' stroke-width='6' stroke='url(%23SvgjsLinearGradient1014)' stroke-linecap='round' class='TopRight'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1012'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3clinearGradient x1='100%25' y1='0%25' x2='0%25' y2='100%25' id='SvgjsLinearGradient1013'%3e%3cstop stop-color='rgba(127%2c 119%2c 224%2c 0)' offset='0'%3e%3c/stop%3e%3cstop stop-color='rgba(127%2c 119%2c 224%2c 1)' offset='1'%3e%3c/stop%3e%3c/linearGradient%3e%3clinearGradient x1='0%25' y1='100%25' x2='100%25' y2='0%25' id='SvgjsLinearGradient1014'%3e%3cstop stop-color='rgba(127%2c 119%2c 224%2c 0)' offset='0'%3e%3c/stop%3e%3cstop stop-color='rgba(127%2c 119%2c 224%2c 1)' offset='1'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e");`,
          }}
        >
          <span
            id='blackOverlay'
            className='w-full h-full absolute opacity-50 bg-black'
          ></span>
        </Box>
        <Box
          className='top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden'
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
          <Box className='relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl -mt-80'>
            <Box className='px-6'>
              <Box className='flex flex-wrap justify-center'>
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
                  marginTop: { xs: "-2rem", lg: "4rem" },
                }}
              >
                <h3 className='tailwind_h3 text-4xl font-semibold leading-normal mb-2 text-blueGray-700'>
                  {result && result.eventName}
                </h3>
              </Box>
              <Box className='mt-10 py-10 border-t border-blueGray-200 text-center'>
                <Box className='flex flex-wrap justify-center'>
                  <Box className='w-full px-4'>
                    <Box className='lg-py-6 px-3 lg-mt-32 mt-4'>
                      <FormControl sx={{ width: { xs: "100%", md: "25rem" } }}>
                        <InputLabel id='tournament-select-label'>
                          Choose Event
                        </InputLabel>
                        <Select
                          labelId='tournament-select-label'
                          id='tournament-select'
                          value={eventName}
                          label='Choose Event'
                          onChange={handleEventNameChange}
                        >
                          {eventList &&
                            eventList.map((name, index) => (
                              <MenuItem value={name} key={index}>
                                {name}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            background: "#fff",
            boxShadow: 2,
            margin: "0 1rem -2rem 1rem",
          }}
        >
          {eventName ? (
            <Box>
              <Draw eventName={eventName} tournamentId={tournamentId} />
            </Box>
          ) : (
            <Box sx={{ padding: "5rem 1rem", textAlign: "center" }}>
              <Box>
                <img
                  src={ttTable}
                  alt='...'
                  width='100%'
                  style={{ maxWidth: "500px" }}
                />
              </Box>
              <Box>
                <h4
                  className='tailwind_h4 text-3xl text-center font-semibold leading-normal mt-0 mb-2'
                  style={{ color: "#FFA500" }}
                >
                  Please choose an event
                </h4>
              </Box>
            </Box>
          )}
        </Box>
      </section>
    </main>
  );
};

export default TournamentContainer;

import { Box, CardMedia, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Mission from "../../assets/img/goal.png";
import Vision from "../../assets/img/mission.jpg";
import OfficeBearerCard from "../../components/card/component/OfficeBearerCard";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "../../assets/config/fbConfig";
import backgroundImage from "../../assets/img/home_bg.jpg";
import bhaskarRam from "../../assets/img/SHRI V.BHASKAR RAM.jpg";
import suryarao from "../../assets/img/SHRI P.V.N. SURYA RAO.jpeg";
import sathynarayan from "../../assets/img/SHRI K.SATYANARAYANA.jpeg";
import female from "../../assets/img/female.png";
import JAYRAJ from "../../assets/img/SHRI LMS JAYRAJ.jpeg";
import asifkhan from "../../assets/img/SHRI ASIF KHAN.jpeg";

const About = () => {
  // const [loading, setLoading] = useState(false);
  // const [officeBearerList, setOfficeBearerList] = useState([]);

  // useEffect(() => {
  //   setLoading(true);
  //   async function getData() {
  //     const dbQuery = query(
  //       collection(db, "officebearers"),
  //       orderBy("order", "asc")
  //     );
  //     const querySnapshot = await getDocs(dbQuery);
  //     let list = [];
  //     querySnapshot.forEach((doc) => {
  //       let document = doc.data();
  //       document["id"] = doc.id;

  //       list.push(document);
  //     });
  //     setLoading(false);
  //     setOfficeBearerList(list);
  //   }
  //   getData();
  // }, []);

  const officeBearerList = [
    {
      image: bhaskarRam,
      designation: "PRESIDENT",
      name: "SHRI V.BHASKAR RAM, FCA",
      phone: "9849130006",
      email: "ramby@hotmail.com",
      address: "DANWAIPET, RAJHMUNDRY - 533101",
    },
    {
      image: null,
      designation: "LIFE PRESIDENT",
      name: "SHRI P.CHENCHURAMAIAH",
      phone: "9391121736",
      email: "pskprasana@yahoo.com",
      address:
        "PLOT NO.45, SBH COLONY, VENTURE 2, GADDIANNARAM, HYDERABAD - 500 060",
    },
    {
      image: null,
      designation: "SENIOR VICE PRESIDENT",
      name: "SHRI M.V.S. SARMA, MLC",
      phone: "9490099222",
      email: "mlcsarma@yahoo.co.in",
      address: "B-25, LIC APARTMENTS, HB COLONY, VISAKHAPATNAM - 530 022",
    },
    {
      image: null,
      designation: "SENIOR VICE PRESIDENT",
      name: "DR. AKBAR SHAHEB",
      phone: "9440289009",
      email: "",
      address: "D.NO.12-B, 436, 6TH LANE, SAI NAGAR, ANANTHAPUR - 515 001",
    },
    {
      image: null,
      designation: "SENIOR VICE PRESIDENT",
      name: "SHRI P.VISWANATH",
      phone: "9849528333",
      email: "pindiproli.viswanath@gmail.com",
      address: "52-1/4-7A, VETERINARY COLONY, VIJAYAWADA - 520 010",
    },
    {
      image: null,
      designation: "SENIOR VICE PRESIDENT",
      name: "SHRI K.V.S.PRAKASH",
      phone: "9849086242",
      email: "",
      address: "",
    },
    {
      image: null,
      designation: "VICE PRESIDENT",
      name: "SHRI R.V.R CHINNA RAO",
      phone: "",
      email: "",
      address: "",
    },
    {
      image: null,
      designation: "VICE PRESIDENT",
      name: "SHRI V.R MUKKAMALA",
      phone: "986667029",
      email: "",
      address:
        "FLAT NO. 101-B, BRUNDAVAN APRTS, MAHARANI PETA, VISAKHAPTNAM - 530 003",
    },
    {
      image: null,
      designation: "VICE PRESIDENT",
      name: "SHRI N.V. GURUDUTT",
      phone: "9440409373",
      email: "",
      address: "GUNTUR",
    },
    {
      image: null,
      designation: "Secretary",
      name: "SHRI S.M. SULTAN",
      phone: "9848190078",
      email: "sultanmoosavi@gmail.com",
      address: "36-886/1A, SANTHINAGAR, MOGALRAJPURAM, VIJAYAWADA - 520 010",
    },
    {
      image: null,
      designation: "JOINT SECRETARY",
      name: "SHRI K.BALARAM",
      phone: "9885464999",
      email: "balaramprasad.karanam@gmail.com",
      address: "HOTEL SINDHURI, STATIONROAD,HANUMANPET, VIJAYAWADA - 520 003",
    },
    {
      image: suryarao,
      designation: "JOINT SECRETARY",
      name: "SHRI P.V.N. SURYA RAO",
      phone: "9347612476",
      email: "pvnsuryarao@gmail.com",
      address: "Plot No. 11, GAYATRINAGAR, M. PALEM, VISAKHAPATNAM - 530041",
    },
    {
      image: null,
      designation: "JOINT SECRETARY",
      name: "SHRI K.PRAVEEN KRISHNA",
      phone: "9866336299",
      email: "",
      address: "H.NO.1-02-6, SAMBASIVRAOPETA, IILANE, GUNTUR - 522 001",
    },
    {
      image: sathynarayan,
      designation: "JOINT SECRETARY",
      name: "SHRI K.SATYANARAYANA(Bheemu)",
      phone: "9440084849",
      email: "satyanarayanaatc@gmail.com",
      address:
        "ASSAM TEA COMPANY, OPPOSITE TOWN HALL, MAIN ROAD, MAIN ROAD, RAJAMUNDRY - 533 101",
    },
    {
      image: null,
      designation: "TREASURER",
      name: "Dr.K.MOHAN BABU",
      phone: "9866336299",
      email: "",
      address: "KAKINADA",
    },
    {
      image: null,
      designation: "EXECUTIVE COMMITTEE",
      name: "SHRI D.V.S.V.SHARMA",
      phone: "9440409373",
      email: "",
      address: "VISHAKAPATNAM - 530 041",
    },
    {
      image: null,
      designation: "EXECUTIVE COMMITTEE",
      name: "SHRI J.V.R.REDDY",
      phone: "9440409373",
      email: "",
      address: "RAJAHMUNDRY",
    },
    {
      image: female,
      designation: "EXCEUTIVE COMMITTEE",
      name: "Dr. R. MAMATA",
      phone: "9394101111",
      email: "",
      address: "GUNTUR",
    },
    {
      image: null,
      designation: "EXECUTIVE COMMITTEE",
      name: "SHRI D.YOGANAND BABU",
      phone: "",
      email: "",
      address: "525, BAIRAGIPATTEDA, TIRUPATI, CHITTOOR DIRST",
    },
    {
      image: null,
      designation: "EXECTUIVE COMMITTEE",
      name: "SHRI G.V.S.V.RAO",
      phone: `9848613539,
              7729847077`,
      email: "",
      address: "",
    },
    {
      image: JAYRAJ,
      designation: "EXECUTIVE COMMITTEE",
      name: "SHRI L.M.S JAYRAJ",
      phone: `9848613539,
              7729847077`,
      email: "",
      address: "",
    },
    {
      image: asifkhan,
      designation: "EXECTUIVE COMMITTEE",
      name: "SHRI ASIF KHAN",
      phone: "9963754768",
      email: "",
      address: "EAST GODAVARI",
    },
    {
      image: null,
      designation: "EXECUTIVE COMMITTEE",
      name: "SHRI D.MURALIDHAR RAO",
      phone: "9441012406",
      email: "",
      address: "ANANTAPUR",
    },
  ];

  return (
    <Box>
      <Box>
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
                className='w-full h-full absolute opacity-25 bg-black'
              ></span>
            </Box>
          </section>
          <section className='relative pt-16 bg-blueGray-200'>
            <Box className='container mx-auto px-4'>
              <Box
                className='relative flex flex-col min-w-0 break-words bg-white w-full shadow-xl'
                sx={{
                  marginBottom: "-8rem",
                  zIndex: 2,
                  paddingBottom: "2rem",
                  marginTop: {
                    xs: "-32rem !important",
                    md: "-24rem !important",
                  },
                }}
              >
                <Box className='px-4'>
                  <Box
                    className='w-full font-serif py-16 text-center md:py-8 border-b border-blueGray-200'
                    sx={{ margin: "2rem 0 4rem 0" }}
                  >
                    <Typography
                      variant='h2'
                      className='text-5xl font-semibold uppercase'
                      style={{ letterSpacing: "2px" }}
                    >
                      About US
                    </Typography>
                  </Box>
                  <Box
                    className='text-center'
                    sx={{
                      marginLeft: { md: "2rem" },
                      marginTop: { xs: "-4rem", lg: "-6rem" },
                    }}
                  >
                    <h3 className='tailwind_h3 text-4xl font-semibold leading-normal mb-2 text-blueGray-700'>
                      &nbsp;
                    </h3>
                  </Box>
                  <Box
                    sx={{
                      padding: { xs: "2px", sm: "4px", md: "8px", lg: "16px" },
                      margin: "4vh 0",
                    }}
                  >
                    <Typography
                      sx={{
                        lineHeight: "2rem",
                        margin: "1rem",
                        textAlign: "justify",
                      }}
                      variant='body2'
                      color='text.secondary'
                    >
                      The Andhra Pradesh Table Tennis Association is one of the
                      pioneer State Associations of Table Tennis Federation of
                      India. It was registered and established in the year 1964
                      since then Andhra Pradesh Table Tennis Association had
                      been vibrant in all the activities of the game of Table
                      Tennis . It had produced National and International
                      players to start with Mir Kasim Ali the National Champion
                      and the Arjuna awardee and also the finalist in common
                      wealth Table Tennis championship prior to 1970s and later
                      on at present ShubhamSharma, Jitender, NikhatBanu, CHSSV
                      Ramana are the players from Andhra Pradesh representing
                      India in International Championships in Juniors Men
                      Sub-Juniors and Cadets respectively and we hope to see
                      many more players from Andhra Pradesh.
                    </Typography>
                    <Typography
                      sx={{
                        lineHeight: "2rem",
                        margin: "1rem",
                        textAlign: "justify",
                      }}
                      variant='body2'
                      color='text.secondary'
                    >
                      The Andhra Pradesh Table Tennis Association also has
                      organized many National and International events in Andhra
                      Pradesh - PENT-ANGULAR Championship inviting teams from 5
                      countries Pakistan, Srilanka, Nepal, Bhutan and India in
                      the year 1970s,Golden Jubilee Senior Nationals and Junior
                      Nationals,Common Wealth TT Championship 1994, IX Asian
                      Junior Table Tennis ChampionShip in 2002 and 4 National
                      ranking Table Tennis Championships at Vijayawada in the
                      past 10 years, the last being from 4th to 8th October
                      2006.The APTTA is grateful to Shri Sudeep Lakhtakia IPS
                      the former President of APTTA for all his valuable
                      Services in general to the Association and inspiration and
                      motivation to the players in Particular.
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: { xs: "block", md: "flex" },
                      background: "#fff",
                      padding: { xs: "2px", sm: "4px", md: "8px", lg: "16px" },
                      margin: "4vh 0 0 0",
                    }}
                  >
                    <Box sx={{ width: { xs: "100%", md: "30%" } }}>
                      <CardMedia
                        className='tailwind_img'
                        component='img'
                        height='50'
                        image={Mission}
                        alt='Post Image'
                      />
                    </Box>
                    <Box>
                      <Typography
                        sx={{ lineHeight: "2rem", margin: "1rem" }}
                        gutterBottom
                        variant='h5'
                        component='div'
                      >
                        Our Vision
                      </Typography>
                      <Typography
                        sx={{
                          lineHeight: "2rem",
                          margin: "1rem",
                          textAlign: "justify",
                        }}
                        variant='body2'
                        color='text.secondary'
                      >
                        APTTA will be the finest table tennis organization in
                        India and an integral part of Indian National Team
                        success.
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column-reverse", md: "row" },
                      background: "#fff",
                      padding: { xs: "2px", sm: "4px", md: "8px", lg: "16px" },
                      margin: "0",
                    }}
                  >
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography
                        sx={{
                          lineHeight: "2rem",
                          textAlign: "justify",
                          margin: "1rem 1rem 2rem 1rem",
                        }}
                        gutterBottom
                        variant='h5'
                        component='div'
                      >
                        Our Mission
                      </Typography>
                      <Typography
                        sx={{
                          lineHeight: "2rem",
                          margin: "1rem",
                          textAlign: "justify",
                        }}
                        variant='body2'
                        color='text.secondary'
                      >
                        APTTA will foster the growth and development of table
                        tennis clubs throughout the India to create the best
                        possible development environment for players of all ages
                        in every club.
                      </Typography>
                    </Box>
                    <Box sx={{ width: { xs: "100%", md: "30%" } }}>
                      <CardMedia
                        component='img'
                        width='60%'
                        image={Vision}
                        alt='Post Image'
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </section>
        </main>
      </Box>
      <Box>
        <section
          className='relative block h-500-px'
          style={{ marginTop: "-4rem" }}
        >
          <Box
            className='absolute top-0 w-full h-full bg-center bg-cover'
            sx={{
              background: `linear-gradient(
                        to right,
                        rgba(0, 0, 0, 0.5),
                        rgba(0, 0, 0, 0.8)
                      ),url(https://picsum.photos/1920/1920/?random) center center no-repeat`,
              backgroundAttachment: "fixed",
            }}
          >
            <span
              id='blackOverlay'
              className='w-full h-full absolute opacity-50 bg-black'
            ></span>
            <Box className='text-white font-serif mx-4 p-4 text-center md:p-8'>
              <Typography
                variant='h2'
                className='text-5xl uppercase'
                style={{ letterSpacing: "2px", marginTop: "16rem" }}
              >
                Office Bearers
              </Typography>
            </Box>
          </Box>
        </section>
        <Box sx={{ padding: "4rem 4rem 2rem 4rem" }}>
          <Grid container spacing={4}>
            {officeBearerList.map((item, index) => (
              <Grid item xs={12} md={6} lg={4} xl={4} key={index}>
                <OfficeBearerCard officeBearer={item} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default About;

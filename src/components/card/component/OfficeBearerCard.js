import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import BusinessIcon from "@mui/icons-material/Business";
import EmailIcon from "@mui/icons-material/Email";
import male from "../../../assets/img/male.png";

export default function OfficeBearerCard({ officeBearer }) {
  return (
    <>
      <Box
        className='bg-white rounded mb-6 xl:mb-0 shadow-lg'
        sx={{
          minHeight: { xs: "20rem", sm: "21rem", md: "16rem" },
          paddingTop: {
            xs: 0,
            sm: "0.5rem",
            md: "1rem",
            lg: "1.25rem",
            xl: "1.5rem",
          },
        }}
      >
        <Box sx={{ display: { xs: "block", md: "flex" } }}>
          <Box
            className='p-3'
            sx={{
              display: "flex",
              justifyContent: "center",
              minWidth: { xs: "100%", md: "80px" },
              height: { xs: "100px", md: "100%" },
              margin: {
                xs: 0,
                md: "-1rem 0rem 2rem 1.5rem",
                lg: "-1rem 0rem 1rem 1.5rem",
              },
            }}
          >
            <img
              alt='...'
              src={officeBearer.image ?? male}
              className='tailwind_img shadow-xl rounded-full border-none absolute'
              width={"90px"}
              height={"90px"}
            />
          </Box>
          <Box
            sx={{
              textAlign: { xs: "center", md: "left" },
              margin: { xs: "1.5rem 0 0 0", md: 0 },
            }}
          >
            <Box
              sx={{
                margin: { xs: "0 0 0 -1rem", md: 0 },
                padding: "0 0.5rem 0 0",
              }}
            >
              <h5 className='tailwind_h5 text-blueGray-400 uppercase font-bold text-xs pl-4'>
                {officeBearer.designation}
              </h5>
              <span
                className='font-semibold text-xl text-blueGray-700 pl-4'
                style={{
                  display: "inline-flex",
                }}
              >
                {officeBearer.name}
              </span>
            </Box>
            <Typography
              sx={{ margin: "1rem" }}
              variant='body2'
              color='text.secondary'
            >
              <PhoneIphoneIcon
                sx={{
                  fontSize: "1rem",
                  marginRight: "0.5rem",
                  marginBottom: "-0.15rem",
                }}
              />
              {officeBearer.phone ? officeBearer.phone : "-"}
            </Typography>
            <Typography
              sx={{ margin: "1rem" }}
              variant='body2'
              color='text.secondary'
            >
              <EmailIcon
                sx={{
                  fontSize: "1rem",
                  marginRight: "0.5rem",
                  marginBottom: "-0.15rem",
                }}
              />
              {officeBearer.email ? officeBearer.email : "-"}
            </Typography>
            <Box>
              <Typography
                sx={{
                  margin: "1rem",
                  textAlign: { xs: "center", md: "justify" },
                }}
                variant='body2'
                color='text.secondary'
              >
                <BusinessIcon
                  sx={{
                    fontSize: "1rem",
                    marginRight: "0.5rem",
                    marginBottom: "-0.15rem",
                  }}
                />
                {officeBearer.address ? officeBearer.address : "-"}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

OfficeBearerCard.defaultProps = {
  position: "",
  name: "",
};

OfficeBearerCard.propTypes = {
  position: PropTypes.string,
  name: PropTypes.string,
};

import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function CardStats({ subtitle, title, link, buttonName }) {
  return (
    <>
      <Box className='relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg'>
        <Box className='flex-auto p-4'>
          <Box className='flex flex-wrap'>
            <Box className='relative w-full pr-4 max-w-full flex-grow flex-1'>
              <h5 className='tailwind_h5 text-blueGray-400 uppercase font-bold text-xs'>
                {subtitle}
              </h5>
              <Box
                className='font-semibold text-xl text-blueGray-700'
                sx={{ minHeight: { md: "4rem", lg: "4rem" } }}
              >
                {title}
              </Box>
            </Box>
          </Box>
          <Link
            to={`/result/${link}`}
            style={{ TextDecoration: "none" }}
            onClick={() => document.getElementById("result").click()}
          >
            <Box className='text-sm text-blueGray-400 mt-4'>
              <Box
                variant='span'
                className='uppercase whitespace-nowrap'
                sx={{
                  transition: "0.2s all ease",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "scale(1.01)",
                  },
                }}
              >
                {buttonName}
              </Box>
            </Box>
          </Link>
        </Box>
      </Box>
    </>
  );
}

CardStats.defaultProps = {
  subtitle: "Traffic",
  title: "350,897",
  statArrow: "up",
  statPercent: "3.48",
  statPercentColor: "text-emerald-500",
  link: "Since last month",
  statIconName: "far fa-chart-bar",
  statIconColor: "bg-red-500",
};

CardStats.propTypes = {
  subtitle: PropTypes.string,
  title: PropTypes.string,
  statArrow: PropTypes.oneOf(["up", "down"]),
  statPercent: PropTypes.string,
  // can be any of the text color utilities
  // from tailwindcss
  statPercentColor: PropTypes.string,
  link: PropTypes.string,
  statIconName: PropTypes.string,
  // can be any of the background color utilities
  // from tailwindcss
  // statIconColor: PropTypes.string,
};

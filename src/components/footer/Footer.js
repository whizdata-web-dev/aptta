import { Box } from "@mui/material";
import React from "react";

export default function FooterAdmin() {
  return (
    <>
      <Box
        className='block'
        sx={{
          borderTop: "10px solid #0c0c0c",
          boxShadow: "-10px 10px #141414, 10px 10px #141414",
          background: "#141414",
          marginTop: '-2rem'
        }}
      >
        <Box className='container mx-auto px-4'>
          {/* <hr className='tailwind_hr border-b-1 border-blueGray-200' /> */}
          <Box className='flex flex-wrap items-center md:justify-between justify-center'>
            <Box className='w-full md:w-4/12 px-4'>
              <Box className='text-sm text-white font-semibold py-1 text-center md:text-left'>
                Copyright © {new Date().getFullYear()}&nbsp;
                <a
                  href='https://www.whizdata.in/#/'
                  className='tailwind_a text-white hover:text-blueGray-700 text-sm font-semibold py-1'
                >
                  Andhrapradesh Table Tennis Association. Powered by WHIZDATA
                </a>
              </Box>
            </Box>
            <Box className='w-full md:w-8/12 px-4'>
              <ul className='flex flex-wrap list-none md:justify-end justify-center'>
                <li>
                  <a
                    href='https://www.whizdata.in/#/'
                    className='tailwind_a text-white hover:text-blueGray-800 text-sm font-semibold block py-1 px-3'
                  >
                    WHIZDATA
                  </a>
                </li>
                <li>
                  <a
                    href='https://www.whizdata.in/#/aboutus'
                    className='tailwind_a text-white hover:text-blueGray-800 text-sm font-semibold block py-1 px-3'
                  >
                    About Us
                  </a>
                </li>
              </ul>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

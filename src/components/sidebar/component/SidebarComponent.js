/*eslint-disable*/
import { Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { NavigationItems } from "../model/SidebarModel";

export default function SidebarComponent({ collapseShow, setCollapseShow }) {
  return (
    <>
      <nav className='md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6'>
        <Box className='md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto'>
          {/* Toggler */}
          <button
            className='cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent'
            type='button'
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className='fas fa-bars'></i>
          </button>
          {/* Brand */}
          <Link
            className='md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0'
            to='/'
          >
            APTTA
          </Link>
          <Box
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <Box className='md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200'>
              <Box className='flex flex-wrap'>
                <Box className='w-6/12'>
                  <Link
                    className='md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0'
                    to='/'
                  >
                    APTTA
                  </Link>
                </Box>
                <Box className='w-6/12 flex justify-end'>
                  <button
                    type='button'
                    className='cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent'
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className='fas fa-times'></i>
                  </button>
                </Box>
              </Box>
            </Box>

            <hr className='tailwind_hr my-4 md:min-w-full' />

            <ul className='md:flex-col md:min-w-full flex flex-col list-none'>
              {NavigationItems.map((item, index) => (
                <li className='items-center' key={index}>
                  <Link
                    className={
                      "text-sm uppercase py-3 font-bold block " +
                      (window.location.href.indexOf(item.path) !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                    to={item.path}
                  >
                    <i
                      className={
                        item.class +
                        (window.location.href.indexOf(item.path) !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>
                    {item.pathName}
                  </Link>
                </li>
              ))}

              {/* <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/home") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/home"
                >
                  <i
                    className={
                      "fas fa-tv mr-2 text-sm " +
                      (window.location.href.indexOf("/home") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>
                  Dashboard
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/settings") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/settings"
                >
                  <i
                    className={
                      "fas fa-tools mr-2 text-sm " +
                      (window.location.href.indexOf("/settings") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>
                  Settings
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/tables") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/tables"
                >
                  <i
                    className={
                      "fas fa-table mr-2 text-sm " +
                      (window.location.href.indexOf("/tables") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>
                  Tables
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/maps") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/maps"
                >
                  <i
                    className={
                      "fas fa-map-marked mr-2 text-sm " +
                      (window.location.href.indexOf("/maps") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>
                  Maps
                </Link>
              </li> */}
            </ul>
          </Box>
        </Box>
      </nav>
    </>
  );
}

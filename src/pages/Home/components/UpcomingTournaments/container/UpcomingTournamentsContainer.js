import { Box, Button, Divider, Grid } from "@mui/material";
import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Map from "../../../../../components/map/Map";
import FetchData from "../../../../../assets/utils/FetchData";
import { urlConsts } from "../../../../../assets/utils/RequestData";
import UpcomingTournamentsComponent from "../components/UpcomingTournamentsComponent";
import { useLoginContext } from "../../../../../assets/utils/UserLoginContext";
import { handleTournamentId } from "../../../../../assets/utils/UserLoginContext";
export default function UpcomingTournamentsContainer() {
  const { getLoginUser } = useLoginContext();
  const getUser = getLoginUser();

  const [mapWidth, setMapWidth] = React.useState(0);

  const [expanded, setExpanded] = React.useState("panel0");
  const [open, setOpen] = React.useState(false);

  const { data, loading, error } = FetchData({
    method: "GET",
    url: `UpcomingTournamentsOnApiKey?caller=${urlConsts.caller}&apiKey=${urlConsts.apiKey}&userId=${urlConsts.filterData}`,
  });

  const [tournamentData, setTournamentData] = React.useState([]);

  React.useEffect(() => {
    // setMapWidth(ref.current ? ref.current.offsetWidth : 0);
    // function handleResize() {
    //   setMapWidth(ref.current && ref.current.offsetWidth);
    // }
    // window.addEventListener("resize", handleResize);

    if (Object.keys(data).length !== 0) {
      setTournamentData(data.resultID);
    }
  }, [data]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleClickOpen = (component, id) => {
    setOpen(component === "view" ? id : component);
    if (component === "give") {
      handleTournamentId.setTournId(id && id._id);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleGiveEntry = () => {
    document.querySelector(".login").click();
  };

  return (
    <>
      <Box
        className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
        style={{ height: 454 }}
      >
        <Box className="rounded-t mb-0 px-4 py-3 border-0">
          <Box className="flex flex-wrap items-center">
            <Box
              sx={{ textTransform: "uppercase" }}
              className="relative w-full px-4 max-w-full flex-grow flex-1"
            >
              <h1 className="tailwind_h1 font-semibold text-base text-blueGray-700 py-1">
                Upcoming Tournaments
              </h1>
            </Box>
          </Box>
        </Box>
        <UpcomingTournamentsComponent
          handleGiveEntry={handleGiveEntry}
          getUser={getUser}
          data={tournamentData}
          handleChange={handleChange}
          expanded={expanded}
          mapWidth={mapWidth}
          open={open}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
        />
      </Box>
    </>
  );
}

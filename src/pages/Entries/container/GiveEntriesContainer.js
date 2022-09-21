import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import GiveEntriesComponent from "../component/GiveEntriesComponent";

const GiveEntriesContainer = ({ data }) => {
  const [tournamentData, setTournamentData] = useState([]);

  useEffect(() => {
    if (Object.keys(data).length !== 0) {
      setTournamentData(data);
      localStorage.setItem("Ul", JSON.stringify(data));
    }
  }, [data]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {tournamentData ? (
        <GiveEntriesComponent tournamentData={tournamentData} />
      ) : (
        "Loading"
      )}
    </Box>
  );
};

export default GiveEntriesContainer;

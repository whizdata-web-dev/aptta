import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { RequestData, urlConsts } from "../../../assets/utils/RequestData";
import ViewEntriesComponent from "../component/ViewEntriesComponent";

const ViewEntriesContainer = ({ data }) => {
  const [playersData, setPlayersData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [eventId, setEventId] = useState("");
  const tournamentName = data?.tournamentList[0].tournamentName;

  const handleChange = (event) => {
    setEventId(event.target.value);
  };

  const createEventDetails = (eventsId, events) => {
    let eventObject = [];
    events.forEach((eventName, index) => {
      eventObject.push({
        eventName,
        eventId: eventsId[index],
      });
    });
    return eventObject.sort((a, b) =>
      a.eventName > b.eventName ? 1 : b.eventName > a.eventName ? -1 : 0
    );
  };

  const eventDetails = createEventDetails(
    data?.resultID[0].eventsUnderTournament,
    data?.eventList[0].events
  );

  useEffect(() => {
    async function getData() {
      await RequestData(
        "GET",
        `listOfEntries?caller=${urlConsts.caller}&apiKey=${urlConsts.apiKey}&tournamentId=${data.tournamentList[0].tournamentId}&eventId=${eventId}`
      )
        .then((response) => {
          if (response && response.result) {
            setPlayersData(response.result);
            setLoading(false);
          }
        })
        .catch((error) => {
          // Error display Pending
        });
    }
    if (eventId) {
      setLoading(true);
      getData();
    }
  }, [eventId]); // eslint-disable-line

  return (
    <Box
      sx={{
        // display: "flex",
        // flexDirection: "column",
        // justifyContent: "center",
        // alignItems: "center",
        width: "100%",
      }}
    >
      <ViewEntriesComponent
        tournamentName={tournamentName}
        eventId={eventId}
        eventDetails={eventDetails}
        handleChange={handleChange}
        loadingPlayerData={loading}
        playersData={playersData}
      />
    </Box>
  );
};

export default ViewEntriesContainer;

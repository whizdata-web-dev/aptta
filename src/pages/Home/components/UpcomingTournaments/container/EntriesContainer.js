import React, { useEffect, useState } from "react";
import {
  RequestData
} from "../../../../../assets/utils/RequestData";
import EntriesComponent from "../components/EntriesComponent";

const EntriesContainer = (props) => {
  const [playersData, setPlayersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [eventId, setEventId] = useState("");

  useEffect(() => {
    async function getData() {
      await RequestData(
        "GET",
        `listOfEntries?caller=${process.env.REACT_APP_CALLER}&apiKey=${process.env.REACT_APP_API_KEY}&tournamentId=${props.open._id}&eventId=${eventId}`
      )
        .then((response) => {
          if (response.result) {
            setPlayersData(response.result);
            setLoading(false);
          }
        })
        .catch((error) => {
          // Error display Pending
        });
    }
    if (eventId && props.open) {
      setLoading(true);
      getData();
    }
  }, [eventId, props.open]);

  return (
    <EntriesComponent
      loading={loading}
      playersData={playersData}
      eventId={eventId}
      setEventId={setEventId}
      {...props}
    />
  );
};

export default EntriesContainer;

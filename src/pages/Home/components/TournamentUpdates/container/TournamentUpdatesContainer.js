import React, { useEffect, useState } from "react";
import FetchData from "../../../../../assets/utils/FetchData";
import TournamentUpdatesComponent from "../components/TournamentUpdatesComponent";

const TournamentUpdatesContainer = () => {
  const { data } = FetchData({
    method: "GET",
    url: `PastTournamentsOnApiKey?caller=${process.env.REACT_APP_CALLER}&apiKey=${process.env.REACT_APP_API_KEY}&userId=${process.env.REACT_APP_USER_ID}`,
    pathname: "result",
  });

  const [tournamentData, setTournamentData] = useState([]);

  useEffect(() => {
    if (Object.keys(data).length !== 0) {
      let tournamentList = data.resultID.slice(0, 2);
      setTournamentData(tournamentList);
    }
  }, [data]);

  return (
    <>
      <TournamentUpdatesComponent data={tournamentData} />
    </>
  );
};

export default TournamentUpdatesContainer;

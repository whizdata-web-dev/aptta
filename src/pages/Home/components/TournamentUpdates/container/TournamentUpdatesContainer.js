import React, { useEffect, useState } from "react";
import FetchData from "../../../../../assets/utils/FetchData";
import TournamentUpdatesComponent from "../components/TournamentUpdatesComponent";
import { urlConsts } from "../../../../../assets/utils/RequestData";

const TournamentUpdatesContainer = () => {
  const { data } = FetchData({
    method: "GET",
    url: `PastTournamentsOnApiKey?caller=${urlConsts.caller}&apiKey=${urlConsts.apiKey}&userId=${urlConsts.filterData}`,
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

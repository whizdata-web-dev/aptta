import { Box } from "@mui/material";
import { useEffect } from "react";
import FetchData from "../../../assets/utils/FetchData";
import { urlConsts } from "../../../assets/utils/RequestData";
import EntriesComponent from "../component/EntriesComponent";
import { useLoginContext } from "../../../assets/utils/UserLoginContext";
import { useHistory } from "react-router-dom";
import LoadingComponent from "../../../assets/utils/LoadingComponent";

const EntriesContainer = () => {
  const { getLoginUser, logOut } = useLoginContext();
  const getUser = getLoginUser();
  const history = useHistory();

  const { data } = FetchData({
    method: "GET",
    url: `UpcomingTournamentsOnApiKey?caller=${urlConsts.caller}&apiKey=${urlConsts.apiKey}&userId=${urlConsts.filterData}`,
  });

  useEffect(() => {
    if (!getUser) {
      localStorage.setItem("erMsg", "Please login to give entry.");
      history.push("/login");
    }
  }, []); // eslint-disable-line

  return (
    <Box
      sx={{
        // display: "flex",
        // flexDirection: "column",
        // justifyContent: "center",
        // alignItems: "center",
        paddingTop: "5rem",
      }}
    >
      {Object.keys(data).length > 0 ? (
        <EntriesComponent logOut={logOut} data={data} />
      ) : (
        <LoadingComponent />
      )}
    </Box>
  );
};

export default EntriesContainer;

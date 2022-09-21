import { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DrawResult from "./DrawResult";
import { RequestData, urlConsts } from "../../../assets/utils/RequestData";
import { Card, CardContent, Divider, Typography } from "@mui/material";
import WinnerCard from "./WinnerCard";
import notFound from "../../../assets/img/notFound.jpg";
import LoadingComponent from "../../../assets/utils/LoadingComponent";

// constants variables for tab names and api response data
//- its rendered only once so not using state
// data filter is done based on tab change
const roundNames = [],
  drawResult = [];

const Draw = ({ eventName, tournamentId }) => {
  // State constants defined for getting round names, draw points
  // filtered round data based on tab index
  const [roundResult, setRoundResult] = useState([]);
  //filtered next round data based on tab index for right column values
  const [nextRoundResult, setNextRoundResult] = useState([]);
  // for tab index value
  const [tabValue, setTabValue] = useState(0);
  // for error message in case of failure
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  //This is on change of tabs.
  // Filtering round data based on tab index and setting tab value to state
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setMessage("");
    setRoundResult([]);
    setNextRoundResult([]);
    //setting tabindex value on tab change
    // setting tab filter data to state on change of tab index
    setRoundResult(
      filteredResult(drawResult[0], roundNames[0][newValue].roundNumber)
    );
    newValue + 1 < roundNames[0].length
      ? setNextRoundResult(
          filteredResult(drawResult[0], roundNames[0][newValue + 1].roundNumber)
        )
      : setNextRoundResult("");
  };

  const filteredResult = (matchRecords, roundNumber) => {
    let filteredValue = matchRecords
      ? matchRecords.filter((data) => data.roundNumber === roundNumber)
      : "";
    return filteredValue;
  };

  const getDraws = async () => {
    setLoading(true);

    let content = {
      caller: urlConsts.caller,
      data: {
        tournamentId,
        eventName,
      },
    };

    // Calling HTTP method by passing Api Type and Api URL
    await RequestData("POST", "fetchMatchResults", content)
      .then((response) => {
        if (response.result) {
          const roundName = response.result.roundDetails;

          const tempRoundName =
            roundName &&
            roundName.map((round, index) =>
              index === roundName.length - 4
                ? { ...round, roundName: "Pre Quarter Final" }
                : round
            );
          roundNames.pop();
          roundNames.push(tempRoundName);
          drawResult.pop();
          drawResult.push(response.result.matchRecords);
          setRoundResult(
            filteredResult(
              response.result.matchRecords,
              response.result.roundDetails[0].roundNumber
            )
          );
          tabValue + 1 <= response.result.roundDetails.length &&
          response.result.matchRecords
            ? setNextRoundResult(
                filteredResult(
                  response.result.matchRecords,
                  response.result.roundDetails[1].roundNumber
                )
              )
            : setNextRoundResult([]);
          setLoading(false);
        } else {
          setLoading(false);
          setMessage("Records not found. Please contact APTTA.");
        }
      })
      .catch((er) => {
        setLoading(false);
        setMessage(
          er && er.result && er.result.message
            ? er.result.message
            : "Records not found. Please contact APTTA."
        );
      });
  };

  useEffect(() => {
    setTabValue(0);
    getDraws();
    return () => {
      setRoundResult([]);
      setNextRoundResult([]);
    };
  }, [eventName]); // eslint-disable-line

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Card
        variant='outlined'
        sx={{
          background: "transparent",
          border: "none",
          padding: { xs: "0rem", md: "1rem" },
        }}
      >
        {loading ? (
          <LoadingComponent />
        ) : message && roundResult.length === 0 ? (
          <Grid item xs={12} sm={12} md={6}>
            <Grid
              container
              direction='column'
              alignItems='center'
              justifyContent='center'
            >
              <Grid item>
                <Box>
                  <img
                    src={notFound}
                    alt='...'
                    width='100%'
                    style={{ maxWidth: "500px" }}
                  />
                </Box>
              </Grid>
              <Grid item>
                <Typography variant='h6'>{message}</Typography>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <CardContent sx={{ padding: 0 }}>
            <Box sx={{ display: "flex" }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant='scrollable'
                scrollButtons='auto'
                aria-label='scrollable auto tabs example'
                sx={{
                  margin: "0rem auto",
                }}
              >
                {roundNames[0] &&
                  roundNames[0].map((i, index) => {
                    return <Tab key={index} label={i.roundName} />;
                  })}
              </Tabs>
            </Box>
            <Divider />
            <Grid container spacing={{ xs: 0, md: 3 }}>
              <Grid item xs={12} sm={12} md={6}>
                {roundResult.map((data, index) => (
                  <DrawResult
                    key={`curRound${index}`}
                    numberOfSets={7}
                    drawResponse={data}
                    index={index + 1}
                    matchNo={data.matchNumber}
                    dSize={Object.keys(roundResult).length}
                    centralize={false}
                    size={Math.pow(2, 4 - index - 1)}
                    round={roundNames.length > 0 && roundNames[0][tabValue]}
                  />
                ))}
              </Grid>
              <Grid
                item
                xs={0}
                sm={0}
                md={6}
                sx={{ display: { xs: "none", sm: "none", md: "block" } }}
              >
                {Object.keys(roundResult).length === 1 ? (
                  <WinnerCard
                    winnerName={roundResult[0].winner}
                    eventName={eventName}
                  />
                ) : (
                  nextRoundResult &&
                  nextRoundResult.map((data, index) => (
                    <Box key={index}>
                      <DrawResult
                        visibility='hidden'
                        numberOfSets={7}
                        drawResponse={data}
                        index={index + 1}
                        matchNo={data.matchNumber}
                        dSize={Object.keys(roundResult).length}
                        centralize={true}
                        size={Math.pow(2, 4 - index - 2)}
                        round={roundNames.length > 0 && roundNames[0][tabValue]}
                      />
                      <DrawResult
                        visibility='visible'
                        numberOfSets={7}
                        drawResponse={data}
                        index={index + 1}
                        matchNo={data.matchNumber}
                        dSize={Object.keys(roundResult).length}
                        centralize={true}
                        size={Math.pow(2, 4 - index - 2)}
                        round={
                          roundNames.length > 0 && roundNames[0][tabValue + 1]
                        }
                      />
                    </Box>
                  ))
                )}
              </Grid>
            </Grid>
          </CardContent>
        )}
      </Card>
    </Box>
  );
};

export default Draw;

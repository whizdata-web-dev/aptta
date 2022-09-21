import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import TrophyLogo from "../../../assets/img/trophy.png";
import { Link } from "react-router-dom";

const DrawResult = (props) => {
  // constants defined from props
  const { visibility, drawResponse, centralize, matchNo, numberOfSets, round } =
    props;
  // constant for player I name
  const playerA = drawResponse.players.playerA
    ? drawResponse.players.playerA
    : "Player";
  // constant for player II name
  const playerB = drawResponse.players.playerB
    ? drawResponse.players.playerB
    : "Player";
  // constant for player I Score set
  const setScoresA = drawResponse.scores.setScoresA
    ? drawResponse.scores.setScoresA
    : "";
  // constant for player II Score set
  const setScoresB = drawResponse.scores.setScoresB
    ? drawResponse.scores.setScoresB
    : "";

  return (
    <Box
      sx={{
        visibility: visibility,
        margin: { xs: "0 0 0 0", md: "1rem 0" },
        transform: {
          xs: "scale(1)",
          md: centralize ? "translateY(-53.5%)" : "translateY(0)",
        },
        zIndex: "100px",
        textTransform: "uppercase",
        // borderTop: "4px solid #433381",
        border: "4px solid #433381",
        borderStyle: "none solid none solid",
        transition: "0.2s all ease-in",
        width: "100%",
      }}
    >
      <Card
        className='scorecard'
        // variant='outlined'
        sx={{
          borderRadius: "inherit",
          // height: { md: "250px", lg: "240px" },
          margin: { xs: "1rem 0", md: 0 },
          boxShadow: 2,
          border: "1px solid rgb(241, 245, 249)",
        }}
      >
        <CardContent>
          <Box sx={{ display: "inlineFlex", color: "#616161" }}>
            <Typography
              variant='body1'
              sx={{
                margin: "0 0 0.3rem 0",
                fontSize: "16px",
              }}
            >
              <b className='b'>{round && round.roundName}</b>
            </Typography>
            <Typography
              variant='body1'
              sx={{
                margin: "0 0 0.3rem 0",
                fontSize: "12px",
                position: "absolute",
                right: "1rem",
              }}
            >
              {/* showing match number */}
              <b className='b'>Match: {matchNo ? matchNo : ""}</b>
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ flexGrow: 1, margin: "1rem 0" }}>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12 - numberOfSets}
                sm={12 - numberOfSets}
                md={12 - numberOfSets}
              >
                {/* Checking weather player I is  winner 
                - showing trophy logo */}
                <Typography variant='h5' component='div'>
                  {drawResponse.winner === playerA ? (
                    <Avatar
                      src={TrophyLogo}
                      sx={{
                        position: "absolute",
                        height: "1.5rem",
                        width: "1.5rem",
                        marginX: "-0rem",
                      }}
                    />
                  ) : (
                    ""
                  )}
                </Typography>
                <Typography
                  variant='h5'
                  component='div'
                  style={{
                    paddingLeft: "2rem",
                    fontSize: "16px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {/* Checking prps data for Player - 1 Name */}
                  {/* <Link
                    to={`/player/${
                      drawResponse.playersID
                        ? drawResponse.playersID.playerAId
                        : "playerId"
                    }`}
                  > */}
                    {playerA !== "()" ? playerA : <>&nbsp;</>}
                  {/* </Link> */}
                </Typography>
              </Grid>
              {/* Checking prps data for scores , displaying empty in 
              case of having 0's continuously in sets */}
              {setScoresA &&
                setScoresA.map((data, index) => {
                  return (
                    <Grid item xs={1} sm={1} md={1} key={index}>
                      {data > 0 ? (
                        <Typography
                          sx={{
                            fontSize: "0.8rem",
                            textAlign: "center",
                          }}
                        >
                          <b className='b'>
                            {(String(setScoresA[index]) === "0" &&
                              String(setScoresA[index + 1]) === "0") ||
                            (index === setScoresA.length - 1 &&
                              String(setScoresA[index]) === "0")
                              ? ""
                              : data
                              ? data
                              : ""}
                          </b>
                        </Typography>
                      ) : null}
                    </Grid>
                  );
                })}
              {/* Showing Number of sets from api response - 7 rounds */}
              <Grid
                item
                xs={12 - numberOfSets - 2}
                sm={12 - numberOfSets - 1}
                md={12 - numberOfSets - 1}
                sx={{ margin: "0.5rem 0 -1rem 0" }}
              >
                <Divider />
              </Grid>
              <Grid
                item
                xs={2}
                sm={1}
                md={1}
                sx={{
                  padding: "0rem 0 0.2rem 0",
                  margin: "-0.25rem 0 0 0",
                }}
              >
                <b className='b'>SET</b>
              </Grid>
              {[...new Array(numberOfSets)].map((_, i) => {
                return (
                  <Grid item xs={1} sm={1} md={1} key={i}>
                    <Typography
                      sx={{ fontSize: "0.8rem", textAlign: "center" }}
                      color='text.secondary'
                    >
                      {i + 1}
                    </Typography>
                  </Grid>
                );
              })}
              <Grid
                item
                xs={12 - numberOfSets}
                sm={12 - numberOfSets}
                md={12 - numberOfSets}
              >
                {/* Checking weather player II is  winner 
                - showing trophy logo */}

                <Typography variant='h5' component='div'>
                  {drawResponse.winner === playerB ? (
                    <Avatar
                      src={TrophyLogo}
                      sx={{
                        position: "absolute",
                        height: "1.5rem",
                        width: "1.5rem",
                      }}
                    />
                  ) : (
                    ""
                  )}
                </Typography>
                {/* Checking prps data for Player - 1I Name */}

                <Typography
                  variant='h5'
                  component='div'
                  style={{
                    paddingLeft: "2rem",
                    fontSize: "16px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {/* <Link
                    to={`/player/${
                      drawResponse.playersID
                        ? drawResponse.playersID.playerBId
                        : "playerId"
                    }`}
                  > */}
                    {playerB !== "()" ? playerB : <>&nbsp;</>}
                  {/* </Link> */}
                </Typography>
              </Grid>
              {/* Checking prps data for scores , displaying empty in 
              case of having 0's continuously in sets */}
              {setScoresB &&
                setScoresB.map((data, index) => {
                  return (
                    <Grid item xs={1} sm={1} md={1} key={index}>
                      {data > 0 ? (
                        <Typography
                          sx={{
                            fontSize: "0.8rem",
                            textAlign: "center",
                          }}
                        >
                          <b className='b'>
                            {(String(setScoresA[index]) === "0" &&
                              String(setScoresA[index + 1]) === "0") ||
                            (index === setScoresA.length - 1 &&
                              String(setScoresA[index]) === "0")
                              ? ""
                              : data
                              ? data
                              : ""}
                          </b>
                        </Typography>
                      ) : null}
                    </Grid>
                  );
                })}
              {/* Showing the status of the round */}
              <Grid item xs={12}>
                {/* <Divider /> */}
                <Typography
                  sx={{
                    fontSize: 14,
                    float: "right",
                    fontWeight: "bold",
                    color:
                      drawResponse.status === "completed"
                        ? "#038147"
                        : "#ffab00",
                    borderBottom: "2px solid #999",
                    position: "absolute",
                    bottom: "1rem",
                    right: "1rem",
                  }}
                  color='text.secondary'
                >
                  <b className='b'>
                    {drawResponse && drawResponse.status
                      ? drawResponse.status
                      : ""}
                  </b>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DrawResult;

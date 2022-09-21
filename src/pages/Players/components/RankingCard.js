import { Box, Card, Divider, Grid, Typography } from "@mui/material";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import Points from "./Points";
import LoadingComponent from "../../../assets/utils/LoadingComponent";

const RankingCard = ({ loading, eventData }) => {
  const totalPoints = !loading && eventData.length && eventData[0].totPoints;
  return (
    <Grid container spacing={4}>
      {loading ? (
        <Box sx={{ width: "100%", textAlign: "center" }}>
          <LoadingComponent />
        </Box>
      ) : (
        eventData &&
        eventData.map((event, index) => (
          <Grid item xs={12} md={3} lg={3} xl={3} key={index}>
            <Card
              variant='outlined'
              sx={{
                borderRadius: "4px",
                padding: { xs: "0.5rem", md: "1rem" },
              }}
            >
              <Box sx={{ display: "flex" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <AssignmentIndIcon sx={{ fontSize: "4rem" }} />
                  </Box>
                  <Box>
                    <Points points={event.totPoints} total={totalPoints} />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    marginLeft: "0.5rem",
                  }}
                >
                  <Typography
                    variant='h6'
                    sx={{
                      fontSize: { xs: "6vw", sm: "1.2rem" },
                      fontWeight: "bold",
                      textTransform: "capitalize",
                    }}
                  >
                    {event.userName.toLowerCase()}
                  </Typography>
                  <Divider sx={{ margin: "0.5rem 0" }} />
                  <Typography
                    variant='body1'
                    sx={{ fontSize: { xs: "3vw", sm: "0.75rem" } }}
                  >
                    {event.academy}
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default RankingCard;

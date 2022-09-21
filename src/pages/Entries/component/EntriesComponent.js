import { Box, Button, Card, Grid } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import ViewEntriesContainer from "../container/ViewEntriesContainer";
import GiveEntriesContainer from "../container/GiveEntriesContainer";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

const EntriesComponent = ({ logOut, data }) => {
  const location = useLocation();

  const getActiveTab = () => {
    switch (location.pathname) {
      case "/entries/giveEntries":
        return <GiveEntriesContainer data={data} />;
      case "/entries/viewEntries":
        return <ViewEntriesContainer data={data} />;
      case "/entries/schedule":
        break;
      default:
        break;
    }
  };

  return (
    <Box
      sx={{
        marginBlock: { xs: "2rem", md: "2rem" },
        marginInline: "2vw",
        // maxWidth: "1120px",
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} md={3} lg={3}>
          <Card
            sx={{
              borderRadius: "4px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "1rem 0",
              marginTop: { xs: "-1rem", md: "0" },
            }}
          >
            <Box sx={{ margin: "1rem", width: "100%", paddingInline: "2rem" }}>
              <Link to='/entries/giveEntries'>
                <Button
                  variant={
                    location.pathname === "/entries/giveEntries"
                      ? "contained"
                      : "outlined"
                  }
                  sx={{
                    width: "100%",
                    background:
                      location.pathname === "/entries/giveEntries"
                        ? "#332861 !important"
                        : "transparent !important",
                    color:
                      location.pathname !== "/entries/giveEntries"
                        ? "#332861 !important"
                        : "#FFFFFF !important",
                    border: `1px solid ${
                      location.pathname !== "/entries/giveEntries"
                        ? "#332861"
                        : "none"
                    }`,
                    "&:hover": {
                      border: `1px solid ${
                        location.pathname !== "/entries/giveEntries"
                          ? "#332861"
                          : "none"
                      }`,
                    },
                  }}
                >
                  <PlaylistAddIcon sx={{ marginRight: "0.5rem" }} />
                  Give Entry
                </Button>
              </Link>
            </Box>
            <Box sx={{ margin: "1rem", width: "100%", paddingInline: "2rem" }}>
              <Link to='/entries/viewEntries'>
                <Button
                  variant={
                    location.pathname === "/entries/viewEntries"
                      ? "contained"
                      : "outlined"
                  }
                  sx={{
                    width: "100%",
                    background:
                      location.pathname === "/entries/viewEntries"
                        ? "#332861 !important"
                        : "transparent !important",
                    color:
                      location.pathname !== "/entries/viewEntries"
                        ? "#332861 !important"
                        : "#FFFFFF !important",
                    border: `1px solid ${
                      location.pathname !== "/entries/viewEntries"
                        ? "#332861"
                        : "none"
                    }`,
                    "&:hover": {
                      border: `1px solid ${
                        location.pathname !== "/entries/viewEntries"
                          ? "#332861"
                          : "none"
                      }`,
                    },
                  }}
                >
                  <ListAltIcon sx={{ marginRight: "0.5rem" }} />
                  View Entries
                </Button>
              </Link>
            </Box>
            {/* <Box sx={{ margin: "1rem", width: "100%", paddingInline: "2rem" }}>
              <Button
                variant={
                  location.pathname === "/entries/schedule"
                    ? "contained"
                    : "outlined"
                }
                sx={{ width: "100%" }}
              >
                Schedule
              </Button>
            </Box> */}
            <Box sx={{ margin: "1rem", width: "100%", paddingInline: "2rem" }}>
              <Link
                to='/login'
                onClick={() => {
                  logOut();
                }}
              >
                <Button
                  variant='contained'
                  sx={{
                    width: "100%",
                    background: "#d32f2f",
                    "&:hover": {
                      background: "#c62828",
                    },
                  }}
                >
                  <span
                    className='material-icons'
                    style={{ fontSize: "1rem", margin: "0.5vh" }}
                  >
                    logout
                  </span>
                  Logout
                </Button>
              </Link>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={9} lg={9}>
          {getActiveTab()}
        </Grid>
      </Grid>
    </Box>
  );
};

export default EntriesComponent;

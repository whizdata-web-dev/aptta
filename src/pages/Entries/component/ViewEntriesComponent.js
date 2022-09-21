import {
  Box,
  Card,
  Divider,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import LoadingComponent from "../../../assets/utils/LoadingComponent";
import ViewEntriesTable from "./ViewEntriesTable";
import ttTable from "../../../assets/img/tt_table.jpg";

const ViewEntriesComponent = ({
  tournamentName,
  eventId,
  eventDetails,
  handleChange,
  loadingPlayerData,
  playersData,
}) => {  
  return (
    <Card sx={{ borderRadius: "4px", padding: "2rem" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant='h5'>{tournamentName} Entries</Typography>
      </Box>
      <Box sx={{ marginBlock: "1rem 1rem" }}>
        <Divider />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          marginBlock: "1rem",
        }}
      >
        <FormControl sx={{ m: 1, minWidth: 300 }}>
          <Select
            value={eventId}
            onChange={handleChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            {eventDetails &&
              eventDetails.map(({ eventName, eventId }) => {
                return (
                  <MenuItem key={eventId} value={eventName}>
                    {eventName}
                  </MenuItem>
                );
              })}
          </Select>
          <FormHelperText sx={{ textAlign: "center" }}>
            Choose event Name
          </FormHelperText>
        </FormControl>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!eventId && (
          <img
            src={ttTable}
            alt='...'
            width='100%'
            style={{ maxWidth: "500px" }}
          />
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {loadingPlayerData ? (
          <LoadingComponent />
        ) : (
          playersData && <ViewEntriesTable rows={playersData} />
        )}
      </Box>
    </Card>
  );
};

export default ViewEntriesComponent;

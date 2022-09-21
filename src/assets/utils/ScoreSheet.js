import { Box, Typography } from "@mui/material";
import React from "react";

const ScoreSheet = () => {
  return (
    <Box sx={{ padding: "2rem", background: "#fff" }}>
      <Box sx={{ textAlign: "center", marginBottom: "1rem" }}>
        <Box>
          <Typography variant='h4'>TournamentName</Typography>
        </Box>
        <Box>
          <Typography variant='body2'>TournamentVanue</Typography>
        </Box>
      </Box>
      <Box>
        <Box
          sx={{
            display: "flex",
            "& *": {
              border: "1px solid #333",
              padding: "0.5rem",
            },
          }}
        >
          <Box sx={{ width: "40%" }}>Event: </Box>
          <Box sx={{ width: "15%" }}>Round: </Box>
          <Box sx={{ width: "15%" }}>Match: </Box>
          <Box sx={{ width: "30%" }}>1 Jan 2022 - 2 Jan 2022</Box>
        </Box>
        <Box sx={{ display: "flex", textAlign: "center" }}>
          <Box
            sx={{ width: "5%", border: "1px solid #333", padding: "0.5rem" }}
          >
            Sl No
          </Box>
          <Box
            sx={{ width: "30%", border: "1px solid #333", padding: "0.5rem" }}
          >
            NAME OF THE PLAYER
          </Box>
          <Box
            sx={{ width: "5%", border: "1px solid #333", padding: "0.5rem" }}
          >
            1
          </Box>
          <Box
            sx={{ width: "5%", border: "1px solid #333", padding: "0.5rem" }}
          >
            2
          </Box>
          <Box
            sx={{ width: "5%", border: "1px solid #333", padding: "0.5rem" }}
          >
            3
          </Box>
          <Box
            sx={{ width: "5%", border: "1px solid #333", padding: "0.5rem" }}
          >
            4
          </Box>
          <Box
            sx={{ width: "5%", border: "1px solid #333", padding: "0.5rem" }}
          >
            5
          </Box>
          <Box
            sx={{ width: "5%", border: "1px solid #333", padding: "0.5rem" }}
          >
            6
          </Box>
          <Box
            sx={{ width: "5%", border: "1px solid #333", padding: "0.5rem" }}
          >
            7
          </Box>
          <Box
            sx={{ width: "15%", border: "1px solid #333", padding: "0.5rem" }}
          >
            TIME OUT
          </Box>
          <Box
            sx={{ width: "15%", border: "1px solid #333", padding: "0.5rem" }}
          >
            TABLE
          </Box>
        </Box>
        <Box sx={{ display: "flex", textAlign: "center" }}>
          <Box
            sx={{ width: "5%", border: "1px solid #333", padding: "0.5rem" }}
          >
            &nbsp;
          </Box>
          <Box
            sx={{ width: "30%", border: "1px solid #333", padding: "0.5rem" }}
          >
            &nbsp;
          </Box>
          <Box
            sx={{ width: "5%", border: "1px solid #333", padding: "0.5rem" }}
          >
            &nbsp;
          </Box>
          <Box
            sx={{ width: "5%", border: "1px solid #333", padding: "0.5rem" }}
          >
            &nbsp;
          </Box>
          <Box
            sx={{ width: "5%", border: "1px solid #333", padding: "0.5rem" }}
          >
            &nbsp;
          </Box>
          <Box
            sx={{ width: "5%", border: "1px solid #333", padding: "0.5rem" }}
          >
            &nbsp;
          </Box>
          <Box
            sx={{ width: "5%", border: "1px solid #333", padding: "0.5rem" }}
          >
            &nbsp;
          </Box>
          <Box
            sx={{ width: "5%", border: "1px solid #333", padding: "0.5rem" }}
          >
            &nbsp;
          </Box>
          <Box
            sx={{ width: "5%", border: "1px solid #333", padding: "0.5rem" }}
          >
            &nbsp;
          </Box>
          <Box
            sx={{ width: "15%", border: "1px solid #333", padding: "0.5rem" }}
          >
            &nbsp;
          </Box>
          <Box
            sx={{
              width: "15%",
              border: "1px solid #333",
              padding: "0.5rem",
              borderStyle: "solid solid none solid",
            }}
          >
            &nbsp;
          </Box>
        </Box>
        <Box sx={{ display: "flex", textAlign: "center" }}>
          <Box
            sx={{ width: "5%", border: "1px solid #333", padding: "0.5rem" }}
          >
            &nbsp;
          </Box>
          <Box
            sx={{ width: "30%", border: "1px solid #333", padding: "0.5rem" }}
          >
            &nbsp;
          </Box>
          <Box
            sx={{ width: "5%", border: "1px solid #333", padding: "0.5rem" }}
          >
            &nbsp;
          </Box>
          <Box
            sx={{ width: "5%", border: "1px solid #333", padding: "0.5rem" }}
          >
            &nbsp;
          </Box>
          <Box
            sx={{ width: "5%", border: "1px solid #333", padding: "0.5rem" }}
          >
            &nbsp;
          </Box>
          <Box
            sx={{ width: "5%", border: "1px solid #333", padding: "0.5rem" }}
          >
            &nbsp;
          </Box>
          <Box
            sx={{ width: "5%", border: "1px solid #333", padding: "0.5rem" }}
          >
            &nbsp;
          </Box>
          <Box
            sx={{ width: "5%", border: "1px solid #333", padding: "0.5rem" }}
          >
            &nbsp;
          </Box>
          <Box
            sx={{ width: "5%", border: "1px solid #333", padding: "0.5rem" }}
          >
            &nbsp;
          </Box>
          <Box
            sx={{ width: "15%", border: "1px solid #333", padding: "0.5rem" }}
          >
            &nbsp;
          </Box>
          <Box
            sx={{
              width: "15%",
              border: "1px solid #333",
              padding: "0.5rem",
              borderStyle: "none solid solid solid",
            }}
          >
            &nbsp;
          </Box>
        </Box>
      </Box>
      <Box>
        <Box
          sx={{
            display: "flex",
            marginTop: "2rem",
            "& *": {
              border: "1px solid #333",
              padding: "0.5rem",
              textAlign: "center",
            },
          }}
        >
          <Box sx={{ width: "33%" }}>WINNER </Box>
          <Box sx={{ width: "34%" }}>UMPIRE </Box>
          <Box sx={{ width: "33%" }}>REFREE </Box>
        </Box>
        <Box sx={{ display: "flex", textAlign: "center" }}>
          <Box
            sx={{ width: "33%", border: "1px solid #333", padding: "0.5rem" }}
          >
            &nbsp;
          </Box>
          <Box
            sx={{ width: "34%", border: "1px solid #333", padding: "0.5rem" }}
          >
            &nbsp;
          </Box>
          <Box
            sx={{ width: "33%", border: "1px solid #333", padding: "0.5rem" }}
          >
            &nbsp;
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ScoreSheet;

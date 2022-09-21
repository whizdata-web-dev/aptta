import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import FetchData from "../../assets/utils/FetchData";
import LoadingComponent from "../../assets/utils/LoadingComponent";
import CardStats from "../../components/card/component/CardStats";
import DrawTable from "./components/DrawTable";

const Result = () => {
  const { data } = FetchData({
    method: "GET",
    url: `PastTournamentsOnApiKey?caller=${process.env.REACT_APP_CALLER}&apiKey=${process.env.REACT_APP_API_KEY}&userId=${process.env.REACT_APP_USER_ID}`,
    pathname: "result",
  });

  const [yearList, setYearList] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedData, setSelectedData] = useState(null);

  const filterTournamentData = (year) => {
    setSelectedData(
      data.resultID.filter(
        (tournamentDetails) =>
          parseInt(tournamentDetails.eventCreatedDate.substring(0, 4)) === year
      )
    );
  };

  useEffect(() => {
    const d = new Date();
    let year = d.getFullYear();

    setSelectedYear(year);

    if (Object.keys(data).length > 0) {
      filterTournamentData(year);

      let list = [];
      data.resultID.forEach((tournamentDetails) => {
        list.push(tournamentDetails.eventCreatedDate.substring(0, 4));
      });
      setYearList(
        list.filter(function (item, pos) {
          return list.indexOf(item) === pos;
        })
      );
    }
  }, [data]); // eslint-disable-line

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    filterTournamentData(parseInt(event.target.value));
  };

  return (
    <Box>
      {selectedData ? (
        window.innerWidth > 900 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "6rem",
            }}
          >
            <DrawTable
              rows={selectedData}
              selectedYear={selectedYear}
              yearList={yearList}
              handleYearChange={handleYearChange}
            />
          </Box>
        ) : (
          <Box className='flex flex-wrap' sx={{ paddingTop: "1rem" }}>
            <Box className='w-full px-4 py-4'>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel
                  id='demo-simple-select-label'
                  sx={{ fontWeight: "bold" }}
                >
                  Year
                </InputLabel>
                <Select
                  label='Year'
                  value={selectedYear}
                  onChange={handleYearChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  {yearList &&
                    yearList.map((year, index) => {
                      return (
                        <MenuItem key={index} value={year}>
                          {year}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </Box>

            {selectedData.map((tournament, index) => (
              <Box
                className='w-full lg:w-6/12 xl:w-3/12 px-4'
                key={index}
                sx={{ margin: { xs: "0.3rem 0", lg: "1rem 0" } }}
              >
                <CardStats
                  title={tournament.eventName}
                  subtitle={`${tournament.eventStartDate} - ${tournament.eventEndDate}`}
                  link={tournament._id}
                  statIconColor='bg-indigo-500'
                  buttonName='View Result'
                />
              </Box>
            ))}
          </Box>
        )
      ) : (
        <LoadingComponent />
      )}
    </Box>
  );
};

export default Result;

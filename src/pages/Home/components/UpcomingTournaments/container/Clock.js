import { Box, Grid } from "@mui/material";
import { useEffect } from "react";
import "./clock.css";

const Clock = () => {
  function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    if (t < 0 && seconds < 0 && minutes < 0 && hours < 0 && days < 0) {
      t = 0;
      seconds = 0;
      minutes = 0;
      hours = 0;
      days = 0;
    }
    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var daysSpan = clock.querySelector(".days");
    var hoursSpan = clock.querySelector(".hours");
    var minutesSpan = clock.querySelector(".minutes");
    var secondsSpan = clock.querySelector(".seconds");

    function updateClock() {
      var t = getTimeRemaining(endtime);

      daysSpan.innerHTML = t.days;
      hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
      minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
      secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);

      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
  }
  var deadLineDate = "2022 Aug 26";
  var splitTime = deadLineDate.split(" ");
  var monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var monthNumber = monthNames.indexOf(splitTime[1]);
  var newMonthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var monthn = newMonthNames[monthNumber];
  var newDate =
    monthn + " " + splitTime[2] + "," + splitTime[0] + " " + "00:00:00";

  var deadline = new Date(newDate);
  if (deadline == undefined) {
    deadline = new Date("April 25, 2018 17:15:00");
  } else {
    deadline = new Date(newDate);
  }
  //var deadline =  new Date("April 25, 2018 17:15:00");
  useEffect(() => {
    initializeClock("clockBox", deadline);
  }, []);

  return (
    <Grid
      container
      id='clockBox'
      sx={{
        "& *": {
          fontFamily: "'Oswald', sans-serif",
          fontWeight: "bold",
          color: "#de4848",
        },
      }}
    >
      <Grid item xs={3} sx={{ textAlign: "center" }}>
        <Box class='days'>4</Box>
        <Box class='smalltext'>Days</Box>
      </Grid>
      <Grid item xs={3} sx={{ textAlign: "center" }}>
        <Box class='hours'>22</Box>
        <Box class='smalltext'>Hours</Box>
      </Grid>
      <Grid item xs={3} sx={{ textAlign: "center" }}>
        <Box class='minutes'>40</Box>
        <Box class='smalltext'>Minutes</Box>
      </Grid>
      <Grid item xs={3} sx={{ textAlign: "center" }}>
        <Box class='seconds'>16</Box>
        <Box class='smalltext'>Seconds</Box>
      </Grid>
    </Grid>
  );
};

export default Clock;

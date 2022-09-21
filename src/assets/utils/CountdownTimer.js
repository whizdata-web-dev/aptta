import { Box } from "@mui/material";
import { useEffect } from "react";
import "./countdownTimer.css";

const CountdownTimer = ({ date }) => {
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

  let dateArray = date.split(" ");
  dateArray[1] = monthNames.indexOf(dateArray[1]).toString();
  let tempYear = dateArray[0];
  dateArray[0] = dateArray[1];
  dateArray[1] = dateArray[2];
  dateArray[2] = tempYear;

  console.log("dateArray", new Date(dateArray.join("/")));
  const countToDate = new Date();
  let previousTimeBetweenDates;

  useEffect(() => {
    setInterval(() => {
      const currentDate = new Date(dateArray.join("/"));
      const timeBetweenDates = Math.ceil((countToDate - currentDate) / 1000);
      flipAllCards(timeBetweenDates);

      previousTimeBetweenDates = timeBetweenDates;
    }, 500);
  }, []);

  function flipAllCards(time) {
    const seconds = time % 60;
    const minutes = Math.floor(time / 60) % 60;
    const hours = Math.floor(time / 3600);

    flip(document.querySelector("[data-hours-tens]"), Math.floor(hours / 10));
    flip(document.querySelector("[data-hours-ones]"), hours % 10);
    flip(
      document.querySelector("[data-minutes-tens]"),
      Math.floor(minutes / 10)
    );
    flip(document.querySelector("[data-minutes-ones]"), minutes % 10);
    flip(
      document.querySelector("[data-seconds-tens]"),
      Math.floor(seconds / 10)
    );
    flip(document.querySelector("[data-seconds-ones]"), seconds % 10);
  }

  function flip(flipCard, newNumber) {
    const topHalf = flipCard.querySelector(".top");
    const startNumber = parseInt(topHalf.textContent);
    if (newNumber === startNumber) return;

    const bottomHalf = flipCard.querySelector(".bottom");
    const topFlip = document.createElement("Box");
    topFlip.classList.add("top-flip");
    const bottomFlip = document.createElement("Box");
    bottomFlip.classList.add("bottom-flip");

    topHalf.textContent = startNumber;
    bottomHalf.textContent = startNumber;
    topFlip.textContent = startNumber;
    bottomFlip.textContent = newNumber;

    topFlip.addEventListener("animationstart", (e) => {
      topHalf.textContent = newNumber;
    });
    topFlip.addEventListener("animationend", (e) => {
      topFlip.remove();
    });
    bottomFlip.addEventListener("animationend", (e) => {
      bottomHalf.textContent = newNumber;
      bottomFlip.remove();
    });
    flipCard.append(topFlip, bottomFlip);
  }

  return (
    <Box className='timer_container'>
      <Box className='timer_body'>
        <Box class='timer_container'>
          <Box class='container-segment'>
            <Box class='segment-title'>Hours</Box>
            <Box class='segment'>
              <Box class='flip-card' data-hours-tens>
                <Box class='top'>2</Box>
                <Box class='bottom'>2</Box>
              </Box>
              <Box class='flip-card' data-hours-ones>
                <Box class='top'>4</Box>
                <Box class='bottom'>4</Box>
              </Box>
            </Box>
          </Box>
          <Box class='container-segment'>
            <Box class='segment-title'>Minutes</Box>
            <Box class='segment'>
              <Box class='flip-card' data-minutes-tens>
                <Box class='top'>0</Box>
                <Box class='bottom'>0</Box>
              </Box>
              <Box class='flip-card' data-minutes-ones>
                <Box class='top'>0</Box>
                <Box class='bottom'>0</Box>
              </Box>
            </Box>
          </Box>
          <Box class='container-segment'>
            <Box class='segment-title'>Seconds</Box>
            <Box class='segment'>
              <Box class='flip-card' data-seconds-tens>
                <Box class='top'>0</Box>
                <Box class='bottom'>0</Box>
              </Box>
              <Box class='flip-card' data-seconds-ones>
                <Box class='top'>0</Box>
                <Box class='bottom'>0</Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CountdownTimer;

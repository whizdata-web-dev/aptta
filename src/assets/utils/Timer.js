import { useEffect, useState } from "react";
import "./countdownTimer.css";
import { Box } from "@mui/material";

const Timer = ({ date, color }) => {
  const [expiryTime, setExpiryTime] = useState(date);

  const countdownTimer = () => {
    const timeInterval = setInterval(() => {
      const countdownDateTime = new Date(expiryTime).getTime();
      const currentTime = new Date().getTime();
      const remainingDayTime = countdownDateTime - currentTime;
      const totalDays = Math.floor(remainingDayTime / (1000 * 60 * 60 * 24));
      const totalHours = Math.floor(
        (remainingDayTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const totalMinutes = Math.floor(
        (remainingDayTime % (1000 * 60 * 60)) / (1000 * 60)
      );
      const totalSeconds = Math.floor((remainingDayTime % (1000 * 60)) / 1000);

      const runningCountdownTime = {
        countdownDays: totalDays,
        countdownHours: totalHours,
        countdownMinutes: totalMinutes,
        countdownSeconds: totalSeconds,
      };

      flipAllCards(runningCountdownTime);

      if (remainingDayTime < 0) {
        clearInterval(timeInterval);
        setExpiryTime(false);
      }
    }, 400);
  };

  useEffect(() => {
    countdownTimer();
  }, []);

  function flipAllCards(runningCountdownTime) {
    const seconds = runningCountdownTime.countdownSeconds;
    const minutes = runningCountdownTime.countdownMinutes;
    const hours = runningCountdownTime.countdownHours;
    const days = runningCountdownTime.countdownDays;

    flip(document.querySelector("[data-days-tens]"), Math.floor(days / 10));
    flip(document.querySelector("[data-days-ones]"), days % 10);
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
    if (flipCard) {
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
    } else {
      return;
    }
  }

  return (
    <div className='row'>
      <div className='col-sm-6'>
        <div className='btn-group my-3'>
          {expiryTime !== false ? (
            <Box className='timer_container'>
              <Box
                className='timer_body'
                sx={{ color: color === "red" ? "#de4848" : "#01579b" }}
              >
                <Box className='timer_container'>
                  <Box className='container-segment'>
                    <Box className='segment-title'>Days</Box>
                    <Box className='segment'>
                      <Box className='flip-card' data-days-tens>
                        <Box className='top'>0</Box>
                        <Box className='bottom'>0</Box>
                      </Box>
                      <Box className='flip-card' data-days-ones>
                        <Box className='top'>0</Box>
                        <Box className='bottom'>0</Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box className='container-segment'>
                    <Box className='segment-title'>Hours</Box>
                    <Box className='segment'>
                      <Box className='flip-card' data-hours-tens>
                        <Box className='top'>0</Box>
                        <Box className='bottom'>0</Box>
                      </Box>
                      <Box className='flip-card' data-hours-ones>
                        <Box className='top'>0</Box>
                        <Box className='bottom'>0</Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box className='container-segment'>
                    <Box className='segment-title'>Minutes</Box>
                    <Box className='segment'>
                      <Box className='flip-card' data-minutes-tens>
                        <Box className='top'>0</Box>
                        <Box className='bottom'>0</Box>
                      </Box>
                      <Box className='flip-card' data-minutes-ones>
                        <Box className='top'>0</Box>
                        <Box className='bottom'>0</Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box className='container-segment'>
                    <Box className='segment-title'>Seconds</Box>
                    <Box className='segment'>
                      <Box className='flip-card' data-seconds-tens>
                        <Box className='top'>0</Box>
                        <Box className='bottom'>0</Box>
                      </Box>
                      <Box className='flip-card' data-seconds-ones>
                        <Box className='top'>0</Box>
                        <Box className='bottom'>0</Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          ) : (
            <p>Deal has been Expired</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Timer;

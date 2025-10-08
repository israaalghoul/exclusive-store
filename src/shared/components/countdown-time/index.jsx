import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const CountdownTimer = () => {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 3);

  const calculateTimeLeft = () => {
    const difference = +targetDate - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const labels = ["Days", "Hours", "Minutes", "Seconds"];
  const values = [
    timeLeft.days,
    timeLeft.hours,
    timeLeft.minutes,
    timeLeft.seconds,
  ];
  const Dots = () => (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{
        position: "relative",
        top: "1em",
        mx: 1.5,
      }}
    >
      <Box
        sx={(theme) => ({
          width: 4,
          height: 4,
          borderRadius: "50%",
          background: theme.palette.custom.hover.primary,
          mb: 1,
        })}
      />
      <Box
        sx={(theme) => ({
          width: 4,
          height: 4,
          borderRadius: "50%",
          background: theme.palette.custom.hover.primary,
          mb: 1,
        })}
      />
    </Box>
  );
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap={2.125}
      sx={{ fontFamily: "Inter, sans-serif" }}
    >
      {labels.map((label, index) => (
        <React.Fragment key={label}>
          <Box textAlign="center">
            <Typography
              variant="subtitle1"
              sx={{
                fontSize: "1.2rem",
                fontWeight: 500,
                color: "#000",
                mb: 0.5,
              }}
            >
              {label}
            </Typography>
            <Typography
              variant="h4"
              sx={{ fontSize: "3.2rem", fontWeight: 700, color: "#000" }}
            >
              {values[index].toString().padStart(2, "0")}
            </Typography>
          </Box>
          {index < labels.length - 1 && <Dots />}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default CountdownTimer;

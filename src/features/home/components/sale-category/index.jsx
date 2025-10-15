import { alpha, styled } from "@mui/material/styles";
import { Box, Typography, Button, Grid, Paper } from "@mui/material";
import heroImg1 from "../../../../assets/images/png/hero1.png";
import heroImg2 from "../../../../assets/images/png/hero2.png";
import heroImg3 from "../../../../assets/images/png/hero3.png";
import { appRoutes } from "../../../../routes/index";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

export default function SaleCategory() {
  const navigate = useNavigate();
  const targetDate =
    new Date().getTime() + 5 * 24 * 60 * 60 * 1000 + 23 * 60 * 60 * 1000; 
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "50.0rem",
        bgcolor: "#000",
        color: "#fff",
        overflow: "hidden",
        marginTop: "4.0rem",
        display: "flex",
        direction: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "4.3rem",
        padding: "6.0rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          flexDirection: "column",
          backgroundColor: "#000",
          maxWidth: "40%",
          gap:"3.2rem",

        }}
      >
        <Typography
          sx={(theme) => ({
            fontSize: "1.6rem",
            fontWeight: 400,
            color: theme.palette.custom.btnSecondary.main,
            // paddingTop: "7.2rem",
          })}
        >
          Categories
        </Typography>
        <Typography
          variant="h2"
          sx={(theme) => ({
            fontSize: "4.8rem",
            fontWeight: 600,
            color: theme.palette.custom.btnPrimary.contrastText,
          })}
        >
          Enhance Your Music Experience
        </Typography>
        <Grid container spacing={2} sx={{ mt: 3, mb: 3 }}>
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Minutes", value: timeLeft.minutes },
            { label: "Seconds", value: timeLeft.seconds },
          ].map((item, index) => (
            <Grid item key={index}>
              <Paper
                sx={(theme)=>({
                  width: 62,
                  height: 62,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  bgcolor: theme.palette.custom.btnSecondary.contrastText,
                  color: "#000",
                  fontWeight: "bold",
                })}
              >
                <Typography variant="h6" sx={{fontSize:"1.6rem", fontWeight:600}}>{item.value}</Typography>
                <Typography variant="caption" sx={{fontSize:"1.1rem", fontWeight:400}}>{item.label}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Button
          variant="contained"
          sx={(theme)=>({
            bgcolor: theme.palette.custom.btnSecondary.main,
            color:  theme.palette.custom.btnSecondary.contrastText,
            fontWeight: 500,
            borderRadius: 0.5,
            px: 4,
            py: 1.5,
            "&:hover": { bgcolor: "#00cc6d" },
          })}
        >
          Buy Now!
        </Button>
      </Box>
      {/* Img */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          "&::before": {
            content: '""',
            position: "absolute",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(226, 226, 226, 0.96) 0%, rgba(0,0,0,0) 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            filter: "blur(150px)",
            zIndex: 0,
          },
        }}>
        <Box
          component="img"
          src={heroImg1}
          alt={"hero-categories"}
          sx={{ position: "relative", zIndex: 2 }}
        />
      </Box>
    </Box>
  );
}

import { alpha, styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";


import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

const services = [
  {
    icon: <LocalShippingIcon sx={{ fontSize: 32, color: "#fff" }} />,
    title: "FREE AND FAST DELIVERY",
    subtitle: "Free delivery for all orders over $140",
  },
  {
    icon: <HeadsetMicIcon sx={{ fontSize: 32, color: "#fff" }} />,
    title: "24/7 CUSTOMER SERVICE",
    subtitle: "Friendly 24/7 customer support",
  },
  {
    icon: <VerifiedUserIcon sx={{ fontSize: 32, color: "#fff" }} />,
    title: "MONEY BACK GUARANTEE",
    subtitle: "We return money within 30 days",
  },
];

export default function ServiceFeatures() {
  return (
    <Box
      sx={{
        py: "14.0rem",
        px: { xs: "2rem", sm: "4rem", md: "6rem" },
        backgroundColor: "#fff",
      }}
    >
      <Grid container spacing={15} justifyContent="center" alignItems="center">
        {services.map((service, index) => (
          <Grid
            key={index}
            item
            xs={12}
            sm={6}
            md={4}
            sx={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1.2rem",
            }}
          >
            {/* Icon*/}
            <Box
              sx={{
                width: "6rem",
                height: "6rem",
                borderRadius: "50%",
                backgroundColor: "#000",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  width: "8rem",
                  height: "8rem",
                  borderRadius: "50%",
                  backgroundColor: "#e0e0e0",
                  zIndex: -1,
                },
              }}
            >
              {service.icon}
            </Box>

            {/*Title*/}
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, fontSize: "1.6rem", color: "#000" }}
            >
              {service.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#666", fontSize: "1.3rem" }}
            >
              {service.subtitle}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

import React from "react";
import { Card, Box, Typography } from "@mui/material";

export function ItemFeature({ title, desc, children }) {
  return (
    <Card
      elevation={4}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        borderRadius: 3,
        py: 5,
        px: 3,
        width: { xs: "90%", sm: "60%", md: "30%" },
        mx: "auto",
        transition: "0.3s",
        "&:hover": {
          boxShadow: 6,
          transform: "translateY(-5px)",
        },
      }}
    >
      {/* أيقونة داخل دائرة */}
      <Box
        sx={{
          width: 110,
          height: 110,
          borderRadius: "50%",
          backgroundColor: "primary.light",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 3,
        }}
      >
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            backgroundColor: "primary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "primary.contrastText",
            transition: "0.3s",
            "&:hover": {
              transform: "scale(1.1)",
              backgroundColor: "primary.dark",
            },
          }}
        >
          {children}
        </Box>
      </Box>

      {/* العنوان */}
      <Typography
        variant="h6"
        fontWeight={700}
        sx={{
          color: "primary.main",
          textTransform: "capitalize",
          mb: 1,
        }}
      >
        {title}
      </Typography>

      {/* الوصف */}
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{
          textTransform: "capitalize",
        }}
      >
        {desc}
      </Typography>
    </Card>
  );
}

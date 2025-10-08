import React from "react";
import { Card, Box, Typography } from "@mui/material";

export function ItemInfo({ icon, number, title }) {
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
        border: "1px solid",
        borderColor: "divider",
        p: 4,
        transition: "0.3s",
        width: { xs: "80%", sm: "40%", md: "20%" },
        mx: "auto",
        "&:hover": {
          backgroundColor: "primary.main",
          color: "primary.contrastText",
          boxShadow: 6,
          transform: "translateY(-5px)",
        },
      }}
    >
      {/* دائرة الأيقونة */}
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
          transition: "0.3s",
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
            transition: "0.3s",
            "&:hover": {
              transform: "scale(1.1)",
              backgroundColor: "primary.dark",
            },
          }}
        >
          {icon}
        </Box>
      </Box>

      {/* الرقم */}
      <Typography
        variant="h4"
        fontWeight={700}
        sx={{ color: "primary.main", mb: 1 }}
      >
        {number}k
      </Typography>

      {/* العنوان */}
      <Typography
        variant="h6"
        fontWeight={600}
        sx={{
          color: "text.primary",
          transition: "0.3s",
        }}
      >
        {title}
      </Typography>
    </Card>
  );
}

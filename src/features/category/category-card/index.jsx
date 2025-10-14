import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

export function CategoryCard({ icon: Icon, label, active, img, onClick }) {
  const theme = useTheme();
  const [isHover, setIsHover] = React.useState(false);

  const isActiveOrHover = active || isHover;
  const bgColor = isActiveOrHover
    ? theme.palette.custom.btnPrimary.main
    : "transparent";
  const textColor = isActiveOrHover ? "#fff" : theme.palette.text.primary;

  return (
    <Box
      onClick={onClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      sx={{
        width: 170,
        height: 145,
        borderRadius: 2,
        border: `1px solid ${theme.palette.divider}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        cursor: "pointer",
        transition: "all 0.3s ease",
        bgcolor: bgColor,
        color: textColor,
        "&:hover": {
          bgcolor: theme.palette.custom.btnPrimary.main,
          color: "#fff",
        },
      }}
    >
      {img ? (
        <Box component="img" src={img} alt={label} sx={{ width: 48, height: 48 }} />
      ) : Icon ? (
        <Icon sx={{ fontSize: 40, transition: "color 0.3s ease", color: textColor }} />
      ) : null}

      <Typography
        sx={{
          fontSize: 16,
          fontWeight: 400,
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}

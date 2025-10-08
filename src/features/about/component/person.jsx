import React from "react";
import { Card, CardContent, Avatar, Typography, Box, IconButton } from "@mui/material";
import { Instagram, Linkedin, Twitter } from "lucide-react";

export function Person({ name, job, img }) {
  return (
    <Card
      elevation={4}
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        transition: "0.3s",
        "&:hover": {
          boxShadow: 8,
          transform: "translateY(-5px)",
        },
      }}
    >
      {/* الصورة */}
      <Box
        sx={{
          backgroundColor: "divider",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          pt: 2,
          pb: 0,
        }}
      >
        <Avatar
          src={img}
          alt={name}
          variant="rounded"
          sx={{
            width: "50%",
            aspectRatio: "9/16",
            mb: -2,
            borderRadius: 2,
            boxShadow: 3,
          }}
        />
      </Box>

      {/* النصوص */}
      <CardContent sx={{ textAlign: "center", pt: 3 }}>
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{ color: "primary.main", mb: 0.5 }}
        >
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          {job}
        </Typography>

        {/* روابط التواصل */}
        <Box display="flex" justifyContent="center" gap={1.5}>
          <IconButton size="small" color="primary">
            <Twitter size={18} />
          </IconButton>
          <IconButton size="small" color="primary">
            <Instagram size={18} />
          </IconButton>
          <IconButton size="small" color="primary">
            <Linkedin size={18} />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}

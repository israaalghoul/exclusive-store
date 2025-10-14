import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { HeaderSection } from "../../../shared/components/header-section";
import { appRoutes } from "../../../routes";
import newArrival1 from "../../../assets/images/png/new-arrival1.png";
import newArrival2 from "../../../assets/images/png/new-arrival2.png";
import newArrival3 from "../../../assets/images/png/new-arrival3.png";
import newArrival4 from "../../../assets/images/png/new-arrival4.png";

// General Component
const NewArrivalCard = ({ image, title, description, height, onClick }) => (
  <Box
    sx={{
      position: "relative",
      height,
      overflow: "hidden",
      borderRadius: "4px",
      bgcolor: "#000",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Box
      component="img"
      src={image}
      alt={title}
      sx={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />

    <Box
      sx={{
        position: "absolute",
        bottom: "2.4rem",
        left: "2.4rem",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        zIndex: 2,
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontSize: "2.4rem", fontWeight: 600, color: "#fff" }}
      >
        {title}
      </Typography>
      <Typography
        variant="body2"
        sx={{ fontSize: "1.4rem", fontWeight: 400, color: "#fff" }}
      >
        {description}
      </Typography>
      <Button
        onClick={onClick}
        sx={(theme) => ({
          textTransform: "none",
          color: theme.palette.custom.btnPrimary.contrastText,
          fontWeight: 500,
          textDecoration: "underline",
          padding: 0,
          alignSelf: "flex-start",
        })}
      >
        Shop Now
      </Button>
    </Box>
  </Box>
);

export default function NewArrivalPage() {
  const navigate = useNavigate();

  const handleShopNow = () => navigate(appRoutes.home);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "4rem",
      }}
    >
      <HeaderSection
        title="New Arrival"
        subtitle="Featured"
        showTimer={false}
        marginTop="7rem"
        showButton={false}
        showArrow={false}
      />

      {/* Main Grid */}
      <Grid
        container
        spacing={3}
        sx={{
          width: "100%",
          height: "auto",
        }}
      >
        {/* Left Side */}
        <Grid item xs={12} md={6}>
          <NewArrivalCard
            image={newArrival1}
            title="PlayStation 5"
            description="Black and White version of the PS5 coming out on sale."
            height="60rem"
            onClick={handleShopNow}
          />
        </Grid>

        {/*Right Side*/}
        <Grid item xs={12} md={6} container spacing={4} direction="column">
          {/* Upper Card*/}
          <Grid item>
            <NewArrivalCard
              image={newArrival2}
              title="Women’s Collections"
              description="Featured woman collections that give you another vibe."
              height="28.4rem"
              onClick={handleShopNow}
            />
          </Grid>

          {/* Lower Cards*/}
          <Grid item container spacing={3}>
            <Grid item xs={12} sm={6}>
              <NewArrivalCard
                image={newArrival3}
                title="Speakers"
                description="Amazon wireless speakers"
                height="28.4rem"
                onClick={handleShopNow}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <NewArrivalCard
                image={newArrival4}
                title="Perfume"
                description="GUCCI INTENSE OUD EDP"
                height="28.4rem"
                onClick={handleShopNow}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

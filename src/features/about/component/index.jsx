import React from "react";
import {
  Container,
  Box,
  Grid,
  Typography,
  Breadcrumbs,
  Link,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import ServiceFeatures from "../../delivery-section"
// MUI Icons
import StoreIcon from "@mui/icons-material/Store";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// Images
import aboutImg from "../../../assets/images/png/about.png";
import person1 from "../../../assets/images/png/person1.png";
import person2 from "../../../assets/images/png/person2.png";
import person3 from "../../../assets/images/png/person3.png";
import { appRoutes } from "../../../routes";

export function AboutSection() {
  const stats = [
    { icon: <StoreIcon fontSize="large" />, number: "10.5k", title: "Sellers active on our site" },
    { icon: <ReceiptLongIcon fontSize="large" />, number: "33k", title: "Monthly Product Sale", highlight: true },
    { icon: <AttachMoneyIcon fontSize="large" />, number: "45.5k", title: "Customers active on our site" },
    { icon: <BusinessCenterIcon fontSize="large" />, number: "25k", title: "Annual gross sales in our site" },
  ];

  const team = [
    { name: "Tom Cruise", job: "Founder & Chairman", img: person1 },
    { name: "Emma Watson", job: "Managing Director", img: person2 },
    { name: "Will Smith", job: "Product Designer", img: person3 },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 10 }}>
      {/* ===== Breadcrumb ===== */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
        <Link underline="hover" color="inherit" href={appRoutes.home} style={{fontSize:"1.4rem"}}>
          Home
        </Link>
        <Typography color="text.primary" sx={{fontSize:"1.4rem"}}>About</Typography>
      </Breadcrumbs>

      {/* ===== Our Story Section ===== */}
      <Grid container spacing={6} alignItems="center" sx={{ mb: 10 }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h3" fontWeight={700} mb={2}>
            Our Story
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={2}>
            Inspired in 2008, Exclusive is South Asia’s premier online shopping marketplace with an active presence in Bangladesh. Supported by a wide range of tailored marketing, data, and service solutions, Exclusive has 10.5k sellers and 45.5k active customers.
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Exclusive has more than 25k monthly product sales, growing at a very fast rate. We continue to strive to provide a seamless shopping experience.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={aboutImg}
            alt="Our Story"
            sx={{
              width: "100%",
              borderRadius: 2,
              boxShadow: 3,
              objectFit: "cover",
            }}
          />
        </Grid>
      </Grid>

      {/* ===== Stats Section ===== */}
      <Grid container spacing={3} sx={{ mb: 12 }}>
        {stats.map((s, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Card
              sx={{
                textAlign: "center",
                py: 4,
                borderRadius: 3,
                boxShadow: s.highlight ? 5 : 2,
                bgcolor: s.highlight ? "#DB4444" : "white",
                color: s.highlight ? "white" : "text.primary",
                transition: "0.3s",
              }}
            >
              <Box sx={{ mb: 1 }}>{s.icon}</Box>
              <Typography variant="h5" fontWeight={700}>
                {s.number}
              </Typography>
              <Typography variant="body2" color={s.highlight ? "white" : "text.secondary"}>
                {s.title}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* ===== Team Section ===== */}
      <Typography variant="h4" textAlign="center" fontWeight={700} mb={6}>
        Meet Our Team
      </Typography>
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          900: { slidesPerView: 2 },
          1200: { slidesPerView: 3 },
        }}
        modules={[Pagination]}
      >
        {team.map((person, i) => (
          <SwiperSlide key={i}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                textAlign: "center",
                py: 4,
                mx: 2,
              }}
            >
              <Box
                component="img"
                src={person.img}
                alt={person.name}
                sx={{
                  width: 150,
                  height: 150,
                  borderRadius: "50%",
                  objectFit: "cover",
                  mx: "auto",
                  mb: 2,
                }}
              />
              <Typography variant="h6" fontWeight={700}>
                {person.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                {person.job}
              </Typography>
              <Box display="flex" justifyContent="center" gap={2}>
                <FacebookIcon fontSize="small" />
                <TwitterIcon fontSize="small" />
                <LinkedInIcon fontSize="small" />
              </Box>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>

      <Divider sx={{ mt: 10 }} />

      <ServiceFeatures />
    </Container>
  );
}

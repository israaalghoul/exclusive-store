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
import ServiceFeatures from "../../delivery-section";
// MUI Icons
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
// import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BarChartIcon from "@mui/icons-material/BarChart";
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
    {
      icon: (
        <StorefrontIcon
          fontSize="large"
          sx={{ width: "4.0rem", height: "4.0rem" }}
        />
      ),
      number: "10.5k",
      title: "Sellers active on our site",
    },
    {
      icon: (
        <AttachMoneyIcon
          fontSize="large"
          sx={{ width: "4.0rem", height: "4.0rem" }}
        />
      ),
      number: "33k",
      title: "Monthly Product Sale",
      highlight: true,
    },
    {
      icon: (
        <CardGiftcardIcon
          fontSize="large"
          sx={{ width: "4.0rem", height: "4.0rem" }}
        />
      ),
      number: "45.5k",
      title: "Customers active on our site",
    },
    {
      icon: (
        <BarChartIcon
          fontSize="large"
          sx={{ width: "4.0rem", height: "4.0rem" }}
        />
      ),
      number: "25k",
      title: "Annual gross sales in our site",
    },
  ];

  const team = [
    { name: "Tom Cruise", job: "Founder & Chairman", img: person1 },
    { name: "Emma Watson", job: "Managing Director", img: person2 },
    { name: "Will Smith", job: "Product Designer", img: person3 },
  ];

  return (
    <Box sx={{ padding: 0, py: 10 }}>
      {/* ===== Breadcrumb ===== */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
        <Link
          underline="hover"
          color="inherit"
          href={appRoutes.home}
          style={{ fontSize: "1.4rem" }}
        >
          Home
        </Link>
        <Typography color="text.primary" sx={{ fontSize: "1.4rem" }}>
          About
        </Typography>
      </Breadcrumbs>

      {/* ===== Our Story Section ===== */}
      <Box
        sx={{ display: "flex", direction: "row", gap: "7.5rem", mt: "4.2rem" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h3" fontWeight={500} fontSize={54} mb={5}>
            Our Story
          </Typography>
          <Typography variant="body1" mb={3} fontWeight={400} fontSize={16}>
            Inspired in 2008, Exclusive is South Asia’s premier online shopping
            marketplace with an active presence in Bangladesh. Supported by a
            wide range of tailored marketing, data, and service solutions,
            Exclusive has 10.5k sellers and 45.5k active customers.
          </Typography>
          <Typography variant="body1" fontWeight={400} fontSize={16} mr={2.5}>
            Exclusive has more than 25k monthly product sales, growing at a very
            fast rate. We continue to strive to provide a seamless shopping
            experience.
          </Typography>
        </Box>
        <Box>
          <Box
            component="img"
            src={aboutImg}
            alt="Our Story"
            sx={{
              borderTopLeftRadius: "4px",
              borderBottomLeftRadius: "4px",
              boxShadow: 3,
              objectFit: "cover",
              width: { xs: "0rem", sm: "0rem", lg: "70.5rem" },
              mr: "-17.0rem",
            }}
          />
        </Box>
      </Box>

      {/* ===== Stats Section ===== */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          py: 17.5,
          gap: "3.0rem",
        }}
      >
        {stats.map((s, i) => (
          <Box
            key={i}
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "270px",
              overflow: "hidden",
            }}
          >
            <Card
              sx={(theme) => ({
                width: "100%",
                height: { xs: "18rem", sm: "20rem", md: "23rem" },
                textAlign: "center",
                py: 4,
                borderRadius: "0.4rem",
                transition: "0.3s",
                bgcolor: "transparent",
                color: theme.palette.text.primary,
                border: `1px solid ${theme.palette.divider}`,
                // hover changes
                "&:hover": {
                  bgcolor: theme.palette.custom.btnPrimary.main,
                  color: "#fff",
                },
                "&:hover .stat-icon-bg-large": {
                  bgcolor: "#ffffff46",
                },
                "&:hover .stat-icon-bg-small": {
                  bgcolor: "#fff",
                },
                "&:hover .stat-icon-root": {
                  color: "#000",
                },
                "& .stat-icon-root .MuiSvgIcon-root": {
                  color: "inherit",
                  fontSize: "2.2rem",
                },
              })}
            >
              <Box sx={{ mb: 1 }}>
                <Box
                  sx={{
                    position: "relative",
                    width: 80,
                    height: 80,
                    mx: "auto",
                  }}
                >
                  {/* larger circle - gray */}
                  <Box
                    className="stat-icon-bg-large"
                    sx={{
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      bgcolor: (theme) => theme.palette.grey[300],
                      transition: "all 0.25s",
                    }}
                  />

                  {/* smaller circle - black*/}
                  <Box
                    className="stat-icon-bg-small"
                    sx={{
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                      width: 58,
                      height: 58,
                      borderRadius: "50%",
                      bgcolor: "#000",
                      transition: "all 0.25s",
                    }}
                  />

                  {/* icon - white initially, becomes black on hover */}
                  <Box
                    className="stat-icon-root"
                    sx={{
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "color 0.25s",
                    }}
                  >
                    {s.icon}
                  </Box>
                </Box>
              </Box>
              <Typography variant="h5" fontWeight={700} fontSize={32}>
                {s.number}
              </Typography>
              <Typography variant="body2" fontWeight={400} fontSize={16}>
                {s.title}
              </Typography>
            </Card>
          </Box>
        ))}
      </Box>

      {/* ===== Team Section ===== */}
      <Box
        sx={(theme) => ({
          // customize Swiper pagination bullets
          "& .swiper-pagination-bullet": {
            background: theme.palette.grey[400],
            opacity: 1,
          },
          "& .swiper-pagination-bullet-active": {
            background: theme.palette.custom.btnPrimary.main,
          },
        })}
      >
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          pagination={{ clickable: true, el: ".custom-swiper-pagination" }}
          breakpoints={{
            640: { slidesPerView: 1 },
            900: { slidesPerView: 2 },
            1200: { slidesPerView: 3 },
          }}
          modules={[Pagination]}
        >
        {team.map((person, i) => (
          <SwiperSlide key={i}>
            <Box>
              <Box
                sx={{
                  textAlign: "center",
                  height: "43.0rem",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <Box
                  component="img"
                  src={person.img}
                  alt={person.name}
                  sx={{
                    width: 300,
                    height: 300,
                    borderRadius: "50%",
                    border: "1px solid #ddddddff",
                    objectFit: "cover",
                    mx: "auto",
                    mt: 8,
                  }}
                />
              </Box>
              <Typography variant="h6" fontWeight={500} fontSize={32} mt="3.2rem" mb={1}>
                {person.name}
              </Typography>
              <Typography variant="body2" mb={2} fontWeight={400} fontSize={16}>
                {person.job}
              </Typography>
              <Box display="flex" justifyContent="flex-start" gap={2}>
                <FacebookIcon fontSize="large" />
                <TwitterIcon fontSize="large" />
                <LinkedInIcon fontSize="large" />
              </Box>
            </Box>
          </SwiperSlide>
        ))}
        </Swiper>

        {/* custom pagination container placed after Swiper (under texts) */}
        <Box
          className="custom-swiper-pagination"
          sx={{ display: "flex", justifyContent: "center", mt: 3 }}
        />
      </Box>

      <ServiceFeatures />
    </Box>
  );
}

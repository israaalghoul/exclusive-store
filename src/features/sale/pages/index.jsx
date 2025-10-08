import React from "react";
import { alpha, styled } from "@mui/material/styles";
import { Box, Typography, Button} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { List, ListItemButton, ListItemText, Divider } from "@mui/material";
import RightArrowIconImg from "../../../assets/images/arrow/RightArrow.svg";
import heroImg1 from "../../../assets/images/png/hero1.png";
import heroImg2 from "../../../assets/images/png/hero2.png";
import heroImg3 from "../../../assets/images/png/hero3.png";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {appRoutes} from "../../../routes/index";
import { useNavigate } from "react-router";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function SalePage() {
    const navigate = useNavigate();
  const slides = [
    {
      id: 1,
      img: heroImg1,
      title: "Speakers",
      offer: "Up to 10% off Voucher",
    },
    {
      id: 2,
      img: heroImg2,
      title: "iPhone 14 Series",
      offer: "Hot Deals Today",
    },
    {
      id: 3,
      img: heroImg3,
      title: "GP11 Shooter USB Gamepad",
      offer: "Up to 20% Discount",
    },
  ];
  const menuItems = [
    { label: "Woman’s Fashion", hasArrow: true },
    { label: "Men’s Fashion", hasArrow: true },
    { label: "Electronics" },
    { label: "Home & Lifestyle" },
    { label: "Medicine" },
    { label: "Sports & Outdoor" },
    { label: "Baby’s & Toys" },
    { label: "Groceries & Pets" },
    { label: "Health & Beauty" },
  ];

  return (
    <Box display="flex" 
  >
      {/* Left Side : Categories*/}
      <Box
        width="100%"
        maxWidth="21.7rem"
        sx={{ paddingTop: "4.0rem", paddingRight: "1.6rem" }}
      >
        <List sx={{ display: "flex", flexDirection: "column", gap: "1.6rem" }}>
          {menuItems.map((item, index) => (
            <ListItemButton key={index} sx={{ p: 0 }}>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: "1.6rem",
                  fontWeight: 400,
                }}
              />
              {item.hasArrow && (
                <Box
                  component="img"
                  src={RightArrowIconImg}
                  alt="right-arrow-icon"
                  sx={{
                    width: { xs: 20, sm: 20, lg: 24 },
                    height: "auto",
                  }}
                />
              )}
            </ListItemButton>
          ))}
        </List>
      </Box>

      {/* Divider */}
      <Divider
        orientation="vertical"
        flexItem
        sx={{
          borderBottom: (theme) => {
            `0.5px solid ${alpha(theme.palette.divider, 0.3)}`;
          },
        }}
      />

      <Box
        sx={{
          width: "100%",
          bgcolor: "#000",
          color: "#fff",
          overflow: "hidden",
          marginTop: "4.0rem",
          marginLeft: "4.5rem",
          display: "flex",
          position: "relative",
        }}
      >
        <Swiper
          modules={[Pagination, Autoplay, EffectFade]}
          spaceBetween={0}
          slidesPerView={1}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop={true}
          speed={1200}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          style={{ width: "100%", height: "100%" }}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  p: 4,
                  backgroundColor: "#000",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "1.6rem",
                    fontWeight: "400",
                    paddingTop: "7.2rem",
                    paddingLeft: "3.4rem",
                  }}
                >
                  {slide.title}
                </Typography>
                {/* Imges */}
                <Box
                  component="img"
                  src={slide.img}
                  alt={slide.title}
                  sx={{ height: 300, objectFit: "contain" }}
                />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Text */}

        <Box
          sx={{
            maxWidth: "29.4rem",
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            zIndex: "1000",
            lineHeight: "6.0rem",
            letterSpacing: "4%",
            left: "6.4rem",
            bottom: "7.7rem",
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontSize: "4.8rem", fontWeight: "600", mb: 2 }}
          >
            Up to 10% off Voucher
          </Typography>
          <Box
            sx={{
              display: "flex",
              direction: "row",
              justifyContent: "flex-start",
            }}
          >
            <Button
              variant="Link"
               onClick={() => {
          const section = document.getElementById("sale-page");
          section?.scrollIntoView({ behavior: "smooth" }); 
        }}
              sx={(theme) => ({
                padding: 0,
                textTransform: "none",
                color: theme.palette.custom.btnPrimary.contrastText,
                fontWeight: 500,
                textDecoration: "underline",
              })}
            >
              Shop Now!
              <ArrowForwardIcon
                sx={(theme) => ({
                  color: theme.palette.custom.btnPrimary.contrastText,
                  width: 32,
                  fontSize: 24,
                })}
              />
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

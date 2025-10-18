// Material
import { alpha, styled } from "@mui/material/styles";
import { Box, Typography, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { List, ListItemButton, ListItemText, Divider } from "@mui/material";
// Images
import heroImg1 from "../../../../assets/images/png/hero1.png";
import heroImg2 from "../../../../assets/images/png/hero2.png";
import heroImg3 from "../../../../assets/images/png/hero3.png";
import RightArrowIconImg from "../../../../assets/images/arrow/RightArrow.svg";
// Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";

const BoxLeft = styled(Box)({
  paddingTop: "3.0rem",
  paddingRight: "1.6rem",
  // Responsive
  "@media (max-width:480px)": {
    display: "none",
  },
  "@media (min-width:481px)": {
    maxWidth: "14rem",
  },
  "@media (min-width:768px) ": {
    maxWidth: "18rem",
  },
  "@media (min-width:768px) ": {
    maxWidth: "18rem",
  },
  "@media (min-width:1024px)": {
    maxWidth: "21.7rem",
  },
});
const ListCustom = styled(List)({
  display: "flex",
  flexDirection: "column",
  // Responsive
  "@media(max-width:1023px)": {
    gap: "0.6rem",
  },
  "@media(min-width:1024px)": {
    gap: "1.6rem",
  },

});
const BoxRight = styled(Box)({
  width: "100%",
  bgcolor: "#000",
  color: "#fff",
  overflow: "hidden",
  display: "flex",
  position: "relative",
  // Responsive
  "@media (max-width:480px)": {
    marginTop: "4.8rem",
    marginLeft: 0,
    minHeight: "220px",
  },
  "@media (min-width:481px)": {
    marginTop: "4.8rem",
    marginLeft: "2.6rem",
    minHeight: "220px",
  },
  "@media (min-width:768px) ": {
    marginLeft: "3.6rem",
    minHeight: "270px",
  },
  "@media (min-width:1024px)": {
    marginLeft: "4.5rem",
    minHeight: "400px",
  },

});
const BoxSwiper = styled(Box)({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  p: 4,
  backgroundColor: "#000",
  // Responsive
  "@media (max-width:320px)": { p: 1, minHeight: "220px" },
  "@media (min-width:321px) and (max-width:767px)": {
    p: 2,
    minHeight: "220px",
  },
  "@media (min-width:768px)": { p: 4, minHeight: "270px" },
  "@media (min-width:1024px)": { minHeight: "400px" },
});
const TypographySwiper = styled(Typography)({
  fontWeight: "400",
  // Responsive
  "@media (max-width:320px)": {
    fontSize: "1.2rem",
    paddingTop: "1rem",
    paddingLeft: "1.2rem",
  },
  "@media (min-width:321px) and (max-width:767px)": {
    fontSize: "1.2rem",
    paddingTop: "2.4rem",
    paddingLeft: "2.2rem",
  },
  "@media (min-width:768px) ": {
    fontSize: "1.6rem",
    paddingTop: "4.0rem",
    paddingLeft: "3.2rem",
  },
  "@media (min-width:1024px)": {
    paddingTop: "7.25rem",
    paddingLeft: "6.4rem",
  },
});
const BoxImgSwiper = styled(Box)({
  objectFit: "contain",
  // Responsive
  "@media (max-width:320px)": {
    height: 120,
    minHeight: 80,
  },
  "@media (min-width:321px) and (max-width:767px)": {
    height: 150,
    minHeight: 220,
    maxWidth: 250,
  },
  "@media (min-width:768px)": {
    height: 260,
    minHeight: 270,
    maxWidth: 300,
  },
  "@media (min-width:1024px)": {
    paddingRight: "3.4rem",
    minHeight: 400,
    maxWidth: 400,
  },
});
const BoxText = styled(Box)({
  maxWidth: "29.4rem",
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  zIndex: "1000",
  lineHeight: "6.0rem",
  letterSpacing: "4%",
  gap: "1.6rem",

  // Responsive
  "@media (max-width:320px)": {
    left: "1.2rem",
    bottom: "2.4rem",
    padding: "1rem 0",
    lineHeight: "1.2",
  },
  "@media (min-width:321px) and (max-width:767px)": {
    left: "2.2rem",
    bottom: "3.4rem",
    maxWidth: "70%",
  },
  "@media (min-width:768px)": {
    left: "3.2rem",
    bottom: "4.0rem",
    maxWidth: "24rem",
  },
  "@media (min-width:1024px)": {
    left: "6.4rem",
    bottom: "5.7rem",
    maxWidth: "29.4rem",
  },
  "@media (min-width:1440px)": {
    bottom: "7.7rem",
  }
});
const TypographyText = styled(Typography)({
  fontWeight: "600",
  mb: 2,
  // Responsive
  "@media (max-width:320px)": { fontSize: "1.6rem" },
  "@media (min-width:321px) and (max-width:767px)": {
    fontSize: "1.8rem",
  },
  "@media (min-width:768px)": {
    fontSize: "3.2rem",
  },
  "@media (min-width:1024px)": { fontSize: "4.8rem" },
});

export default function TopSale() {
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
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
      }}
    >
      {/* Left Side : Categories*/}
      <BoxLeft width="100%">
        <ListCustom>
          {menuItems.map((item, index) => (
            <ListItemButton key={index} sx={{ p: 0 }}>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: { sm: "1.4rem", md: "1.6rem", lg: "1.6rem" },
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
        </ListCustom>
      </BoxLeft>

      {/* Divider */}
      <Divider
        orientation="vertical"
        flexItem
        sx={{
          "@media (max-width:480px)": {
            display: "none",
          },
          borderRight: (theme) =>
            `0.5px solid ${alpha(theme.palette.divider, 0.3)}`,
        }}
      />

      <BoxRight>
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
              <BoxSwiper>
                <TypographySwiper variant="h6">{slide.title}</TypographySwiper>
                {/* Images */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <BoxImgSwiper
                    component="img"
                    src={slide.img}
                    alt={slide.title}
                  />
                </Box>
              </BoxSwiper>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Text */}
        <BoxText>
          <TypographyText variant="h4">Up to 10% off Voucher</TypographyText>
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
        </BoxText>
      </BoxRight>
    </Box>
  );
}

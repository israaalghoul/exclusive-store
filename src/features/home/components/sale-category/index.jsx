import { Box, Typography, Button, Grid, Paper } from "@mui/material";
import heroImg1 from "../../../../assets/images/png/hero1.png";
import { styleSaleCategory } from "./sale-category-style";
import { Btn } from "../../../../shared/components/btn";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";

const BoxContainer = styled(Box)(({ theme }) => ({
  ...styleSaleCategory.boxContainerStyle(theme),
}));
const BoxLeft = styled(Box)({
  ...styleSaleCategory.boxLeftStyle,
});
const TypographyH2 = styled(Typography)(({ theme }) => ({
  ...styleSaleCategory.typographyH2Style(theme),
}));
const GridTimer = styled(Grid)({
  ...styleSaleCategory.gridTimerStyle,
});
const PaperCircle = styled(Paper)(({ theme }) => ({
  ...styleSaleCategory.paperCircleStyle(theme),
}));
const BoxBackImg = styled(Box)({
  ...styleSaleCategory.boxBackImgStyle,
});
const BoxImg = styled(Box)(({ theme }) => ({
  ...styleSaleCategory.boxImgStyle(theme),
}));

export default function SaleCategory() {
  const targetDate =
    new Date().getTime() + 5 * 24 * 60 * 60 * 1000 + 23 * 60 * 60 * 1000;
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <BoxContainer>
      <BoxLeft>
        <Typography
          sx={(theme) => ({
            fontSize: "1.6rem",
            fontWeight: 400,
            color: theme.palette.custom.btnSecondary.main,
          })}
        >
          Categories
        </Typography>
        <TypographyH2 variant="h2">Enhance Your Music Experience</TypographyH2>
        <GridTimer container spacing={2}>
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Minutes", value: timeLeft.minutes },
            { label: "Seconds", value: timeLeft.seconds },
          ].map((item, index) => (
            <Grid item key={index}>
              <PaperCircle>
                <Typography
                  variant="h6"
                  sx={{ fontSize: "1.6rem", fontWeight: 600 }}
                >
                  {item.value}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ fontSize: "1.1rem", fontWeight: 400 }}
                >
                  {item.label}
                </Typography>
              </PaperCircle>
            </Grid>
          ))}
        </GridTimer>
        <Btn
          btnName="Buy Now!"
          variantColor="btnSecondary"
          px="3.2rem"
          py="1.2rem"
          width="40%"
          height="5.6rem"
        />
      </BoxLeft>
      {/* Img */}
      <BoxBackImg>
        <Box
          sx={{
            minHeight: { xs: "auto", md: "60vh" },
            display: { xs: "block", md: "flex" },
            alignItems: "center",
          }}
        >
          <BoxImg component="img" src={heroImg1} alt={"hero-categories"} />
        </Box>
      </BoxBackImg>
    </BoxContainer>
  );
}

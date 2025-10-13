import React, { useEffect, useState, useRef } from "react";
import { alpha, styled, useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import { ProductList } from "../../products/components/product-list";
import { HeaderSection } from "../../../shared/components/header-section";
import {Btn} from "../../../shared/components/btn"
import { useNavigate } from "react-router";
import { appRoutes } from "../../../routes";
export default function SaleTodayPage() {
  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const totalItems = 8;

  const handleNext = () =>
    setSelectedIndex((i) => Math.min(i + 1, totalItems - 1));
  const handlePrev = () => setSelectedIndex((i) => Math.max(i - 1, 0));
      const navigate = useNavigate();
  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        flexDirection: "column",
        gap: "4.0rem",
        borderBottom: `0.5px solid ${alpha(theme.palette.divider, 0.3)}`,
      })}
      id="sale-page"
    >
      <HeaderSection
        title="Flash Sales"
        subtitle="Today’s"
        showTimer={true}
        marginTop="14.0rem"
        onNext={handleNext}
        onPrev={handlePrev}
        disableNext={selectedIndex >= totalItems - 1}
        disablePrev={selectedIndex <= 0}
      />
      <ProductList
        limit={totalItems}
        showOffer={true}
        offerColor="custom.btnPrimary.main"
        discount={25}
        selectedIndex={selectedIndex}
        onSelectIndex={setSelectedIndex}
      />
      <Box sx={{display:"flex",justifyContent:"center", marginBottom:"6.0rem"}}>
        <Btn
          btnName="View All Products"
          variantColor="btnPrimary"
          px="0rem"
          py="0rem"
          width="23.4rem"
          height="5.6rem"
          onClick={() => navigate(appRoutes.products.all)}
        />
      </Box>

    </Box>
  );
}

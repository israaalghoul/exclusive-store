import { HeaderSection } from "../../../shared/components/header-section";
import { alpha, useTheme } from "@mui/material/styles";
import { CategoriesSection } from "../category-section";
import { Box } from "@mui/material";
import React, { useState } from "react";

export default function CategoryPage() {
  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const totalItems = 6;

  const handleNext = () =>
    setSelectedIndex((i) => Math.min(i + 1, totalItems - 1));
  const handlePrev = () => setSelectedIndex((i) => Math.max(i - 1, 0));
  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        flexDirection: "column",
        gap: "6.0rem",
        paddingBottom: "7.0rem",
        borderBottom: `0.5px solid ${alpha(theme.palette.divider, 0.3)}`,
      })}
    >
      <HeaderSection
        title="Browse By Category"
        subtitle="Categories"
        showTimer={false}
        marginTop="8.0rem"
        onNext={handleNext}
        onPrev={handlePrev}
        disableNext={selectedIndex >= totalItems - 1}
        disablePrev={selectedIndex <= 0}
      />

      <CategoriesSection />
    </Box>
  );
}

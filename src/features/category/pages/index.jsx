import { HeaderSection } from "../../../shared/components/header-section";
import { alpha, useTheme } from "@mui/material/styles";
import { CategoriesSection } from "../category-section";
import { Box } from "@mui/material";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CategoriesService from "../services/api";

export default function CategoryPage() {
  const theme = useTheme();
  // start index for the visible window of category cards
  const [startIndex, setStartIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const visibleCount = 7;

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => await CategoriesService.getAll(),
  });

  const limited = categories.slice(0, 8);

  const maxIndex = Math.max(0, limited.length - 1);

  const handleNext = () => {
    setSelectedIndex((s) => Math.min(s + 1, maxIndex));
    setStartIndex((s) => {
      const nextSelected = Math.min(selectedIndex + 1, maxIndex);
      if (nextSelected >= s + visibleCount) return s + 1;
      return s;
    });
  };

  const handlePrev = () => {
    setSelectedIndex((s) => Math.max(s - 1, 0));
    setStartIndex((s) => {
      const nextSelected = Math.max(selectedIndex - 1, 0);
      if (nextSelected < s) return Math.max(0, s - 1);
      return s;
    });
  };
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
        disableNext={selectedIndex >= maxIndex}
        disablePrev={selectedIndex <= 0}
      />
      <CategoriesSection
        startIndex={startIndex}
        visibleCount={visibleCount}
        setStartIndex={setStartIndex}
        categories={limited}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
    </Box>
  );
}

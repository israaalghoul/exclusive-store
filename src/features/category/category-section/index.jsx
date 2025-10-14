import { Box } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
import { CategoryCard } from "../category-card";
import { ProductList } from "../../products/components/product-list";
import { useNavigate } from 'react-router-dom';

export function CategoriesSection({
  startIndex = 0,
  visibleCount = 5,
  setStartIndex = () => {},
  categories = [],
  selectedIndex = 0,
  setSelectedIndex = () => {},
}) {
  const theme = useTheme();
  const navigate = useNavigate();

  // categories is expected to be already limited (first 10)
  const limited = categories;
  const selectedCategory = limited && limited[selectedIndex] ? limited[selectedIndex].id : null;

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: '1.5rem', overflow: 'hidden' }}>
        {limited.slice(startIndex, startIndex + visibleCount).map((cat, idx) => (
          <CategoryCard
            key={cat.id}
            label={cat.name}
            img={cat.image}
            active={selectedIndex === startIndex + idx}
            onClick={() => {
              setSelectedIndex(startIndex + idx);
              navigate(`/categories/${cat.id}`);
            }}
          />
        ))}
      </Box>

      {/* pagination dots */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 1 }}>
        {limited.map((_, idx) => {
          const isActive = idx === selectedIndex;
          return (
            <Box
              key={idx}
              onClick={() => {
                const nextStart = Math.max(0, Math.min(idx, limited.length - visibleCount));
                setStartIndex(nextStart);
                setSelectedIndex(idx);
              }}
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                bgcolor: isActive ? theme.palette.custom.btnPrimary.main : theme.palette.grey[300],
                cursor: 'pointer',
                transition: 'transform 200ms ease, background-color 200ms ease',
                transform: isActive ? 'scale(1.3)' : 'scale(1)'
              }}
            />
          );
        })}
      </Box>

      {selectedCategory && (
        <Box sx={{ mt: 4 }}>
          {/* quick preview grid; for full paginated view user is navigated to /categories/:id */}
          <ProductList
            useGetAll={false}
            allListed={true}
            swiper={false}
            limit={8}
            offset={0}
            categoryId={selectedCategory}
          />
        </Box>
      )}
    </Box>
  );
}

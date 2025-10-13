import { Box, IconButton } from "@mui/material";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import CategoriesService from "../services/api";
import { CategoryCard } from "../category-card";
import { ProductList } from "../../products/components/product-list";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';

export function CategoriesSection() {
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => await CategoriesService.getAll(),
  });

  const [selected, setSelected] = React.useState(null);
  const [startIndex, setStartIndex] = React.useState(0);
  const navigate = useNavigate();
  const visibleCount = 5; // how many category cards to show in the row

  React.useEffect(() => {
    if (!isLoading && categories.length > 0 && selected == null) {
      setSelected(categories[0].id);
    }
  }, [isLoading, categories]);

  // show only first 10 categories
  const limited = categories.slice(0, 10);

  const handleNext = () => {
    setStartIndex((s) => Math.min(s + 1, Math.max(0, limited.length - visibleCount)));
  };
  const handlePrev = () => {
    setStartIndex((s) => Math.max(0, s - 1));
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton onClick={handlePrev} disabled={startIndex <= 0}>
          <ArrowBackIosNewIcon />
        </IconButton>

        <Box sx={{ display: 'flex', gap: '1.5rem', overflow: 'hidden', flex: 1 }}>
          {limited.slice(startIndex, startIndex + visibleCount).map((cat) => (
            <CategoryCard
              key={cat.id}
              label={cat.name}
              img={cat.image}
              active={String(selected) === String(cat.id)}
              onClick={() => {
                setSelected(cat.id);
                // navigate to detail page for full paginated view
                navigate(`/categories/${cat.id}`);
              }}
            />
          ))}
        </Box>

        <IconButton onClick={handleNext} disabled={startIndex >= Math.max(0, limited.length - visibleCount)}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>

      {/* pagination dots */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 1 }}>
        {limited.map((_, idx) => (
          <Box
            key={idx}
            onClick={() => setStartIndex(Math.max(0, Math.min(idx, limited.length - visibleCount)))}
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              bgcolor: idx >= startIndex && idx < startIndex + visibleCount ? 'primary.main' : 'divider',
              cursor: 'pointer'
            }}
          />
        ))}
      </Box>

      {selected && (
        <Box sx={{ mt: 4 }}>
          {/* quick preview grid; for full paginated view user is navigated to /categories/:id */}
          <ProductList
            useGetAll={false}
            allListed={true}
            swiper={false}
            limit={8}
            offset={0}
            categoryId={selected}
          />
        </Box>
      )}
    </Box>
  );
}

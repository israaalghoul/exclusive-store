import React from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Box, Container, Button,Breadcrumbs,Link,Typography } from "@mui/material";
import ProductsService from "../../products/services/api";
import { ProductList } from "../../products/components/product-list";
import { useQuery } from "@tanstack/react-query";
import { appRoutes } from "../../../routes/index";

export default function CategoryDetailPage() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 12);
  const navigate = useNavigate();

  // Use ProductsService.getByCategory with limit/offset
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["category-products", id, page, limit],
    queryFn: async () => {
      const offset = (page - 1) * limit;
      return await ProductsService.getByCategory(id, limit, offset);
    },
    keepPreviousData: true,
  });

  const handlePage = (next) => {
    const nextPage = Math.max(1, page + next);
    setSearchParams({ page: nextPage, limit });
  };

  return (
    <Box sx={{ bgcolor: "#fff", pt: { xs: 2, md: 6 }, py: { xs: 2, md: 10 } }}>
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
          Category 
        </Typography>
      </Breadcrumbs>
      {/* <Box sx={{ mt: 4 }}>
        <Button onClick={() => navigate(-1)} variant="text">
          Back
        </Button>
      </Box> */}

      <Box sx={{ mt: 2 }}>
        <ProductList
          swiper={false}
          allListed={true}
          useGetAll={false}
          // pass categoryId so ProductList will fetch by category when needed
          categoryId={id}
          limit={limit}
          offset={(page - 1) * limit}
        />
      </Box>

      <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 4 }}>
        <Button
          onClick={() => handlePage(-1)}
          variant="outlined"
          sx={(theme) => ({
            backgroundColor: theme.palette.custom.btnPrimary.main,
            color: theme.palette.common.white,
          })}
        >
          Prev
        </Button>
        <Button
          onClick={() => handlePage(1)}
          variant="contained"
          sx={(theme) => ({
            backgroundColor: theme.palette.custom.btnPrimary.main,
            color: theme.palette.common.white,
          })}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}

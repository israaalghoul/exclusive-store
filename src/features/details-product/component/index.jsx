import {
  Box,
  Grid,
  Typography,
  Button,
  IconButton,
  Rating,
  Divider,
  Chip,
  TextField,
} from "@mui/material";
import styled from "@emotion/styled";
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ProductsService from "../../products/services/api";
import AddIcon from "@mui/icons-material/Add";
import { appRoutes } from "../../../routes/index";
import RemoveIcon from "@mui/icons-material/Remove";
import { useCart } from "../../cart/store/cart-store";
import FavoriteIcon from "@mui/icons-material/Favorite";
import details from "../../../assets/images/png/Frame 919.png";
import imageFake from "../../../assets/images/png/Frame 894.png";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const ButtonNav = styled(Button)(({ theme }) => ({
  textTransform: "none",
  color: "#505050ff",
  fontWeight: 400,
}));

export function DetailsProduct() {
  const navigate = useNavigate();
  const { cart, totalPrice } = useCart();
  const { addToCart, increaseQty, decreaseQty } = useCart();
  const [hovered, setHovered] = useState(false);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const location = useLocation();
  const stateProduct = location.state?.product ?? null;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      if (!id) return null;
      const res = await ProductsService.getById(id);
      // API returns an array when querying by id
      return Array.isArray(res) ? res[0] : res;
    },
    enabled: !!id && !stateProduct,
    initialData: stateProduct || undefined,
  });

  const product = stateProduct || data;
  const [mainImage, setMainImage] = useState(product?.images?.[0] || null);
  const [quantity, setQuantity] = useState(1);
// console.log(product);
  useEffect(() => {
    setMainImage(product?.images?.[0] || null);
  }, [product]);

  const handleDecrease = () => {
    // if product already in cart, decrease there, otherwise adjust local quantity
    if (!product) return;
    const inCart = cart.find((it) => String(it.id) === String(product.id));
    if (inCart) {
      decreaseQty(product.id);
      // reflect new qty in local state if present in cart
      const updated = cart.find((it) => String(it.id) === String(product.id));
      setQuantity(updated ? updated.quantity : Math.max(1, quantity - 1));
      return;
    }
    setQuantity((q) => Math.max(1, q - 1));
  };

  const handleIncrease = () => {
    if (!product) return;
    const inCart = cart.find((it) => String(it.id) === String(product.id));
    if (inCart) {
      increaseQty(product.id);
      const updated = cart.find((it) => String(it.id) === String(product.id));
      setQuantity(updated ? updated.quantity : quantity + 1);
      return;
    }
    setQuantity((q) => q + 1);
  };

  const handleBuyNow = () => {
    if (!product) return;
    // add to cart with selected quantity
    addToCart({ ...product, quantity });
    // navigate to cart page
    navigate(appRoutes.cart);
  };
  return (
    <Box sx={{ bgcolor: "#fff", pt: { xs: 2, md: 6 }, pb: { xs: 2, md: 6 } }}>
      {/* Links */}
      <Box sx={{ display: "flex", direction: "row", alignItems: "center" }}>
        <Button
          variant="Link"
          onClick={() => navigate(appRoutes.home)}
          sx={(theme) => ({
            textTransform: "none",
            color: "#505050ff",
            fontWeight: 400,
            paddingLeft: 0,
          })}
        >
          Account
        </Button>
        <Typography sx={{ fontSize: "1.2rem" }}>/</Typography>
        <ButtonNav variant="Link">Category Name</ButtonNav>
        <Typography sx={{ fontSize: "1.2rem" }}>/</Typography>
        <Button
          variant="Link"
          sx={(theme) => ({
            textTransform: "none",
            color: "#000000ff",
            fontWeight: 400,
          })}
        >
          {product?.title || 'Product Name'}
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: "7.0rem",
          pt: { xs: 2, md: 6 },
          pb: { xs: 2, md: 6 },
        }}
      >
        {/* Images*/}
        <Grid container spacing={7}>
          <Grid item xs={3} alignContent="center">
            <Grid container spacing={3} direction="column">
              {(product?.images || []).map((img, i) => (
                <Box
                  key={i}
                  component="img"
                  src={img}
                  alt={`thumb-${i}`}
                  onClick={() => setMainImage(img)}
                  sx={{
                    borderRadius: 0.5,
                    boxShadow: mainImage === img ? "0 6px 14px rgba(0,0,0,0.16)" : "0 4px 10px rgba(0,0,0,0.1)",
                    cursor: 'pointer',
                    width: '100%',
                    maxWidth: "17.0rem",
                    height: "13.8rem",
                  }}
                />
              ))}
            </Grid>
          </Grid>

          <Grid item xs={9}>
            <Box
              component="img"
              src={mainImage || imageFake}
              alt="main"
              sx={{
                borderRadius: 0.5,
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                width: '100%',
                maxWidth: "50.0rem",
              }}
            />
          </Grid>
        </Grid>

        {/* Information */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, fontSize: "2.4rem" }}>
            {product?.title || 'Product Name'}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <Rating
              value={4.5}
              precision={0.5}
              readOnly
              sx={{
                fontSize: "2.0rem",
              }}
            />
            <Typography
              variant="body2"
              sx={{ ml: 1, color: "gray", fontSize: "1.4rem" }}
            >
              (150 Reviews)
            </Typography>
            <Chip
              label="In Stock"
              sx={{
                ml: 2,
                color: "green",
                backgroundColor: "#e6f5e6",
                fontSize: "1.4rem",
              }}
            />
          </Box>

          {/* Price */}
          <Typography variant="h6" sx={{ mt: 2, fontSize: "2.4rem" }}>
            ${product?.price?.toFixed(2) || cart?.price?.toFixed(2) || "N/A"}
          </Typography>

          {/* Description */}
          <Typography
            variant="body2"
            sx={{ mt: 2, lineHeight: 1.6, fontSize: "1.4rem" }}
          >
            {product?.description || 'No description available.'}
          </Typography>

          {/* Colors */}
          <Box
            sx={{
              mt: 3,
              display: "flex",
              direction: "row",
              alignItems: "center",
              gap: " 2.4rem",
            }}
          >
            <Typography variant="subtitle2" sx={{ fontSize: "2.0rem" }}>
              Colours:
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: "#408500ff",
                  border: "1px solid #ccc",
                  cursor: "pointer",
                  "&:hover": {
                    border: "1px solid #000000ff",
                  },
                }}
              />
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: "#622da8ff",
                  border: "1px solid #ccc",
                  cursor: "pointer",
                  "&:hover": {
                    border: "1px solid #000000ff",
                  },
                }}
              />
              {/* {cart.colors.map((c, i) => (
              <Box
                key={i}
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: c,
                  border: "1px solid #ccc",
                  cursor: "pointer",
                }}
              />
            ))} */}
            </Box>
          </Box>

          {/*Sizes*/}
          <Box
            sx={{
              mt: 3,
              display: "flex",
              direction: "row",
              gap: " 2.4rem",
              alignItems: "center",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                fontSize: "2.0rem",
              }}
            >
              Size:
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              {["XS", "S", "M", "L", "XL"].map((size) => (
                <Button
                  key={size}
                  sx={{
                    minWidth: 36,
                    height: 36,
                    borderRadius: 0.5,
                    textTransform: "none",
                    px: 2,
                    fontSize: "1.4rem",
                    fontWeight: 500,
                    color: "#000",
                    backgroundColor: "transparent",
                    border: "1px solid #111111ff",
                    "&:hover": {
                      backgroundColor: "#db4444",
                      color: "#ffffffff",
                    },
                  }}
                >
                  {size}
                </Button>
              ))}
            </Box>
          </Box>

          {/* Quantity */}
          <Box sx={{ display: "flex", alignItems: "center", mt: 4, gap: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #141414ff",
                borderRadius: 0.5,

                width: "15.9rem",
                height: "4.4rem",
                justifyContent: "space-between",
              }}
            >
              <IconButton
                size="small"
                sx={{
                  borderRadius: "4px",
                  width: "4.0rem",
                  height: "4.4rem",
                  color: "#000",
                  "&:hover": {
                    backgroundColor: "#db4444",
                    color: "#fff",
                  },
                }}
                onClick={handleDecrease}
              >
                <RemoveIcon sx={{ fontSize: "large" }} />
              </IconButton>
              <Typography variant="body1" sx={{ fontSize: "2.0rem" }}>
                {quantity}
              </Typography>
              <IconButton
                size="small"
                sx={{
                  borderRadius: "4px",
                  width: "4.0rem",
                  height: "4.4rem",
                  color: "#000",
                  "&:hover": {
                    backgroundColor: "#db4444",
                    color: "#fff",
                  },
                }}
                onClick={handleIncrease}
              >
                <AddIcon sx={{ fontSize: "large" }} />
              </IconButton>
            </Box>

            <Button
              variant="contained"
              color="error"
              onClick={handleBuyNow}
              sx={{
                borderRadius: 0.5,
                textTransform: "none",
                px: 4,
                py: 1.5,
                fontSize: "1.6rem",
                width: "16.5rem",
                height: "4.4rem",
              }}
            >
              Buy Now
            </Button>

            <IconButton
              aria-label="favorites"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              sx={(theme) => ({
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 32,
                height: 32,
                transition: "color 0.3s ease",
                color: hovered
                  ? theme.palette.custom.btnPrimary.main
                  : theme.palette.text.primary,
                "& .MuiSvgIcon-root": {
                  fontSize: 24,
                  transition: "all 0.3s ease",
                },
                "&:hover": {
                  backgroundColor: "transparent",
                },
              })}
            >
              {hovered ? (
                <FavoriteIcon
                  sx={{
                    transition: "transform 0.2s",
                    transform: "scale(1.1)",
                  }}
                />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Additional Info*/}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box>
              <Typography variant="subtitle2" sx={{ fontSize: "1.6rem" }}>
                🚚 Free Delivery
              </Typography>
              <Typography
                variant="body2"
                color="gray"
                sx={{ fontSize: "1.2rem" }}
              >
                Enter your postal code for Delivery Availability
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" sx={{ fontSize: "1.6rem" }}>
                ↩️ Return Delivery
              </Typography>
              <Typography
                variant="body2"
                color="gray"
                sx={{ fontSize: "1.2rem" }}
              >
                Free 30 Days Delivery Returns. Details
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

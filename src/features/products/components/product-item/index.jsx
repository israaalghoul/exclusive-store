import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
  Button,
  Rating,
} from "@mui/material";
import { toast } from "react-toastify";
import { useCart } from "../../store/cart";
import { useWishlist } from "../../../wishlist/store/index";
import { useTheme } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "../../../../routes/index";
export function ProductItem({
  id,
  images,
  title,
  price,
  discount,
  rating = 4,
  reviews = 75,
  showOffer = true,
  offerColor = "custom.btnPrimary.main",
  // compact mode hides rating/reviews and the default fav/details icons
  compact = false,
  // optional React node to render instead of the default action icons
  actionIcon = null,
  // optional callback fired after the product is added to cart
  onAddedToCart = null,
}) {
  const theme = useTheme();
  // removed local isFavorite; use wishlist store to track

  const resolvedColor = offerColor.includes(".")
    ? offerColor.split(".").reduce((acc, key) => acc?.[key], theme.palette)
    : offerColor;

  const [hover, setHover] = React.useState(false);

  const isNumericDiscount = !isNaN(Number(discount));
  const hasDiscount = isNumericDiscount && Number(discount) > 0;

  const discountedPrice = hasDiscount
    ? (price - price * (Number(discount) / 100)).toFixed(2)
    : price;

  const { addToCart } = useCart();
  const { cart, removeFromCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
 const navigate = useNavigate();
  const handleAddToFav = () => {
    // toggle wishlist: add if not present, remove if present
    const productId = id || uuidv4();
    // check existence using the normalized productId (which may be generated)
    const exists = wishlist.find((w) => String(w.id) === String(productId));
    if (exists) {
      // remove by the id stored in wishlist (or productId)
      removeFromWishlist(exists.id || productId);
      toast.warning("Removed from wishlist");
    } else {
      addToWishlist({ id: productId, name: title, images, price });
      toast.success("Added to wishlist");
    }
  };

  const handleAddToCart = () => {
    const productId = id || uuidv4();
    toast.success("Product added to cart");
    addToCart({
      id: productId,
      name: title,
      images,
      price,
    });
    if (typeof onAddedToCart === "function" && compact) {
      try {
        onAddedToCart(productId);
      } catch (err) {
        // swallow callback errors to avoid breaking UI
        // eslint-disable-next-line no-console
        console.error("onAddedToCart callback error", err);
      }
    }
  };
  const handleRemoveFromCart = () => {
    // prefer to remove by the product id prop when available
    const productId = id;
    if (!productId) return;
    removeFromCart(productId);
    toast.warning("Product removed from cart");
    // ensure Add To Cart control is visible after removal
    setHover(true);
  };

  const inCart = Boolean(cart.find((c) => String(c.id) === String(id)));
  return (
    <Card
      sx={{ width: 270, boxShadow: "none", backgroundColor: "transparent" }}
    >
      <Card
        sx={{
          position: "relative",
          width: 270,
          borderTopLeftRadius: "0.4rem",
          borderTopRightRadius: "0.4rem",
          overflow: "hidden",
          boxShadow: "none",
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {/* Discount Badge */}
        {showOffer && discount && (
          <Box
            sx={(theme) => ({
              position: "absolute",
              top: 12,
              left: 12,
              width: "5.5rem",
              height: "2.6rem",
              backgroundColor: resolvedColor,
              color: theme.palette.custom.btnPrimary.contrastText,
              borderRadius: "4px",
              fontSize: "1.8rem",
              fontWeight: 400,
              textAlign: "center",
              zIndex: 1,
            })}
          >
            {!isNaN(Number(discount)) ? `-${discount}%` : discount}
          </Box>
        )}

        {/* Favorite and Eye Icons (or custom action in compact mode) */}
        {!compact ? (
          <Box
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              display: "flex",
              flexDirection: "column",
              gap: 1,
              zIndex: 1,
            }}
          >
            <IconButton
              size="small"
              onClick={handleAddToFav}
              sx={(theme) => ({
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 32,
                height: 32,
                transition: "color 0.3s ease",
                backgroundColor: "#fff",
                "& .MuiSvgIcon-root": {
                  fontSize: 24,
                  transition: "all 0.3s ease",
                },
                "&:hover": {
                  backgroundColor: theme.palette.custom.btnPrimary.main,
                  color: "#fff",
                },
              })}
            >
              {wishlist.find((w) => String(w.id) === String(id)) ? (
                <FavoriteIcon
                  sx={(theme) => ({
                    color: theme.palette.custom.btnPrimary.main,
                  })}
                />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
            <IconButton
              size="small"
              onClick={() =>
                navigate(
                  {
                    pathname: appRoutes.detailsProduct,
                    search: `?id=${encodeURIComponent(id)}`,
                  },
                  { state: { product: { id, title, images, price } } }
                )
              }
              sx={(theme) => ({
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 32,
                height: 32,
                transition: "color 0.3s ease",
                backgroundColor: "#fff",
                "& .MuiSvgIcon-root": {
                  fontSize: 24,
                  transition: "all 0.3s ease",
                },
                "&:hover": {
                  backgroundColor: theme.palette.custom.btnPrimary.main,
                  color: "#fff",
                },
              })}
            >
              <VisibilityOutlinedIcon />
            </IconButton>
          </Box>
        ) : (
          actionIcon && (
            <Box
              sx={{
                position: "absolute",
                top: 12,
                right: 12,
                zIndex: 1,
              }}
            >
              {actionIcon}
            </Box>
          )
        )}

        {/* Product Image */}
        <Box sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            image={images}
            alt={title}
            sx={{
              width: "100%",
              height: 250,
              // objectFit: "contain",
              bgcolor: "#f5f5f5",
              objectFit: "cover",
            }}
          />

          {/* Add / Remove Button */}
          {inCart ? (
            <Box
              sx={(theme)=>({
                position: "absolute",
                bottom: 0,
                width: "100%",
                height: "4.1rem",
                bgcolor:theme.palette.custom.btnPrimary.main,
                color: "white",
                textAlign: "center",
                borderBottomLeftRadius: "0.4rem",
                borderBottomRightRadius: "0.4rem",
              })}
            >
              <Button
                onClick={handleRemoveFromCart}
                disableElevation
                sx={{
                  width: "100%",
                  color: "white",
                  textTransform: "none",
                  padding: "0.8rem 0",
                }}
              >
                Remove From Cart
              </Button>
            </Box>
          ) : (
            hover && (
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  height: "4.1rem",
                  bgcolor: "black",
                  color: "white",
                  textAlign: "center",
                  borderBottomLeftRadius: "0.4rem",
                  borderBottomRightRadius: "0.4rem",
                }}
              >
                <Button
                  onClick={handleAddToCart}
                  disableElevation
                  sx={{
                    width: "100%",
                    color: "white",
                    textTransform: "none",
                    padding: "0.8rem 0",
                  }}
                >
                  Add To Cart
                </Button>
              </Box>
            )
          )}
        </Box>

        {/* Product Details */}
      </Card>
      <CardContent sx={{ padding: 0, paddingBottom: 0, pt: 2 }}>
        <Typography variant="body1" fontWeight="500" fontSize="1.6rem">
          {title}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            gap: "1.2rem",
            mt: "0.8rem",
          }}
        >
          <Typography
            variant="h6"
            sx={(theme) => ({
              color: theme.palette.custom.btnPrimary.main,
              fontSize: "1.6rem",
              fontWeight: 500,
            })}
          >
            ${discountedPrice}
          </Typography>
          {hasDiscount && (
            <Typography
              variant="h6"
              sx={{
                color: "gray",
                textDecoration: "line-through",
                fontSize: "1.6rem",
                fontWeight: 500,
              }}
            >
              ${price}
            </Typography>
          )}
        </Box>

        {/* {(rating > 0 || reviews > 0) && ( */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            mt: 1,
          }}
        >
          <Rating
            value={rating}
            readOnly
            sx={{
              "& .MuiRating-icon": { fontSize: "2.0rem" },
            }}
          />
          <Typography
            variant="body2"
            color="text.secondary"
            ml={0.5}
            fontSize="1.4rem"
            fontWeight={600}
          >
            ({reviews})
          </Typography>
        </Box>
        {/* )} */}
      </CardContent>
    </Card>
  );
}

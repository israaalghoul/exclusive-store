import {
  Box,
  Typography,
  Button,
  IconButton,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { toast } from "react-toastify";
import { alpha, useTheme } from "@mui/material/styles";
import { ProductList } from "../../products/components/product-list";
import { ProductItem } from "../../products/components/product-item";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../store/index";
import { useCart } from "../../cart/store/cart-store";
import { useEffect } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function WishListPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist, clearWishlist, totalPrice } =
    useWishlist();
  const { addToCart, cart } = useCart();

  const handleMoveAllToBag = () => {
    const movedCount = wishlist.length;
    wishlist.forEach((item) => {
      addToCart({
        id: item.id,
        name: item.name || item.title,
        images: item.images,
        price: item.price,
      });
    });
    clearWishlist();
    if (movedCount > 0) {
      toast.success(
        `${movedCount} item${movedCount > 1 ? "s" : ""} moved to cart`
      );
    }
    navigate("/cart-products");
  };
  // Remove wishlist items automatically when they are added to the cart elsewhere
  useEffect(() => {
    if (!Array.isArray(cart) || cart.length === 0 || wishlist.length === 0) return;
    const cartIds = new Set(cart.map((c) => String(c.id)));
    wishlist.forEach((w) => {
      if (cartIds.has(String(w.id))) {
        removeFromWishlist(w.id);
      }
    });
    // only depend on cart - removeFromWishlist & wishlist are stable here from context
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);
  const handleRemoveFromWishlist = (id) => {
    // prefer to remove by the product id prop when available
    const productId = id;
    if (!productId) return;
    try {
      // eslint-disable-next-line no-console
      console.log('[wishlist page] handleRemoveFromWishlist', productId);
    } catch (e) {}
    removeFromWishlist(productId);
    toast.warning("Product removed from wishlist");
  };

  return (
    <Box sx={{ py: 10 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 7.5,
        }}
      >
        <Typography variant="h4" sx={{ fontSize: "2.0rem", fontWeight: 400 }}>
          Wishlist {wishlist.length > 0 ? `(${wishlist.length})` : ""}
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleMoveAllToBag}
          disabled={wishlist.length === 0}
          sx={{
            fontSize: "1.6rem",
            fontWeight: 500,
            textTransform: "none",
            border: "1px solid rgba(0, 0, 0, 0.50)",
            color: "#000",
            padding: "1.6rem 4.8rem",
          }}
        >
          Move All To Bag
        </Button>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 3,
        }}
      >
        {wishlist.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "4.0rem",
            }}
          >
            <p style={{ color: "#db4444", fontSize: "2.25rem" }}>
              No items in wishlist
            </p>
          </Box>
        ) : (
          wishlist.map((item) => {
            const safeId =
              item && typeof item.id === "object"
                ? item.id?.id ?? JSON.stringify(item.id)
                : String(item.id);
            const img = Array.isArray(item.images)
              ? item.images[0]
              : item.images || "";
            return (
              <Box key={String(safeId)}>
                <ProductItem
                  id={safeId}
                  images={img}
                  title={item.name || item.title}
                  price={item.price}
                  discount={item.discount}
                  compact={true}
                  actionIcon={
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveFromWishlist(safeId)}
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
                      <DeleteOutlineIcon />
                    </IconButton>
                  }
                  onAddedToCart={() => removeFromWishlist(safeId)}
                />
              </Box>
            );
          })
        )}
      </Box>
    </Box>
  );
}

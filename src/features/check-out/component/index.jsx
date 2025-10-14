import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  Card,
  CardContent,
  Divider,
  Breadcrumbs,
  Link,
} from "@mui/material";
import styled from "@emotion/styled";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { userStorage } from "../../auth/storage";
import React, { useState, useEffect } from "react";
import { appRoutes } from "../../../routes/index";
import { useCart } from "../../products/store/cart";
import { useGetMeQuery } from "../../auth/services/queries";

const TextFieldCustom = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    fontSize: "1.6rem",
    fontWeight: 400,
    width: "47.0rem",
  },
  "& .MuiInputLabel-root": {
    fontSize: "1.6rem",
    opacity: 0.5,
  },
  "& .MuiInputLabel-shrink": {
    fontSize: "1.8rem",
    transform: "translate(5px, -17px) scale(0.9)",
    opacity: 0.7,
  },
  "& .MuiFormHelperText-root": {
    fontSize: "1.4rem",
  },
}));
const ButtonNav = styled(Button)(({ theme }) => ({
  textTransform: "none",
  color: "#505050ff",
  fontWeight: 400,
}));
export function CheckOut() {
  const navigate = useNavigate();
  const { cart, totalPrice, clearCart } = useCart();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const { data: me } = useGetMeQuery();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      saveInfo: true,
      paymentMethod: "cash",
    },
  });

  useEffect(() => {
    if (!me) return;
    // prefill a few fields from the user profile if available
    reset({
      ...{
        saveInfo: true,
        paymentMethod: "cash",
      },
      firstName: me.name || "",
      email: me.email || "",
    });
  }, [me, reset]);

  const onSubmit = (data) => {
    // console.log(data);
    // clear cart and show order confirmation dialog
    try {
      clearCart();
    } catch (err) {
      // ignore clearing errors
      // eslint-disable-next-line no-console
      console.error("clearCart error", err);
    }
    setOrderPlaced(true);
  };
  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
  const total = subtotal;

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
        <Link underline="hover" color="inherit" style={{ fontSize: "1.4rem" }}>
          My Account
        </Link>
        <Link underline="hover" color="inherit" style={{ fontSize: "1.4rem" }}>
          Product
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href={appRoutes.cart}
          style={{ fontSize: "1.4rem" }}
        >
          View Cart
        </Link>
        <Typography color="text.primary" sx={{ fontSize: "1.4rem" }}>
          CheckOut
        </Typography>
      </Breadcrumbs>
      {/* Header */}
      <Typography
        variant="h5"
        fontWeight="500"
        sx={{ color: "#111", fontSize: "3.2rem" }}
      >
        Billing Details
      </Typography>
      <Grid container spacing={6} justifyContent="space-between" pt={6}>
        {/* Left: Billing Details */}
        <Grid item xs={12} md={6}>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "3.0rem",
              width: "100%",
            }}
          >
            {/* First Name */}
            <TextFieldCustom
              label="First Name*"
              placeholder="Name"
              fullWidth
              {...register("firstName", { required: true })}
              error={!!errors.firstName}
              helperText={errors.firstName && "This field is required"}
            />
            {/* Company Name */}
            <TextFieldCustom
              label="Company Name"
              fullWidth
              {...register("company")}
            />
            {/* Street Address */}
            <TextFieldCustom
              label="Street Address*"
              fullWidth
              {...register("address", { required: true })}
              error={!!errors.address}
              helperText={errors.address && "This field is required"}
            />
            {/* Apartment */}
            <TextFieldCustom
              label="Apartment, floor, etc. (optional)"
              fullWidth
              {...register("apartment")}
            />
            {/* City */}
            <TextFieldCustom
              label="Town/City*"
              fullWidth
              {...register("city", { required: true })}
              error={!!errors.city}
              helperText={errors.city && "This field is required"}
            />
            {/* Phone */}
            <TextFieldCustom
              label="Phone Number*"
              fullWidth
              {...register("phone", { required: true })}
              error={!!errors.phone}
              helperText={errors.phone && "This field is required"}
            />
            {/* Email */}
            <TextFieldCustom
              label="Email Address*"
              fullWidth
              {...register("email", {
                required: true,
                pattern: /^\S+@\S+$/i,
              })}
              error={!!errors.email}
              helperText={
                errors.email
                  ? errors.email.type === "pattern"
                    ? "Invalid email format"
                    : "This field is required"
                  : ""
              }
            />
            {/* Save Info Checkbox */}
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  {...register("saveInfo")}
                  sx={(theme) => ({
                    color: theme.palette.custom.btnPrimary.main,
                    transform: "scale(1.6)",
                    "&.Mui-checked": {
                      color: theme.palette.custom.btnPrimary.main,
                    },
                  })}
                />
              }
              label="Save this information for faster check-out next time"
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontSize: "1.6rem",
                  fontWeight: 400,
                },
              }}
            />
          </Box>
        </Grid>

        {/* Right Side - Order Summary */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            alignItems: "flex-start",
            maxWidth: "100%",
          }}
        >
          <Card sx={{ padding: 0 }}>
            <CardContent>
              {cart.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                    gap: 10,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <img
                      src={item.images}
                      alt={item.name}
                      style={{ width: 80, height: 80, borderRadius: 4 }}
                    />
                    <Typography sx={{ fontSize: "1.6rem" }}>
                      {(item.title || item.name || "").toString().split(" ").slice(0, 3).join(" ")}
                    </Typography>
                  </Box>
                  <Typography sx={{ fontSize: "1.6rem" }}>
                    ${item.price}
                  </Typography>
                </Box>
              ))}

              <Divider sx={{ my: 2 }} />
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
              >
                <Typography sx={{ fontSize: "1.6rem" }}>Subtotal:</Typography>
                <Typography sx={{ fontSize: "1.6rem" }}>${subtotal}</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
              >
                <Typography sx={{ fontSize: "1.6rem" }}>Shipping:</Typography>
                <Typography sx={{ fontSize: "1.6rem" }}>Free</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 2,
                }}
              >
                <Typography sx={{ fontSize: "1.6rem" }}>Total:</Typography>
                <Typography sx={{ fontSize: "1.6rem" }}>${total}</Typography>
              </Box>

              <RadioGroup
                defaultValue="cash"
                {...register("paymentMethod")}
                sx={{
                  mt: 2,
                  "& .MuiFormControlLabel-label": {
                    fontSize: "1.6rem",
                    fontWeight: 400,
                  },
                  "& .MuiRadio-root": {
                    transform: "scale(1.4)",
                    paddingLeft: "1.4rem",
                  },
                  "& .MuiSvgIcon-root": {
                    fontSize: "2.2rem",
                  },
                }}
              >
                <FormControlLabel
                  value="bank"
                  control={<Radio />}
                  label="Bank"
                />
                <FormControlLabel
                  value="cash"
                  control={<Radio />}
                  label="Cash on delivery"
                />
              </RadioGroup>

              <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                <TextField
                  label="Coupon Code"
                  fullWidth
                  size="small"
                  sx={{
                    "& .MuiInputBase-input": {
                      fontSize: "1.4rem",
                      fontWeight: 400,
                      height: "4.0rem",
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: "1.6rem",
                      padding: "1.0rem",
                    },
                  }}
                />

                <Button
                  variant="contained"
                  color="error"
                  sx={{ width: "21.1rem" }}
                >
                  Apply Coupon
                </Button>
              </Box>

              <Button
                variant="contained"
                color="error"
                fullWidth
                sx={{ mt: 3, width: "21.1rem", height: "5.6rem" }}
                onClick={(e) => {
                  const token = userStorage.get();
                  if (!token) {
                    // open modal (we'll control via state)
                    setOpenAuthModal(true);
                    return;
                  }
                  handleSubmit(onSubmit)(e);
                }}
              >
                Place Order
              </Button>
              <Dialog           
                open={openAuthModal}
                onClose={() => setOpenAuthModal(false)}
                aria-labelledby="auth-required-dialog"
              >
                <DialogTitle id="auth-required-dialog">
                  You need to signup to proceed to checkout
                </DialogTitle>
                <DialogContent>
                  <Typography>
                    Please sign up or login to complete your purchase.
                  </Typography>
                </DialogContent>
                <DialogActions sx={{display:"flex", justifyContent:"center" ,gap:"1.2rem", mb:1}}>
                  <Button
                    onClick={() => {
                      setOpenAuthModal(false);
                      // include redirect back to checkout after signup
                      navigate(`${appRoutes.auth.signUp}?redirect=${encodeURIComponent(appRoutes.checkOut)}`);
                    }}
                    sx={(theme) => ({
                      backgroundColor: theme.palette.custom.btnPrimary.main,
                      color: "#fff",
                    })}
                    variant="contained"
                  >
                    Sign Up
                  </Button>
                  <Button onClick={() => setOpenAuthModal(false)}
                    sx={(theme) => ({
                      backgroundColor: "#5a5a5aff",
                      color: "#fff",
                    })}
                    variant="contained"
                    >
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
              <Dialog
                open={orderPlaced}
                onClose={() => setOrderPlaced(false)}
                aria-labelledby="order-placed-dialog"
              >
                <DialogTitle id="order-placed-dialog">Order Placed Successfully!</DialogTitle>
                <DialogContent>
                  <Typography>Your order has been placed.</Typography>
                </DialogContent>
                <DialogActions sx={{ display: "flex", justifyContent: "center", gap: "1.2rem", mb: 1 }}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setOrderPlaced(false);
                      navigate(appRoutes.home);
                    }}
                    sx={(theme) => ({ backgroundColor: theme.palette.custom.btnPrimary.main, color: "#fff" })}
                  >
                    Continue shopping
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => setOrderPlaced(false)}
                    sx={(theme) => ({ backgroundColor: "#5a5a5aff", color: "#fff" })}
                  >
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

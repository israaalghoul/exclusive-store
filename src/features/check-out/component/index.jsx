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
import { useNavigate } from "react-router";

import { appRoutes } from "../../../routes/index";
import { useCart } from "../../products/store/cart";

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
  const { cart, totalPrice } = useCart();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      saveInfo: true,
      paymentMethod: "cash",
    },
  });

  const onSubmit = (data) => {
    // console.log("Billing info:", data);
    toast.success("Order placed successfully!");
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
                      {item.name.split(" ").slice(0, 3).join(" ")}
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
                  alignItems="center"
                  sx={{
                    "& .MuiInputBase-input": {
                      fontSize: "1.4rem",
                      fontWeight: 400,
                      height: "4.0rem",
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: "1.6rem",
                      padding:"1.0rem"
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
                onClick={handleSubmit(onSubmit)}
              >
                Place Order
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

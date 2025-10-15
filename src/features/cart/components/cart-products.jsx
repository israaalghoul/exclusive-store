import React from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Button,
  TextField,
  Card,
  CardContent,
  styled,
  Breadcrumbs,
  Link,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { appRoutes } from "../../../routes/index";
// Store
import { useCart } from "../store/cart-store";
// Components
import { CartItem } from "./cart-item";
import { Btn } from "../../../shared/components/btn";

const TableCellCustom = styled(TableCell)({
  fontSize: "1.6rem",
  fontWeight: 400,
});
const BoxCustom = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
});
const TextFieldCustom = styled(TextField)({
  width: "50%",
  "& .MuiInputBase-input": {
    fontSize: "1.6rem",
    fontWeight: 400,
    width: "30.0rem",
  },
});
const BtnOutlined = styled(Button)({
  textTransform: "none",
  border: "1px solid #000",
  color: "#000",
});

export function CartProducts() {
  const navigate = useNavigate();
  const { cart, totalPrice } = useCart();

  return (
    <Box sx={{ pt: { xs: 2, md: 6 }, py: { xs: 2, md: 10 } }}>
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
          Cart
        </Typography>
      </Breadcrumbs>
      {/* ===== Start Table ===== */}
      <Card sx={{ mt: 3, borderRadius: 1, boxShadow: 1 }}>
        <Table>
          {/* Header */}
          <TableHead>
            <TableRow>
              <TableCellCustom>Product</TableCellCustom>
              <TableCellCustom>Price</TableCellCustom>
              <TableCellCustom>Quantity</TableCellCustom>
              <TableCellCustom>Subtotal</TableCellCustom>
            </TableRow>
          </TableHead>
          {/* Body */}
          <TableBody>
            {cart.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  align="center"
                  sx={{ fontSize: "1.4rem", color: "#db4444" }}
                >
                  Your cart is empty
                </TableCell>
              </TableRow>
            ) : (
              <CartItem />
            )}
          </TableBody>
        </Table>
      </Card>
      {/* ===== End Table ===== */}
      {/* Outlined Btns */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <BtnOutlined
          variant="outlined"
          onClick={() => navigate(appRoutes.home)}
        >
          Return To Shop
        </BtnOutlined>
        <BtnOutlined variant="outlined">Update Cart</BtnOutlined>
      </Box>
      
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 4,
          flexDirection: { xs: "column", sm: "row" },
          gap: "3.0rem",
        }}
      >
        {/* Coupon */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "2.4rem",
            maxWidth: "100%",
          }}
        >
          <TextFieldCustom placeholder="Coupon Code" size="large" fullWidth />
          <Btn
            btnName="Apply Coupon"
            variantColor="btnPrimary"
            px="0rem"
            py="0rem"
            width="50%"
            height="5.6rem"
          />
        </Box>
        {/* Start Cart Total */}
        <Box sx={{ maxWidth: "100%", width: "50.0rem" }}>
          <Card sx={{ borderRadius: 0.5, boxShadow: 1 }}>
            <CardContent>
              <Typography variant="h4" fontWeight="500" gutterBottom mb={3}>
                Cart Total
              </Typography>

              <BoxCustom>
                <Typography variant="h5">Subtotal:</Typography>
                <Typography variant="h5">${totalPrice}</Typography>
              </BoxCustom>
              <Divider sx={{ m: 2 }} />

              <BoxCustom>
                <Typography variant="h5">Shipping:</Typography>
                <Typography variant="h5">Free</Typography>
              </BoxCustom>
              <Divider sx={{ m: 2 }} />

              <BoxCustom>
                <Typography variant="h5">Total:</Typography>
                <Typography variant="h5" fontWeight="bold">
                  ${totalPrice}
                </Typography>
              </BoxCustom>

              <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                <Btn
                  btnName="Proceed to checkout"
                  variantColor="btnPrimary"
                  px="0rem"
                  py="0rem"
                  width="26.0rem"
                  height="5.6rem"
                  onClick={() =>
                    navigate(appRoutes.checkOut, { state: { cart } })
                  }
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
        {/* End Cart Total */}
      </Box>
    </Box>
  );
}

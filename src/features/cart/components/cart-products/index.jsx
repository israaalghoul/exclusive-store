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
  Grid,
  IconButton,
  MenuItem,
  Select,
  styled,
  Breadcrumbs,
  Link,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router";
// MUI Icons
import CloseIcon from "@mui/icons-material/Close";

import { appRoutes } from "../../../../routes/index";
import { useCart } from "../../../products/store/cart";

// Local Icons
import dropUpIcon from "../../../../assets/images/arrow/drop-up-icon.svg";
import dropDownIcon from "../../../../assets/images/arrow/drop-down-icon.svg";

const TableCellCustom = styled(TableCell)(({ theme }) => ({
  fontSize: "1.6rem",
  fontWeight: 400,
}));

export function CartProducts() {
  const navigate = useNavigate();
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
    totalPrice,
  } = useCart();

  //   console.log(cart);

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

      <Card sx={{ mt: 3, borderRadius: 2, boxShadow: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCellCustom>Product</TableCellCustom>
              <TableCellCustom>Price</TableCellCustom>
              <TableCellCustom>Quantity</TableCellCustom>
              <TableCellCustom>Subtotal</TableCellCustom>
            </TableRow>
          </TableHead>
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
              cart.map((item, index) => (
                <TableRow key={item.id ?? index}>
                  {/* Img Products */}
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        position: "relative",
                      }}
                    >
                      <img
                        src={item.images}
                        alt={item.name}
                        width={60}
                        height={60}
                        style={{ borderRadius: 8 }}
                      />
                      <IconButton
                        onClick={() => removeFromCart(item.id)}
                        sx={(theme) => ({
                          position: "absolute",
                          left: -9,
                          top: -9,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 20,
                          height: 20,
                          color: "#ffffffff",
                          backgroundColor: "#7a7a7aff",
                          transition: "all 0.3s ease",
                          "& .MuiSvgIcon-root": {
                            fontSize: 18,
                            transition: "color 0.3s ease",
                          },
                          "&:hover": {
                            backgroundColor:
                              theme.palette.custom.btnPrimary.main,
                            color: "#ffffffff",
                          },
                        })}
                      >
                        <CloseIcon />
                      </IconButton>
                      <Typography
                        sx={{
                          color: "#000000ff",
                          fontSize: "1.6rem",
                          fontWeight: 400,
                        }}
                      >
                        {item.name.split(" ").slice(0, 3).join(" ")}
                      </Typography>
                    </Box>
                  </TableCell>
                  {/* Price */}
                  <TableCellCustom>${item.price}</TableCellCustom>
                  {/* Quantity */}
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        width: "7.2rem",
                        height: "4.4rem",
                        overflow: "hidden",
                      }}
                    >
                      {/*Number Of Qty*/}
                      <TextField
                        type="number"
                        value={item.quantity}
                        inputProps={{
                          min: 1,
                          style: {
                            padding: 0,
                            textAlign: "center",
                            MozAppearance: "textfield",
                          },
                        }}
                        sx={{
                          "& input::-webkit-inner-spin-button, & input::-webkit-outer-spin-button":
                            {
                              WebkitAppearance: "none",
                              margin: 0,
                            },
                          width: "50px",
                          "& .MuiOutlinedInput-root": {
                            border: "none",
                            "& fieldset": { border: "none" },
                            "& input": {
                              textAlign: "center",
                              fontSize: "1.6rem",
                              fontWeight: "400",
                            },
                          },
                        }}
                        onChange={() => {}}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          paddingRight: "1.2rem",
                        }}
                      >
                        {/* Increase Qty Button*/}
                        <IconButton
                          onClick={() => increaseQty(item.id)}
                          sx={{
                            borderRadius: 0,
                            backgroundColor: "transparent",
                            padding: 0,
                            "&:hover": {
                              backgroundColor: "transparent",
                            },
                          }}
                        >
                          <Box
                            component="img"
                            src={dropUpIcon}
                            alt="drop-up-icon"
                            sx={{
                              width: { xs: 20, sm: 20, lg: 24 },
                              height: "auto",
                            }}
                          />
                        </IconButton>
                        {/* Decrease Qty Button*/}
                        <IconButton
                          onClick={() => decreaseQty(item.id)}
                          sx={{
                            borderRadius: 0,
                            padding: 0,
                            backgroundColor: "transparent",
                            "&:hover": {
                              backgroundColor: "transparent",
                            },
                          }}
                        >
                          <Box
                            component="img"
                            src={dropDownIcon}
                            alt="drop-down-icon"
                            sx={{
                              width: { xs: 20, sm: 20, lg: 24 },
                              height: "auto",
                            }}
                          />
                        </IconButton>
                      </Box>
                    </Box>
                  </TableCell>
                  {/* Subtotal */}
                  <TableCellCustom>
                    ${item.price * item.quantity}
                  </TableCellCustom>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button
          variant="outlined"
           onClick={() =>
                    navigate(appRoutes.home)
                  }
          sx={{
            textTransform: "none",
            border: "1px solid #000",
            color: "#000",
          }}
        >
          Return To Shop
        </Button>
        <Button
          variant="outlined"
 
          sx={{
            textTransform: "none",
            border: "1px solid #000",
            color: "#000",
          }}
        >
          Update Cart
        </Button>
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "2.4rem",
            maxWidth: "100%",
          }}
        >
          <TextField
            placeholder="Coupon Code"
            size="large"
            fullWidth
            sx={{
              width: "50%",
              "& .MuiInputBase-input": {
                fontSize: "1.6rem",
                fontWeight: 400,
                width: "30.0rem",
              },
            }}
          />
          <Button
            variant="contained"
            color="error"
            sx={{ textTransform: "none", width: "50%", height: "5.6rem" }}
          >
            Apply Coupon
          </Button>
        </Box>
        <Box sx={{ maxWidth: "100%", width: "50.0rem" }}>
          <Card sx={{ borderRadius: 0.5, boxShadow: 1 }}>
            <CardContent>
              <Typography variant="h4" fontWeight="500" gutterBottom>
                Cart Total
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1,
                  pt: 2,
                }}
              >
                <Typography variant="h5">Subtotal:</Typography>
                <Typography variant="h5">${totalPrice}</Typography>
              </Box>
              <Divider sx={{ mt: 2 }} />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1,
                  pt: 2,
                }}
              >
                <Typography variant="h5">Shipping:</Typography>
                <Typography variant="h5">Free</Typography>
              </Box>
              <Divider sx={{ mt: 2 }} />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 2,
                  pt: 2,
                }}
              >
                <Typography variant="h5">Total:</Typography>
                <Typography variant="h5" fontWeight="bold">
                  ${totalPrice}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  onClick={() =>
                    navigate(appRoutes.checkOut, { state: { cart } })
                  }
                  variant="contained"
                  color="error"
                  fullWidth
                  sx={{
                    textTransform: "none",
                    maxWidth: "26.0rem",
                    height: "5.6rem",
                  }}
                >
                  Proceed to checkout
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}

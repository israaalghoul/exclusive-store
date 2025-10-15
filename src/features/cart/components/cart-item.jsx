import {
  Box,
  Typography,
  TableCell,
  TableRow,
  TextField,
  styled,
  IconButton,
} from "@mui/material";

// MUI Icons
import CloseIcon from "@mui/icons-material/Close";

import { useCart } from "../store/cart-store";

// Local Icons
import dropUpIcon from "../../../assets/images/arrow/drop-up-icon.svg";
import dropDownIcon from "../../../assets/images/arrow/drop-down-icon.svg";

const TableCellCustom = styled(TableCell)(({ theme }) => ({
  fontSize: "1.6rem",
  fontWeight: 400,
}));

export function CartItem() {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
  } = useCart();


  return cart.map((item, index) => (
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
          {/* support images as array or single string */}
          <img
            src={Array.isArray(item.images) ? item.images[0] : item.images}
            alt={item.title || item.name || "product"}
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
                backgroundColor: theme.palette.custom.btnPrimary.main,
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
            {(item.title || item.name || "")
              .toString()
              .split(" ")
              .slice(0, 3)
              .join(" ")}
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
      <TableCellCustom>${item.price * item.quantity}</TableCellCustom>
    </TableRow>
  ));
}

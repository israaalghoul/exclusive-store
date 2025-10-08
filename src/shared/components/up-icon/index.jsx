import upIconImg from "../../../assets/images/arrow/arrow-up-icon.svg" ;
import { styled, keyframes } from "@mui/material/styles";
import { Box, IconButton } from "@mui/material";
import React from "react";

const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(1); opacity: 0.7; }
`;


const AnimatedIcon = styled(IconButton)(({ theme }) => ({
  animation: `${pulse} 1.5s infinite ease-in-out`,
  color: theme.palette.primary.dark,     
  zIndex: 1300,        
  background: "#fff",
  boxShadow: theme.shadows[3],
  "&:hover": {
    background: theme.palette.grey[200],
  },
}));


export default function TopIcon({ onClick ,position ,top,right, bottom, left}) {

  return (
    <AnimatedIcon onClick={onClick}
        sx={{
        position,
        bottom,
        right,
        top,
        left,
      }}
    >
      <Box
                component="img"
                src={upIconImg}
                alt="cart-icon"
                sx={{
                  width: { xs: 12, sm: 12, lg: 32 },
                  height: "auto",
                }}
      />
    </AnimatedIcon>
  );
}
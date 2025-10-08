import { useNavigate } from "react-router";

import { useTheme } from "@mui/material/styles";
import { Button, styled } from "@mui/material";
export function Btn({
  btnName,
  route,
  onClick,
  variantColor = "btnPrimary",
   px= "4.8rem",
    py= "1.6rem",
    width="2.0rem",
    height="4.0rem"
}) {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    if (route) {
      navigate(route);
    }
  };

  return (
    <Button
      onClick={handleClick}
      sx={{
        backgroundColor: theme.palette.custom[variantColor].main,
        color: theme.palette.custom[variantColor].contrastText,
         px: px,
         py: py,
         width:width,
         height:height,
         minWidth:"2.0rem",
         borderRadius:"0.4rem",
      }}
    >
      {btnName}
    </Button>
  );
}
// Btn.jsx


// export function Btn({
//   btnName,
//   route,
//   onClick,
//   variantColor = "btnPrimary.primary", // 👈 اسم اللون من theme
// }) {
//   const navigate = useNavigate();

//   const handleClick = () => {
//     if (onClick) onClick();
//     if (route) navigate(route);
//   };

//   return (
//     <Button
//       onClick={handleClick}
//       sx={{
//         backgroundColor: theme.palette.custom[variantColor],
//         color: theme.palette.custom[variantColor].contrastText,
//         textTransform: "none",
//         px: 2,
//         py: 1,
//         "&:hover": {
//           backgroundColor: theme.palette.custom[variantColor].main + "cc", // لون hover
//         },
//       }}
//     >
//       {btnName}
//     </Button>
//   );
// }

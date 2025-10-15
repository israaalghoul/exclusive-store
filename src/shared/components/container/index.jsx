// import './style.css';
// export function Container({children}) {

//     return (
//         <div className='container'>{children}</div>
//     )
// }
import { styled, Container } from "@mui/material";

export const MyContainer = styled(Container)(({ theme }) => ({
  width: "100%",
  margin: 0,
  ///////////// RESPONSIVE //////////////
    "@media (max-width: 320px)": {
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
    },
    "@media (min-width:321px)": {
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(5),
    },
    "@media (min-width: 768px)": {
  paddingLeft: theme.spacing(4.375),
  paddingRight: theme.spacing(4.375),
    },
    "@media (min-width: 1024px)": {
  paddingLeft: theme.spacing(12),
  paddingRight: theme.spacing(12),
    },
     "@media (min-width: 1440px)": {
  paddingLeft: theme.spacing(16.875),
  paddingRight: theme.spacing(16.875),
    },
}));

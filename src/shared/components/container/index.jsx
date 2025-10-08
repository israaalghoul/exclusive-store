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
  paddingLeft: theme.spacing(16.875),
  paddingRight: theme.spacing(16.875),
}));

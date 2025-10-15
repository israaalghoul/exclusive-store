import { useNavigate } from "react-router-dom"
import { appRoutes } from "../../../routes"
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const AppLogoStyle = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "colorKey" && prop !== "shade",
})(({ theme, colorKey = "primary", shade = "light" }) => ({
  color: theme.palette[colorKey][shade],
  cursor: "pointer",
  ///////////// RESPONSIVE //////////////
    "@media (min-width: 321px)": {
      fontSize: "2.0rem", 
    },
      "@media (min-width:768px)": {
      fontSize: "2.4rem", 
    },
}));



export function AppLogo({ colorKey = "primary", shade = "light" }) {
    const navigate = useNavigate()

    
    return (
            <AppLogoStyle variant="h6" component="div" 
            colorKey={colorKey} 
            shade={shade}
              sx={{
              fontFamily: "Inter",
              lineHeight:"2.4rem", 
              fontSize: "2.4rem", 
              fontWeight: 700, 
              letterSpacing: "3%" }} 
              onClick={() => navigate(appRoutes.home)}>
              Exclusive
            </AppLogoStyle>

    )
}


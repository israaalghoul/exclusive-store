import { appRoutes } from "../../routes";
import { Box, Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Breadcrumbs, Link } from "@mui/material";
import {Btn} from "../../shared/components/btn"
export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <Box sx={{ bgcolor: "#fff", pt: { xs: 2, md: 6 }, py: { xs: 2, md: 10 } }}>
      {/* ===== Breadcrumb ===== */}
      <Breadcrumbs aria-label="breadcrumb" >
        <Link
          underline="hover"
          color="inherit"
          href={appRoutes.home}
          style={{ fontSize: "1.4rem" }}
        >
          Home
        </Link>
        <Typography color="text.primary" sx={{ fontSize: "1.4rem" }}>
          CheckOut
        </Typography>
      </Breadcrumbs>
      <Box
        maxWidth="100%"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          textAlign: "center",
          padding:0,
          margin:0
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: "110px",
            fontWeight: 500,
            mb: 5,
          }}
        >
          404 Not Found
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: "16px",
            fontWeight: 400,
            color: "#666666",
            mb: 10,
          }}
        >
          Your visited page not found. You may go home page.
        </Typography>
        <Btn
          btnName="Back to home page"
          variantColor="btnPrimary"
          px="0rem"
          py="0rem"
          width="25.4rem"
          height="5.6rem"
       onClick={() => navigate(appRoutes.home)}
        />
      </Box>
    </Box>
  );
}

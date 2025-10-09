import { appRoutes } from "../../routes";
import { Box, Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Breadcrumbs, Link } from "@mui/material";
export default function NotFoundPage() {
  const navigate = useNavigate();
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
        <Typography color="text.primary" sx={{ fontSize: "1.4rem" }}>
          CheckOut
        </Typography>
      </Breadcrumbs>
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: "110px",
            fontWeight: 500,
            mb: 2,
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
            mb: 4,
          }}
        >
          Your visited page not found. You may go home page.
        </Typography>

        <Button
          variant="contained"
          onClick={() => navigate("/")}
          sx={{
            width: "254px",
            height: "56px",
            backgroundColor: "#DB4444",
            color: "#FAFAFA",
            fontSize: "16px",
            fontWeight: 500,
            textTransform: "none",
            borderRadius: "4px",
            "&:hover": {
              backgroundColor: "#b73737",
            },
          }}
        >
          Back to home page
        </Button>
      </Container>
    </Box>
  );
}

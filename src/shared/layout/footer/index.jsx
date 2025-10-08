import {
  Box,
  Grid,
  Typography,
  TextField,
  IconButton,
  Link,
  Stack,
} from "@mui/material";
import { styleFooter } from "./footer-style";
import Container from "@mui/material/Container";
import { AppLogo } from "../../components/app-logo";
import { alpha, styled } from "@mui/material/styles";
import qrCodeImg from "../../../assets/images/footer/qr-code.png";
import appStoreImg from "../../../assets/images/footer/app-store.png";
import senderIconImg from "../../../assets/images/footer/send-icon.svg";
import googlePlayImg from "../../../assets/images/footer/google-play.png";
import twitterIconImg from "../../../assets/images/footer/twitter-icon.svg";
import linkedinIconImg from "../../../assets/images/footer/linkedin-icon.svg";
import facebookIconImg from "../../../assets/images/footer/facebook-icon.svg";
import instagramIconImg from "../../../assets/images/footer/instagram-icon.svg";

const FooterComponent = styled(Box)(({theme}) => ({
...styleFooter.footerStyle(theme)
}));
const InputFieldComponent = styled(Box)(({theme}) => ({
    ...styleFooter.inputFieldStyle(theme)
}));
const TextFieldComponent = styled(TextField)(({theme}) => ({
    ...styleFooter.textFieldStyle(theme)
}));
const TypographyComponent = styled(Typography)(({ theme }) => ({
  ...styleFooter.typographyStyle(theme),
}));
const CaptionComponent = styled(Typography)(({ theme }) => ({
  ...styleFooter.captionStyle(theme),
}));

export function Footer() {
  return (
    <FooterComponent>
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          ...styleFooter.footerContainerStyle,
        }}
      >
        <Grid container spacing={10.9}>
          {/* Exclusive / Subscribe */}
          <Grid item xs={12} sm={6} md={3}>
            <Stack spacing={3}>
              {/* logo */}
              <AppLogo colorKey="primary" shade="dark" />
              <TypographyComponent variant="body2" gutterBottom>
                Subscribe
              </TypographyComponent>
              <CaptionComponent variant="caption" gutterBottom>
                Get 10% off your first order
              </CaptionComponent>
            </Stack>
            <InputFieldComponent>
              <TextFieldComponent
                variant="outlined"
                placeholder="Enter your email"
                size="small"
              />
              <IconButton sx={{ p: 0 }}>
                <Box
                  component="img"
                  src={senderIconImg}
                  alt="sender-icon"
                  sx={{
                    width: { xs: 24, sm: 24, lg: 24 },
                    height: "auto",
                  }}
                />
              </IconButton>
            </InputFieldComponent>
          </Grid>

          {/* Support */}
          <Grid item xs={12} sm={6} md={3} sx={{ maxWidth: "17.5rem" }}>
            <TypographyComponent variant="h6" gutterBottom>
              Support
            </TypographyComponent>
            <CaptionComponent variant="body2">
              111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
            </CaptionComponent>
            <CaptionComponent variant="body2">exclusive@gmail.com</CaptionComponent>
            <CaptionComponent variant="body2">+88015-88888-9999</CaptionComponent>
          </Grid>

          {/* Account */}
          <Grid item xs={12} sm={6} md={2}>
            <TypographyComponent variant="h6" gutterBottom>
              Account
            </TypographyComponent>
            {["My Account", "Login / Register", "Cart", "Wishlist", "Shop"].map(
              (item) => (
                <CaptionComponent key={item} variant="body2">
                  <Link href="#" underline="hover" color="inherit">
                    {item}
                  </Link>
                </CaptionComponent>
              )
            )}
          </Grid>

          {/* Quick Link */}
          <Grid item xs={12} sm={6} md={2}>
            <TypographyComponent variant="h6" gutterBottom>
              Quick Link
            </TypographyComponent>
            {["Privacy Policy", "Terms Of Use", "FAQ", "Contact"].map(
              (item) => (
                <CaptionComponent key={item} variant="body2">
                  <Link href="#" underline="hover" color="inherit">
                    {item}
                  </Link>
                </CaptionComponent>
              )
            )}
          </Grid>

          {/* Download App */}
          <Grid item xs={12} sm={6} md={2}>
            <TypographyComponent variant="h6" gutterBottom>
              Download App
            </TypographyComponent>
            <Typography
              variant="caption"
              display="block"
              gutterBottom
              sx={{ fontSize: "1.2rem", fontWeight: 500 }}
            >
              Save $3 with App New User Only
            </Typography>
            <Box
              sx={{
                ...styleFooter.containerContactStyle,
              }}
            >
              <Box
                component="img"
                src={qrCodeImg}
                alt="qr-code"
                sx={{
                  width: { xs: 80, sm: 80, lg: 80 },
                  height: "auto",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "1.0rem",
                }}
              >
                <Box
                  component="img"
                  src={googlePlayImg}
                  alt="google-play"
                  sx={{
                    width: { xs: 80, sm: 80, lg: 104 },
                    height: "auto",
                  }}
                />
                <Box
                  component="img"
                  src={appStoreImg}
                  alt="app-img"
                  sx={{
                    width: { xs: 80, sm: 80, lg: 104 },
                    height: "auto",
                  }}
                />
              </Box>
            </Box>
            <Stack direction="row" spacing={3} mt={3}>
              <Box
                component="img"
                src={facebookIconImg}
                alt="facebook-icon"
                sx={{
                  width: { xs: 24, sm: 24, lg: 24 },
                  height: "auto",
                }}
              />
              <Box
                component="img"
                src={twitterIconImg}
                alt="twitter-icon"
                sx={{
                  width: { xs: 24, sm: 24, lg: 24 },
                  height: "auto",
                }}
              />
              <Box
                component="img"
                src={instagramIconImg}
                alt="instagram-icon"
                sx={{
                  width: { xs: 24, sm: 24, lg: 24 },
                  height: "auto",
                }}
              />
              <Box
                component="img"
                src={linkedinIconImg}
                alt="linkedin-icon"
                sx={{
                  width: { xs: 24, sm: 24, lg: 24 },
                  height: "auto",
                }}
              />
            </Stack>
          </Grid>
        </Grid>
      </Container>

      {/* Bottom copyright */}
      <Box
        textAlign="center"
        sx={{
          borderTop: (theme) =>
            `1px solid ${alpha(theme.palette.secondary.dark, 0.5)}`,
          pt: 2,
          pb: 3,
        }}
      >
        <Typography
          variant="caption"
          sx={(theme) => ({
            fontSize: "1.6rem",
            fontWeight: 400,
            color: alpha(theme.palette.secondary.dark, 0.5),
          })}
        >
          © Copyright Rimel 2022. All rights reserved
        </Typography>
      </Box>
    </FooterComponent>
  );
}

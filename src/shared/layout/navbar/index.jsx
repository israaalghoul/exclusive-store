import { SearchInput } from "../../../features/search/components/search-input";
import { useGetMeQuery } from "../../../features/auth/services/queries";
import downArrowImg from "../../../assets/images/arrow/DropDown.svg";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Box, Collapse, IconButton, useTheme } from "@mui/material";
import { useMenuStore } from "../../../features/account-menu/store";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../../../features/products/store/cart";
import { useWishlist } from "../../../features/wishlist/store";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { AppLogo } from "../../components/app-logo";
import Container from "@mui/material/Container";
import { styleNavSale } from "./sale-bar-style";
import TopIcon from "../../components/up-icon";
import { useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { styleNavApp } from "./app-bar-style";
import { appRoutes } from "../../../routes";
import { useNavigate } from "react-router";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import React, { useState } from "react";

const SaleBar = styled(Box)(({ theme }) => ({
  ...styleNavSale.saleBarStyle(theme),
}));
const AppBarStyle = styled(AppBar)(({ theme, open }) => ({
  ...styleNavApp.appBarStyle(theme),
  transition: "margin-top 0.3s ease-in-out",
  marginTop: open ? 0 : -48,
}));

export function Navbar() {
  const theme = useTheme();
  const [hovered, setHovered] = useState(false);
  const { cart, openCart } = useCart();
  const { wishlist, openWishlist } = useWishlist();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const countWishlist = wishlist.reduce((sum, item) => sum + item.quantity, 0);
  const { openMenu } = useMenuStore();

  //
  // const { isLoggedIn } = useIsLoggedIn();
  const { data: user } = useGetMeQuery();
  // console.log (useGetMeQuery());
  // const { mutateAsync: login} = useLoginMutation();
  // console.log(login);
  const handleClick = (event) => {
    openMenu(event.currentTarget);
  };
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const handleOpenSaleBar = () => {
    setOpen(true);
    // window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const location = useLocation();
  // normalize pathname: remove trailing slash
  // const normalizedPath = location.pathname.replace(/\/+$/, "");
  // const hideIcons =
  //   normalizedPath === appRoutes.auth.signUp ||
  //   normalizedPath === appRoutes.auth.login;
useEffect(() => {
  const normalizedPath = location.pathname.replace(/\/+$/, "");


  if (
    normalizedPath === appRoutes.auth.signUp ||
    normalizedPath === appRoutes.auth.login
  ) {
    setHideIcons(true);
  } else {
    setHideIcons(false);
  }
}, [location]);

  return (
    <Box sx={{ flexGrow: 1, pt: open ? "130px" : "85px" }}>
      <Collapse in={open}>
        <SaleBar onClick={() => setOpen(false)}>
          <div>
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{" "}
            <Button
              size="small"
              variant="text"
              onClick={() => {
                const section = document.getElementById("best-sale");
                section?.scrollIntoView({ behavior: "smooth" });
              }}
              sx={{
                ...styleNavSale.shopBtnStyle,
              }}
            >
              Shop Now
            </Button>
          </div>
          <Button
            size="small"
            variant="text"
            sx={{
              ...styleNavSale.langBtnStyle,
            }}
          >
            English
            <img
              src={downArrowImg}
              alt="dropdown"
              style={{
                ...styleNavSale.langImgBtn,
              }}
            />
          </Button>
        </SaleBar>
      </Collapse>
      {!open && (
        <TopIcon
          onClick={handleOpenSaleBar}
          position={"fixed"}
          top={25}
          right={25}
          zIndex={theme.zIndex.tooltip + 3}
        />
      )}

      <AppBarStyle open={open}>
        <Container
          maxWidth={false}
          disableGutters
          sx={{
            ...styleNavApp.containerAppBarStyle,
          }}
        >
          {/* left: logo + nav list button */}
          <Box sx={{ ...styleNavApp.boxLeftStyle }}>
            {/* logo */}
            <AppLogo colorKey="primary" shade="light" />

            {/* nav list */}
            <Box sx={{ ...styleNavApp.navListStyle }}>
              <Button variant="link" onClick={() => navigate(appRoutes.home)}>
                Home
              </Button>
              <Button
                variant="link"
                onClick={() => navigate(appRoutes.contact)}
              >
                Contact
              </Button>
              <Button variant="link" onClick={() => navigate(appRoutes.about)}>
                About
              </Button>
              <Button
                variant="link"
                onClick={() => navigate(appRoutes.auth.signUp)}
              >
                Sign Up
              </Button>
            </Box>
          </Box>
          {/* right: search + icons */}
          <Box sx={{ ...styleNavApp.boxRightStyle }}>
            {/* search bar */}
            <SearchInput />
            {/* icons */}
            {!hideIcons && (
              <Box sx={{ ...styleNavApp.iconStyle }}>
                <IconButton
                  aria-label="favorites"
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  onClick={() => navigate(appRoutes.wishlist)}
                  sx={(theme) => ({
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 32,
                    height: 32,
                    transition: "color 0.3s ease",
                    color: hovered
                      ? theme.palette.custom.btnPrimary.main
                      : theme.palette.text.primary,
                    "& .MuiSvgIcon-root": {
                      fontSize: 24,
                      transition: "all 0.3s ease",
                    },

                  })}
                >
                  {hovered ? (
                    <Badge
                    badgeContent={countWishlist}
                    color="primary"
                    sx={(theme) => ({
                      "& .MuiBadge-badge": {
                        backgroundColor: theme.palette.custom.btnPrimary.main,
                        color: theme.palette.custom.btnPrimary.contrastText,
                        fontWeight: 400,
                        fontSize: "1.2rem",
                      },
                    })}
                  >
                     <FavoriteIcon
                      sx={{
                        transition: "transform 0.2s",
                        transform: "scale(1.1)",
                      }}
                    />
                  </Badge>
                  
                  ) : (
                   <Badge
                    badgeContent={countWishlist}
                    color="primary"
                    sx={(theme) => ({
                      "& .MuiBadge-badge": {
                        backgroundColor: theme.palette.custom.btnPrimary.main,
                        color: theme.palette.custom.btnPrimary.contrastText,
                        fontWeight: 400,
                        fontSize: "1.2rem",
                      },
                    })}
                  >
                    <FavoriteBorderIcon />
                  </Badge>
                    
                  )}
                </IconButton>
                <IconButton
                  aria-label="cart"
                  sx={(theme) => ({
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 32,
                    height: 32,
                    color: "#333333ff",
                    transition: "all 0.3s ease",
                    "& .MuiSvgIcon-root": {
                      fontSize: 24,
                      transition: "color 0.3s ease",
                    },
                  })}
                  onClick={() => navigate(appRoutes.cart)}
                >
                  <Badge
                    badgeContent={count}
                    color="primary"
                    sx={(theme) => ({
                      "& .MuiBadge-badge": {
                        backgroundColor: theme.palette.custom.btnPrimary.main,
                        color: theme.palette.custom.btnPrimary.contrastText,
                        fontWeight: 400,
                        fontSize: "1.2rem",
                      },
                    })}
                  >
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>

                {user && (
                  <IconButton
                    sx={(theme) => ({
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 34,
                      height: 34,
                      color: "#333333ff",
                      transition: "all 0.3s ease",
                      "& .MuiSvgIcon-root": {
                        fontSize: 28,
                        transition: "color 0.3s ease",
                      },
                      "&:hover": {
                        backgroundColor: theme.palette.custom.btnPrimary.main,
                        color: "#ffffffff",
                      },
                    })}
                    onClick={handleClick}
                  >
                    <PersonOutlineIcon />
                  </IconButton>
                )}
              </Box>
            )}
          </Box>
        </Container>
      </AppBarStyle>
    </Box>
  );
}

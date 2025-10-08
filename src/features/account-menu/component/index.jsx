import React, { useState, useRef, useEffect } from "react";
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";

import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { logoutHelper } from "../../auth/utilities/auth";
import ReviewsIcon from "@mui/icons-material/Reviews";
import CancelIcon from "@mui/icons-material/Cancel";
import LogoutIcon from "@mui/icons-material/Logout";
import { useMenuStore } from "../store";


export function AccountMenu() {
  const iconSize = 24;
  const textSize = "1.4rem";

  const { isMenuOpen, anchorEl, closeMenu } = useMenuStore();
  const menuRef = useRef(null);

  //close menu when mouse move out of menu
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleMouseMove = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [isMenuOpen, closeMenu]);

  const handleItemClick = (action) => {
    closeMenu();

    switch (action) {
      case "account":
        // navigate("/account");
        closeMenu;
        break;
      case "orders":
        // navigate("/orders");
        closeMenu;
        break;
      case "cancellations":
        // navigate("/cancellations");
        closeMenu;
        break;
      case "reviews":
        // navigate("/reviews");
        closeMenu;
        break;
      case "logout":
        logoutHelper();
        break;
      default:
        break;
    }
  };

  const menuItems = [
    {
      text: "Manage My Account",
      icon: <ManageAccountsIcon />,
      action: "account",
    },
    { text: "My Order", icon: <ShoppingBagIcon />, action: "orders" },
    { text: "My Cancellations", icon: <CancelIcon />, action: "cancellations" },
    { text: "My Reviews", icon: <ReviewsIcon />, action: "reviews" },
    { text: "Logout", icon: <LogoutIcon />, action: "logout" },
  ];
  return (
    <Menu
      ref={menuRef}
      anchorEl={anchorEl}
      open={isMenuOpen}
      onClose={closeMenu}
      PaperProps={{
        elevation: 6,
        sx: {
          mt: 1.5,
          borderRadius: 0.5,
          minWidth: 224,
          background: 'linear-gradient(-45deg, rgba(84, 110, 255, 0.45) 0%, rgba(255, 51, 51, 0.45) 100%)',
          //"rgba(181, 150, 196, 0.56)",
          backdropFilter: "blur(10px)",
          // border: "1px solid rgba(136, 136, 136, 0.3)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          color: "white",

          "& .MuiMenuItem-root:hover": {
            background: "rgba(136, 136, 136, 0.4)",
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      {menuItems.map((item, index) => (
        <MenuItem key={index} onClick={() => handleItemClick(item.action)}>
          <ListItemIcon
            sx={(theme) => ({
                color: theme.palette.custom.btnPrimary.contrastText,
              minWidth: 40,
              "& svg": { fontSize: iconSize },
            })}
          >
            {item.icon}
          </ListItemIcon>

          <ListItemText
            primary={item.text}
            primaryTypographyProps={{
              fontSize: textSize,
              fontWeight: 400,
            }}
          />
        </MenuItem>
      ))}
    </Menu>
  );
}

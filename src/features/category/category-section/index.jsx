import { Box } from "@mui/material";

// MUI icons
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import ComputerIcon from "@mui/icons-material/Computer";
import WatchIcon from "@mui/icons-material/Watch";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

import { CategoryCard } from "../category-card";

export function CategoriesSection() {
  const categories = [
    { label: "Phones", icon: SmartphoneIcon },
    { label: "Computers", icon: ComputerIcon },
    { label: "SmartWatch", icon: WatchIcon },
    { label: "Camera", icon: PhotoCameraIcon },
    { label: "HeadPhones", icon: HeadphonesIcon },
    { label: "Gaming", icon: SportsEsportsIcon },
  ];

  return (
    <Box sx={{ display: "flex", gap: "3.0rem" }}>
      {categories.map((cat) => (
        <CategoryCard key={cat.label} {...cat} />
      ))}
    </Box>
  );
}

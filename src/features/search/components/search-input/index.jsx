import SearchIconImg from "../../../../assets/images/main/search-icon.svg";
import { debounce } from "../../../../shared/utilities/debounce";
import { styled, alpha } from "@mui/material/styles";
import { styleSearch } from "./search-input-style";
import InputBase from "@mui/material/InputBase";
import { useSearchParams } from "react-router-dom";
import { Box, Tooltip } from "@mui/material";
import { useModalStore } from "../../store";
import React, { useEffect } from "react";


const Search = styled("div")(({ theme }) => ({
  ...styleSearch.searchStyle(theme),
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  ...styleSearch.inputSearchStyle(theme),
}));


export function SearchInput() {
  const { handleOpen } = useModalStore();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "/") {
        e.preventDefault();
        handleOpen();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleOpen]);
  return (
    <Tooltip
      title='Press "/" to search'
      slotProps={{
        popper: {
          sx: {
            "& .MuiTooltip-tooltip": {
              fontSize: "1.2rem",
              fontWeight: "500",
            },
          },
        },
      }}
    >
      <Search>
        <StyledInputBase
          placeholder="What are you looking for?"
          inputProps={{ "aria-label": "search" }}
          onClick={handleOpen}
        />
        <Box
          component="img"
          src={SearchIconImg}
          alt="cart-icon"
          sx={{
            width: { xs: 20, sm: 20, lg: 24 },
            height: "auto",
          }}
        />
      </Search>
    </Tooltip>
  );
}

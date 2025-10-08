import SearchIconImg from "../../../../assets/images/main/search-icon.svg";
import { debounce } from "../../../../shared/utilities/debounce";
import { Box, TextField, InputAdornment } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router";
import { styled} from "@mui/material/styles";
import { useModalStore } from "../../store";

const CustomTextField = styled(TextField)({
  flex: 1,
  "& .MuiInputBase-input": {
    fontSize: "1.4rem",
    fontWeight: 500,
  },
});
const SearchIcon = styled(Box)({
  width: { xs: 20, sm: 20, lg: 24 },
  height: "auto",
});

export function SearchInputDialog({onSearchChange}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") ?? "";
  const [inputValue, setInputValue] = useState(() => searchQuery);

  const inputRef = useRef(null);
  const { open } = useModalStore();
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const updateQueryStringHandler = (query) => {
    const params = {
      ...Object.fromEntries(searchParams.entries()),
    };
    params.q = query;
    setSearchParams(params);
  };

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setInputValue(value);
    onSearchChange?.(value); 
    debounce(() => updateQueryStringHandler(value), 2000)();
  };

  return (
    <CustomTextField
      inputRef={inputRef}
      autoFocus
      fullWidth
      placeholder="What are you looking for?"
      variant="standard"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon component="img" src={SearchIconImg} alt="cart-icon" />
          </InputAdornment>
        ),
        disableUnderline: true,
      }}
      value={!!inputValue && !searchQuery ? "" : inputValue}
      onChange={handleInputChange}
    />
  );
}

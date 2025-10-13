import DialogContent from "@mui/material/DialogContent";
import { SearchInputDialog } from "./search-input-dialog";
import { styled, alpha } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useModalStore } from "../../store";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import { Tooltip } from "@mui/material";
import { useState, useEffect } from "react";
import ProductsService from "../../../products/services/api";
import { useNavigate } from "react-router";
import { appRoutes } from "../../../../routes/index";
const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: "12px",
  },
  "& .MuiBackdrop-root": {
    backdropFilter: "blur(6px)",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
}));

export function SearchPopup() {
  const { open, handleClose } = useModalStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [resetKey, setResetKey] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (!searchTerm) {
        setResults([]);
        setSelectedIndex(-1);
        return;
      }
      try {
        const res = await ProductsService.getAll(searchTerm);
        if (!mounted) return;
        setResults(res || []);
        setSelectedIndex(res && res.length > 0 ? 0 : -1);
      } catch (e) {
        if (!mounted) return;
        setResults([]);
        setSelectedIndex(-1);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [searchTerm]);

  // keyboard navigation
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (results.length === 0) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((s) => Math.min(s + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((s) => Math.max(s - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const item = results[selectedIndex];
        if (item) {
          setSearchTerm("");
          setResetKey((k) => k + 1);
          handleClose();
          const safeId = item && typeof item.id === "object"
            ? item.id?.id ?? JSON.stringify(item.id)
            : String(item.id);
          navigate(`${appRoutes.products.list}?highlight=${encodeURIComponent(safeId)}`);
        }
      } else if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, results, selectedIndex]);
  return (
    <>
      <StyledDialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogContent sx={{ p: 2 }}>
          {/* Upper Section*/}
          <Box display="flex" alignItems="center" mb={2}>
            <Box sx={{ flex: 1 }}>
              <SearchInputDialog
                onSearchChange={setSearchTerm}
                resetKey={resetKey}
                externalValue={searchTerm}
              />
            </Box>
            <Tooltip
              title='Press "Esc" to close'
              slotProps={{
                popper: {
                  sx: {
                    "& .MuiTooltip-tooltip": {
                      fontSize: "13px",
                    },
                  },
                },
              }}
            >
              <IconButton
                onClick={handleClose}
                sx={{
                  ml: 1,
                  borderRadius: 0.5,
                  border: (theme) =>
                    `1px solid ${alpha(theme.palette.secondary.dark, 0.5)}`,
                }}
              >
                <Typography variant="body2" sx={{ fontSize: "1.2rem" }}>
                  esc
                </Typography>
                {/* <Box fontSize="small" sx={{ ml: 0.5 }} /> */}
              </IconButton>
            </Tooltip>
          </Box>

          {/* Lower Section*/}
          <Box>
            {searchTerm ? (
              results.length > 0 ? (
                results.map((item, i) => (
                  <Box
                    key={item.id ?? i}
                    onClick={() => {
                      // clear input, trigger reset in input dialog, close and navigate to products with highlight
                      setSearchTerm("");
                      setResetKey((k) => k + 1);
                      handleClose();
                      const safeId = item && typeof item.id === "object"
                        ? item.id?.id ?? JSON.stringify(item.id)
                        : String(item.id);
                      navigate(`${appRoutes.products.list}?highlight=${encodeURIComponent(safeId)}`);
                    }}
                    sx={{
                      display: "flex",
                      gap: 2,
                      alignItems: "center",
                      p: 1,
                      borderRadius: "8px",
                      fontSize: "1.2rem",
                      cursor: "pointer",
                      bgcolor: selectedIndex === i ? "rgba(0,0,0,0.06)" : "transparent",
                      '&:hover': { backgroundColor: "rgba(0,0,0,0.04)" },
                    }}
                  >
                    <Box
                      component="img"
                      src={
                        item.images || item.thumbnail || ''
                      }
                      alt={item.title}
                      sx={{ width: 48, height: 48, objectFit: "cover", borderRadius: 1 }}
                    />
                    <Box sx={{ fontSize: "1.2rem" }}>
                      {/* highlight matched substring */}
                      {(() => {
                        const title = item.title || "";
                        const q = searchTerm;
                        if (!q) return title;
                        const idx = title.toLowerCase().indexOf(q.toLowerCase());
                        if (idx === -1) return title;
                        return (
                          <>
                            {title.substring(0, idx)}
                            <Box component="span" sx={{ bgcolor: "yellow", px: 0.3 }}>
                              {title.substring(idx, idx + q.length)}
                            </Box>
                            {title.substring(idx + q.length)}
                          </>
                        );
                      })()}
                    </Box>
                  </Box>
                ))
              ) : (
                <Typography sx={{ fontSize: "1.2rem", color: "gray" }}>
                  No results found
                </Typography>
              )
            ) : (
              <>
                <Typography
                  variant="subtitle2"
                  sx={{ mb: 1, fontWeight: 500, fontSize: "1.6rem" }}
                >
                  Popular Searches
                </Typography>
                  {["Classic", "Stylish", "T-Shirt", "Chic"].map(
                    (pop, i) => (
                      <Box
                        key={i}
                        onClick={() => {
                          // set the search term and trigger search
                          setSearchTerm(pop);
                        }}
                        sx={{
                          p: 1,
                          borderRadius: "8px",
                          fontSize: "1.2rem",
                          cursor: "pointer",
                          "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" },
                        }}
                      >
                        {pop}
                      </Box>
                    )
                  )}
              </>
            )}
          </Box>
        </DialogContent>
      </StyledDialog>
    </>
  );
}

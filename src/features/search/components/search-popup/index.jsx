import DialogContent from "@mui/material/DialogContent";
import { SearchInputDialog } from "./search-input-dialog";
import { styled, alpha } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useModalStore } from "../../store";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import { Tooltip } from "@mui/material";
import { useState } from "react";
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
  const results = [
    "Material UI Guide",
    "MUI Autocomplete",
    "Joy UI Intro",
  ].filter((item) => item.toLowerCase().includes(searchTerm.toLowerCase()));
  return (
    <>
      <StyledDialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogContent sx={{ p: 2 }}>
          {/* Upper Section*/}
          <Box display="flex" alignItems="center" mb={2}>
            <Box sx={{ flex: 1 }}>
              <SearchInputDialog onSearchChange={setSearchTerm} />
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
                    key={i}
                    sx={{
                      p: 1,
                      borderRadius: "8px",
                      fontSize: "1.2rem",
                      cursor: "pointer",
                      "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" },
                    }}
                  >
                    {item}
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
                {["Material UI", "MUI X", "Joy UI", "Templates"].map(
                  (item, i) => (
                    <Box
                      key={i}
                      sx={{
                        p: 1,
                        borderRadius: "8px",
                        fontSize: "1.2rem",
                        cursor: "pointer",
                        "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" },
                      }}
                    >
                      {item}
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

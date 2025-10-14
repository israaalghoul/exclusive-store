import React from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  IconButton,
  useTheme,
  Tooltip,
} from "@mui/material";
import { Btn } from "../btn";
import CountdownTimer from "../countdown-time";
import arrowRightIcon from "../../../assets/images/arrow/arrow-right-icon.svg";
import arrowLeftIcon from "../../../assets/images/arrow/arrow-left-icon.svg";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "../../../routes";

export function HeaderSection({
  title,
  subtitle,
  showTimer = true,
  marginTop,
  showButton = false,
  onNext = () => {},
  onPrev = () => {},
  disableNext = false,
  disablePrev = false,
  showArrow = true,
}) {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          marginTop: marginTop,
          gap: "8.7rem",
          alignItems: "flex-end",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "2.4rem" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "1.6rem",
            }}
          >
            <Btn variantColor="btnPrimary" px="1.0rem" py="2.0rem" />
            {subtitle && (
              <Typography
                sx={(theme) => ({
                  fontSize: "1.6rem",
                  fontWeight: "600",
                  color: theme.palette.custom.btnPrimary.main,
                })}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
          {title && (
            <Typography
              sx={{
                fontSize: "3.6rem",
                fontWeight: "600",
              }}
            >
              {title}
            </Typography>
          )}
        </Box>
        {showTimer && (
          <Box>
            <CountdownTimer />
          </Box>
        )}
      </Box>
      {showButton ? (
        <Btn
          btnName="View All"
          variantColor="btnPrimary"
          px="0rem"
          py="0rem"
          width="15.9rem"
          height="5.6rem"
          onClick={() => navigate(appRoutes.products.all)}
        />
      ) : (
        showArrow && (
          <Box sx={{ display: "flex", flexDirection: "row", gap: "0.8rem" }}>
            <Tooltip
              title="Previous"
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
              <span>
                <IconButton
                  size="small"
                  sx={{
                    bgcolor: "#F5F5F5",
                    "&:hover": { bgcolor: "#e0e0e0" },
                    opacity: disablePrev ? 0.5 : 1,
                    pointerEvents: disablePrev ? "none" : "auto",
                  }}
                  onClick={onPrev}
                  disabled={disablePrev}
                >
                  <Box
                    component="img"
                    src={arrowLeftIcon}
                    alt="arrow-left-icon"
                    sx={{
                      width: { xs: 24, sm: 24, lg: 24 },
                      height: "auto",
                    }}
                  />
                </IconButton>
              </span>
            </Tooltip>

            <Tooltip
              title="Next"
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
              <span>
                <IconButton
                  size="small"
                  sx={{
                    bgcolor: "#F5F5F5",
                    "&:hover": { bgcolor: "#e0e0e0" },
                    opacity: disableNext ? 0.5 : 1,
                    pointerEvents: disableNext ? "none" : "auto",
                  }}
                  onClick={onNext}
                  disabled={disableNext}
                >
                  <Box
                    component="img"
                    src={arrowRightIcon}
                    alt="arrow-right-icon"
                    sx={{
                      width: { xs: 24, sm: 24, lg: 24 },
                      height: "auto",
                    }}
                  />
                </IconButton>
              </span>
            </Tooltip>
          </Box>
        )
      )}
    </Box>
  );
}

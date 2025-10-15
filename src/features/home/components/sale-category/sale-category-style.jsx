import { alpha } from "@mui/material/styles";
export const styleSaleCategory = {
  /////////////////////////////////// APP BAR STYLE
  boxContainerStyle: (theme, open) => ({
    width: "100%",
    backgroundColor: "#000",
    color: "#fff",
    overflow: "hidden",
    marginTop: "4.0rem",
    display: "flex",
    direction: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "6.0rem",
    ///////////// RESPONSIVE //////////////
    "@media (max-width: 320px)": {
      flexDirection: "column",
      gap: "2.2rem",
      padding: "1.6rem",
      height: "auto",
    },
    "@media (min-width:321px)": {
      flexDirection: "column",
      gap: "2.8rem",
      padding: "2.0rem 2.4rem",
      height: "auto",
    },
    "@media (min-width: 768px)": {
      flexDirection: "row",
      gap: "3.5rem",
      padding: "3.0rem 4.0rem",
      height: "45.0rem",
    },
    "@media (min-width: 1024px)": {
      padding: "6.0rem",
      height: "50.0rem",
      gap: "4.3rem",
    },
    "@media (min-width: 1440px)": {
      padding: "6.0rem 8.0rem",
      height: "50.0rem",
    },
  }),
  boxLeftStyle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#000",
    maxWidth: "40%",
    ///////////// RESPONSIVE //////////////
    "@media (max-width: 320px)": {
      gap: "1.2rem",
      maxWidth: "100%",
    },
    "@media (min-width:321px)": {
      gap: "2.4rem",
      maxWidth: "100%",
      minHeight: "50vh",
    },
    "@media (min-width: 1024px)": {
      gap: "3.2rem",
      maxWidth: "60%",
      minHeight: "50vh",
    },
    "@media (min-width: 1440px)": {
      gap: "3.2rem",
      maxWidth: "40%",
      minHeight: "50vh",
    },
  },
  typographyH2Style: (theme) => ({
    fontSize: "4.8rem",
    fontWeight: 600,
    color: theme.palette.custom.btnPrimary.contrastText,
    ///////////// RESPONSIVE //////////////
    "@media (max-width:320px)": { fontSize: "2.4rem" },
    "@media (min-width:321px)": { fontSize: "3.2rem" },
    "@media (min-width:768px)": { fontSize: "3.2rem" },
    "@media (min-width:1024px)": { fontSize: "3.8rem" },
    "@media (min-width:1440px)": { fontSize: "5.2rem" },
  }),
  gridTimerStyle: {
    mt: 3,
    mb: 3,
    ///////////// RESPONSIVE //////////////
    "@media (max-width:320px)": {
      "& .MuiPaper-root": { width: 48, height: 48 },
    },
    "@media (min-width:321px)": {
      "& .MuiPaper-root": { width: 54, height: 54 },
    },
    "@media (min-width:768px)": {
      "& .MuiPaper-root": { width: 62, height: 62 },
    },
  },
  paperCircleStyle: (theme) => ({
    width: 62,
    height: 62,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    bgcolor: theme.palette.custom.btnSecondary.contrastText,
    color: "#000",
    fontWeight: "bold",
  }),
  boxBackImgStyle: {
    position: "relative",
    zIndex: 1,
    "&::before": {
      content: '""',
      position: "absolute",
      width: "500px",
      height: "500px",
      borderRadius: "50%",
      background:
        "radial-gradient(circle, rgba(226, 226, 226, 0.96) 0%, rgba(0,0,0,0) 70%)",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      filter: "blur(150px)",
      zIndex: 0,
    },
  },
  boxImgStyle: (theme) => ({
    position: "relative",
    zIndex: 2,
    display: "flex",
    height: "auto",
    ///////////// RESPONSIVE //////////////
    "@media (max-width: 320px)": {
      display: "none",
    },
    "@media (min-width:321px)": {
      display: "none",
    },
    "@media (min-width: 768px)": {
      display: "flex",
      maxWidth: "30rem",
    },
    "@media (min-width: 1024px)": {
      display: "flex",
      maxWidth: "48rem",
    },
    "@media (min-width: 1440px)": {
      display: "flex",
      maxWidth: "70rem",
    },
  }),
};

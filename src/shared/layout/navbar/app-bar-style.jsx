import { alpha } from "@mui/material/styles";
export const styleNavApp = {
  /////////////////////////////////// APP BAR STYLE
  appBarStyle: (theme) => ({
    background: theme.palette.background.paper,
    color: theme.palette.text.primary,
    boxShadow: "none",
    borderBottom: `0.5px solid ${alpha(theme.palette.divider, 0.3)}`,
  }),
  /////////////////////////////////// CONTAINER APP BAR STYLE
  containerAppBarStyle: {
    maxWidth: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 0,
    

    ///////////// RESPONSIVE //////////////
    "@media (max-width: 320px)": {
      flexDirection: "column",
      gap: "2rem",
      padding: "1.6rem",
    },
    "@media (min-width:321px)": {
      flexDirection: "column",
      gap: "2rem",
      padding: "2.0rem 4rem",
    },
    "@media (min-width: 768px)": {
      flexDirection: "row",
      gap: "1.8rem",
      padding: "2.4rem 3.5rem",
    },
    "@media (min-width: 1024px)": {
      padding: "4.0rem 13.5rem 1.6rem",
      gap: "6rem",
    },
    "@media (min-width: 1440px)": {
      padding: "4.0rem 13.5rem 1.6rem",
      gap: "14.8rem",
    },
  },
  /////////////////////////////////// BOX LEFT STYLE
  boxLeftStyle: {
    display: "flex",
    alignItems: "center",

    ///////////// RESPONSIVE //////////////
    "@media (min-width:321px)": {
      gap: "4rem",
    },
    "@media (min-width: 768px)": {
      gap: "5rem",
    },
    "@media (min-width: 1024px)": {
      gap: "6rem",
    },
    "@media (min-width: 1440px)": {
      gap: "19.0rem",
    },
  },

  /////////////////////////////////// NAV LIST STYLE
  navListStyle: {
    display: { xs: "none", sm: "flex" },

    ///////////// RESPONSIVE //////////////
    "@media (min-width:321px)": {
      gap: "1.6rem",
    },
    "@media (min-width:768px)": {
      gap: "2.0rem",
    },
    "@media (min-width:1024px)": {
      gap: "2.4rem",
    },
    "@media (min-width:1440px)": {
      gap: "4.8rem",
    },
  },
  /////////////////////////////////// BOX RIGHT STYLE
  boxRightStyle: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "flex-end",

    ///////////// RESPONSIVE //////////////
    "@media (max-width: 320px)": {
      gap: "1.2rem",
    },
    "@media (min-width: 321px)": {
      gap: "1.2rem",
    },
    "@media (min-width:768px)": {
      justifyContent: "space-around",
      gap: "1.6rem",
    },
    "@media (min-width:1024px)": {
      justifyContent: "flex-end",
      gap: "1.6rem",
    },
    "@media (min-width:1440px)": {
      justifyContent: "flex-end",
      gap: "2.4rem",
    },
  },
  /////////////////////////////////// ICONS STYLE
  iconStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    ///////////// RESPONSIVE //////////////
    "@media (max-width:320px)": {
      gap: "0.5rem",
    },
    "@media (min-width:321px)": {
      gap: "0.5rem",
    },
    "@media (min-width:768px)": {
      gap: "0.8rem",
    },
    "@media (min-width:1024px)": {
      gap: "1.6rem",
    },
  },
};

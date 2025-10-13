import { alpha, createTheme } from "@mui/material/styles";

const theme = createTheme({
  ///////////////////////////////////FONT STYLE
  typography: {
    fontFamily: "Poppins, sans-serif",
    button: {
      fontFamily: "Poppins, sans-serif",
      textTransform: "none",
      fontSize: "1.6rem",
      fontWeight: 500,
      lineHeight: 1.5,
    },
  },

  shape: {
    borderRadius: "0.4rem",
  },

  ///////////////////////////////////COLORS
  palette: {
    primary: {
      main: "#ffffff",
      light: "#000000",
      dark:"#fafafa",
    },
    secondary: {
      main: "#000000",
      dark:"#999999",
      contrastText: "#fafafa",

    },
    action: {
      main: "#f5f5f5",
      contrastText: "#000000",
    },

    custom: {
      btnPrimary: {
        main: "#db4444",
        contrastText: "#fafafa",
      },
      btnSecondary: {
        main: "#00ff66",
        contrastText: "#fafafa",
      },
      hover: {
        primary: "#e07575",
        secondary: "#a0bce0",
      },
      text: {
        primary: "#db4444",
        secondary: "#00ff66",
      },
    },
  },
  ///////////////////////////////////BUTTON STYLE
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
          boxShadow: "none",
        }),
      },
      variants: [
        {
          props: { variant: "link" },
          style: ({ theme }) => ({
            fontWeight: 400,
            color: theme.palette.secondary.main,
            padding: 0,
            minWidth: "auto",
            "&:hover": {
              textDecoration: "underline",
              textUnderlineOffset: "4px",
              textDecorationColor: alpha(
                theme.palette.action.contrastText,
                0.5
              ),
            },
            ///////////// RESPONSIVE //////////////
            "@media (min-width:321px)": {
              fontSize: "1.2rem",
            },
            "@media (min-width:1024px)": {
              fontSize: "1.4rem",
            },
            "@media (min-width:1440px)": {
              fontSize: "1.6rem",
            },
          }),
        },
        {
          props: { variant: "primary" },
          style: ({ theme }) => ({
            padding: "0.4rem 1.2rem",

            color: theme.palette.custom.btnPrimary.contrastText,
            backgroundColor: theme.palette.custom.btnPrimary.primary,

            "&:hover": {
              backgroundColor: theme.palette.custom.hover.primary,
            },
          }),
        },
        {
          props: { variant: "secondary" },
          style: ({ theme }) => ({
            fontWeight: 500,
            fontSize: "1.6rem",
            //   padding: "1.6rem 4.8rem",
            padding: "0.4rem 1.2rem",

            color: theme.palette.custom.btnSecondary.contrastText,
            backgroundColor: theme.palette.custom.btnSecondary.primary,

            "&:hover": {
              backgroundColor: theme.palette.custom.hover.secondary,
            },
          }),
        },
      ],
    },
  },
});

export default theme;

///////////////////////////////////COMPONENT
//     components: {
//     MuiContainer: {
//       styleOverrides: {
//         root: ({ theme }) => ({
//           paddingLeft: theme.spacing(16),
//           paddingRight: theme.spacing(16),
//           ///////////// RESPONSIVE //////////////
//           "@media (max-width:600px)": {
//             paddingLeft: theme.spacing(2),
//             paddingRight: theme.spacing(2),
//           },
//         }),
//       },
//     },
//   },

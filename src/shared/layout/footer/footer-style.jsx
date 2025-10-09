import { typographyClasses } from "@mui/material";
import { alpha } from "@mui/material/styles";
export const styleFooter = {
  /////////////////////////////////// FOOTER STYLE
  footerStyle: (theme) => ({
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  }),
  /////////////////////////////////// FOOTER STYLE
  footerContainerStyle: {
    maxWidth: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 0,
    padding: "8.0rem 13.5rem 6.0rem",
    ///////////// RESPONSIVE //////////////
    "@media (max-width: 320px)": {
      padding: "2.4rem 1.6rem",
    },
    "@media (min-width:321px)": {
      padding: "2.4rem 4rem",
    },
    "@media (min-width: 768px)": {
      padding: "2.4rem 3.5rem",
    },
    "@media (min-width: 1024px)": {
      padding: "4.0rem 13.5rem",
      gap: "6rem",
    },
    "@media (min-width: 1440px)": {
      padding: "8.0rem 13.5rem 6.0rem",

    },
  },
  /////////////////////////////////// TYPOGRAPHY STYLE
  typographyStyle: (theme) => ({
    fontSize: "2.0rem",
    fontWeight: 500,
    marginBottom: theme.spacing(3),
  }),
  /////////////////////////////////// CAPTION STYLE
  captionStyle: (theme)=> ({
    fontSize: "1.6rem",
    fontWeight: 400,
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(2),
    whiteSpace: "normal",
    wordBreak: "break-word",
  }),
  /////////////////////////////////// INPUT FIELD STYLE
  inputFieldStyle: (theme) => ({
    // border: "none",
    outline: "none",
    "& fieldset": { border: "none" },
    marginTop: theme.spacing(2),
    display: "flex",
    padding: "1.2rem 1.5rem 1.2rem 1.6rem",
    width: "100%",
    maxWidth: "21.7rem ",
    height: "4.8rem",
    bgcolor: "transparent",
    border: `1.5px solid ${theme.palette.secondary.contrastText}`,
    borderRadius: "0.4rem",
    gap: "3.2rem",
  }),
  /////////////////////////////////// TEXT FIELD STYLE
  textFieldStyle: (theme) => ({
    flex: 1,
    "& input": {
      color: theme.palette.secondary.dark,
      fontSize: "1.6rem",
      fontWeight: 400,
      padding: 0,
    },
  }),
  /////////////////////////////////// INFO CONTACT CONTAINER STYLE
  containerContactStyle: {
    display: "flex",
    flexDirection: "row",
    gap: "1.0rem",
    mt: 1,
  },
};

export const styleSearch = {
  ///////////////////////////////////SEARCH STYLE
  searchStyle: (theme) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.action.main,
    //   "&:hover": {
    //     // backgroundColor: alpha(),
    //   },
    width: "100%",
    maxWidth: "24.3rem",
    display: "flex",
    alignItems: "center",
    padding: "0.7rem 1.2rem 0.7rem 2.0rem",
    margin: "0rem",
    ///////////// RESPONSIVE //////////////
    "@media (max-width: 320px)": {
      maxWidth: "18.0rem",
      padding: "0.7rem 0.8rem 0.7rem 1.0rem",
    },
        "@media (min-width: 321px)": {
      maxWidth: "24.3rem",
    },

  }),
  /////////////////////////////////// INPUT SEARCH STYLE
  inputSearchStyle: (theme) => ({
    flex: 1,
    fontSize: "1.2rem",
    fontWeight: 400,
    color: theme.palette.action.contrastText,
  }),
};

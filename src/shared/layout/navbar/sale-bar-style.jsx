export const styleNavSale = {
  ///////////////////////////////////SALE BAR STYLE
  saleBarStyle: (theme) => ({
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    maxWidth: "100%",
    textAlign: "center",
    fontWeight: "400",
    lineHeight: "2.1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "1.3rem",
    position: "fixed",
    cursor: "pointer", 
    top: 0,
  left: 0,
  right: 0,
     zIndex: theme.zIndex.appBar + 2,
    ///////////// RESPONSIVE //////////////
    "@media (max-width: 320px)": {
      flexDirection: "column",
      gap: "0.4rem",
      padding: "1rem",
    },
    "@media (min-width:321px)": {
      flexDirection: "column",
      gap: "0.4rem",
      padding: "1rem",
    },
    "@media (min-width: 768px)": {
      flexDirection: "row",
      fontSize: "1.2rem",
      padding: "0.777rem 5rem",
    },
    "@media (min-width: 1024px)": {
      padding: "0.777rem 13.5rem",
      fontSize: "1.4rem",
    },
  }),
  ///////////////////////////////////SHOP BTN STYLE
  shopBtnStyle: {
    position: "fixed",
    alignItems: "center",
    textDecoration: "underline",
    fontSize: 14,
    fontWeight: 600,
   
    ///////////// RESPONSIVE //////////////
    "@media (min-width: 768px)": {
      fontSize: "1.2rem",
    },
    "@media (min-width: 1024px)": {
      fontSize: "1.4rem",
    },
  },
  ///////////////////////////////////LANGUAGE BTN STYLE
  langBtnStyle: {
    fontSize: 14,
    fontWeight: 400,
    gap: 1.5,
    display: "flex",
    alignItems: "center",
    position: "absolute",
    ///////////// RESPONSIVE //////////////
    "@media (max-width: 320px)": {
      position: "static",
      alignSelf: "center",
    },
    "@media (min-width: 321px)": {
      position: "static",
      alignSelf: "center",
    },
    "@media (min-width: 768px)": {
      position: "absolute",
      fontSize: "1.2rem",
      right: "5.0rem",
    },
    "@media (min-width: 1024px)": {
      position: "absolute",
      right: "13.5rem",
      fontSize: "1.4rem",
    },
  },
  ///////////////////////////////////LANGUAGE IMG BTN STYLE
  langImgBtn: {
    width: 12,
    height: 12,
    display: "block",
    padding: 0,
  },
};

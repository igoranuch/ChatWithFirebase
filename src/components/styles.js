import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles(() =>
  createStyles({
    link: {
      textDecoration: "none",
      color: "rgb(22,104,195)",
      fontSize: "14px",
      fontFamily: "Roboto",
    },
    loaderContainer: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
    },
    userImage: {
      backgroundColor: "white",
      height: "36px",
      width: "36px",
      border: "0px !important",
      borderRadius: "50% !important",
      objectFit: "cover",
    },
    chatimage: {
      width: "32px",
      height: "32px",
    },
    searchIcon: { cursor: "pointer", color: "lightgrey" },
    chatInfoIcon: {
      width: "32px",
      height: "32px",
      color: "lightgrey",
      cursor: "pointer",
    },
  })
);

export default useStyles;

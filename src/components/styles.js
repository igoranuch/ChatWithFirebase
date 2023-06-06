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
      height: "36px",
      width: "36px",
      borderRadius: "50% !important",
      objectFit: "cover",
    },
    searchIcon: { cursor: "pointer", color: "lightgrey" },
    chatInfoIcon: {
      color: "lightgrey",
      cursor: "pointer",
    },
    selected: {
      backgroundColor: "rgba(211, 211, 211, 0.5)",
    },
    infoText: {
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
      width: "250px",
    },
    chatText: {
      flexGrow: 1,
      overflow: "hidden",
      wordWrap: "break-word",
    },
    sent: { flexDirection: "row-reverse" },
    received: { flexDirection: "row" },
    messagesContainer: {
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      padding: "20px",
      height: "100%",
      width: "100%",
      overflow: "auto",
      backgroundColor: "#F2F4F8",
      borderRadius: "20px",
      gap: "10px",
      "&::-webkit-scrollbar": {
        width: "6px",
        borderRadius: "10px",
      },
      "&::-webkit-scrollbar-track": {
        borderRadius: "10px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "rgb(210,210,210)",
        borderRadius: "10px",
      },
    },
    chatsContainer: {
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
  })
);

export default useStyles;

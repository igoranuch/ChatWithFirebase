import React, { useContext } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { ChatContext } from "../../../context/ChatContext";
import PersonAddIcon from "@material-ui/icons//PersonAdd";
import VideocamIcon from "@material-ui/icons//Videocam";
import MoreVertIcon from "@material-ui/icons//MoreVert";
import useStyles from "../../styles";

export default function ChatInfo() {
  const styles = useStyles();

  const { data } = useContext(ChatContext);

  return (
    <Box
      display="flex"
      borderBottom="1px solid rgba(211, 211, 211, 0.5)"
      alignItems="center"
      minHeight="66px"
      width="100%"
      paddingX="15px"
    >
      <Box
        display="flex"
        gap="10px"
        alignItems="center"
        border="none !important"
        outline="none !important"
      >
        {data.user && !!Object.keys(data.user).length && (
          <Avatar
            style={{ width: "44px", height: "44px" }}
            src={data.user?.photoURL}
          />
        )}
        <Typography variant="h5">{data.user?.displayName}</Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="flex-end"
        flexGrow="1"
        border="0px"
        alignItems="center"
        gap="20px"
      >
        <VideocamIcon
          className={styles.chatInfoIcon}
          style={{ width: "36px", height: "36px" }}
        />
        <PersonAddIcon
          className={styles.chatInfoIcon}
          style={{ width: "36px", height: "36px" }}
        />
        <MoreVertIcon
          className={styles.chatInfoIcon}
          style={{ width: "36px", height: "36px" }}
        />
      </Box>
    </Box>
  );
}

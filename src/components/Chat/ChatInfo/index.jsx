import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
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
      height="66px"
      borderBottom="1px solid rgba(211, 211, 211, 0.5)"
      alignItems="center"
      paddingX="20px"
    >
      <Box
        display="flex"
        gap="10px"
        alignItems="center"
        border="none !important"
        outline="none !important"
      >
        {data.user && !!Object.keys(data.user).length && (
          <img className={styles.userImage} src={data.user?.photoURL} alt="" />
        )}
        <Typography>{data.user?.displayName}</Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="flex-end"
        flexGrow="1"
        border="0px"
        alignItems="center"
        gap="20px"
      >
        <VideocamIcon className={styles.chatInfoIcon} />
        <PersonAddIcon className={styles.chatInfoIcon} />
        <MoreVertIcon className={styles.chatInfoIcon} />
      </Box>
    </Box>
  );
}

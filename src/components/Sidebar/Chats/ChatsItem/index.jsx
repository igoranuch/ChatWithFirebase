import React, { useContext } from "react";
import { ChatContext } from "../../../../context/ChatContext";
import { Avatar, Box, Typography } from "@mui/material";
import useStyles from "../../../styles";
import { decryptMessage } from "../../../../utils/functions";
import { collection } from "firebase/firestore";
import { db } from "../../../../firebase";
import { useFirestoreCollectionData } from "reactfire";

const ChatsItem = ({ chat, selectedChat, setSelectedChat }) => {
  const styles = useStyles();

  const { dispatch, data } = useContext(ChatContext);

  const handleSelect = (u) => {
    if (data.user.uid === u.uid) {
      dispatch({ type: "RESET_STATE" });
      setSelectedChat(null);
    } else {
      dispatch({ type: "CHANGE_USER", payload: u });
      setSelectedChat(u.uid);
    }
  };

  const messageTime =
    chat[1].date &&
    chat[1].date.toDate().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  const collectionRef = collection(db, "chats");
  const { data: chatsCollection } = useFirestoreCollectionData(collectionRef);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
      gap="10px"
      paddingY="10px"
      paddingX="20px"
      borderRadius="10px"
      sx={{ cursor: "pointer" }}
      onClick={() => handleSelect(chat[1].userInfo)}
      className={selectedChat === chat[1].userInfo.uid ? styles.selected : ""}
    >
      <Avatar
        sx={{ width: "52px", height: "52px" }}
        src={chat[1].userInfo.photoURL}
      />
      <Box width="100%">
        <Typography className={styles.infoText} variant="h5">
          {chat[1].userInfo.displayName}
        </Typography>
        {chat[1].lastMessage && (
          <Typography className={styles.infoText}>
            {decryptMessage(
              chat[1].lastMessage.text,
              chatsCollection[0].encryptionKey
            )}
          </Typography>
        )}
      </Box>
      <Typography>{messageTime}</Typography>
    </Box>
  );
};

export default ChatsItem;

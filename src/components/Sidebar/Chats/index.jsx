import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../../../firebase";
import { Box, Divider, Typography } from "@mui/material";
import ChatsItem from "./ChatsItem";
import { ChatContext } from "../../../context/ChatContext";
import useStyles from "../../styles";
import { useUser } from "reactfire";

const Chats = () => {
  const styles = useStyles();
  const [chats, setChats] = useState({});
  const [selectedChat, setSelectedChat] = useState(null);

  const { data: currentUser } = useUser();

  const { searchUser } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser, currentUser.uid]);

  return (
    <>
      <Box padding="10px">
        <Typography color="rgba(0,0,0,0.6)" variant="h4">
          Chats
        </Typography>
        <Divider sx={{ marginTop: "10px", width: "100%" }} />
      </Box>
      <Box
        className={styles.chatsContainer}
        display="flex"
        flexGrow="1"
        overflow="auto"
        width="100%"
        flexDirection="column"
        padding="10px"
        gap="8px"
        maxHeight={`${searchUser ? "678px" : "750px"}`}
      >
        {!!chats &&
          Object.entries(chats)
            ?.sort((a, b) => b[1].date - a[1].date)
            .map((chat, index) => (
              <ChatsItem
                chat={chat}
                setSelectedChat={setSelectedChat}
                selectedChat={selectedChat}
                key={index}
              />
            ))}
      </Box>
    </>
  );
};

export default Chats;

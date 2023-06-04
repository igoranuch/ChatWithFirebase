import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { db } from "../../../firebase";
import { Box, Divider, Typography } from "@mui/material";
import ChatsItem from "./ChatsItem";

const Chats = () => {
  const [chats, setChats] = useState({});

  const { currentUser } = useContext(AuthContext);

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
    <Box
      display="flex"
      height="100%"
      width="100%"
      flexDirection="column"
      padding="10px"
    >
      <Box paddingBottom="14px">
        <Typography color="rgba(0,0,0,0.6)" variant="h4">
          Chats
        </Typography>
        <Divider sx={{ marginTop: "10px", width: "100%" }} />
      </Box>
      {!!chats &&
        Object.entries(chats)
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((chat, index) => <ChatsItem chat={chat} key={index} />)}
    </Box>
  );
};

export default Chats;

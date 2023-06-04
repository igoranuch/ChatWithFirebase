import React from "react";
import { Box } from "@mui/material";
import Messages from "./Messages";
import Input from "./Input";
import ChatInfo from "./ChatInfo";

const Chat = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      height="100%"
      width="100%"
      flexDirection="column"
      borderLeft="1px solid rgba(211, 211, 211, 0.5)"
    >
      <ChatInfo />
      <Messages />
      <Input />
    </Box>
  );
};

export default Chat;

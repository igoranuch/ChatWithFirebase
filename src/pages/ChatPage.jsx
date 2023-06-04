import React from "react";
import { Box } from "@mui/material";
import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";

const ChatPage = () => {
  return (
    <Box display="flex" width="100%" height={`calc(100vh - 66px)`}>
      <Sidebar />
      <Chat />
    </Box>
  );
};

export default ChatPage;

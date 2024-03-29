import { Box } from "@mui/material";
import React from "react";
import Chats from "./Chats";
import Search from "./Search";

const Sidebar = () => {
  return (
    <Box display="flex" minWidth="450px" height="100%" flexDirection="column">
      <Search />
      <Chats />
    </Box>
  );
};

export default Sidebar;

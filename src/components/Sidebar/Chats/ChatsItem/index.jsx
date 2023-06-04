import React, { useContext } from "react";
import { ChatContext } from "../../../../context/ChatContext";
import { Avatar, Box, Typography } from "@mui/material";

const ChatsItem = ({ chat }) => {
  const { dispatch, data } = useContext(ChatContext);

  const handleSelect = (u) => {
    if (data.user.uid === u.uid) {
      dispatch({ type: "RESET_STATE" });
    } else {
      dispatch({ type: "CHANGE_USER", payload: u });
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
      gap="10px"
      onClick={() => handleSelect(chat[1].userInfo)}
    >
      <Avatar
        sx={{ width: "52px", height: "52px" }}
        src={chat[1].userInfo.photoURL}
      />
      <Box width="100%">
        <Typography variant="h5">{chat[1].userInfo.displayName}</Typography>
        <Typography>{chat[1].lastMessage?.text}</Typography>
      </Box>
    </Box>
  );
};

export default ChatsItem;

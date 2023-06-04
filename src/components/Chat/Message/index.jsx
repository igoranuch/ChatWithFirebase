import React from "react";
import { Avatar, Box, Typography } from "@mui/material";

const Message = ({ message, isFirstMessageFromAuthor }) => {
  const messageTime =
    message.date &&
    message.date.toDate().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  const parseMessageText = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((word, i) => {
      if (word.match(urlRegex)) {
        return (
          <a key={i} href={word} target="_blank" rel="noopener noreferrer">
            {word}
          </a>
        );
      } else {
        return <React.Fragment key={i}>{word}</React.Fragment>;
      }
    });
  };

  return (
    <Box>
      {isFirstMessageFromAuthor && (
        <Box>
          <Avatar src={message.photoURL} />
          <Box>{message.displayName}</Box>
        </Box>
      )}
      <Box>{parseMessageText(message.text)}</Box>
      <Typography variant="caption">{messageTime}</Typography>
    </Box>
  );
};

export default Message;

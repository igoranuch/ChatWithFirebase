import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useRef, useState } from "react";
import { db } from "../../../firebase";
import { ChatContext } from "../../../context/ChatContext";
import { Box } from "@mui/material";
import Message from "../Message";

const Messages = () => {
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);

  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      setMessages(doc.exists() ? doc.data().messages : []);
    });

    return () => {
      unSub();
    };
  }, [data]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box
      backgroundColor="#F2F4F8"
      display="flex"
      flexDirection="column"
      height="100%"
      width="100%"
      flex="1"
      flexWrap="nowrap"
      overflow="auto"
      ref={messagesEndRef}
      padding="16px"
    >
      {messages &&
        messages.map((message, index) => {
          return (
            <Message
              message={message}
              key={index}
              isFirstMessageFromAuthor={
                index === 0 || messages[index - 1].senderId !== message.senderId
              }
            />
          );
        })}
    </Box>
  );
};

export default Messages;

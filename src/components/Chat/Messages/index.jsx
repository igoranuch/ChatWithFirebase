import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useRef, useState } from "react";
import { db } from "../../../firebase";
import { ChatContext } from "../../../context/ChatContext";
import { Box } from "@mui/material";
import Message from "../Message";
import useStyles from "../../styles";

const Messages = () => {
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const styles = useStyles();

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
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      maxHeight="724px"
      padding="10px"
      overflow="hidden"
      flexGrow="1"
    >
      <Box className={styles.messagesContainer}>
        {messages &&
          messages.map((message, index) => {
            return (
              <Message
                message={message}
                key={index}
                isFirstMessageFromAuthor={
                  index === 0 ||
                  messages[index - 1].senderId !== message.senderId
                }
              />
            );
          })}
        <div ref={messagesEndRef} />
      </Box>
    </Box>
  );
};

export default Messages;

import React from "react";
import { Avatar, Box, Link, Typography } from "@mui/material";
import useStyles from "../../styles";
import { useFirestoreCollectionData, useUser } from "reactfire";
import { collection } from "firebase/firestore";
import { db } from "../../../firebase";
import { decryptMessage } from "../../../utils/functions";

const Message = ({ message, isFirstMessageFromAuthor }) => {
  const styles = useStyles();

  const { data: currentUser } = useUser();

  const messageTime =
    message.date &&
    message.date.toDate().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  const collectionRef = collection(db, "chats");
  const { data: chatsCollection } = useFirestoreCollectionData(collectionRef);
  const [{ encryptionKey }] = chatsCollection;

  const parseMessageText = (text) => {
    const decryptedText = decryptMessage(text, encryptionKey);

    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return decryptedText.split(urlRegex).map((word, i) => {
      if (word.match(urlRegex)) {
        return (
          <Link
            className={styles.chatText}
            variant="body1"
            key={i}
            href={word}
            target="_blank"
            rel="noopener noreferrer"
          >
            {word}
          </Link>
        );
      } else {
        return (
          <Typography
            className={styles.chatText}
            sx={{ color: "rgb(242,244,248)" }}
            variant="body1"
            key={i}
          >
            {word}
          </Typography>
        );
      }
    });
  };

  return (
    <Box
      display="flex"
      gap="15px"
      className={`${
        message.senderId === currentUser.uid ? styles.sent : styles.received
      }`}
    >
      <Box display="flex">
        {isFirstMessageFromAuthor ? (
          <Avatar
            sx={{ width: "52px", height: "52px" }}
            src={message.photoURL}
          />
        ) : (
          <Box display="flex" minWidth="52px" minHeight="52px" />
        )}
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        gap="4px"
        backgroundColor={`${
          message.senderId === currentUser.uid
            ? "rgba(22, 104, 196, 0.75)"
            : "rgba(22, 104, 196, 1)"
        }`}
        paddingY="8px"
        paddingX="8px"
        borderRadius="10px"
      >
        <Box
          display="flex"
          flexWrap="wrap"
          minWidth="150px"
          maxWidth="400px"
          overflow="hidden"
        >
          {parseMessageText(message.text)}
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <Typography sx={{ color: "rgb(233,233,233)" }} variant="caption">
            {messageTime}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Message;

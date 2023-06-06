import { Box, Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { ChatContext } from "../../../context/ChatContext";
import SendIcon from "@material-ui/icons/Send";
import {
  Timestamp,
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { v4 as uuid } from "uuid";
import { useFirestoreCollectionData, useUser } from "reactfire";
import { encryptMessage } from "../../../utils/functions";

const Input = () => {
  const [text, setText] = useState("");

  const { data } = useContext(ChatContext);

  const { data: currentUser } = useUser();

  const collectionRef = collection(db, "chats");
  const { data: chatsCollection } = useFirestoreCollectionData(collectionRef);

  const handleSend = async () => {
    if (text !== "" && chatsCollection) {
      const [{ encryptionKey }] = chatsCollection;

      const encryptedMessage = encryptMessage(text, encryptionKey);

      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text: encryptedMessage,
          senderId: currentUser.uid,
          date: Timestamp.now(),
          photoURL: currentUser.photoURL,
        }),
      });

      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text: encryptedMessage,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text: encryptedMessage,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });

      setText("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <Box
      display="flex"
      width="100%"
      padding="10px"
      borderTop="1px solid rgba(211, 211, 211, 0.5)"
    >
      <TextField
        sx={{
          borderRadius: "20px",
          backgroundColor: "#F2F4F8",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              border: "none",
            },
          },
          "& .MuiInputBase-input": {
            fontSize: "20px",
          },
          "& .MuiOutlinedInput-root.Mui-focused": {
            "& fieldset": {
              borderRadius: "20px",
              border: "2px solid #1668C4",
            },
          },
        }}
        disabled={!!!data.user.uid}
        fullWidth
        maxrows={2}
        variant="outlined"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleKeyPress}
        InputProps={{
          endAdornment: (
            <Button disabled={!!!data.user.uid} onClick={handleSend}>
              <SendIcon />
            </Button>
          ),
        }}
      />
    </Box>
  );
};

export default Input;

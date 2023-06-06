import React, { useContext, useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { AuthContext } from "../../../context/AuthContext";
import { Avatar, Box, IconButton, TextField, Typography } from "@mui/material";
import SearchIcon from "@material-ui/icons/Search";
import useStyles from "../../styles";
import { ChatContext } from "../../../context/ChatContext";
import { UIContext } from "../../../context/UIContext";

const Search = () => {
  const styles = useStyles();
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const { setAlert } = useContext(UIContext);

  const handleSearch = async () => {
    if (username === currentUser.displayName) {
      return;
    }

    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setAlert({ show: true, severity: "info", message: "No users found" });
      }

      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create

    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    const res = await getDoc(doc(db, "chats", combinedId));

    if (!res.exists()) {
      await setDoc(doc(db, "chats", combinedId), { messages: [] });

      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [combinedId + ".userInfo"]: {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", user.uid), {
        [combinedId + ".userInfo"]: {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });

      dispatch({ type: "CHANGE_USER", payload: user });
    }

    setUser(null);
    setUsername("");
  };

  useEffect(() => {
    dispatch({
      type: "SET_SEARCH_USER",
      payload: { user: !!user },
    });
  }, [dispatch, user]);

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        flexDirection="column"
        width="100%"
        height="fit-content"
        padding="10px"
        borderBottom="1px solid rgba(211, 211, 211, 0.5)"
      >
        <TextField
          sx={{
            borderRadius: "24px",
            backgroundColor: "#F2F4F8",
            "& .MuiOutlinedInput-root": {
              paddingRight: "6px !important",
              "& fieldset": {
                border: "none",
              },
            },
            "& .MuiOutlinedInput-root.Mui-focused": {
              "& fieldset": {
                borderRadius: "20px",
                border: "2px solid #1668C4",
              },
            },
            "& .MuiInputBase-input": {
              fontSize: "20px",
              height: "12px",
            },
            alignSelf: "center",
          }}
          type="text"
          placeholder="Search user..."
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          fullWidth
          InputProps={{
            endAdornment: (
              <IconButton disabled={!!!username.trim()} onClick={handleSearch}>
                <SearchIcon className={styles.searchIcon} />
              </IconButton>
            ),
          }}
        />
      </Box>
      {user && (
        <>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="100%"
            paddingTop="20px"
            paddingX="30px"
            gap="10px"
            onClick={handleSelect}
            sx={{ cursor: "pointer" }}
          >
            <Avatar
              sx={{ width: "52px", height: "52px" }}
              src={user.photoURL}
            />
            <Box width="100%">
              <Typography variant="h5">{user.displayName}</Typography>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default Search;

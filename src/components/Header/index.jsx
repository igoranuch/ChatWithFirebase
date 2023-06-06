import React, { useContext } from "react";
import {
  Button,
  Box,
  Toolbar,
  AppBar,
  Typography,
  Avatar,
} from "@mui/material";
import { ReactComponent as AppLogo } from "../../assets/images/icons8-chat.svg";
import { HOME_ROUTE } from "../../utils/constants";
import useStyles from "../styles";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";

const Header = () => {
  const styles = useStyles();

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  const signOut = () => {
    auth.signOut();
    dispatch({ type: "RESET_STATE" });
  };

  return (
    <AppBar
      sx={{ backgroundColor: "rgb(22,104,196)", height: "66px" }}
      position="static"
    >
      <Toolbar>
        <Box sx={{ width: "fit-content" }}>
          <Link className={styles.link} to={HOME_ROUTE}>
            <Box display="flex" alignItems="center" gap="5px">
              <AppLogo height="40" width="40" />
              <Typography color="white" variant="h5">
                PerfectChat
              </Typography>
            </Box>
          </Link>
        </Box>
        <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "flex-end" }}>
          {currentUser && (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap="10px"
            >
              <Avatar
                className={styles.userImage}
                src={currentUser?.photoURL}
              />
              <Typography>{currentUser?.displayName}</Typography>
              <Button onClick={signOut} variant="contained">
                Вийти
              </Button>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

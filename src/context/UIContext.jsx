import React, { createContext, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export const UIContext = createContext();

export const UIContextProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    show: false,
    severity: "info",
    message: "",
  });

  const handleClose = () => setAlert((prev) => ({ ...prev, show: false }));

  return (
    <UIContext.Provider value={{ setAlert }}>
      {children}
      <Snackbar open={alert.show} autoHideDuration={4000} onClose={handleClose}>
        <MuiAlert elevation={6} variant="filled" severity={alert.severity}>
          {alert.message}
        </MuiAlert>
      </Snackbar>
    </UIContext.Provider>
  );
};

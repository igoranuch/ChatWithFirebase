import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";
import { UIContextProvider } from "./context/UIContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <ChatContextProvider>
      <UIContextProvider>
        <App />
      </UIContextProvider>
    </ChatContextProvider>
  </AuthContextProvider>
);

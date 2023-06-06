import React from "react";
import Root from "./components/Root";
import { BrowserRouter } from "react-router-dom";
import { getFirestore } from "firebase/firestore";
import { AuthProvider, FirestoreProvider, useFirebaseApp } from "reactfire";
import { ChatContextProvider } from "./context/ChatContext";
import { UIContextProvider } from "./context/UIContext";
import { auth } from "./firebase";
import "./App.css";

function App() {
  const firestoreInstance = getFirestore(useFirebaseApp());

  return (
    <FirestoreProvider sdk={firestoreInstance}>
      <AuthProvider sdk={auth}>
        <ChatContextProvider>
          <UIContextProvider>
            <BrowserRouter>
              <Root />
            </BrowserRouter>
          </UIContextProvider>
        </ChatContextProvider>
      </AuthProvider>
    </FirestoreProvider>
  );
}

export default App;

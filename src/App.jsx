import React, { useContext } from "react";
import ChatPage from "./pages/ChatPage";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Header from "./components/Header";
function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Header />
                <ChatPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Header />
                <Login />
              </>
            }
          />
          <Route
            path="/register"
            element={
              <>
                <Header />
                <SignUp />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

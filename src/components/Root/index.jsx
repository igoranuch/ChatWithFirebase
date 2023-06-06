import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../Layout";
import ProtectedRoute from "../ProtectedRoute";
import ChatPage from "../../pages/ChatPage";
import Login from "../Login";
import SignUp from "../SignUp";

const Root = () => {
  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
      </Routes>
    </Layout>
  );
};

export default Root;

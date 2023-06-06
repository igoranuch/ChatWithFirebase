import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "reactfire";

const ProtectedRoute = ({ children }) => {
  const { data: currentUser } = useUser();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;

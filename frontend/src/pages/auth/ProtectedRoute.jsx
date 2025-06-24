import React from "react";
import { Navigate } from "react-router-dom";
import { storage } from "../../utils/storage.js";

const ProtectedRoute = ({ children, allowedRole }) => {
  const token = storage.getToken();
  const user = storage.getUser();

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

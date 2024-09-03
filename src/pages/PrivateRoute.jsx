import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, userData, requiredRoles }) => {
  if (!userData || !userData.jwt) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }

  // Check if the user has one of the required roles
  if (!requiredRoles.includes(userData.role)) {
    // If the user's role does not match, redirect to a safe page (e.g., dashboard)
    return <Navigate to="/dashboard" />;
  }

  // If authenticated and authorized, render the children components
  return children;
};

export default PrivateRoute;

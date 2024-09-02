// src/App.jsx
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import DashboardPage from "./pages/DashboardPage";
import PrivateRoute from "./pages/PrivateRoute";

function App() {
  // Keep track of whether the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
            <DashboardPage />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />
    </Routes>
  );
}

export default App;

// src/App.jsx
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import StudentsPage from "./pages/StudentsPage";
import ReportingPage from "./pages/ReportingPage";
import PrivateRoute from "./pages/PrivateRoute";
import NotFoundPage from "./pages/NotFoundPage";
import Layout from "./pages/Layout"; // Correctly importing Layout component

function App() {
  const [userData, setUserData] = useState(null); // Store JWT and user role

  return (
    <Routes>
      {/* Redirect to login if no path is matched */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Login page */}
      <Route path="/login" element={<LoginPage setUserData={setUserData} />} />

      {/* Layout for all other routes */}
      <Route element={<Layout userData={userData} />}>
        {/* Dashboard - accessible to all roles */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute userData={userData} requiredRoles={["Authenticated", "Education Team", "Partners"]}>
              <DashboardPage />
            </PrivateRoute>
          }
        />

        {/* Students - accessible to Admin and Education Team only */}
        <Route
          path="/students"
          element={
            <PrivateRoute userData={userData} requiredRoles={["Authenticated", "Education Team"]}>
              <StudentsPage />
            </PrivateRoute>
          }
        />

        {/* Reporting - accessible only to Admin */}
        <Route
          path="/reporting"
          element={
            <PrivateRoute userData={userData} requiredRoles={["Authenticated"]}>
              <ReportingPage />
            </PrivateRoute>
          }
        />

        {/* Not Found page */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;

import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const isAuthenticated = localStorage.getItem("user");

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
    </Routes>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Result from "./pages/Result";
import Periksa from "./pages/Periksa";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import { UserAuthContextProvider } from "./contexts/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import Tutorial from "./pages/Tutorial";
import Biodata from "./pages/Biodata";
import Pengujian from "./pages/PengujianSUS";

function App() {
  return (
    <UserAuthContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/riwayat" element={<Result />} />
          <Route path="/periksa" element={<Periksa />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="/biodata" element={<Biodata />} />
          <Route path="/kuesioner" element={<Pengujian />} />
        </Routes>
      </Router>
    </UserAuthContextProvider>
  );
}

export default App;

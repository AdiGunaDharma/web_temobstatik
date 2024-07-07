import React from "react";
import {createRoot} from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Result from "./pages/Result";
import Periksa from "./pages/Periksa";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import {UserAuthContextProvider} from "./contexts/AuthContext";
// import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Tutorial from "./pages/Tutorial";
import Biodata from "./pages/Biodata";
import Pengujian from "./pages/PengujianSUS";
import reportWebVitals from "./reportWebVitals";


export default function App() {
  return (
    //<Container className="d-flex align-items-center justify-content-center"
    //style={{ minHeight: "100vh" }}>
      //<div className="w-100" style={{ maxWidth: "400px" }}>
        <UserAuthContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/home" element={<Home />}></Route>
              <Route path="/riwayat" element={<Result />}></Route>
              <Route path="/periksa" element={<Periksa />}></Route>
              <Route path="/signup" element={<Signup />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/dashboard" element={<Dashboard />}></Route>
              <Route path="/forgot-password" element={<ForgotPassword />}></Route>
              <Route path="/tutorial" element={<Tutorial />}></Route>
              <Route path="/biodata" element={<Biodata />}></Route>
              <Route path="/kuesioner" element={<Pengujian />}></Route>
            </Routes>
          </BrowserRouter>
        </UserAuthContextProvider>
      //</div>
    //</Container>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
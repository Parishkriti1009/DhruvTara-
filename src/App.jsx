import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import WalkWithMe from "./pages/WalkWithMe";
import SafeRoute from "./pages/SafeRoute";
import ReportPage from "./pages/Reportpage";
import Signup from "./pages/Signup";
// New Imports
import Safespace from "./pages/Safespace";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <div style={{ background: "#0F0A14", minHeight: "100vh" }}>
      <Navbar />
      
      {/* FIX: Adding paddingTop here ensures NO page 
          is ever hidden behind the fixed Navbar. 
      */}
      <div style={{ paddingTop: "90px" }}> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/walkwithme" element={<WalkWithMe />} />
          <Route path="/safe-route" element={<SafeRoute />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* New Routes */}
          <Route path="/safespace" element={<Safespace />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

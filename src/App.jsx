import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import FootballDashboard from "./pages/FootballDashboard";
import AuthUI from "./pages/AuthUI";
import { ManagePlayers } from "./components/ManagePlayers";
import { CreateMatch } from "./components/CreateMatch";
import  CreateTeam  from "./components/CreateTeam";

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/organiser/dashboard" element={<FootballDashboard />} />
        {/* <Route path="/organiser/manage-player" element={<ManagePlayers />} /> */}
        <Route path="/organiser/create-match" element={<CreateMatch />} />
        <Route path="/organiser/create-team" element={<CreateTeam />} />
        <Route path="/auth" element={<AuthUI />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

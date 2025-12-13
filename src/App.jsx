import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import FootballDashboard from "./pages/FootballDashboard";
import AuthUI from "./pages/AuthUI";
import { ManagePlayers } from "./components/ManagePlayers";
import { CreateMatch } from "./components/CreateMatch";
import  CreateTeam  from "./components/CreateTeam";
import PrivateRoute from "./components/PrivateRoute";
import PlayerDashboard from "./pages/PlayerDashboard";
import OnlyOrganizerRoute from "./components/OnlyOrganizerRoute";
import ScoreboardHeader from "./components/ScoreBordHeader";

function App() {
  
  return (
    <BrowserRouter>
      <ScoreboardHeader />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/player/dashboard" element={<PlayerDashboard />} />
        </Route>
        <Route element={<OnlyOrganizerRoute />}>
          <Route path="/organizer/dashboard" element={<FootballDashboard />} />
          <Route path="/organiser/create-match" element={<CreateMatch />} />
          <Route path="/organiser/create-team" element={<CreateTeam />} />
        </Route>
        <Route path="/" element={<AuthUI />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

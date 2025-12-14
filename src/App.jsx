import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import FootballDashboard from "./pages/FootballDashboard";
import AuthUI from "./pages/AuthUI";
// import { ManagePlayers } from "./components/ManagePlayers";
import { CreateMatch } from "./components/CreateMatch";
import CreateTeam from "./components/CreateTeam";
// import PrivateRoute from "./components/PrivateRoute";
import OnlyOrganizerRoute from "./components/OnlyOrganizerRoute";
import ScoreboardHeader from "./components/ScoreBordHeader";
// import PlayerDashboard from "./pages/PlayerDashboard";
import PublicScoreboard from "./pages/PublicScoreBoard";
import MatchDetails from "./pages/MatchDetails";

function App() {
  return (
    <BrowserRouter>
      <ScoreboardHeader />
      <Routes>
        <Route path="/" element={<PublicScoreboard /> } />
        <Route path="match/:matchId" element={<MatchDetails />} />
        <Route element={<OnlyOrganizerRoute />}>
          <Route path="/organiser/dashboard" element={<FootballDashboard />} />
          <Route path="/organiser/create-match" element={<CreateMatch />} />
          <Route path="/organiser/create-team" element={<CreateTeam />} />
        </Route>
        <Route path="/auth" element={<AuthUI />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

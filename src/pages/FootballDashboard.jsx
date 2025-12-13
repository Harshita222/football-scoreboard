import React, { useState, useMemo, useEffect } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
import {
  Menu,
  Users,
  Activity,
  Trophy,
  Calendar,
  LogOut,
} from "lucide-react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signOutSuccess } from "../redux/user/userSlice";
const COLORS = ["#4F46E5", "#06B6D4", "#F97316", "#10B981"];
export default function FootballDashboard() {
  const [teamDetails, setTeamDetails] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  // ============================
  // LOGOUT
  // ============================
  // ============================
  // FETCH TEAMS
  // ============================
  const fetchTeamDetails = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/organizer/teamdetails`,
        { withCredentials: true }
      );
      setTeamDetails(res.data.teamDetails);
      if (res.data.teamDetails.length > 0) {
        setSelectedTeamId(res.data.teamDetails[0]._id);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTeamDetails();
  }, []);
  // ============================
  // SELECTED TEAM
  // ============================
  const selectedTeam = useMemo(
    () => teamDetails.find((t) => t._id === selectedTeamId),
    [teamDetails, selectedTeamId]
  );
  // ============================
  // CHART DATA
  // ============================
  const leagueBarData = teamDetails.map((t) => ({
    name: t.name,
    Wins: t.wins,
    Draws: t.draws,
    Losses: t.losses,
  }));
  const goalsPieData = teamDetails.map((t) => ({
    name: t.name,
    value: t.goalsFor,
  }));
  const pointsLineData = teamDetails.map((t) => ({
    name: t.name,
    points: t.points,
  }));
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto p-6">
        {/* ================= HEADER ================= */}
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-md bg-white shadow-sm">
              <Menu size={18} />
            </button>
            <div>
              <h1 className="text-2xl font-semibold">
                Arena Football Dashboard
              </h1>
              <p className="text-sm text-slate-500">
                Teams & Players Overview
              </p>
            </div>
          </div>
        </header>
        {/* ================= MAIN ================= */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* SIDEBAR */}
          <aside className="lg:col-span-3 bg-white rounded-2xl p-4 shadow-sm">
            <h2 className="font-medium mb-4">Teams</h2>
            <ul className="space-y-3">
              {teamDetails.map((team) => (
                <li key={team._id}>
                  <button
                    onClick={() => setSelectedTeamId(team._id)}
                    className={`w-full p-3 rounded-xl text-left ${
                      selectedTeamId === team._id
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-50"
                    }`}
                  >
                    <div className="flex justify-between">
                      <div>
                        <div className="font-semibold">{team.name}</div>
                        <div className="text-xs">
                          {team.wins}W • {team.draws}D • {team.losses}L
                        </div>
                      </div>
                      <div className="font-semibold">
                        {team.points} pts
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </aside>
          {/* CONTENT */}
          <section className="lg:col-span-9 space-y-6">
            {/* STATS */}
            {selectedTeam && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard title="Wins" value={selectedTeam.wins} icon={<Trophy />} />
                <StatCard title="Goals" value={selectedTeam.goalsFor} icon={<Activity />} />
                <StatCard title="Points" value={selectedTeam.points} icon={<Users />} />
              </div>
            )}
            {/* BAR CHART */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h3 className="font-medium mb-3">Season Overview</h3>
              <div style={{ height: 300 }}>
                <ResponsiveContainer>
                  <BarChart data={leagueBarData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Wins" stackId="a" fill="#22C55E"/>
                    <Bar dataKey="Draws" stackId="a" fill="#FACC15"/>
                    <Bar dataKey="Losses" stackId="a" fill="#EF4444"/>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            {/* LINE + PIE */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-2 bg-white rounded-2xl p-4 shadow-sm">
                <h3 className="font-medium mb-3">Points Progression</h3>
                <div style={{ height: 240 }}>
                  <ResponsiveContainer>
                    <LineChart data={pointsLineData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line dataKey="points" stroke="#4F46E5" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <h3 className="font-medium mb-3">Goals Share</h3>
                <div style={{ height: 240 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={goalsPieData}
                        dataKey="value"
                        innerRadius={40}
                        outerRadius={80}
                      >
                        {goalsPieData.map((_, i) => (
                          <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            {/* PLAYERS SECTION */}
            {selectedTeam && <PlayersSection team={selectedTeam} />}
          </section>
        </main>
      </div>
    </div>
  );
}
// ================= COMPONENTS =================
function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm flex justify-between">
      <div>
        <div className="text-xs text-slate-500">{title}</div>
        <div className="text-2xl font-semibold">{value}</div>
      </div>
      <div className="p-3 bg-slate-50 rounded-full">{icon}</div>
    </div>
  );
}
function PlayersSection({ team }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <h3 className="font-semibold text-lg mb-4">
        Players – {team.name}
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-slate-500">
              <th className="py-2 text-left">Name</th>
              <th>Email</th>
              <th className="text-center">W</th>
              <th className="text-center">L</th>
              <th className="text-center">GF</th>
              <th className="text-center">GA</th>
              <th className="text-center">Pts</th>
            </tr>
          </thead>
          <tbody>
            {team.players.map((p) => (
              <tr key={p._id} className="border-b last:border-none">
                <td className="py-2 font-medium">{p.fullName}</td>
                <td>{p.userId?.email}</td>
                <td className="text-center">{team.wins}</td>
                <td className="text-center">{team.losses}</td>
                <td className="text-center text-emerald-600">{team.goalsFor}</td>
                <td className="text-center text-rose-600">{team.goalsAgainst}</td>
                <td className="text-center font-semibold text-indigo-600">
                  {team.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
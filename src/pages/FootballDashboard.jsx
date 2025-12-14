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
  <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#020617] to-black text-white">
    <div className="max-w-7xl mx-auto p-6">

      {/* ================= HEADER ================= */}
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 transition">
            <Menu size={18} />
          </button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Arena Football Dashboard
            </h1>
            <p className="text-sm text-slate-400">
              Teams & Players Overview
            </p>
          </div>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* ================= SIDEBAR ================= */}
        <aside className="lg:col-span-3 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-4 shadow-2xl">
          <h2 className="font-semibold mb-4 text-slate-200">
            Teams
          </h2>

          <ul className="space-y-3">
            {teamDetails.map((team) => (
              <li key={team._id}>
                <button
                  onClick={() => setSelectedTeamId(team._id)}
                  className={`w-full p-4 rounded-2xl text-left transition ${
                    selectedTeamId === team._id
                      ? "bg-cyan-500 text-black shadow-lg"
                      : "bg-black/40 hover:bg-black/60 border border-white/10"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">{team.name}</div>
                      <div className="text-xs opacity-80">
                        {team.wins}W • {team.draws}D • {team.losses}L
                      </div>
                    </div>
                    <div className="font-bold">
                      {team.points} pts
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* ================= CONTENT ================= */}
        <section className="lg:col-span-9 space-y-6">

          {/* ================= STATS ================= */}
          {selectedTeam && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard title="Wins" value={selectedTeam.wins} icon={<Trophy />} />
              <StatCard title="Goals" value={selectedTeam.goalsFor} icon={<Activity />} />
              <StatCard title="Points" value={selectedTeam.points} icon={<Users />} />
            </div>
          )}

          {/* ================= BAR CHART ================= */}
          <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-4 shadow-2xl">
            <h3 className="font-semibold mb-3">
              Season Overview
            </h3>
            <div style={{ height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={leagueBarData}>
                  <XAxis dataKey="name" stroke="#94A3B8" />
                  <YAxis stroke="#94A3B8" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Wins" stackId="a" fill="#22C55E" />
                  <Bar dataKey="Draws" stackId="a" fill="#FACC15" />
                  <Bar dataKey="Losses" stackId="a" fill="#EF4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ================= LINE + PIE ================= */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div className="col-span-2 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-4 shadow-2xl">
              <h3 className="font-semibold mb-3">
                Points Progression
              </h3>
              <div style={{ height: 240 }}>
                <ResponsiveContainer>
                  <LineChart data={pointsLineData}>
                    <XAxis dataKey="name" stroke="#94A3B8" />
                    <YAxis stroke="#94A3B8" />
                    <Tooltip />
                    <Line
                      dataKey="points"
                      stroke="#22D3EE"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-4 shadow-2xl">
              <h3 className="font-semibold mb-3">
                Goals Share
              </h3>
              <div style={{ height: 240 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={goalsPieData}
                      dataKey="value"
                      innerRadius={45}
                      outerRadius={85}
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

          {/* ================= PLAYERS ================= */}
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
    <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-4 shadow-xl flex justify-between items-center">
      <div>
        <div className="text-xs text-slate-400">{title}</div>
        <div className="text-2xl font-bold text-white">{value}</div>
      </div>
      <div className="p-3 rounded-full bg-cyan-500/20 text-cyan-400">
        {icon}
      </div>
    </div>
  );
}


function PlayersSection({ team }) {
  return (
    <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-4 shadow-2xl">
      <h3 className="font-semibold text-lg mb-4">
        Players – {team.name}
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-slate-400">
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
              <tr key={p._id} className="border-b border-white/5 last:border-none">
                <td className="py-2 font-medium">{p.fullName}</td>
                <td className="text-slate-400">{p.userId?.email}</td>
                <td className="text-center">{team.wins}</td>
                <td className="text-center">{team.losses}</td>
                <td className="text-center text-emerald-400">{team.goalsFor}</td>
                <td className="text-center text-rose-400">{team.goalsAgainst}</td>
                <td className="text-center font-semibold text-cyan-400">
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


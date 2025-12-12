import React, { useState, useMemo } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { motion } from "framer-motion";
import { Menu, Users, Activity, Trophy, Calendar } from "lucide-react";

const teams = [
  { id: 1, name: "Red Lions", wins: 15, draws: 4, losses: 3, goals: 48, points: 49 },
  { id: 2, name: "Blue Sharks", wins: 12, draws: 6, losses: 4, goals: 40, points: 42 },
  { id: 3, name: "Green Eagles", wins: 10, draws: 7, losses: 5, goals: 36, points: 37 },
  { id: 4, name: "Yellow Tigers", wins: 8, draws: 5, losses: 9, goals: 30, points: 29 }
];
const players = [
  { id: 1, name: "A. Silva", teamId: 1, goals: 12, assists: 5, matches: 20, wins: 13, draws: 3, losses: 4 },
  { id: 2, name: "B. Gomez", teamId: 2, goals: 10, assists: 7, matches: 21, wins: 12, draws: 6, losses: 3 },
  { id: 3, name: "C. Park", teamId: 3, goals: 8, assists: 4, matches: 18, wins: 9, draws: 6, losses: 3 }
];
const recentMatches = [
  { id: 1, date: "2025-12-08", home: "Red Lions", away: "Blue Sharks", score: "2 - 1" },
  { id: 2, date: "2025-12-05", home: "Yellow Tigers", away: "Green Eagles", score: "1 - 3" },
  { id: 3, date: "2025-12-01", home: "Blue Sharks", away: "Green Eagles", score: "0 - 0" }
];
const COLORS = ["#4F46E5", "#06B6D4", "#F97316", "#10B981"];

export default function FootballDashboard() {

  const [selectedTeamId, setSelectedTeamId] = useState(1);
  const selectedTeam = useMemo(() => teams.find(t => t.id === selectedTeamId), [selectedTeamId]);

  // Chart data transformations
  const leagueBarData = teams.map(t => ({ name: t.name, Wins: t.wins, Draws: t.draws, Losses: t.losses }));
  const goalsPieData = teams.map(t => ({ name: t.name, value: t.goals }));
  const pointsLineData = teams.map((t, idx) => ({ name: t.name, points: t.points, idx }));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto p-6">
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-md bg-white shadow-sm">
              <Menu size={18} />
            </button>
            <div>
              <h1 className="text-2xl font-semibold">Football Dashboard</h1>
              <p className="text-sm text-slate-500">Overview for teams, players, organizers and fans</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3 bg-white p-2 rounded-full shadow-sm">
              <Calendar size={16} />
              <span className="text-sm">Dec 2025</span>
            </div>
            <div className="bg-white p-2 rounded-full shadow-sm">
              <Users size={18} />
            </div>
          </div>
        </header>
        
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left sidebar / filters */}
          <aside className="lg:col-span-3 bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-medium">Teams</h2>
              <span className="text-xs text-slate-500">Filter</span>
            </div>
            <ul className="space-y-3">
              {teams.map(team => (
                <li key={team.id}>
                  <button
                    onClick={() => setSelectedTeamId(team.id)}
                    className={`w-full text-left p-3 rounded-xl transition-colors ${selectedTeamId === team.id ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-800'}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-semibold">{team.name}</div>
                        <div className="text-xs text-slate-500">{team.wins}W • {team.draws}D • {team.losses}L</div>
                      </div>
                      <div className="text-sm font-semibold">{team.points} pts</div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-2">Recent Matches</h3>
              <div className="space-y-3">
                {recentMatches.map(m => (
                  <div key={m.id} className="text-xs bg-slate-50 p-2 rounded-md">
                    <div className="flex justify-between"><span>{m.home}</span><span className="font-medium">{m.score}</span></div>
                    <div className="text-slate-400">{m.date}</div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
          {/* Main content */}
          <section className="lg:col-span-9 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard title="Wins" value={selectedTeam.wins} icon={<Trophy />} change="+3 vs prev" />
              <StatCard title="Goals" value={selectedTeam.goals} icon={<Activity />} change="+5 in 3 matches" />
              <StatCard title="Points" value={selectedTeam.points} icon={<Users />} change="Top 3" />
            </div>
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Season overview</h3>
                <div className="text-sm text-slate-500">Wins / Draws / Losses</div>
              </div>
              <div style={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={leagueBarData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Wins" stackId="a" />
                    <Bar dataKey="Draws" stackId="a" />
                    <Bar dataKey="Losses" stackId="a" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-2 bg-white rounded-2xl p-4 shadow-sm">
                <h3 className="font-medium mb-3">Points progression</h3>
                <div style={{ height: 240 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={pointsLineData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="points" stroke="#4F46E5" strokeWidth={3} dot />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <h3 className="font-medium mb-3">Goals share</h3>
                <div style={{ height: 240 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={goalsPieData} dataKey="value" nameKey="name" innerRadius={40} outerRadius={80}>
                        {goalsPieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-3 text-xs space-y-1">
                  {goalsPieData.map((g, i) => (
                    <div key={g.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span style={{ width: 12, height: 12, background: COLORS[i % COLORS.length], display: 'inline-block', borderRadius: 3 }} />
                        <span>{g.name}</span>
                      </div>
                      <div>{g.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Players snapshot</h3>
                <div className="text-sm text-slate-500">Top performers</div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead>
                    <tr className="text-slate-500">
                      <th className="p-3">Player</th>
                      <th className="p-3">Team</th>
                      <th className="p-3">Goals</th>
                      <th className="p-3">Assists</th>
                      <th className="p-3">Matches</th>
                    </tr>
                  </thead>
                  <tbody>
                    {players.map(p => (
                      <tr key={p.id} className="border-t">
                        <td className="p-3">{p.name}</td>
                        <td className="p-3">{teams.find(t => t.id === p.teamId)?.name}</td>
                        <td className="p-3 font-medium">{p.goals}</td>
                        <td className="p-3">{p.assists}</td>
                        <td className="p-3">{p.matches}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
function StatCard({ title, value, icon, change }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between">
      <div>
        <div className="text-xs text-slate-500">{title}</div>
        <div className="text-2xl font-semibold">{value}</div>
        <div className="text-xs text-slate-400">{change}</div>
      </div>
      <div className="p-3 rounded-full bg-slate-50">
        {icon}
      </div>
    </div>
  );
}

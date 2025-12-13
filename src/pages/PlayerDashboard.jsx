import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Mail, Shield, Users } from "lucide-react";
export default function PlayerDashboard() {
  const [playerDetails, setPlayerDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  // ============================
  // FETCH PLAYER DATA
  // ============================
  const fetchPlayerDetails = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/team-details`,
        { withCredentials: true }
      );
      setPlayerDetails(res.data.playerDetails);
    } catch (error) {
      console.error("Fetch player details error:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPlayerDetails();
  }, []);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Loading dashboard...</p>
      </div>
    );
  }
  if (!playerDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">No player data found</p>
      </div>
    );
  }
  const { fullName, userId, teamId } = playerDetails;
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* ================= PROFILE CARD ================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-sm p-6 flex flex-col md:flex-row items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl font-bold">
              {fullName?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{fullName}</h2>
              <p className="text-sm text-slate-500 flex items-center gap-2">
                <Mail size={14} /> {userId?.email}
              </p>
              <span className="inline-flex items-center gap-1 mt-2 text-xs bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full">
                <Shield size={12} /> {userId?.role}
              </span>
            </div>
          </div>
          {teamId && (
            <div className="mt-4 md:mt-0 text-center md:text-right">
              <p className="text-sm text-slate-500">Team</p>
              <h3 className="text-lg font-semibold text-indigo-600">
                {teamId.name}
              </h3>
            </div>
          )}
        </motion.div>
        {/* ================= STATS ================= */}
        {teamId && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <StatCard title="Wins" value={teamId.wins} color="emerald" />
            <StatCard title="Draws" value={teamId.draws} color="amber" />
            <StatCard title="Losses" value={teamId.losses} color="rose" />
            <StatCard title="Goals For" value={teamId.goalsFor} color="indigo" />
            <StatCard title="Points" value={teamId.points} color="cyan" />
          </div>
        )}
        {/* ================= TEAM SUMMARY ================= */}
        {teamId && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-sm p-6"
          >
            <h3 className="text-lg font-semibold mb-4">
              Team Performance Overview
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <SummaryItem label="Goals For" value={teamId.goalsFor} />
              <SummaryItem label="Goals Against" value={teamId.goalsAgainst} />
              <SummaryItem
                label="Matches Played"
                value={teamId.wins + teamId.draws + teamId.losses}
              />
              <SummaryItem label="Total Points" value={teamId.points} />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
/* ================= COMPONENTS ================= */
function StatCard({ title, value, color }) {
  const colors = {
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    rose: "bg-rose-50 text-rose-600",
    indigo: "bg-indigo-50 text-indigo-600",
    cyan: "bg-cyan-50 text-cyan-600",
  };
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3">
      <div className={`p-3 rounded-full ${colors[color]}`}>
        <Users size={18} />
      </div>
      <div>
        <p className="text-xs text-slate-500">{title}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  );
}
function SummaryItem({ label, value }) {
  return (
    <div className="bg-slate-50 rounded-xl p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}
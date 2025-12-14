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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#020617] to-black">
        <p className="text-slate-400 animate-pulse text-lg">
          Loading dashboard...
        </p>
      </div>
    );
  }


  if (!playerDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#020617] to-black">
        <p className="text-red-400 text-lg">
          No player data found
        </p>
      </div>
    );
  }


  const { fullName, userId, teamId } = playerDetails;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#020617] to-black p-6 text-white">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* ================= PROFILE CARD ================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            rounded-3xl p-6
            bg-white/5 backdrop-blur-xl
            border border-white/10
            shadow-2xl
            flex flex-col md:flex-row
            items-center justify-between
          "
        >
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-cyan-500 text-black flex items-center justify-center text-xl font-bold shadow-lg">
              {fullName?.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2 className="text-xl font-semibold">{fullName}</h2>
              <p className="text-sm text-slate-400 flex items-center gap-2">
                <Mail size={14} /> {userId?.email}
              </p>
              <span className="inline-flex items-center gap-1 mt-2 text-xs bg-white/10 text-cyan-400 px-3 py-1 rounded-full">
                <Shield size={12} /> {userId?.role}
              </span>
            </div>
          </div>

          {teamId && (
            <div className="mt-4 md:mt-0 text-center md:text-right">
              <p className="text-sm text-slate-400">Team</p>
              <h3 className="text-lg font-semibold text-cyan-400">
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
            className="
              rounded-3xl p-6
              bg-white/5 backdrop-blur-xl
              border border-white/10
              shadow-2xl
            "
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
    emerald: "bg-emerald-500/15 text-emerald-400",
    amber: "bg-amber-500/15 text-amber-400",
    rose: "bg-rose-500/15 text-rose-400",
    indigo: "bg-indigo-500/15 text-indigo-400",
    cyan: "bg-cyan-500/15 text-cyan-400",
  };

  return (
    <div className="
      rounded-2xl p-4
      bg-white/5 border border-white/10
      shadow-xl flex items-center gap-3
    ">
      <div className={`p-3 rounded-full ${colors[color]}`}>
        <Users size={18} />
      </div>
      <div>
        <p className="text-xs text-slate-400">{title}</p>
        <p className="text-xl font-semibold text-white">{value}</p>
      </div>
    </div>
  );
}

function SummaryItem({ label, value }) {
  return (
    <div className="
      rounded-xl p-4
      bg-black/40 border border-white/10
    ">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}

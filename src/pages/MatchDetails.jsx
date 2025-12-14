import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Trophy, Users } from "lucide-react";

export default function MatchDetails() {
  const { matchId } = useParams();
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/match/${matchId}`
        );
        setMatch(res.data.match);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatch();
  }, [matchId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading match details...
      </div>
    );
  }

  const winner =
    match.teamScore > match.opponentScore
      ? match.team.name
      : match.opponentScore > match.teamScore
      ? match.opponentTeam.name
      : "Draw";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] to-black p-6 text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8"
      >
        {/* ================= HEADER ================= */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <span className="px-4 py-1 rounded-full bg-emerald-600 text-sm font-semibold">
            FINAL
          </span>

          <div className="flex items-center gap-2 text-yellow-400 font-semibold mt-4 md:mt-0">
            <Trophy size={20} />
            Winner: {winner}
          </div>
        </div>

        {/* ================= SCORE ================= */}
        <div className="grid grid-cols-3 text-center items-center mb-12">
          <h2 className="text-2xl font-bold">{match.team.name}</h2>

          <div className="text-5xl font-extrabold text-cyan-400">
            {match.teamScore} - {match.opponentScore}
          </div>

          <h2 className="text-2xl font-bold">
            {match.opponentTeam.name}
          </h2>
        </div>

        {/* ================= TEAM STATS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          {[match.team, match.opponentTeam].map((team) => (
            <div
              key={team._id}
              className="rounded-3xl bg-black/40 border border-white/10 p-6"
            >
              <h3 className="text-xl font-semibold mb-4">{team.name}</h3>

              <div className="grid grid-cols-2 gap-4 text-sm text-slate-300">
                <p>Wins: <strong>{team.wins}</strong></p>
                <p>Losses: <strong>{team.losses}</strong></p>
                <p>Draws: <strong>{team.draws}</strong></p>
                <p>Points: <strong>{team.points}</strong></p>
                <p>Goals For: <strong>{team.goalsFor}</strong></p>
                <p>Goals Against: <strong>{team.goalsAgainst}</strong></p>
              </div>
            </div>
          ))}
        </div>

        {/* ================= PLAYERS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[match.team, match.opponentTeam].map((team) => (
            <div
              key={team._id}
              className="rounded-3xl bg-white/5 border border-white/10 p-6"
            >
              <div className="flex items-center gap-2 mb-4 text-slate-300">
                <Users size={18} />
                <span className="uppercase tracking-wide text-sm">
                  {team.name} Players
                </span>
              </div>

              <ul className="space-y-3">
                {team.players.map((player) => (
                  <li
                    key={player._id}
                    className="px-4 py-3 rounded-xl bg-black/50 border border-white/10 hover:bg-black/70 transition"
                  >
                    <p className="font-semibold">{player.name}</p>
                    <p className="text-xs text-slate-400">
                      {player.position || "Player"}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ================= FOOTER ================= */}
        <div className="mt-12 text-center text-sm text-slate-400">
          Match played on {new Date(match.date).toLocaleDateString()}
        </div>
      </motion.div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Trophy, Plus, ArrowRight } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ScoreBoard() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const isOrganizer = currentUser?.safeUser?.role === "organizer";

  const [liveMatches, setLiveMatches] = useState([]);
  const [completedMatches, setCompletedMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMatches = async () => {
    try {
      const [liveRes, completedRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/api/liveMatch`),
        axios.get(`${import.meta.env.VITE_API_URL}/api/completedMatch`),
      ]);

      setLiveMatches(liveRes.data.matches);
      setCompletedMatches(completedRes.data.matches);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  /* ================= UPDATE SCORE ================= */
  const addGoal = async (match, side) => {
    const body = {
      teamScore: side === "team" ? match.teamScore + 1 : match.teamScore,
      opponentScore:
        side === "opponent" ? match.opponentScore + 1 : match.opponentScore,
    };

    await axios.put(
      `${import.meta.env.VITE_API_URL}/api/match/${match._id}/score`,
      body
    );

    fetchMatches();
  };

  /* ================= END MATCH ================= */
  const endMatch = async (matchId) => {
    await axios.put(
      `${import.meta.env.VITE_API_URL}/api/match/${matchId}/complete`
    );
    fetchMatches();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading matches...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] to-black p-6 text-white">
      {/* ================= LIVE HEADER ================= */}
      <div className="flex items-center gap-3 mb-6">
        {liveMatches.length > 0 && (
          <span className="px-4 py-1 rounded-full text-sm font-semibold bg-red-500 animate-pulse">
            LIVE
          </span>
        )}

        <h1 className="text-xl font-bold">Live Matches</h1>
      </div>

      {/* ================= LIVE MATCHES ================= */}
      <div className="space-y-6 mb-14">
        {liveMatches.length > 0 ? (
          liveMatches.map((match) => (
            <motion.div
              key={match._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl p-6"
            >
              {/* TEAMS */}
              <div className="grid grid-cols-2 gap-6 text-center">
                {/* TEAM */}
                <div>
                  <h2 className="text-lg font-semibold">{match.team?.name}</h2>

                  {isOrganizer && (
                    <button
                      onClick={() => addGoal(match, "team")}
                      className="
                        mt-2 inline-flex items-center gap-1
                        px-3 py-1 rounded-full
                        bg-cyan-500/20 hover:bg-cyan-500/30
                        border border-cyan-400/30
                        text-cyan-300 text-sm font-semibold
                        transition
                      "
                    >
                      <Plus size={14} /> Add Goal
                    </button>
                  )}
                </div>

                {/* OPPONENT */}
                <div>
                  <h2 className="text-lg font-semibold">
                    {match.opponentTeam?.name}
                  </h2>

                  {isOrganizer && (
                    <button
                      onClick={() => addGoal(match, "opponent")}
                      className="
                        mt-2 inline-flex items-center gap-1
                        px-3 py-1 rounded-full
                        bg-indigo-500/20 hover:bg-indigo-500/30
                        border border-indigo-400/30
                        text-indigo-300 text-sm font-semibold
                        transition
                      "
                    >
                      <Plus size={14} /> Add Goal
                    </button>
                  )}
                </div>
              </div>

              {/* SCORE */}
              <div className="mt-6 text-center">
                <span className="text-4xl font-extrabold text-cyan-400">
                  {match.teamScore} - {match.opponentScore}
                </span>
              </div>

              {/* END MATCH */}
              {isOrganizer && (
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={() => endMatch(match._id)}
                    className="
                      px-6 py-2 rounded-2xl
                      bg-emerald-600 hover:bg-emerald-700
                      text-white font-semibold
                      shadow-lg transition
                    "
                  >
                    End Match
                  </button>
                </div>
              )}
            </motion.div>
          ))
        ) : (
          <p className="text-slate-400">No live matches.</p>
        )}
      </div>

      {/* ================= COMPLETED MATCHES ================= */}
      <h1 className="text-2xl font-bold mb-6">🏁 Completed Matches</h1>

      <div className="space-y-6">
        {completedMatches.map((match) => {
          const winner =
            match.teamScore > match.opponentScore
              ? match.team?.name
              : match.opponentTeam?.name;

          return (
            <div
              key={match._id}
              className="
          rounded-3xl
          bg-white/5 backdrop-blur-xl
          border border-white/10
          shadow-xl
          p-6
          hover:bg-white/10
          transition
        "
            >
              {/* SCORE */}
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>{match.team?.name}</span>

                <span className="text-cyan-400 text-2xl">
                  {match.teamScore} - {match.opponentScore}
                </span>

                <span>{match.opponentTeam?.name}</span>
              </div>

              {/* WINNER + ACTION */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-yellow-400 text-sm">
                  <Trophy size={16} />
                  Winner: {winner}
                </div>

                <button
                  onClick={() => navigate(`/match/${match._id}`)}
                  className="
              inline-flex items-center gap-2
              px-4 py-2
              rounded-full
              text-sm font-semibold
              bg-indigo-500/20 hover:bg-indigo-500/30
              border border-indigo-400/30
              text-indigo-300
              transition
            "
                >
                  View Details
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

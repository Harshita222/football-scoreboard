import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function CreateMatch() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    team: "",
    opponent: "",
  });

  const [teams, setTeams] = useState([]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/organizer/match`,
        form,
        { withCredentials: true }
      );
      navigate("/");
      setForm({
        team: "",
        opponent: "",
      });
    } catch (error) {
      console.log(error);
    }

    console.log("Match Created:", res);
  };

  const fetchAllMatch = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/organizer/teams`,
        {},
        { withCredentials: true }
      );
      // console.log(res);
      setTeams(res.data.teams);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllMatch();
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#020617] via-[#020617] to-black px-4 text-white">
      <div className="w-full max-w-md rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl p-8">
        <h2 className="text-3xl font-bold mb-8 tracking-tight">
          Create New Match
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* TEAM */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300">
              Select Your Team
            </label>
            <select
              name="team"
              value={form.team}
              onChange={handleChange}
              className="
            w-full rounded-xl px-4 py-3
            bg-black/40 border border-white/10
            text-white
            focus:outline-none focus:ring-2 focus:ring-cyan-400
          "
            >
              <option value="" className="text-black">
                Choose Team
              </option>
              {teams.map((t, i) => (
                <option key={i} value={t._id} className="text-black">
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* OPPONENT */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300">
              Opponent Team
            </label>
            <select
              name="opponent"
              value={form.opponent}
              onChange={handleChange}
              className="
            w-full rounded-xl px-4 py-3
            bg-black/40 border border-white/10
            text-white
            focus:outline-none focus:ring-2 focus:ring-cyan-400
          "
            >
              <option value="" className="text-black">
                Choose Opponent
              </option>
              {teams.map((t, i) => (
                <option key={i} value={t._id} className="text-black">
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* SCORES */}
          {/* <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300">
                Team Score
              </label>
              <input
                type="number"
                name="teamScore"
                value={form.teamScore}
                onChange={handleChange}
                placeholder="0"
                className="
              w-full rounded-xl px-4 py-3
              bg-black/40 border border-white/10
              text-white placeholder-slate-400
              focus:outline-none focus:ring-2 focus:ring-cyan-400
            "
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300">
                Opponent Score
              </label>
              <input
                type="number"
                name="opponentScore"
                value={form.opponentScore}
                onChange={handleChange}
                placeholder="0"
                className="
              w-full rounded-xl px-4 py-3
              bg-black/40 border border-white/10
              text-white placeholder-slate-400
              focus:outline-none focus:ring-2 focus:ring-cyan-400
            "
              />
            </div>
          </div> */}

          {/* SUBMIT */}
          <button
            type="submit"
            className="
          w-full mt-4 py-3 rounded-xl
          bg-cyan-500 text-black font-semibold text-lg
          hover:bg-cyan-400 transition
          shadow-lg shadow-cyan-500/20
        "
          >
            Create Match
          </button>
        </form>
      </div>
    </div>
  );
}

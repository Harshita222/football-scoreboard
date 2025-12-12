import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";

export function CreateMatch() {
  const [form, setForm] = useState({
    team: "",
    opponent: "",
    teamScore: "",
    opponentScore: "",
  });

  const teams = ["Red Lions", "Blue Sharks", "Golden Wolves"];

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Match Created:", form);
  };

  const fetchAllMatch = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/organizer/teams`,
        {},
        { withCredentials: true }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllMatch();
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <Card title="Create New Match">
        <form onSubmit={handleSubmit} className="space-y-6 w-80 md:w-96">
          {/* TEAM */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Select Your Team
            </label>
            <select
              name="team"
              value={form.team}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="">Choose Team</option>
              {teams.map((t, i) => (
                <option key={i} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* OPPONENT */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Opponent Team
            </label>
            <select
              name="opponent"
              value={form.opponent}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="">Choose Opponent</option>
              {teams
                .filter((t) => t !== form.team)
                .map((t, i) => (
                  <option key={i} value={t}>
                    {t}
                  </option>
                ))}
            </select>
          </div>

          {/* SCORES */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Team Score
              </label>
              <input
                type="number"
                name="teamScore"
                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                value={form.teamScore}
                onChange={handleChange}
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Opponent Score
              </label>
              <input
                type="number"
                name="opponentScore"
                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                value={form.opponentScore}
                onChange={handleChange}
                placeholder="0"
              />
            </div>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-medium text-lg transition hover:bg-indigo-700 shadow-md"
          >
            Create Match
          </button>
        </form>
      </Card>
    </div>
  );
}

import React, { useState } from "react";
import Card from "./Card";
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
  function handleSubmit(e) {
    e.preventDefault();
    console.log("Match Created:", form);
  }
  return (
    <Card title="Create New Match">
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* TEAM SELECT */}
        <div>
          <label className="text-sm font-medium">Team</label>
          <select
            name="team"
            value={form.team}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          >
            <option value="">Select Team</option>
            {teams.map((t, i) => (
              <option key={i} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* OPPONENT */}
        <div>
          <label className="text-sm font-medium">Opponent Team</label>
          <select
            name="opponent"
            value={form.opponent}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          >
            <option value="">Select Opponent</option>
            {teams.map((t, i) => (
              <option key={i} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        
        {/* SCORES */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Team Score</label>
            <input
              type="number"
              name="teamScore"
              className="w-full border p-2 rounded mt-1"
              value={form.teamScore}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Opponent Score</label>
            <input
              type="number"
              name="opponentScore"
              className="w-full border p-2 rounded mt-1"
              value={form.opponentScore}
              onChange={handleChange}
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg shadow"
        >
          Create Match
        </button>
      </form>
    </Card>
  );
}

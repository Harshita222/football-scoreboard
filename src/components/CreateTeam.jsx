

import axios from "axios";
import React, { useState, useEffect } from "react";

function CreateTeam() {
  const [allPlayer, setAllPlayer] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [teamPlayers, setTeamPlayers] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [allTeams, setAllTeams] = useState([]);

  const fetchAllPlayer = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/organizer/players`,
        { withCredentials: true }
      );
      setAllPlayer(res.data.players);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllPlayer();
  }, []);

  const handleAddPlayer = () => {
    if (selectedPlayer && !teamPlayers.includes(selectedPlayer)) {
      setTeamPlayers([...teamPlayers, selectedPlayer]);
      setSelectedPlayer("");
    }
  };

  const handleRemovePlayer = (playerId) => {
    setTeamPlayers(teamPlayers.filter((id) => id !== playerId));
  };

  const getPlayerName = (id) =>
    allPlayer.find((p) => p._id === id)?.fullName || "Unknown Player";

  const handleCreateTeam = async () => {
    if (!teamName) return alert("Enter team name");
    if (teamPlayers.length === 0) return alert("Add at least one player");

    const newTeam = {
      id: Date.now(),
      name: teamName,
      players: teamPlayers,
    };

    setAllTeams([...allTeams, newTeam]);
    setTeamName("");
    setTeamPlayers([]);

    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/organizer/team`,
      { teamName: teamName, players: teamPlayers },
      { withCredentials: true }
    );

    console.log("Team Created Response", res.data);
  };

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-100 py-10 px-4">
      {/* MAIN CARD */}
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Create New Team
        </h1>

        {/* Team Name */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700">
            Team Name
          </label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Enter team name"
            className="w-full mt-2 p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* Player Select */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Add Player
          </label>
          <div className="flex gap-2">
            <select
              value={selectedPlayer}
              onChange={(e) => setSelectedPlayer(e.target.value)}
              className="flex-1 p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="">Select a player</option>
              {allPlayer.map((player) => (
                <option key={player._id} value={player._id}>
                  {player.fullName}
                </option>
              ))}
            </select>

            <button
              onClick={handleAddPlayer}
              className="px-9 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
            >
              Add
            </button>
          </div>
        </div>

        {/* Team Players */}
        <div>
          <h2 className="text-lg font-semibold mb-3 text-gray-800">
            Team Players
          </h2>

          {teamPlayers.length === 0 ? (
            <p className="text-gray-500 text-sm">No players added yet.</p>
          ) : (
            <ul className="space-y-2">
              {teamPlayers.map((id) => (
                <li
                  key={id}
                  className="flex justify-between items-center bg-gray-100 p-3 rounded-xl border"
                >
                  <span>{getPlayerName(id)}</span>
                  <button
                    onClick={() => handleRemovePlayer(id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Save Button */}
        <button
          onClick={handleCreateTeam}
          className="w-full mt-6 py-3 bg-indigo-600 text-white rounded-xl font-medium text-lg shadow hover:bg-indigo-700 transition"
        >
          Save 
        </button>
      

      {/* Team List Section */}
      <div className="w-full max-w-xl mt-10 px-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Created Teams
        </h2>

        {allTeams.length === 0 ? (
          <p className="text-gray-500">No teams created yet.</p>
        ) : (
          allTeams.map((team) => (
            <div
              key={team.id}
              className="p-4 bg-white shadow rounded-xl border mb-4"
            >
              <h3 className="font-bold text-indigo-600">{team.name}</h3>
              <ul className="list-disc ml-6 mt-2">
                {team.players.map((id) => (
                  <li key={id}>{getPlayerName(id)}</li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
      </div>
    </div>
  );
}

export default CreateTeam;


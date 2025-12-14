import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CreateTeam() {
  const [allPlayer, setAllPlayer] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [teamPlayers, setTeamPlayers] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [allTeams, setAllTeams] = useState([]);

  const navigate = useNavigate();

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

  const getPlayerName = (id) => {
    return allPlayer.find((p) => p._id === id)?.fullName || "Unknown Player";
  };

  const handleCreateTeam = async () => {
    if (!teamName) {
      alert("Please enter team name");
      return;
    }
    if (teamPlayers.length === 0) {
      alert("Please add at least one player");
      return;
    }

    const newTeam = {
      id: Date.now(),
      name: teamName,
      players: teamPlayers,
    };

    setAllTeams([...allTeams, newTeam]);
    setTeamName("");
    setTeamPlayers([]);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/organizer/team`,
        { teamName: teamName, players: teamPlayers },
        { withCredentials: true }
      );
      navigate("/organiser/create-match");
      console.log("team created", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#020617] via-[#020617] to-black px-4 text-white">
      <div className="w-full max-w-md rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl p-8">
        <h1 className="text-3xl font-bold mb-8 tracking-tight">Create Team</h1>

        {/* Team Name */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Team Name
          </label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Enter team name"
            className="
          w-full rounded-xl px-4 py-3
          bg-black/40 border border-white/10
          text-white placeholder-slate-400
          focus:outline-none focus:ring-2 focus:ring-cyan-400
        "
          />
        </div>

        {/* Player Dropdown */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-300 mb-3">
            Add Player
          </label>
          <div className="flex gap-3">
            <select
              value={selectedPlayer}
              onChange={(e) => setSelectedPlayer(e.target.value)}
              className="
            flex-1 rounded-xl px-4 py-3
            bg-black/40 border border-white/10
            text-white
            focus:outline-none focus:ring-2 focus:ring-cyan-400
          "
            >
              <option value="" className="text-black">
                Select a player
              </option>

              {allPlayer.map((player) => (
                <option
                  key={player._id}
                  value={player._id}
                  className="text-black"
                >
                  {player.fullName}
                </option>
              ))}
            </select>

            <button
              onClick={handleAddPlayer}
              className="
            px-5 py-3 rounded-xl
            bg-cyan-500 text-black font-semibold
            hover:bg-cyan-400 transition
            shadow-lg shadow-cyan-500/20
          "
            >
              Add
            </button>
          </div>
        </div>

        {/* Selected Players List */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Team Players</h2>

          {teamPlayers.length === 0 ? (
            <p className="text-slate-400">No players added yet.</p>
          ) : (
            <ul className="space-y-3">
              {teamPlayers.map((playerId) => (
                <li
                  key={playerId}
                  className="
                flex justify-between items-center
                rounded-xl px-4 py-3
                bg-black/40 border border-white/10
              "
                >
                  <span>{getPlayerName(playerId)}</span>
                  <button
                    onClick={() => handleRemovePlayer(playerId)}
                    className="text-red-400 hover:text-red-300 transition"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Save Team Button */}
        <div className="flex justify-end mb-8">
          <button
            onClick={handleCreateTeam}
            className="
          px-6 py-3 rounded-xl
          bg-indigo-500 text-white font-semibold
          hover:bg-indigo-400 transition
          shadow-lg shadow-indigo-500/20
        "
          >
            Save
          </button>
        </div>

        {/* All Teams List */}
        <div>
          <h2 className="text-xl font-bold mb-4">All Created Teams</h2>

          {allTeams.length === 0 ? (
            <p className="text-slate-400">No teams created yet.</p>
          ) : (
            allTeams.map((team) => (
              <div
                key={team.id}
                className="
              mb-4 rounded-2xl p-4
              bg-white/5 border border-white/10
            "
              >
                <h3 className="font-semibold text-lg">{team.name}</h3>
                <ul className="list-disc ml-5 mt-2 text-slate-300">
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

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

    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/organizer/team`,
      { teamName: teamName, players: teamPlayers },
      { withCredentials: true }
    );

    console.log("Team Created Response", res.data);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Create Team</h1>

      {/* Team Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Team Name</label>
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Enter team name"
          className="w-full mt-1 p-2 border rounded-lg"
        />
      </div>

      {/* Player Dropdown */}
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium">Add Player</label>
        <div className="flex gap-2">
          <select
            value={selectedPlayer}
            onChange={(e) => setSelectedPlayer(e.target.value)}
            className="flex-1 p-2 border rounded-lg"
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
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Add
          </button>
        </div>
      </div>

      {/* Selected Players List */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Team Players:</h2>

        {teamPlayers.length === 0 ? (
          <p className="text-gray-500">No players added yet.</p>
        ) : (
          <ul className="space-y-1">
            {teamPlayers.map((playerId) => (
              <li
                key={playerId}
                className="flex justify-between items-center p-2 border rounded-lg"
              >
                <span>{getPlayerName(playerId)}</span>
                <button
                  onClick={() => handleRemovePlayer(playerId)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Save Team Button */}
      <div className="flex justify-end mt-4">
        <button
          onClick={handleCreateTeam}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Save 
        </button>
      </div>

      {/* All Teams List */}
      <div className="mt-6">
        <h2 className="text-lg font-bold mb-2">All Created Teams</h2>

        {allTeams.length === 0 ? (
          <p className="text-gray-500">No teams created yet.</p>
        ) : (
          allTeams.map((team) => (
            <div key={team.id} className="p-4 border rounded-lg bg-gray-50 mb-3">
              <h3 className="font-bold">{team.name}</h3>
              <ul className="list-disc ml-5 mt-2">
                {team.players.map((id) => (
                  <li key={id}>{getPlayerName(id)}</li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CreateTeam;

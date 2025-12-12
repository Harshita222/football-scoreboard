import React, { useState } from "react";

function CreateTeam() {
  const allPlayers = [
    { id: 1, name: "Player 1" },
    { id: 2, name: "Player 2" },
    { id: 3, name: "Player 3" },
    { id: 4, name: "Player 4" },
  ];

  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [teamPlayers, setTeamPlayers] = useState([]);

  const handleAddPlayer = () => {
    if (selectedPlayer && !teamPlayers.includes(selectedPlayer)) {
      setTeamPlayers([...teamPlayers, selectedPlayer]);
      setSelectedPlayer("");
    }
  };

  const handleRemovePlayer = (player) => {
    setTeamPlayers(teamPlayers.filter((p) => p !== player));
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Create Team</h1>
      {/* Add Player Section */}
      <div className="mb-4">
        <label
          htmlFor="playerDropdown"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Add Player
        </label>
        <div className="flex gap-2">
          <select
            id="playerDropdown"
            value={selectedPlayer}
            onChange={(e) => setSelectedPlayer(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a player</option>
            {allPlayers.map((player) => (
              <option key={player.id} value={player.name}>
                {player.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddPlayer}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </div>
      {/* Team Players List */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Team Players:</h2>
        {teamPlayers.length === 0 ? (
          <p className="text-gray-500">No players added yet.</p>
        ) : (
          <ul className="space-y-1">
            {teamPlayers.map((player) => (
              <li
                key={player}
                className="flex justify-between items-center p-2 border border-gray-200 rounded-lg"
              >
                <span>{player}</span>
                <button
                  onClick={() => handleRemovePlayer(player)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex justify-end mt-4">
      <button type = "submit" className=" px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Save</button>
    </div>
    </div>
  );
}

export default CreateTeam;

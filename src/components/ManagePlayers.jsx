import React, { useState } from "react";
import Card from "./Card";
// import   SimpleTable from "./SimpleTable";

export function ManagePlayers() {
  const [players] = useState([
    { id: 1, name: "John Player", email: "john@mail.com", team: "-" },
    { id: 2, name: "Alex Star", email: "alex@mail.com", team: "-" },
    { id: 3, name: "Rohit Singh", email: "rohit@mail.com", team: "Red Lions" },
  ]);
  const [teams] = useState(["Red Lions", "Blue Sharks", "Golden Wolves"]);
  
  return (
    <Card title="Manage Players & Assign Teams">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="text-left text-slate-600 border-b">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Team</th>
            <th className="p-2">Assign Team</th>
          </tr>
        </thead>
        <tbody>
          {players.map((p) => (
            <tr key={p.id} className="border-b">
              <td className="p-2">{p.name}</td>
              <td className="p-2">{p.email}</td>
              <td className="p-2">{p.team}</td>
              <td className="p-2">
                <select className="border p-1 rounded">
                  <option value="">Select Team</option>
                  {teams.map((t, i) => (
                    <option key={i} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

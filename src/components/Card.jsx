import React from "react";

function Card({ title, children }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="font-semibold mb-3 text-lg">{title}</h2>
      {children}
    </div>
  );
}
export default Card;

import React from 'react'


 function SimpleTable({ headings, rows }) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left border-b">
          {headings.map((h, i) => (
            <th key={i} className="p-2">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rIdx) => (
          <tr key={rIdx} className="border-b hover:bg-slate-50">
            {row.map((col, cIdx) => (
              <td key={cIdx} className="p-2">
                {col}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SimpleTable;
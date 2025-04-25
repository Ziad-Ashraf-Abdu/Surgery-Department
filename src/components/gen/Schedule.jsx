import React from "react";

export default function Schedule({ items, onItemClick }) {
  return (
    <div className="schedule-section">
      <h2>Schedule</h2>
      {items.map((it, i) => (
        <div
          key={i}
          className="schedule-item clickable"
          onClick={() => onItemClick(it)}
        >
          <span>{it.time}</span>
          <span>{it.activity}</span>
        </div>
      ))}
    </div>
  );
}




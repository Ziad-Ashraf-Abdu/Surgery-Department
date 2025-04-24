import React from "react";

export default function Schedule({ items }) {
  return (
    <div className="schedule-section">
      <h2>Your Schedule</h2>
      {items.map((item, i) => (
        <div key={i} className="schedule-item">
          <span>{item.time}</span> – <span>{item.activity}</span>
        </div>
      ))}
    </div>
  );
}

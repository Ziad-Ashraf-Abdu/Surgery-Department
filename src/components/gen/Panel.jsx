// src/components/Panel.jsx
import React from 'react';

/**
 * @param {string}       title       — Panel heading
 * @param {Array}        items       — Array of data objects
 * @param {string}       className   — CSS class for the <ul>
 * @param {Function}     renderItem  — (item) ⇒ JSX to render each <li>
 */
export default function Panel({ title, items, className, renderItem }) {
  return (
    <div className="doctor-card">
      <h3>{title}</h3>
      <ul className={className}>
        {items.map((item, i) => (
          <li key={i}>{renderItem(item)}</li>
        ))}
      </ul>
    </div>
  );
}

// src/components/gen/Panel.jsx
import React from 'react';
import PropTypes from 'prop-types';

export default function Panel({
  title,
  items = [],
  className = '',
  renderItem
}) {
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

Panel.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array,
  className: PropTypes.string,
  renderItem: PropTypes.func.isRequired
};
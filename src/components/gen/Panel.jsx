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
        <div className={`panel-container ${className}`}>
            <div className="panel-header">
                <h3>{title}</h3>
                <span className="panel-count">{items.length}</span>
            </div>

            {items.length === 0 ? (
                <div className="panel-empty">No {title.toLowerCase()}.</div>
            ) : (
                <div className="panel-item-list">
                    {items.map((item, i) => (
                        <div key={i} className="panel-item">
                            {renderItem(item)}
                            {i !== items.length - 1 && <div className="panel-divider" />}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

Panel.propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.array,
    className: PropTypes.string,
    renderItem: PropTypes.func.isRequired
};

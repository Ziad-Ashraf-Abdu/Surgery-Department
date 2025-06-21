import React from "react";

export default function MedicationRoutine({ meds, onMedClick }) {
  return (
    <div className="medication-card">
      <h3>Medications</h3>
      {meds.map((med, idx) => (
        <div
          key={idx}
          className="med-facts clickable"
          onClick={() => onMedClick(med)}
        >
          <span>{med.name}</span>
          <span>{med.type}</span>
        </div>
      ))}
    </div>
  );
}

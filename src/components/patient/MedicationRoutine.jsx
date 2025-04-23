import React from "react";

export default function MedicationRoutine({ meds }) {
  return (
    <div className="medication-routine">
      <h2>Medication Routine</h2>
      {meds.map((med, i) => (
        <div key={i} className="medication-card">
          <h3>{med.name}</h3>
          <span>{med.type}</span>
          <div className="med-facts">
            <span>Prescribed by {med.prescriber}</span>
            <span>{new Date(med.date).toLocaleDateString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

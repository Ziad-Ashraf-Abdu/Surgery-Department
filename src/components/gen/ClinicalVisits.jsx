import React from "react";

export default function ClinicalVisits({ appointments }) {
  return (
    <div className="clinical-visits">
      <h2>Clinical Visits</h2>
      {appointments.map((appt, i) => (
        <div key={i} className="visit-card">
          <h3>{appt.doctorName}</h3>
          <span>{appt.specialty}</span>
          <p>{appt.address}</p>
        </div>
      ))}
    </div>
  );
}

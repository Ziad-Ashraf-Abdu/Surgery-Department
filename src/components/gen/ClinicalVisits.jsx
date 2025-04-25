import React from "react";

export default function ClinicalVisits({ appointments, onAppointmentClick }) {
  return (
    <div className="visit-card">
      <h3>Appointments</h3>
      {appointments.map((appt, idx) => (
        <div
          key={idx}
          className="med-facts clickable"
          onClick={() => onAppointmentClick(appt)}
        >
          <span>{appt.doctorName}</span>
          <span>{appt.specialty}</span>
        </div>
      ))}
    </div>
  );
}

import React, { useState } from "react";
import "./gen/PatientHP.css";
import { FaCalendarAlt, FaUserMd, FaCapsules } from "react-icons/fa";

import Header from "./Header";
import ProfileInfo from "./gen/ProfileInfo";
import EditModal from "./gen/EditModal";

export default function PatientHP({ user }) {
  const [photo, setPhoto] = useState(user.photo);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const schedule = [
    { time: "10:15", activity: "Exercise", type: "exercise", location: "Hospital Gym" },
    { time: "12:45", activity: "Clinic Visit", type: "appointment", doctor: "Dr. Smith" },
    { time: "13:30", activity: "OTC for migraine headache", type: "medication", pharmacy: "Main Pharmacy" },
    { time: "14:00", activity: "Lunch with Staff", type: "meal", location: "Cafeteria" },
    { time: "17:10", activity: "Full Bodycheck-up", type: "checkup", room: "Room 304" },
  ];

  const appointments = [
    {
      doctorName: "Dr. Dianne F",
      specialty: "Dentist",
      address: "1673 Old Wire Rd, 29512",
      date: "2023-04-25",
      time: "14:00"
    },
    {
      doctorName: "Dr. Paul C",
      specialty: "Neurologist",
      address: "250 Strathy Hall Rd, 77477",
      date: "2023-04-28",
      time: "10:30"
    },
  ];

  const medications = [
    {
      name: "MARPLAN",
      type: "Antidepressant",
      prescriber: "Dr. Smith",
      date: "2023-03-15",
      dosage: "10mg once daily",
      refills: 3
    },
    {
      name: "FACTIVE",
      type: "Anti-Bacterial",
      prescriber: "Dr. Johnson",
      date: "2023-03-16",
      dosage: "500mg every 12 hours",
      refills: 1
    },
  ];

  const handlePhotoChange = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result);
    reader.readAsDataURL(file);
  };

  const handleItemClick = (item, type) => setSelectedItem({ ...item, type });
  const closeDetailModal = () => setSelectedItem(null);



  return (
    <div className="patient-hp-container">
      <Header user={user} role="patient" />

      <div className="main-content">
        {/* Left column */}
        <div className="schedule-section">
          <h2><FaCalendarAlt className="heading-icon" /> Your Schedule</h2>
          {schedule.map((it, idx) => (
            <div
              key={idx}
              className="schedule-item clickable"
              onClick={() => handleItemClick(it, "schedule")}
            >
              <span>{it.time} – {it.activity}</span>
            </div>
          ))}
        </div>

        {/* Middle column */}
        <div className="group-section">
          <div className="visit-group">
            <h2><FaUserMd className="heading-icon" /> Clinical Visits</h2>
            {appointments.map((appt, idx) => (
              <div
                key={idx}
                className="visit-card clickable"
                onClick={() => handleItemClick(appt, "appointment")}
              >
                <p><strong>{appt.doctorName}</strong></p>
                <p>{appt.specialty}</p>
                <p>{appt.address}</p>
              </div>
            ))}
          </div>

          <div className="med-group">
            <h2><FaCapsules className="heading-icon" /> Medication Routine</h2>
            {medications.map((med, idx) => (
              <div
                key={idx}
                className="medication-card clickable"
                onClick={() => handleItemClick(med, "medication")}
              >
                <p><strong>{med.name}</strong></p>
                <p>{med.type}</p>
                <p>Dosage: {med.dosage}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <ProfileInfo
          photo={photo}
          name={user.name}
          onEditClick={() => setShowEditModal(true)}
          user={user}
        />
      </div>

      {showEditModal && (
        <EditModal
          photo={photo}
          onPhotoChange={handlePhotoChange}
          onClose={() => setShowEditModal(false)}
          onSave={() => setShowEditModal(false)}
        />
      )}

      {selectedItem && (
        <div className="detail-modal-overlay" onClick={closeDetailModal}>
          <div className="detail-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeDetailModal}>&times;</button>
            <h3>
              {selectedItem.type.charAt(0).toUpperCase() + selectedItem.type.slice(1)} Details
            </h3>
            <div className="modal-content">
              {selectedItem.type === "schedule" && (
                <>
                  <p><span className="detail-label">Time:</span> {selectedItem.time}</p>
                  <p><span className="detail-label">Activity:</span> {selectedItem.activity}</p>
                  {selectedItem.location && (
                    <p><span className="detail-label">Location:</span> {selectedItem.location}</p>
                  )}
                  {selectedItem.doctor && (
                    <p><span className="detail-label">Doctor:</span> {selectedItem.doctor}</p>
                  )}
                  {selectedItem.pharmacy && (
                    <p><span className="detail-label">Pharmacy:</span> {selectedItem.pharmacy}</p>
                  )}
                  {selectedItem.room && (
                    <p><span className="detail-label">Room:</span> {selectedItem.room}</p>
                  )}
                </>
              )}

              {selectedItem.type === "appointment" && (
                <>
                  <p><span className="detail-label">Doctor:</span> {selectedItem.doctorName}</p>
                  <p><span className="detail-label">Specialty:</span> {selectedItem.specialty}</p>
                  <p><span className="detail-label">Date:</span> {new Date(selectedItem.date).toLocaleDateString()}</p>
                  <p><span className="detail-label">Time:</span> {selectedItem.time}</p>
                  <p><span className="detail-label">Address:</span> {selectedItem.address}</p>
                </>
              )}

              {selectedItem.type === "medication" && (
                <>
                  <p><span className="detail-label">Medication:</span> {selectedItem.name}</p>
                  <p><span className="detail-label">Dosage:</span> {selectedItem.dosage}</p>
                  <p><span className="detail-label">Prescribed by:</span> {selectedItem.prescriber}</p>
                  <p><span className="detail-label">Refills:</span> {selectedItem.refills}</p>
                  <p><span className="detail-label">Last filled:</span> {new Date(selectedItem.date).toLocaleDateString()}</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

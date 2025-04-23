import React, { useState } from "react";
import "./PatientHP.css";

import Header from "../Header";
import Schedule from "./Schedule";
import ClinicalVisits from "./ClinicalVisits";
import MedicationRoutine from "./MedicationRoutine";
import ProfileInfo from "./ProfileInfo";
import EditModal from "./EditModal";

export default function PatientHP({ user }) {
  const [photo, setPhoto] = useState(user.photo);
  const [showEditModal, setShowEditModal] = useState(false);

  // Mock data (could be fetched or passed down)
  const schedule = [
    { time: "10:15", activity: "Exercise" },
    { time: "12:45", activity: "Clinic Visit" },
    { time: "13:30", activity: "OTC for migraine headache" },
    { time: "14:00", activity: "Lunch with Staff" },
    { time: "17:10", activity: "Full Bodycheck-up" },
  ];
  const appointments = [
    {
      doctorName: "Dr. Dianne F",
      specialty: "Dentist",
      address: "1673 Old Wire Rd, 29512",
    },
    {
      doctorName: "Dr. Paul C",
      specialty: "Neurologist",
      address: "250 Strathy Hall Rd, 77477",
    },
  ];

  const medications = [
    {
      name: "MARPLAN",
      type: "Antidepressant",
      prescriber: "Dr. Smith",
      date: "2023-03-15",
    },
    {
      name: "FACTIVE",
      type: "Anti-Bacterial",
      prescriber: "Dr. Johnson",
      date: "2023-03-16",
    },
  ];

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="patient-hp-container">
      <Header />

      <div className="main-content">
        <Schedule items={schedule} />

        <div className="clinical-section">
          <ClinicalVisits appointments={appointments} />
          <MedicationRoutine meds={medications} />
        </div>

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
    </div>
  );
}

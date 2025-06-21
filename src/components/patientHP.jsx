import React, { useState, useEffect } from "react";
import "./gen/PatientHP.css";
import { FaCalendarAlt, FaUserMd, FaCapsules, FaPlus } from "react-icons/fa";
import Header from "./Header";
import ProfileInfo from "./gen/ProfileInfo";
import EditModal from "./gen/EditModal";
import { useLocation } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from "@mui/material";
import Footer from "./gen/Footer";

export default function PatientHP() {
  const location = useLocation();
  const user = location.state?.patientUser || {};
  const API_URL = import.meta.env.VITE_API_URL; // e.g. "http://127.0.0.1:8000"

  // Photo & profile edit
  const [photo, setPhoto] = useState(user.photo);
  const [showEditModal, setShowEditModal] = useState(false);

  // Detail modal
  const [selectedItem, setSelectedItem] = useState(null);

  // Fetched data
  const [appointments, setAppointments] = useState([]);
  const [medications, setMedications] = useState([]);

  // Dialog controls
  const [openAppt, setOpenAppt] = useState(false);
  const [openMed, setOpenMed] = useState(false);

  // Form state
  const [newAppt, setNewAppt] = useState({
    doctor: "",
    date: "",
    time: "",
    address: "",
    status: ""
  });
  const [newMed, setNewMed] = useState({
    medication_name: "",
    dosage: "",
    refills: 0,
    date_recorded: ""
  });

  // Fetch on mount
  useEffect(() => {
    if (!user.id) return;

    // GET appointments for this patient
    fetch(`${API_URL}/api/appointments/?patient=${user.id}`)
        .then(res => {
          if (!res.ok) throw new Error(res.statusText);
          return res.json();
        })
        .then(data => setAppointments(data))
        .catch(err => {
          console.error("Failed to load appointments:", err);
          setAppointments([]);
        });

    // GET medical_history
    fetch(`${API_URL}/api/patients/${user.id}/medical_history/`)
        .then(res => {
          if (!res.ok) throw new Error(res.statusText);
          return res.json();
        })
        .then(setMedications)
        .catch(err => {
          console.error("Failed to load medical history:", err);
          setMedications([]);
        });
  }, [API_URL, user.id]);

  // Handlers
  const handlePhotoChange = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result);
    reader.readAsDataURL(file);
  };

  const handleItemClick = (item, type) => setSelectedItem({ ...item, type });
  const closeDetailModal = () => setSelectedItem(null);

  // Dialog open/close
  const openApptDialog = () => setOpenAppt(true);
  const closeApptDialog = () => {
    setOpenAppt(false);
    setNewAppt({ doctor: "", date: "", time: "", address: "", status: "" });
  };
  const openMedDialog = () => setOpenMed(true);
  const closeMedDialog = () => {
    setOpenMed(false);
    setNewMed({ medication_name: "", dosage: "", refills: 0, date_recorded: "" });
  };

  // POST new appointment
  const saveAppt = () => {
    const payload = {
      patient: user.id,
      doctor: Number(newAppt.doctor),
      timestamp: `${newAppt.date}T${newAppt.time}`,
      address: newAppt.address,
      status: newAppt.status
    };

    fetch(`${API_URL}/api/appointments/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
        .then(res => {
          if (!res.ok) return res.json().then(err => { throw err; });
          return res.json();
        })
        .then(appt => {
          setAppointments(a => [...a, appt]);
          closeApptDialog();
        })
        .catch(e => console.error("Appointment validation errors:", e));
  };

  // POST new medical history
  const saveMed = () => {
    const payload = {
      patient: user.id,
      medication_name: newMed.medication_name,
      dosage: newMed.dosage,
      refills: Number(newMed.refills),
      date_recorded: newMed.date_recorded
    };

    fetch(`${API_URL}/api/patients/${user.id}/medical_history/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
        .then(res => {
          if (!res.ok) return res.json().then(err => { throw err; });
          return res.json();
        })
        .then(med => {
          setMedications(m => [...m, med]);
          closeMedDialog();
        })
        .catch(e => console.error("Medical history validation errors:", e));
  };

  return (
      <>
        <div className="patient-hp-container">
          <Header user={user} role="patient" />

          <div className="main-content">
            {/* Schedule */}
            <div className="schedule-section">
              <h2>
                <FaCalendarAlt className="heading-icon" /> Your Schedule
              </h2>
              {/* If you have a real schedule endpoint, replace this */}
            </div>

            {/* Appointments & Medications */}
            <div className="group-section">
              <div className="visit-group">
                <h2>
                  <FaUserMd className="heading-icon" /> Clinical Visits
                  <FaPlus onClick={openApptDialog} className="add-icon clickable" />
                </h2>
                {appointments.map((appt, idx) => (
                    <div
                        key={idx}
                        className="visit-card clickable"
                        onClick={() => handleItemClick(appt, "appointment")}
                    >
                      <p><strong>Dr. {appt.patient_name ? appt.patient_name : appt.doctor}</strong></p>
                      <p>
                        {new Date(appt.timestamp).toLocaleDateString()} @{" "}
                        {new Date(appt.timestamp).toLocaleTimeString()}
                      </p>
                      <p>{appt.address}</p>
                      <p>Status: {appt.status}</p>
                    </div>
                ))}
              </div>

              <div className="med-group">
                <h2>
                  <FaCapsules className="heading-icon" /> Medication Routine
                  <FaPlus onClick={openMedDialog} className="add-icon clickable" />
                </h2>
                {medications.map((med, idx) => (
                    <div
                        key={idx}
                        className="medication-card clickable"
                        onClick={() => handleItemClick(med, "medication")}
                    >
                      <p><strong>{med.medication_name}</strong></p>
                      <p>Dosage: {med.dosage}</p>
                      <p>Refills: {med.refills}</p>
                      <p>Last: {new Date(med.date_recorded).toLocaleDateString()}</p>
                    </div>
                ))}
              </div>
            </div>

            {/* Profile */}
            <ProfileInfo
                photo={photo}
                name={user.name}
                onEditClick={() => setShowEditModal(true)}
                user={user}
            />
          </div>

          {/* Edit Photo Modal */}
          {showEditModal && (
              <EditModal
                  photo={photo}
                  onPhotoChange={handlePhotoChange}
                  onClose={() => setShowEditModal(false)}
                  onSave={() => setShowEditModal(false)}
              />
          )}

          {/* Detail Modal */}
          {selectedItem && (
              <div className="detail-modal-overlay" onClick={closeDetailModal}>
                <div className="detail-modal" onClick={e => e.stopPropagation()}>
                  <button className="modal-close-btn" onClick={closeDetailModal}>&times;</button>
                  <h3>
                    {selectedItem.type.charAt(0).toUpperCase() + selectedItem.type.slice(1)} Details
                  </h3>
                  <div className="modal-content">
                    {selectedItem.type === "appointment" && (
                        <>
                          <p><b>Doctor:</b> {selectedItem.patient_name || selectedItem.doctor}</p>
                          <p><b>Date & Time:</b> {new Date(selectedItem.timestamp).toLocaleString()}</p>
                          <p><b>Address:</b> {selectedItem.address}</p>
                          <p><b>Status:</b> {selectedItem.status}</p>
                        </>
                    )}
                    {selectedItem.type === "medication" && (
                        <>
                          <p><b>Medication:</b> {selectedItem.medication_name}</p>
                          <p><b>Dosage:</b> {selectedItem.dosage}</p>
                          <p><b>Refills:</b> {selectedItem.refills}</p>
                          <p><b>Last filled:</b> {new Date(selectedItem.date_recorded).toLocaleDateString()}</p>
                        </>
                    )}
                  </div>
                </div>
              </div>
          )}

          {/* Add Appointment Dialog */}
          <Dialog open={openAppt} onClose={closeApptDialog}>
            <DialogTitle>New Appointment</DialogTitle>
            <DialogContent sx={{ display: 'grid', gap: 2, width: 400 }}>
              {["doctor","date","time","address","status"].map(field => (
                  <TextField
                      key={field}
                      label={field.charAt(0).toUpperCase()+field.slice(1)}
                      name={field}
                      type={field==="date"? "date" : field==="time"? "time" : "text"}
                      value={newAppt[field]}
                      onChange={e => setNewAppt(a => ({ ...a, [field]: e.target.value }))}
                      InputLabelProps={field==="date"||field==="time"? { shrink: true } : {}}
                      fullWidth
                  />
              ))}
            </DialogContent>
            <DialogActions>
              <Button onClick={closeApptDialog}>Cancel</Button>
              <Button onClick={saveAppt}>Save</Button>
            </DialogActions>
          </Dialog>

          {/* Add Medical History Dialog */}
          <Dialog open={openMed} onClose={closeMedDialog}>
            <DialogTitle>New Medical Record</DialogTitle>
            <DialogContent sx={{ display: 'grid', gap: 2, width: 400 }}>
              {["medication_name","dosage","refills","date_recorded"].map(field => (
                  <TextField
                      key={field}
                      label={field.split("_").map(s=>s.charAt(0).toUpperCase()+s.slice(1)).join(" ")}
                      name={field}
                      type={field==="date_recorded"? "date" : (field==="refills"? "number" : "text")}
                      value={newMed[field]}
                      onChange={e => setNewMed(m => ({ ...m, [field]: e.target.value }))}
                      InputLabelProps={field==="date_recorded"? { shrink: true } : {}}
                      fullWidth
                  />
              ))}
            </DialogContent>
            <DialogActions>
              <Button onClick={closeMedDialog}>Cancel</Button>
              <Button onClick={saveMed}>Save</Button>
            </DialogActions>
          </Dialog>
        </div>
        <Footer />
      </>
  );
}

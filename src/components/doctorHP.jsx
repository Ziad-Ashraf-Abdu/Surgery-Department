// src/components/DoctorHP.jsx
import React, { useState } from "react";
import "./gen/doctorHP.css";
import ProfileHeader from "./Header";
import DoctorProfile from "./gen/ProfileInfo";
import Panel from "./gen/Panel";
import { useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import sampleData from "../data/sampleData";

export default function DoctorHP() {
  const location = useLocation();
  const apiUser = location.state?.doctorUser || {};

  // Deep merge API data with sample data
  const user = {
    // Basic info
    ...sampleData.doctorUser,
    ...apiUser,

    // Array properties with fallback
    todaySchedule: apiUser.todaySchedule?.length ? apiUser.todaySchedule : sampleData.doctorUser.todaySchedule,
    surgeriesThisWeek: apiUser.surgeriesThisWeek?.length ? apiUser.surgeriesThisWeek : sampleData.doctorUser.surgeriesThisWeek,
    onCallSchedule: apiUser.onCallSchedule?.length ? apiUser.onCallSchedule : sampleData.doctorUser.onCallSchedule,
    notifications: apiUser.notifications?.length ? apiUser.notifications : sampleData.doctorUser.notifications,

    // Metrics with nullish coalescing
    patientCount: apiUser.patientCount ?? sampleData.doctorUser.patientCount,
    avgWaitTime: apiUser.avgWaitTime ?? sampleData.doctorUser.avgWaitTime,
    satisfactionScore: apiUser.satisfactionScore ?? sampleData.doctorUser.satisfactionScore
  };

  const [activeTab, setActiveTab] = useState("Dashboard");
  const [selectedNotification, setSelectedNotification] = useState(null);

  const actions = [
    { name: "schedule", label: "View Schedule", icon: "📅" },
    { name: "patients", label: "View Patients", icon: "👤" },
    { name: "settings", label: "Settings", icon: "⚙️" },
  ];

  const metricsItems = [
    { label: "Total Patients", value: user.patientCount, icon: "🩺" },
    { label: "Avg. Wait Time", value: `${user.avgWaitTime} mins`, icon: "⏱️" },
    { label: "Satisfaction", value: `${user.satisfactionScore}/5`, icon: "⭐" },
  ];

  const formatDateTime = (dateString, timeString) => {
    const date = new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
    const time = new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    });
    return `${date} · ${time}`;
  };

  const handleNotificationClick = (notificationText) => {
    setSelectedNotification({
      message: notificationText,
      timestamp: new Date().toLocaleString(),
      priority: "High"
    });
  };

  const closeNotificationModal = () => {
    setSelectedNotification(null);
  };

  return (
    <div className="doctor-hp-container">
      <ProfileHeader
        user={user}
        role="doctor"
        activeTab={activeTab}
        onTabChange={setActiveTab}
        actions={actions}
        onAction={name => console.log("Doctor action:", name)}
      />

      {selectedNotification && (
        <div className="notification-modal-overlay" onClick={closeNotificationModal}>
          <div className="notification-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeNotificationModal}>
              &times;
            </button>
            <h3>Notification Details</h3>
            <div className="modal-content">
              <p><strong>Message:</strong> {selectedNotification.message}</p>
              <p><strong>Received:</strong> {selectedNotification.timestamp}</p>
              <p><strong>Priority:</strong> <span className="priority-tag">{selectedNotification.priority}</span></p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Dashboard" && (
        <div className="main-grid">
          <DoctorProfile />

          <div className="panel-group">
            <Panel
              title="Today’s Schedule"
              items={user.todaySchedule}
              className="schedule-list"
              renderItem={it => (
                <>
                  <span className="time-badge">🕒 {it.time}</span>
                  <span className="patient-name">{it.patient}</span>
                  <span className={`status-indicator ${it.type?.replace(' ', '-')}`}>●</span>
                </>
              )}
            />

            <Panel
              title="Surgeries This Week"
              items={user.surgeriesThisWeek}
              className="surgery-list"
              renderItem={s => (
                <>
                  <div className="surgery-time">
                    <span className="icon">🏥</span>
                    {formatDateTime(s.date, s.time)}
                  </div>
                  <div className="surgery-details">
                    <span className="procedure">{s.procedure}</span>
                    <span className="room-tag">OR {s.room}</span>
                    {s.patient && <span className="surgery-patient">{s.patient}</span>}
                  </div>
                </>
              )}
            />

            <Panel
              title="Patients & Metrics"
              items={metricsItems}
              className="metrics-list"
              renderItem={m => (
                <div className="metric-item">
                  <span className="metric-icon">{m.icon}</span>
                  <div className="metric-info">
                    <span className="metric-label">{m.label}</span>
                    <span className="metric-value">{m.value}</span>
                  </div>
                </div>
              )}
            />

            <Panel
              title="On-Call Schedule"
              items={user.onCallSchedule}
              className="oncall-list"
              renderItem={o => (
                <>
                  <span className={`date-pill ${o.urgent ? 'urgent' : ''}`}>{o.date}</span>
                  <span className="shift-details">{o.shift}</span>
                  <span className="urgency-indicator">{o.urgent ? "🚨" : "🟢"}</span>
                </>
              )}
            />

            <Panel
              title="Notifications"
              items={user.notifications}
              className="notifications-list"
              renderItem={n => (
                <div
                  className="notification-item"
                  onClick={() => handleNotificationClick(n)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => e.key === 'Enter' && handleNotificationClick(n)}
                >
                  <span className="alert-icon">⚠️</span>
                  <span className="notification-text">{n}</span>
                </div>
              )}
            />
          </div>
        </div>
      )}

      {activeTab === "Patients" && (
        <div className="doctor-card">
          <h3>All Patients</h3>
          <p>(Implement your patients list here…)</p>
        </div>
      )}

      {activeTab === "Messages" && (
        <div className="doctor-card">
          <h3>Messages</h3>
          <p>(Implement your messaging UI here…)</p>
        </div>
      )}
    </div>
  );
}

DoctorHP.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      doctorUser: PropTypes.object
    })
  })
};
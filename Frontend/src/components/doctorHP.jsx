import React, { useEffect, useState } from "react";
import "./gen/doctorHP.css";
import ProfileHeader from "./Header";
import DoctorProfile from "./gen/ProfileInfo";
import Panel from "./gen/Panel";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import Footer from "./gen/Footer";

export default function DoctorHP() {
    const API_URL = import.meta.env.VITE_API_URL;
    const location = useLocation();
    const apiUser = location.state?.doctorUser || {};

    const [todaySchedule, setTodaySchedule] = useState([]);
    const [surgeriesThisWeek, setSurgeriesThisWeek] = useState([]);

    useEffect(() => {
        if (!apiUser.id) return;

        // Fetch Appointments
        fetch(`${API_URL}/api/appointments/?doctor=${apiUser.id}`)
            .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
            .then(appts => {
                const today = new Date().toISOString().slice(0, 10);
                setTodaySchedule(
                    appts
                        .filter(a => a.timestamp?.slice(0, 10) === today)
                        .map(a => ({
                            time: new Date(a.timestamp).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            }),
                            patient: a.patient_name || "Unknown",
                            location: a.address || "Not Specified",
                            status: a.status || "Pending",
                        }))
                );
            })
            .catch(err => {
                console.error("Error fetching appointments:", err);
                setTodaySchedule([]);
            });

        // Fetch Surgeries
        fetch(`${API_URL}/api/surgeries/?doctor=${apiUser.id}`)
            .then(async res => {
                const text = await res.text();
                let data;
                try {
                    data = JSON.parse(text);
                } catch {
                    throw new Error(`Non-JSON response: ${text}`);
                }

                if (!res.ok) {
                    const err = new Error(`HTTP ${res.status}: ${data.detail || text}`);
                    err.status = res.status;
                    err.body = data;
                    throw err;
                }

                return data;
            })
            .then(surgs => {
                const now = new Date();
                const weekLater = new Date(now);
                weekLater.setDate(now.getDate() + 7);

                setSurgeriesThisWeek(
                    surgs
                        .filter(s => {
                            const dt = new Date(s.scheduled_at);
                            return dt >= now && dt <= weekLater;
                        })
                        .map(s => ({
                            date: new Date(s.scheduled_at).toLocaleDateString(),
                            time: new Date(s.scheduled_at).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            }),
                            procedure: s.procedure || "Unspecified",
                            room: s.room || "TBD",
                            patient: s.patient_name || "Unknown",
                        }))
                );
            })
            .catch(err => {
                console.error("Error fetching surgeries:", err);
                if (err.body && err.body.traceback) {
                    console.error("Traceback from server:\n", err.body.traceback);
                }
                setSurgeriesThisWeek([]);
            });
    }, [API_URL, apiUser.id]);

    const [activeTab, setActiveTab] = useState("Dashboard");
    const [selNotif, setSelNotif] = useState(null);

    // Dummy values
    const defaultMetrics = [
        { label: "Total Patients", value: apiUser.patientCount ?? 42, icon: "🩺" },
        { label: "Avg. Wait Time", value: `${apiUser.avgWaitTime ?? 15} mins`, icon: "⏱️" },
        { label: "Satisfaction", value: `${apiUser.satisfactionScore ?? 4.6}/5`, icon: "⭐" },
    ];

    const defaultNotifs = apiUser.notifications?.length
        ? apiUser.notifications
        : ["Your profile has been updated.", "New policy available for review."];

    const handleNotifClick = msg =>
        setSelNotif({
            message: msg,
            timestamp: new Date().toLocaleString(),
            priority: "High",
        });

    const closeNotif = () => setSelNotif(null);

    return (
        <>
            <div className="doctor-hp-container">
                <ProfileHeader
                    user={apiUser}
                    role="doctor"
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    actions={[
                        { name: "schedule", label: "View Schedule", icon: "📅" },
                        { name: "patients", label: "View Patients", icon: "👤" },
                        { name: "settings", label: "Settings", icon: "⚙️" },
                    ]}
                    onAction={name => console.log("Action:", name)}
                />

                {selNotif && (
                    <div className="notification-modal-overlay" onClick={closeNotif}>
                        <div className="notification-modal" onClick={e => e.stopPropagation()}>
                            <button className="modal-close-btn" onClick={closeNotif}>
                                &times;
                            </button>
                            <h3>Notification Details</h3>
                            <div className="modal-content">
                                <p><strong>Message:</strong> {selNotif.message}</p>
                                <p><strong>Received:</strong> {selNotif.timestamp}</p>
                                <p><strong>Priority:</strong> {selNotif.priority}</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "Dashboard" && (
                    <div className="main-grid">
                        <DoctorProfile user={apiUser} />

                        <div className="panel-group">
                            {/* Clinical Visits Panel */}
                            <Panel
                                title="Today’s Clinical Visits"
                                items={todaySchedule}
                                className="schedule-list"
                                emptyMessage="No clinical visits scheduled for today."
                                renderItem={it => (
                                    <>
                                        <span className="time-badge">🕒 {it.time}</span>
                                        <span className="patient-name">{it.patient}</span>
                                        <span className="room-tag">{it.location}</span>
                                        <span className={`status-indicator ${it.status.toLowerCase()}`}>
                        {it.status}
                      </span>
                                    </>
                                )}
                            />

                            {/* Surgeries Panel */}
                            <Panel
                                title={`Surgeries This Week (${surgeriesThisWeek.length})`}
                                items={surgeriesThisWeek}
                                className="surgery-list"
                                emptyMessage="No surgeries scheduled for this week."
                                renderItem={s => (
                                    <>
                                        <span className="surgery-date">{s.date}</span>
                                        <span className="surgery-time">@ {s.time}</span>
                                        <span className="surgery-proc">{s.procedure}</span>
                                        <span className="surgery-room">OR {s.room}</span>
                                        <span className="surgery-patient">{s.patient}</span>
                                    </>
                                )}
                            />

                            {/* Metrics Panel */}
                            <Panel
                                title="Patients & Metrics"
                                items={defaultMetrics}
                                className="metrics-list"
                                emptyMessage="No metrics available at the moment."
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

                            {/* Notifications Panel */}
                            <Panel
                                title="Notifications"
                                items={defaultNotifs}
                                className="notifications-list"
                                emptyMessage="No notifications."
                                renderItem={n => (
                                    <div
                                        className="notification-item"
                                        onClick={() => handleNotifClick(n)}
                                        role="button"
                                        tabIndex={0}
                                        onKeyPress={e => e.key === "Enter" && handleNotifClick(n)}
                                    >
                                        <span className="alert-icon">⚠️</span>
                                        <span className="notification-text">{n}</span>
                                    </div>
                                )}
                            />
                        </div>
                    </div>
                )}

                {activeTab === "patients" && (
                    <div className="doctor-card">
                        <h3>All Patients</h3>
                        <p>Patient list coming soon...</p>
                    </div>
                )}

                {activeTab === "settings" && (
                    <div className="doctor-card">
                        <h3>Settings</h3>
                        <p>Settings UI coming soon...</p>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}

DoctorHP.propTypes = {
    location: PropTypes.shape({
        state: PropTypes.shape({
            doctorUser: PropTypes.object.isRequired,
        }),
    }),
};

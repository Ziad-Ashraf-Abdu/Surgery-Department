import React, { useState } from "react";

export default function DoctorHP({ user }) {
  const [photo, setPhoto] = useState(user.photo);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Top bar summary */}
      <header className="flex justify-between items-center mb-6">
        <div className="space-x-4 text-gray-700">
          <span className="font-semibold">Dr. {user.name}</span>
          <span>ID: {user.id}</span>
          <span>{user.specialization}</span>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
            {user.department}
          </span>
        </div>
        <div className="space-x-2">
          <button className="px-3 py-1 bg-white border rounded shadow-sm hover:bg-gray-100">
            View Schedule
          </button>
          <button className="px-3 py-1 bg-white border rounded shadow-sm hover:bg-gray-100">
            View Patients
          </button>
          <button className="px-3 py-1 bg-white border rounded shadow-sm hover:bg-gray-100">
            Settings
          </button>
        </div>
      </header>

      {/* Tabs */}
      <nav className="mb-6">
        <ul className="flex space-x-4 border-b">
          <li className="pb-2 border-b-2 border-green-600 font-medium">
            Dashboard
          </li>
          <li className="pb-2 text-gray-500 hover:text-gray-700 cursor-pointer">
            Patients
          </li>
          <li className="pb-2 text-gray-500 hover:text-gray-700 cursor-pointer">
            Messages
          </li>
        </ul>
      </nav>

      {/* Dashboard pane */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow flex items-start space-x-6">
          <div className="relative">
            <img
              src={photo}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-2 border-green-500"
            />
            <label className="absolute bottom-0 right-0 bg-green-600 text-white rounded-full p-2 cursor-pointer hover:bg-green-700">
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536M9.036 11.732l3.536 3.536m3.536-3.536L9.036 8.196M4 20h16"
                />
              </svg>
            </label>
          </div>
          <ul className="space-y-1 text-gray-700">
            <li>
              <strong>Email:</strong> {user.contact.email}
            </li>
            <li>
              <strong>Phone:</strong> {user.contact.phone}
            </li>
            <li>
              <strong>Office:</strong> {user.contact.office}
            </li>
          </ul>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Today’s Schedule
            </h3>
            <ul className="space-y-1 text-gray-700">
              {user.todaySchedule.map((item, i) => (
                <li key={i} className="flex justify-between">
                  <span>{item.time}</span>
                  <span>{item.patient}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Notifications
            </h3>
            <ul className="list-disc list-inside text-gray-700">
              {user.notifications.map((note, i) => (
                <li key={i}>{note}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Active Patients
            </h3>
            <p className="text-gray-700">{user.patientCount} patients</p>
          </div>
        </div>
      </div>
    </div>
  );
}

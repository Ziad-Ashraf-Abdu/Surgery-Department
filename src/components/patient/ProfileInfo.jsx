import React, { useState } from "react";

export default function ProfileInfo({ photo, name, onEditClick, user }) {
  const [showDetails, setShowDetails] = useState(false);

  const handleToggleDetails = () => {
    setShowDetails((prev) => !prev);
    onEditClick(); // still allow modal on click, or remove this line if not needed
  };

  return (
    <div className="profile-info">
      <div className="profile-summary" onClick={handleToggleDetails}>
        <img src={photo} alt="Profile" className="profile-image" />
        <div>
          <h2 className="patient-name">{name}</h2>
        </div>
      </div>

      {
        <div className="personal-details">
          <h3>Personal Info</h3>
          <p>
            <strong>Age:</strong> {user.age}
          </p>
          <p>
            <strong>Gender:</strong> {user.gender}
          </p>
          <p>
            <strong>DOB:</strong> {user.dob}
          </p>
          <p>
            <strong>Blood Group:</strong> {user.bloodGroup}
          </p>
          <p>
            <strong>Referred By:</strong> {user.referredBy}
          </p>
        </div>
      }

      <div className="checkup-banner">
        <span>Your check-up is coming soon!</span>
      </div>
    </div>
  );
}

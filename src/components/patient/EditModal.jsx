import React from "react";

export default function EditModal({ photo, onPhotoChange, onClose, onSave }) {
  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal">
        <h2>Edit Patient Details</h2>
        <div className="modal-photo-section">
          <img src={photo} alt="Profile" className="modal-profile-image" />
          <label className="photo-upload-label">
            <input
              type="file"
              accept="image/*"
              onChange={onPhotoChange}
              className="hidden-input"
            />
            Choose Photo
          </label>
        </div>
        <form
          className="patient-edit-form"
          onSubmit={(e) => {
            e.preventDefault();
            onSave();
          }}
        >
          {/* other form fields */}
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-button">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

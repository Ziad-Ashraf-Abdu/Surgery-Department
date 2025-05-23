// src/components/ProfileHeader.jsx
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import ProfileCompletionIndicator from './gen/ProfileCompletionIndicator';
import { getTabIcon, calculateAge, calculateCompletion } from './gen/helperFunctions';
import './gen/doctorHP.css';

// Vite env vars for Cloudinary
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

// configure your API base URL
axios.defaults.baseURL = `${import.meta.env.VITE_API_URL}/api`;

// Default fallback image for profiles
const DEFAULT_PROFILE_IMAGE = '/static/images/default_profile.png';

export default function ProfileHeader({
                                        user,
                                        role,            // 'doctor' or 'patient'
                                        tabs = [],
                                        activeTab,
                                        onTabChange = () => {},
                                        actions = [],
                                        onAction = () => {},
                                        onUserUpdate = () => {}
                                      }) {
  // Normalize incoming user props
  const normalized = useMemo(() => {
    if (!user) return {};
    const photoUrl = user.photo_url || DEFAULT_PROFILE_IMAGE;
    if (role === 'patient') {
      return {
        id: user.id,
        name: user.name || '',
        photo: photoUrl,
        gender: user.gender || '',
        dob: user.dob || '',
        age: calculateAge(user.dob),
        bloodGroup: user.blood_type || '',
        referredBy: user.referred_by_name || '',
        contact: {
          primaryMobile: user.primary_mobile_no || '',
          secondaryMobile: user.secondry_mobile_no || '',
          email: user.email || '',
          address: user.address || ''
        }
      };
    } else {
      return {
        id: user.id,
        name: user.name || '',
        photo: photoUrl,
        specialization: user.specialization || '',
        department: user.department || '',
        contact: {
          email: user.email || '',
          phone: user.primary_mobile_no || '',
          office: user.office || ''
        },
        yearsExperience: user.years_experience || '',
        credentials: user.credentials || [],
        certifications: user.certifications || [],
        affiliations: user.affiliations || []
      };
    }
  }, [user, role]);

  // Compute completion percentage
  const completionPercentage = calculateCompletion(normalized);

  // Local state
  const [photo, setPhoto] = useState(normalized.photo);
  const [photoUrl, setPhotoUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [edited, setEdited] = useState({ ...normalized });

  // Reset state when modal opens or user data changes
  useEffect(() => {
    if (showModal) {
      setEdited({ ...normalized });
      setPhoto(normalized.photo);
      setPhotoUrl('');
      setIsEditing(false);
      setUploading(false);
    }
  }, [showModal, normalized]);

  const toggleModal = () => setShowModal(v => !v);

  // Photo upload handler
  const handlePhotoChangeModal = async e => {
    const file = e.target.files[0];
    if (!file) return;

    // Local preview
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result);
    reader.readAsDataURL(file);

    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
      alert('Cloudinary configuration is missing.');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
          formData
      );
      const secureUrl = res.data.secure_url;
      setPhoto(secureUrl);
      setPhotoUrl(secureUrl);
      setEdited(ed => ({ ...ed, photo: secureUrl }));
    } catch (err) {
      console.error('Cloudinary upload failed:', err);
      alert('Image upload failed. Please check your Cloudinary settings.');
    } finally {
      setUploading(false);
    }
  };

  // Nested field updater
  const handleFieldChange = (path, value) => {
    setEdited(prev => {
      const copy = { ...prev };
      const keys = path.split('.');
      let obj = copy;
      for (let i = 0; i < keys.length - 1; i++) {
        obj[keys[i]] = { ...obj[keys[i]] };
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return copy;
    });
  };

  // Save changes
  const saveChanges = async () => {
    if (uploading) {
      alert('Please wait for the image to finish uploading.');
      return;
    }

    const endpoint =
        role === 'doctor'
            ? `/doctors/${normalized.id}/`
            : `/patients/${normalized.id}/`;

    // Build the raw, snake_case payload
    let raw;
    if (role === 'patient') {
      const {
        name,
        gender,
        dob,
        bloodGroup,
        referredBy,
        photo: editedPhoto
      } = edited;
      const {
        primaryMobile,
        secondaryMobile,
        email,
        address
      } = edited.contact;

      raw = {
        name,
        photo_url: editedPhoto ?? normalized.photo,
        gender,
        dob,
        primary_mobile_no: primaryMobile,
        secondry_mobile_no: secondaryMobile,
        email,
        address,
        blood_type: bloodGroup,
        referred_by: referredBy
      };
    } else {
      const {
        name,
        specialization,
        department,
        yearsExperience,
        photo: editedPhoto
      } = edited;
      const {
        email,
        phone,
        office
      } = edited.contact;

      raw = {
        name,
        photo_url: editedPhoto ?? normalized.photo,
        specialization,
        department,
        primary_mobile_no: phone,
        email,
        office,
        years_experience: yearsExperience,
        credentials: edited.credentials,
        certifications: edited.certifications,
        affiliations: edited.affiliations
      };
    }

    // Strip out undefined or empty-string fields
    const payload = {};
    Object.entries(raw).forEach(([key, val]) => {
      if (val !== undefined && val !== '') {
        payload[key] = val;
      }
    });

    try {
      const response = await axios.patch(endpoint, payload, {
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
      });
      onUserUpdate(response.data);
      setIsEditing(false);
      setShowModal(false);
      alert('Profile updated successfully!');
    } catch (error) {
      if (error.response) {
        console.error(`API ${error.response.status} —`, error.response.data);
        alert('Update failed: ' + JSON.stringify(error.response.data, null, 2));
      } else {
        console.error('Network or unexpected error:', error);
        alert('Failed to update profile. Please try again.');
      }
    }
  };

  if (!user) return null;

  // Determine which URL to show (fallback if needed)
  const effectivePhoto = photo || photoUrl || DEFAULT_PROFILE_IMAGE;

  const handleSignOut = () => {
    // Clearing authentication tokens
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');

    // Clearing session history and prevent back navigation
    window.history.replaceState(null, null, '/');

    // Forcing a hard redirect to login page
    window.location.replace('/');

    // Clearing cache for extra security
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => caches.delete(name));
      });
    }
  };

  return (
      <header className="doctor-header-container">
        {/* Floating Reminder */}
        {completionPercentage < 100 && (
            <div className="floating-reminder">
              <span className="reminder-icon">⚠️</span>
              <strong>Profile Completion:</strong>
              <span className="percentage">{completionPercentage}%</span>
              <button onClick={toggleModal} className="update-btn">
                Complete Profile
              </button>
            </div>
        )}

        {/* Row 1: Profile picture & name */}
        <div
            className="flex items-center cursor-pointer mb-4"
            onClick={toggleModal}
        >
          <ProfileCompletionIndicator
              percentage={completionPercentage}
              photoUrl={effectivePhoto}
          />
          <div className="ml-4 profile-details">
            <h2 className="profile-name">
              {role === 'doctor' ? `Dr. ${edited.name ?? ''}` : edited.name ?? ''}
            </h2>
            <p className="profile-info">ID: {normalized.id}</p>
          </div>
        </div>

        {/* Action Buttons - Always rendered */}
        <div className="action-buttons">
          {/* Conditional action buttons */}
          {actions.length > 0 && actions.map(a => (
              <button
                  key={a.name}
                  className="btn btn-secondary"
                  onClick={() => onAction(a.name)}
              >
                {a.label}
              </button>
          ))}


        </div>

        {/* Navigation Tabs */}
        {tabs.length > 0 && (
            <nav className="navigation-tabs">
              <ul className="tab-list">
                {tabs.map(tab => (
                    <li
                        key={tab}
                        onClick={() => onTabChange(tab)}
                        className={`tab-item ${activeTab === tab ? 'active' : ''}`}
                    >
                      <span className="tab-icon">{getTabIcon(tab)}</span>
                      {tab}
                    </li>
                ))}
              </ul>
            </nav>
        )}

        {/* Edit Modal */}
        {showModal && (
            <div className="edit-modal-overlay" onClick={toggleModal}>
              <div className="edit-modal" onClick={e => e.stopPropagation()}>
                {/* Modal Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                          src={effectivePhoto}
                          alt="Profile"
                          className="profile-img"
                      />

                      {isEditing && (
                          <label className="absolute bottom-0 right-0 bg-green-600 text-white rounded-full p-2 cursor-pointer">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoChangeModal}
                                className="hidden"
                            />
                          </label>
                      )}

                      {uploading && (
                          <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                            Uploading…
                          </div>
                      )}
                    </div>

                    <div>
                      {isEditing ? (
                          <input
                              type="text"
                              value={edited.name ?? ''}
                              onChange={e => handleFieldChange('name', e.target.value)}
                              className="border-b border-gray-400 focus:outline-none text-xl font-semibold"
                          />
                      ) : (
                          <h3 className="text-xl font-semibold">
                            {role === 'doctor'
                                ? `Dr. ${edited.name ?? ''}`
                                : edited.name ?? ''}
                          </h3>
                      )}
                    </div>
                  </div>
                  <div>

                    {!isEditing ? (
                        <div className="flex gap-2">
                          <button
                              onClick={() => setIsEditing(true)}
                              className="btn btn-primary mr-2 text-sm"
                          >
                            Edit
                          </button>
                          <button
                              onClick={handleSignOut}
                              className="btn btn-signout text-sm"
                          >
                            Sign Out
                          </button>
                        </div>
                    ) : (
                        <>
                          <button
                              onClick={saveChanges}
                              disabled={uploading}
                              className="btn btn-primary mr-2 text-sm"
                          >
                            Save
                          </button>
                          <button
                              onClick={() => setIsEditing(false)}
                              className="btn btn-secondary text-sm"
                          >
                            Cancel
                          </button>
                        </>
                    )}
                  </div>
                </div>

                {/* Modal Body */}
                {role === 'patient' ? (
                    <>
                      <h4 className="font-semibold mt-2">Personal Info</h4>
                      <div className="space-y-2">
                        {['age', 'gender', 'dob', 'bloodGroup', 'referredBy'].map(
                            field => (
                                <div key={field}>
                                  <strong>
                                    {field.charAt(0).toUpperCase() + field.slice(1)}:
                                  </strong>{' '}
                                  {isEditing ? (
                                      <input
                                          type="text"
                                          value={edited[field] ?? ''}
                                          onChange={e =>
                                              handleFieldChange(field, e.target.value)
                                          }
                                          className="border-b border-gray-400 focus:outline-none"
                                      />
                                  ) : (
                                      normalized[field]
                                  )}
                                </div>
                            )
                        )}
                      </div>

                      <h4 className="font-semibold mt-4">Contact Info</h4>
                      <div className="space-y-2">
                        {Object.entries(normalized.contact).map(([k, v]) => (
                            <div key={k}>
                              <strong>{k.replace(/([A-Z])/g, ' $1')}:</strong>{' '}
                              {isEditing ? (
                                  <input
                                      type="text"
                                      value={edited.contact[k] ?? ''}
                                      onChange={e =>
                                          handleFieldChange(`contact.${k}`, e.target.value)
                                      }
                                      className="border-b border-gray-400 focus:outline-none"
                                  />
                              ) : (
                                  v
                              )}
                            </div>
                        ))}
                      </div>
                    </>
                ) : (
                    <>
                      <h4 className="font-semibold mt-2">Professional Info</h4>
                      <div className="space-y-2">
                        {['email', 'phone', 'office'].map(k => (
                            <div key={k}>
                              <strong>{k.charAt(0).toUpperCase() + k.slice(1)}:</strong>{' '}
                              {isEditing ? (
                                  <input
                                      type="text"
                                      value={edited.contact[k] ?? ''}
                                      onChange={e =>
                                          handleFieldChange(`contact.${k}`, e.target.value)
                                      }
                                      className="border-b border-gray-400 focus:outline-none"
                                  />
                              ) : (
                                  normalized.contact[k]
                              )}
                            </div>
                        ))}
                        <div>
                          <strong>Experience:</strong>{' '}
                          {isEditing ? (
                              <input
                                  type="number"
                                  value={edited.yearsExperience ?? ''}
                                  onChange={e =>
                                      handleFieldChange('yearsExperience', e.target.value)
                                  }
                                  className="border-b border-gray-400 focus:outline-none"
                              />
                          ) : (
                              `${normalized.yearsExperience} years`
                          )}
                        </div>
                        <div>
                          <strong>Credentials:</strong>{' '}
                          {isEditing ? (
                              <input
                                  type="text"
                                  value={edited.credentials.join(', ')}
                                  onChange={e =>
                                      handleFieldChange(
                                          'credentials',
                                          e.target.value.split(',').map(s => s.trim())
                                      )
                                  }
                                  className="border-b border-gray-400 focus:outline-none"
                              />
                          ) : (
                              normalized.credentials.join(', ')
                          )}
                        </div>
                      </div>
                    </>
                )}
              </div>
            </div>
        )}
      </header>
  );
}

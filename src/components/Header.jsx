// src/components/ProfileHeader.jsx
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import './gen/doctorHP.css';

// Vite env vars for Cloudinary
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

// configure your API base URL
axios.defaults.baseURL = 'http://127.0.0.1:8000/api';

// Helper to calculate age from DOB (YYYY-MM-DD)
const calculateAge = dob => {
  if (!dob) return '';
  const birth = new Date(dob);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

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
    if (role === 'patient') {
      return {
        id: user.id,
        name: user.name,
        photo: user.photo_url,
        gender: user.gender,
        dob: user.dob,
        age: calculateAge(user.dob),
        bloodGroup: user.blood_type,
        referredBy: user.referred_by_name || '',
        contact: {
          primaryMobile: user.primary_mobile_no,
          secondaryMobile: user.secondry_mobile_no,
          email: user.email,
          address: user.address
        }
      };
    } else {
      // doctor
      return {
        id: user.id,
        name: user.name,
        photo: user.photo_url,
        specialization: user.specialization || '',
        department: user.department || '',
        contact: {
          email: user.email,
          phone: user.primary_mobile_no,
          office: user.office || ''
        },
        yearsExperience: user.years_experience || '',
        credentials: user.credentials || [],
        certifications: user.certifications || [],
        affiliations: user.affiliations || []
      };
    }
  }, [user, role]);

  // Local state
  const [photo, setPhoto] = useState(normalized.photo);
  const [photoUrl, setPhotoUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [edited, setEdited] = useState({ ...normalized });

  // Reset when opening modal or user changes
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

  // Handle file → local preview → Cloudinary upload
  const handlePhotoChangeModal = async e => {
    const file = e.target.files[0];
    if (!file) return;

    // local preview
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result);
    reader.readAsDataURL(file);

    // upload to Cloudinary
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

  // Handle manual URL input (if you allow it)
  const handleUrlChange = e => {
    const url = e.target.value;
    setPhotoUrl(url);
    setEdited(ed => ({ ...ed, photo: url }));
  };

  // Generic nested field updater
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

  // Save: remap photo → photo_url, then PATCH
  const saveChanges = async () => {
    if (uploading) {
      alert('Please wait for the image to finish uploading.');
      return;
    }

    const endpoint =
        role === 'doctor'
            ? `/doctors/${normalized.id}/`
            : `/patients/${normalized.id}/`;

    // Build payload and remap
    const payload = { ...edited };
    if (payload.photo) {
      payload.photo_url = payload.photo;
      delete payload.photo;
    }

    try {
      const response = await axios.patch(endpoint, payload);
      onUserUpdate(response.data);
      setIsEditing(false);
      setShowModal(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  if (!user) return null;

  return (
      <header className="doctor-header-container">
        {/* Main Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="profile-section cursor-pointer" onClick={toggleModal}>
            <img src={photo || photoUrl} alt="Profile" className="profile-img" />
            <div className="profile-details">
              <h2 className="text-xl font-semibold">
                {role === 'doctor' ? `Dr. ${edited.name}` : edited.name}
              </h2>
              <p className="text-sm">
                ID: {normalized.id}
                {role === 'doctor' && normalized.specialization && ` • ${normalized.specialization}`}
              </p>
            </div>
          </div>
          {actions.length > 0 && (
              <div className="space-x-2">
                {actions.map(a => (
                    <button
                        key={a.name}
                        className="btn btn-secondary"
                        onClick={() => onAction(a.name)}
                    >
                      {a.label}
                    </button>
                ))}
              </div>
          )}
        </div>

        {/* Tabs */}
        {tabs.length > 0 && (
            <nav className="mb-6">
              <ul className="flex space-x-4 border-b">
                {tabs.map(tab => (
                    <li
                        key={tab}
                        onClick={() => onTabChange(tab)}
                        className={`pb-2 cursor-pointer ${
                            activeTab === tab
                                ? 'border-b-2 border-green-600 font-medium text-gray-800'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
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
                      <img src={photo || photoUrl} alt="Profile" className="profile-img" />

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
                              value={edited.name}
                              onChange={e => handleFieldChange('name', e.target.value)}
                              className="border-b border-gray-400 focus:outline-none text-xl font-semibold"
                          />
                      ) : (
                          <h3 className="text-xl font-semibold">
                            {role === 'doctor' ? `Dr. ${edited.name}` : edited.name}
                          </h3>
                      )}
                    </div>
                  </div>
                  <div>
                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="btn btn-primary mr-2 text-sm"
                        >
                          Edit
                        </button>
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
                        {['age', 'gender', 'dob', 'bloodGroup', 'referredBy'].map(field => (
                            <div key={field}>
                              <strong>
                                {field.charAt(0).toUpperCase() + field.slice(1)}:
                              </strong>{' '}
                              {isEditing ? (
                                  <input
                                      type="text"
                                      value={edited[field]}
                                      onChange={e => handleFieldChange(field, e.target.value)}
                                      className="border-b border-gray-400 focus:outline-none"
                                  />
                              ) : (
                                  normalized[field]
                              )}
                            </div>
                        ))}
                      </div>

                      <h4 className="font-semibold mt-4">Contact Info</h4>
                      <div className="space-y-2">
                        {Object.entries(normalized.contact).map(([k, v]) => (
                            <div key={k}>
                              <strong>{k.replace(/([A-Z])/g, ' $1')}:</strong>{' '}
                              {isEditing ? (
                                  <input
                                      type="text"
                                      value={edited.contact[k]}
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
                              <strong>
                                {k.charAt(0).toUpperCase() + k.slice(1)}:
                              </strong>{' '}
                              {isEditing ? (
                                  <input
                                      type="text"
                                      value={edited.contact[k]}
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
                                  value={edited.yearsExperience}
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

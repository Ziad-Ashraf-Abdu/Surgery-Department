// src/components/ProfileHeader.jsx
import React, { useState, useEffect } from 'react';
import './gen/doctorHP.css';

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
  const [photo, setPhoto] = useState(user.photo);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [edited, setEdited] = useState({ ...user });

  // sync whenever user or modal opens
  useEffect(() => {
    if (showModal) {
      setEdited({ ...user });
      setPhoto(user.photo);
      setIsEditing(false);
    }
  }, [showModal, user]);

  const toggleModal = () => setShowModal(v => !v);

  const handlePhotoChangeModal = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(reader.result);
      setEdited(ed => ({ ...ed, photo: reader.result }));
    };
    reader.readAsDataURL(file);
  };

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

  const saveChanges = () => {
    onUserUpdate(edited);
    setIsEditing(false);
    setShowModal(false);
  };

  return (
    <header className="doctor-header-container">
      {/* Top bar */}
      <div className="flex justify-between items-center mb-6">
        {/* Profile pic & name/ID on one line */}
        <div
          className="profile-section cursor-pointer"
          onClick={toggleModal}
        >
          <img src={photo} alt="Profile" className="profile-img" />
          <div className="profile-details">
            <h2 className="text-xl font-semibold">
              {role === 'doctor' ? `Dr. ${edited.name}` : edited.name}
            </h2>
            <p className="text-sm">
              ID: {user.id}
              {role === 'doctor' && ` • ${user.specialization}`}
            </p>
          </div>
        </div>

        {/* Action buttons */}
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
                className={
                  `pb-2 cursor-pointer ` +
                  (activeTab === tab
                    ? 'border-b-2 border-green-600 font-medium text-gray-800'
                    : 'text-gray-500 hover:text-gray-700')
                }
              >
                {tab}
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Info Modal */}
      {showModal && (
        <div className="edit-modal-overlay" onClick={toggleModal}>
          <div className="edit-modal" onClick={e => e.stopPropagation()}>
            {/* Modal Header: Photo & Name */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img src={photo} alt="Profile" className="profile-img" />
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
                      {role === 'doctor' ? `Dr. ${user.name}` : user.name}
                    </h3>
                  )}
                </div>
              </div>
              <div>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn btn-primary mr-2 text-sm"
                  >
                    Edit
                  </button>
                )}
                {isEditing && (
                  <>
                    <button
                      onClick={saveChanges}
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

            {/* Body: Patient or Doctor Details */}
            {role === 'patient' ? (
              <>
                <h4 className="font-semibold mt-2">Personal Info</h4>
                <div className="space-y-2">
                  {['age','gender','dob','bloodGroup','referredBy'].map(field => (
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
                        user[field]
                      )}
                    </div>
                  ))}
                </div>
                <h4 className="font-semibold mt-4">Contact Info</h4>
                <div className="space-y-2">
                  {Object.entries(user.contact).map(([k,v]) => (
                    <div key={k}>
                      <strong>
                        {k.replace(/([A-Z])/g,' $1')}:
                      </strong>{' '}
                      {isEditing ? (
                        <input
                          type="text"
                          value={edited.contact[k]}
                          onChange={e => handleFieldChange(`contact.${k}`, e.target.value)}
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
                  {['email','phone','office'].map(k => (
                    <div key={k}>
                      <strong>
                        {k.charAt(0).toUpperCase()+k.slice(1)}:
                      </strong>{' '}
                      {isEditing ? (
                        <input
                          type="text"
                          value={edited.contact[k]}
                          onChange={e => handleFieldChange(`contact.${k}`, e.target.value)}
                          className="border-b border-gray-400 focus:outline-none"
                        />
                      ) : (
                        user.contact[k]
                      )}
                    </div>
                  ))}
                  <div>
                    <strong>Experience:</strong>{' '}
                    {isEditing ? (
                      <input
                        type="number"
                        value={edited.yearsExperience}
                        onChange={e => handleFieldChange('yearsExperience', e.target.value)}
                        className="border-b border-gray-400 focus:outline-none"
                      />
                    ) : (
                      `${user.yearsExperience} years`
                    )}
                  </div>
                  <div>
                    <strong>Credentials:</strong>{' '}
                    {isEditing ? (
                      <input
                        type="text"
                        value={edited.credentials.join(', ')}
                        onChange={e => handleFieldChange(
                          'credentials',
                          e.target.value.split(',').map(s=>s.trim())
                        )}
                        className="border-b border-gray-400 focus:outline-none"
                      />
                    ) : (
                      user.credentials.join(', ')
                    )}
                  </div>
                  <div>
                    <strong>Certifications:</strong>{' '}
                    {isEditing ? (
                      <input
                        type="text"
                        value={edited.certifications.join(', ')}
                        onChange={e => handleFieldChange(
                          'certifications',
                          e.target.value.split(',').map(s=>s.trim())
                        )}
                        className="border-b border-gray-400 focus:outline-none"
                      />
                    ) : (
                      user.certifications.join(', ')
                    )}
                  </div>
                  <div>
                    <strong>Affiliations:</strong>{' '}
                    {isEditing ? (
                      <input
                        type="text"
                        value={edited.affiliations.join(', ')}
                        onChange={e => handleFieldChange(
                          'affiliations',
                          e.target.value.split(',').map(s=>s.trim())
                        )}
                        className="border-b border-gray-400 focus:outline-none"
                      />
                    ) : (
                      user.affiliations.join(', ')
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

import React from 'react';

const ProfileSectionScreen = ({ employeeData, onClose }) => {
  const profile = employeeData?.employee?.unifiedProfile || {};

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg relative mx-4">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">Employee Profile</h2>
        <div className="space-y-4">
          <div>
            <span className="font-semibold text-gray-700">First Name:</span>
            <span className="ml-2 text-gray-900">{profile.firstName || '-'}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Last Name:</span>
            <span className="ml-2 text-gray-900">{profile.lastName || '-'}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Name:</span>
            <span className="ml-2 text-gray-900">{profile.name || '-'}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Employee ID:</span>
            <span className="ml-2 text-gray-900">{employeeData?.employeeId || '-'}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Email:</span>
            <span className="ml-2 text-gray-900">{profile.email || '-'}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Phone:</span>
            <span className="ml-2 text-gray-900">{profile.phone || '-'}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Location:</span>
            <span className="ml-2 text-gray-900">{profile.location || '-'}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Position:</span>
            <span className="ml-2 text-gray-900">{profile.position || '-'}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Department:</span>
            <span className="ml-2 text-gray-900">{profile.department || '-'}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Manager:</span>
            <span className="ml-2 text-gray-900">{profile.manager || '-'}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Hire Date:</span>
            <span className="ml-2 text-gray-900">{profile.hireDate || '-'}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Status:</span>
            <span className="ml-2 text-gray-900">{profile.status || '-'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSectionScreen;
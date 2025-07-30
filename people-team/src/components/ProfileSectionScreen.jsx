import React from 'react';

const ProfileSectionScreen = ({ currentUser, onClose }) => {
  // You can add more fields as needed
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
            <span className="font-semibold text-gray-700">Name:</span>
            <span className="ml-2 text-gray-900">{currentUser?.name || '-'}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Employee ID:</span>
            <span className="ml-2 text-gray-900">{currentUser?.userid || '-'}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Email:</span>
            <span className="ml-2 text-gray-900">{currentUser?.email || '-'}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Role:</span>
            <span className="ml-2 text-gray-900">{currentUser?.role || '-'}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Gender:</span>
            <span className="ml-2 text-gray-900">{currentUser?.gender || '-'}</span>
          </div>
          {/* Add more fields as needed */}
        </div>
      </div>
    </div>
  );
};

export default ProfileSectionScreen;
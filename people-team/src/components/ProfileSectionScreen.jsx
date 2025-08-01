import React from 'react';

const ProfileSectionScreen = ({ employeeData, reportees, currentUser, onClose }) => {
  const profile = employeeData?.employee?.unifiedProfile || {};
  const klaarData = employeeData?.employee?.dataFromFiles?.["Klaar Data.xlsx"] || {};
  const feedback = klaarData.Feedback || null;
  const feedbackBy = klaarData.Feedback_Given_By || null;
  const reporteesList = employeeData?.employee?.reportees || [];

  // Check if feedback is given by current user
  const isFeedbackByCurrentUser = feedbackBy && feedbackBy === currentUser?.email;

  // Check if employee is a reportee of current user
  const isReportee = reporteesList.some(
    r => r["Official Email ID"] === profile.email
  );

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
            <span className="ml-2 text-gray-900">{profile.name || '-'}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Email:</span>
            <span className="ml-2 text-gray-900">{profile.email || '-'}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Department:</span>
            <span className="ml-2 text-gray-900">{profile.department || '-'}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Employee ID:</span>
            <span className="ml-2 text-gray-900">{employeeData?.employee?.employeeId || '-'}</span>
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

          {/* Feedback Section */}
          {feedback && isFeedbackByCurrentUser && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
              <div className="font-semibold text-pink-700 mb-2">Feedback</div>
              <div className="text-gray-800">{feedback}</div>
              <div className="text-xs text-gray-500 mt-1">
                Given by: {feedbackBy}
                <span className="ml-2 text-green-600 font-semibold">(You)</span>
              </div>
            </div>
          )}

          {/* Reportee Section */}
          {isReportee && (
            <div className="mt-6 p-4 bg-pink-50 rounded-lg border border-pink-200">
              <div className="font-semibold text-pink-700 mb-2">This employee is your reportee.</div>
            </div>
          )}

          {/* List all reportees if you want */}
          {reporteesList.length > 0 && (
            <div className="mt-6">
              <div className="font-semibold text-gray-700 mb-2">Reportees:</div>
              <ul className="list-disc ml-6">
                {reporteesList.map(r => (
                  <li key={r["Emp ID"]}>
                    {r["Full Name"]} ({r["Official Email ID"]})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSectionScreen;
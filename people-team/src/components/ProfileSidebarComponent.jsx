import React, { useState } from 'react';
import { User, Search, LogOut } from 'lucide-react';
import EmployeeFeedbackForm from './EmployeeFeedbackForm';
import ProfileSectionScreen from './ProfileSectionScreen';
import SearchEmployeeScreen from './SearchEmployeeScreen'; // <-- new import

// ProfileSidebar Component
const ProfileSidebar = ({ isOpen, onClose, currentUser, onLogout, employeeData }) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [showProfileSection, setShowProfileSection] = useState(false);
  const [showSearchEmployee, setShowSearchEmployee] = useState(false);

  // Show profile section as a full screen overlay
  if (showProfileSection) {
    return (
      <ProfileSectionScreen
        currentUser={currentUser}
        employeeData={employeeData} // pass as prop
        onClose={() => setShowProfileSection(false)}
      />
    );
  }

  // Show search employee as a full screen overlay
  if (showSearchEmployee) {
    return (
      <SearchEmployeeScreen
        onClose={() => setShowSearchEmployee(false)}
        currentUser={currentUser}
        employeeData={employeeData}
      />
    );
  }

  // Show feedback form as a full screen overlay
  if (showFeedbackForm) {
    return (
      <EmployeeFeedbackForm
        onClose={() => setShowFeedbackForm(false)}
        onSubmit={() => {
          alert('Feedback submitted!');
          setShowFeedbackForm(false);
        }}
        currentUser={currentUser}
      />
    );
  }

  return (
    <>
      {/* Profile Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Profile Header */}
          <div className="bg-[#E20074] p-6 text-white">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold">{currentUser?.name}</h2>
                <p className="text-white/80">@{currentUser?.userid}</p>
              </div>
            </div>
          </div>
          
          {/* Profile Menu */}
          <div className="flex-1 p-6">
            <nav className="space-y-4">
              <button
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors w-full text-left"
                onClick={() => setShowProfileSection(true)}
              >
                <User className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">Profile Section</span>
              </button>
              <button
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors w-full text-left"
                onClick={() => setShowSearchEmployee(true)}
              >
                <Search className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">Search Employee</span>
              </button>
              {/* Show Employee Feedback only for ROLE_ADMIN */}
              {currentUser?.role === 'ROLE_ADMIN' && (
                <button
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors w-full text-left"
                  onClick={() => setShowFeedbackForm(true)}
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>
                  </svg>
                  <span className="text-gray-700">Employee Feedback</span>
                </button>
              )}
            </nav>
          </div>
          
          {/* Logout Button */}
          <div className="p-6 border-t">
            <button
              onClick={onLogout}
              className="flex items-center space-x-3 w-full p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}
    </>
  );
};

export default ProfileSidebar;
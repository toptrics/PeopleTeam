import React, { useEffect, useState } from 'react';
import { Menu, Bell, Search } from 'lucide-react';
import ChatWindow from './ChatWindowComponent';
import ProfileSidebar from './ProfileSidebarComponent';
import ProfileSectionScreen from './ProfileSectionScreen';
// LandingScreen Component
const LandingScreen = ({ currentUser, onLogout }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome to the chat!", sender: "system", timestamp: "10:30 AM" },
    { id: 2, text: "How can I help you today?", sender: "bot", timestamp: "10:31 AM" }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [employeeData, setEmployeeData] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedReporteeProfile, setSelectedReporteeProfile] = useState(null);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      if (!currentUser?.employeeId || !currentUser?.token) return;
      try {
        const response = await fetch(
          `http://localhost:8080/api/admin/employee/${currentUser.employeeId}`,
          {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          }
        );
        const data = await response.json();
        if (data.success) setEmployeeData(data);
      } catch (err) {
        // handle error
      }
    };
    fetchEmployeeData();
  }, [currentUser]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        text: newMessage,
        sender: "user",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, message]);
      setNewMessage('');
      
      // Simulate bot response
      setTimeout(() => {
        const botMessage = {
          id: messages.length + 2,
          text: "Thanks for your message! This is a demo response.",
          sender: "bot",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMessage]);
      }, 1000);
    }
  };

  const handleLogout = () => {
    setIsProfileOpen(false);
    onLogout();
  };

  const profile = employeeData?.employee?.unifiedProfile || {};
  console.log('employeeData:', employeeData);
  console.log('profile:', profile);

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <ProfileSidebar 
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        currentUser={currentUser}
        onLogout={handleLogout}
        employeeData={employeeData}
      />

      {/* Main Content - 4 Quadrants Layout */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsProfileOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                </svg>
              </button>
              <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
  {employeeData
    ? `Welcome, ${profile.name || ''}`
    : 'Loading...'}
</span>
            </div>
          </div>
        </header>

        {/* 4 Quadrants Grid */}
        <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-2 p-4 h-full">
          {/* Top Left Quadrant - Profile Summary (Magenta/Glassmorphism) */}
          <div className="bg-gradient-to-br from-[#E20074] via-pink-400 to-fuchsia-600 rounded-2xl shadow-xl flex items-center justify-center h-full border border-white/20 backdrop-blur-md">
            <div className="bg-white/20 rounded-xl h-full w-full shadow-lg flex flex-col items-center justify-center backdrop-blur-md p-4 sm:p-8">
              <div className="mb-4 flex flex-col items-center">
                <svg className="w-12 h-12 text-white mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-2.5 4-4 8-4s8 1.5 8 4"/></svg>
                <h2 className="text-2xl font-bold text-white drop-shadow mb-1">Your Profile</h2>
              </div>
              <div className="w-full mb-2 flex justify-between"><span className="font-semibold text-white/90">Name:</span> <span className="ml-2 text-white/90">{profile.name || '-'}</span></div>
              <div className="w-full mb-2 flex justify-between"><span className="font-semibold text-white/90">Email:</span> <span className="ml-2 text-white/90">{profile.email || '-'}</span></div>
              <div className="w-full mb-2 flex justify-between"><span className="font-semibold text-white/90">Department:</span> <span className="ml-2 text-white/90">{profile.department || '-'}</span></div>
              <div className="w-full mb-2 flex justify-between"><span className="font-semibold text-white/90">Employee ID:</span> <span className="ml-2 text-white/90">{employeeData?.employee?.employeeId || '-'}</span></div>
              <div className="w-full mb-2 flex justify-between"><span className="font-semibold text-white/90">Location:</span> <span className="ml-2 text-white/90">{profile.location || '-'}</span></div>
              <div className="w-full mb-2 flex justify-between"><span className="font-semibold text-white/90">Position:</span> <span className="ml-2 text-white/90">{profile.position || '-'}</span></div>
            </div>
          </div>

          {/* Top Right Quadrant - Reportees List (Magenta/Glassmorphism) */}
          <div className="bg-gradient-to-br from-[#E20074] via-fuchsia-500 to-pink-400 rounded-2xl shadow-xl flex items-center justify-center h-full border border-white/20 backdrop-blur-md">
            <div className="bg-white/20 rounded-xl h-full w-full shadow-lg flex flex-col items-center justify-center backdrop-blur-md p-4 sm:p-8">
              <div className="mb-4 flex flex-col items-center">
                <svg className="w-10 h-10 text-white mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 11c1.66 0 3 1.34 3 3v3H5v-3c0-1.66 1.34-3 3-3h8zm-8-2c0-2.21 1.79-4 4-4s4 1.79 4 4"/></svg>
                <h2 className="text-2xl font-bold text-white drop-shadow mb-1">Reportees</h2>
              </div>
              {employeeData?.employee?.reportees?.length ? (
                <ul className="space-y-2 max-h-40 overflow-y-auto w-full">
                  {employeeData.employee.reportees.map((rep, idx) => (
                    <li
                      key={idx}
                      className="bg-white/30 hover:bg-white/50 rounded-lg p-3 flex flex-col items-start cursor-pointer transition border border-white/10 shadow group"
                      onClick={async () => {
                        setShowProfileModal(true);
                        setSelectedReporteeProfile(null);
                        try {
                          const empId = rep['Emp ID'];
                          const res = await fetch(`http://localhost:8080/api/admin/employee/${empId}`, {
                            headers: { Authorization: `Bearer ${currentUser.token}` }
                          });
                          const data = await res.json();
                          setSelectedReporteeProfile(data);
                        } catch (err) {
                          setSelectedReporteeProfile({ error: 'Failed to load profile' });
                        }
                      }}
                    >
                      <span className="font-semibold text-[#E20074] group-hover:underline">{rep['Full Name'] || rep['Name']}</span>
                      <span className="text-xs text-white/80">{rep['Official Email ID'] || rep['Personal Email ID']}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-white/80">No reportees found.</p>
              )}
            </div>
          </div>

          {/* Reportee Profile Modal */}
          {showProfileModal && (
            <ProfileSectionScreen
              employeeData={selectedReporteeProfile}
              reportees={employeeData?.employee?.reportees}
              currentUser={currentUser}
              onClose={() => setShowProfileModal(false)}
            />
          )}

          {/* Bottom Left Quadrant - Yearly Ratings (Magenta/Glassmorphism) */}
          <div className="bg-gradient-to-br from-[#E20074] via-fuchsia-400 to-pink-400 rounded-2xl shadow-xl flex items-center justify-center h-full border border-white/20 backdrop-blur-md">
            <div className="bg-white/20 rounded-xl h-full w-full shadow-lg flex flex-col items-center justify-center backdrop-blur-md p-4 sm:p-8">
              <div className="mb-4 flex flex-col items-center">
                <svg className="w-10 h-10 text-white mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <h2 className="text-2xl font-bold text-white drop-shadow mb-1">Yearly Ratings</h2>
              </div>
              <ul className="space-y-1 w-full">
                {(() => {
                  const klaarData = employeeData?.employee?.dataFromFiles?.['Klaar Data.xlsx'] || {};
                  return ['2019','2020','2021','2022','2023','2024'].map(year => (
                    <li key={year} className="flex justify-between items-center px-2 py-1 bg-white/10 rounded mb-1">
                      <span className="text-white/90">Rating {year}:</span>
                      <span className="font-semibold text-[#E20074]">{klaarData[`Rating ${year}`] || 'N/A'}</span>
                    </li>
                  ));
                })()}
              </ul>
            </div>
          </div>

          {/* Bottom Right Quadrant - Chat Window */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden h-[40vh] flex flex-col">
            <ChatWindow 
              messages={messages}
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              onSendMessage={handleSendMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default LandingScreen;
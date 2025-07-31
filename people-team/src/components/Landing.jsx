import React, { useState } from 'react';
import { Menu, Bell, Search } from 'lucide-react';
import ChatWindow from './ChatWindowComponent';
import ProfileSidebar from './ProfileSidebarComponent';
// LandingScreen Component
const LandingScreen = ({ currentUser, onLogout }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome to the chat!", sender: "system", timestamp: "10:30 AM" },
    { id: 2, text: "How can I help you today?", sender: "bot", timestamp: "10:31 AM" }
  ]);
  const [newMessage, setNewMessage] = useState('');

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

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <ProfileSidebar 
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        currentUser={currentUser}
        onLogout={handleLogout}
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
              <span className="text-sm text-gray-600">Welcome, {currentUser?.name}</span>
            </div>
          </div>
        </header>

        {/* 4 Quadrants Grid */}
        <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-2 p-4">
          {/* Top Left Quadrant - Blue */}
          <div className="bg-blue-400 rounded-lg shadow-md flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-2xl font-bold mb-2">Analytics</h2>
              <p className="text-blue-100">View your performance metrics</p>
            </div>
          </div>

          {/* Top Right Quadrant - Green */}
          <div className="bg-green-400 rounded-lg shadow-md flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-2xl font-bold mb-2">Projects</h2>
              <p className="text-green-100">Manage your active projects</p>
            </div>
          </div>

          {/* Bottom Left Quadrant - Purple */}
          <div className="bg-purple-400 rounded-lg shadow-md flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-2xl font-bold mb-2">Team</h2>
              <p className="text-purple-100">Connect with your team members</p>
            </div>
          </div>

          {/* Bottom Right Quadrant - Chat Window */}
          <div className="bg-white rounded-lg shadow-md flex flex-col overflow-hidden">
            <div className="flex-1 flex flex-col">
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
    </div>
  );
};
export default LandingScreen;
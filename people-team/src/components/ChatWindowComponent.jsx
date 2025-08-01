import React, { useState, useRef, useEffect } from 'react';
import { Send, Smile, Paperclip } from 'lucide-react';

// ChatWindow Component
const ChatWindow = ({ messages, newMessage, setNewMessage, onSendMessage }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="bg-white h-full flex flex-col min-h-0 overflow-hidden">
      {/* Chat Header */}
      <div className="bg-[#E20074] p-3 text-white flex-shrink-0">
        <h2 className="text-base font-semibold">Chat Room</h2>
        <p className="text-white/80 text-xs">Real-time messaging</p>
      </div>
      
      {/* Messages - Fixed height with scroll */}
      <div className="flex-1 min-h-0 p-3 overflow-y-auto space-y-3">

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : message.sender === 'system'
                  ? 'bg-gray-200 text-gray-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {message.timestamp}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Message Input - Fixed at bottom */}
      <div className="p-3 border-t flex-shrink-0">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
          <button
            onClick={onSendMessage}
            className="bg-[#E20074] text-white p-2 rounded-full hover:bg-pink-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
export default ChatWindow;

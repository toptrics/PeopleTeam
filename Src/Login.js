
import React, { useState } from 'react';

// LoginScreen Component
const LoginScreen = ({ onLogin }) => {
  const [loginData, setLoginData] = useState({ userid: '', password: '' });

  const handleLogin = () => {
    if (loginData.userid && loginData.password) {
      onLogin({ userid: loginData.userid, name: loginData.userid });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-white/80">Sign in to continue to your account</p>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-white/90 text-sm font-medium mb-2">
              User ID
            </label>
            <input
              type="text"
              value={loginData.userid}
              onChange={(e) => setLoginData({...loginData, userid: e.target.value})}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-200"
              placeholder="Enter your user ID"
            />
          </div>
          
          <div>
            <label className="block text-white/90 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              value={loginData.password}
              onChange={(e) => setLoginData({...loginData, password: e.target.value})}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-200"
              placeholder="Enter your password"
            />
          </div>
          
          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-pink-500 to-violet-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-pink-600 hover:to-violet-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Sign In
          </button>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-white/60 text-sm">
            Demo: Use any user ID and password to login
          </p>
        </div>
      </div>
    </div>
  );
};
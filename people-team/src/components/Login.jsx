import React, { useState } from 'react';

// LoginScreen Component
const LoginScreen = ({ onLogin }) => {
  const [loginData, setLoginData] = useState({ userid: '', password: '' });
  const [showSSOPopup, setShowSSOPopup] = useState(false);
  const [ssoEmail, setSSOEmail] = useState('');
  const [loading, setLoading] = useState(false);

  // Standard login
  const handleLogin = async () => {
    if (loginData.userid && loginData.password) {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8080/api/auth/signin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: loginData.userid,
            password: loginData.password,
          }),
        });
        if (!response.ok) throw new Error('Login failed');
        const data = await response.json();
        // Pass token, role, and other info to parent
        onLogin({
          userid: data.username,
          name: data.username,
          token: data.token,
          role: data.roles?.[0] || '',
          email: data.email,
          employeeId: data.employeeId, // add this line
        });
      } catch (error) {
        alert('Login failed: ' + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  // SSO login
  const handleSSOLogin = async () => {
    if (ssoEmail) {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8080/api/auth/signin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: ssoEmail,
            password: ssoEmail + '.sso',
          }),
        });
        if (!response.ok) throw new Error('SSO Login failed');
        const data = await response.json();
        setShowSSOPopup(false);
        onLogin({
          userid: data.username,
          name: data.username,
          token: data.token,
          role: data.roles?.[0] || '',
          email: data.email,
          employeeId: data.employeeId, // add this line
        });
      } catch (error) {
        alert('SSO Login failed: ' + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#E20074] flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-2xl bg-gray-900">
        <div style={{display: 'flex', justifyContent:'center', alignSelf:'center', flexDirection: 'row'}}>
      <img
          src="/tmobile-logo.png"
          alt="T-Mobile Logo"
          className="mx-auto mb-6 h-14 w-auto rounded-xl"
          style={{
            boxShadow: 'none',
            border: 'none',
            background: 'white',
          }}
        />
        <img
          src="/hr_logo.png"
          alt="T-Mobile Logo"
          className="mx-auto mb-6 h-14 w-auto rounded-xl"
          style={{
            boxShadow: 'none',
            border: 'none',
            background: 'white',
          }}
        />
        </div>

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
              disabled={loading}
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
              disabled={loading}
            />
          </div>
          
          <button
            onClick={handleLogin}
            className="w-full bg-[#E20074] text-white py-3 px-6 rounded-lg font-semibold hover:bg-pink-700 transform hover:scale-105 transition-all duration-200"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </div>
        
        <div className="mt-6 text-center">
          <a
            href="#"
            className="text-pink-200 underline hover:text-white transition"
            onClick={e => {
              e.preventDefault();
              setShowSSOPopup(true);
            }}
          >
            Login via SSO
          </a>
        </div>
      </div>

      {/* SSO Popup */}
      {showSSOPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-sm relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl"
              onClick={() => setShowSSOPopup(false)}
              aria-label="Close"
            >
              ×
            </button>
            <img
              src="/tmobile-logo.png"
              alt="T-Mobile Logo"
              className="mx-auto mb-4 h-12 w-auto"
              style={{
                boxShadow: 'none',
                border: 'none',
                background: 'white',
              }}
            />
            <h2 className="text-xl font-bold text-center mb-4 text-pink-700">SSO Login</h2>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Microsoft Email
            </label>
            <input
              type="email"
              value={ssoEmail}
              onChange={e => setSSOEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="Enter your Microsoft email"
              disabled={loading}
            />
            <button
              onClick={handleSSOLogin}
              disabled={loading || !ssoEmail}
              className="w-full bg-pink-600 text-white py-2 rounded-lg font-semibold hover:bg-pink-700 transition mb-2 disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                  </svg>
                  Loading...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginScreen;
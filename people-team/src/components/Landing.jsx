import React, { useEffect, useState, useRef } from 'react';
import { Menu, Bell, Search } from 'lucide-react';
import ChatWindow from './ChatWindowComponent';
import ProfileSidebar from './ProfileSidebarComponent';
import ProfileSectionScreen from './ProfileSectionScreen';
// LandingScreen Component
const LandingScreen = ({ currentUser, onLogout }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeSegment, setActiveSegment] = useState('attrition');
  const [highRiskCount, setHighRiskCount] = useState(null);
  const [mediumRiskCount, setMediumRiskCount] = useState(null);
  const [lowRiskCount, setLowRiskCount] = useState(null);
  const [loadingHighRisk, setLoadingHighRisk] = useState(false);
  const [loadingMediumRisk, setLoadingMediumRisk] = useState(false);
  const [loadingLowRisk, setLoadingLowRisk] = useState(false);
  const [promotionCount, setPromotionCount] = useState(null);
  const [loadingPromotion, setLoadingPromotion] = useState(false);
  const [criticalPromotionCount, setCriticalPromotionCount] = useState(null);
  const [loadingCriticalPromotion, setLoadingCriticalPromotion] = useState(false);
  const [employeeData, setEmployeeData] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedReporteeProfile, setSelectedReporteeProfile] = useState(null);
  const hasInitialized = useRef(false);

  // Single useEffect to fetch all data once on component mount
  useEffect(() => {
    const fetchAllData = async () => {
      if (!currentUser?.employeeId || !currentUser?.token || hasInitialized.current) return;
      
      hasInitialized.current = true;
      
      // Fetch Employee Data
      const fetchEmployeeData = async () => {
        if (employeeData) return;
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
          console.error('Error fetching employee data:', err);
        }
      };

      // Fetch High Risk Count
      const fetchHighRisk = async () => {
        if (highRiskCount !== null) return;
        setLoadingHighRisk(true);
        try {
          const response = await fetch('http://0.0.0.0:8000/chat?query=can you give me number of employees with high attrition risk');
          const data = await response.json();
          if (data.success && data.records_count !== undefined) {
            setHighRiskCount(data.records_count);
          } else {
            setHighRiskCount(2);
          }
        } catch (error) {
          console.error('Error fetching high risk count:', error);
          setHighRiskCount(2);
        } finally {
          setLoadingHighRisk(false);
        }
      };

      // Fetch Medium Risk Count
      const fetchMediumRisk = async () => {
        if (mediumRiskCount !== null) return;
        setLoadingMediumRisk(true);
        try {
          const response = await fetch('http://0.0.0.0:8000/chat?query=can you give me number of employees with medium attrition risk');
          const data = await response.json();
          if (data.success && data.records_count !== undefined) {
            setMediumRiskCount(data.records_count);
          } else {
            setMediumRiskCount(1);
          }
        } catch (error) {
          console.error('Error fetching medium risk count:', error);
          setMediumRiskCount(1);
        } finally {
          setLoadingMediumRisk(false);
        }
      };

      // Fetch Low Risk Count
      const fetchLowRisk = async () => {
        if (lowRiskCount !== null) return;
        setLoadingLowRisk(true);
        try {
          const response = await fetch('http://0.0.0.0:8000/chat?query=can you give me number of employees with low attrition risk');
          const data = await response.json();
          if (data.success && data.records_count !== undefined) {
            setLowRiskCount(data.records_count);
          } else {
            setLowRiskCount(2);
          }
        } catch (error) {
          console.error('Error fetching low risk count:', error);
          setLowRiskCount(2);
        } finally {
          setLoadingLowRisk(false);
        }
      };

      // Fetch Promotion Count
      const fetchPromotionCount = async () => {
        if (promotionCount !== null) return;
        setLoadingPromotion(true);
        try {
          const response = await fetch('http://0.0.0.0:8000/chat?query=can you give me number of employees who last promoted date is 2023');
          const data = await response.json();
          if (data.success && data.records_count !== undefined) {
            setPromotionCount(data.records_count);
          } else {
            setPromotionCount(3);
          }
        } catch (error) {
          console.error('Error fetching promotion count:', error);
          setPromotionCount(3);
        } finally {
          setLoadingPromotion(false);
        }
      };

      // Fetch Critical Promotion Count
      const fetchCriticalPromotionCount = async () => {
        if (criticalPromotionCount !== null) return;
        setLoadingCriticalPromotion(true);
        try {
          const response = await fetch('http://0.0.0.0:8000/chat?query=count of all employees Role Criticality is High and Attrition Risk is High');
          const data = await response.json();
          if (data.success && data.records_count !== undefined) {
            setCriticalPromotionCount(data.records_count);
          } else {
            setCriticalPromotionCount(2);
          }
        } catch (error) {
          console.error('Error fetching critical promotion count:', error);
          setCriticalPromotionCount(2);
        } finally {
          setLoadingCriticalPromotion(false);
        }
      };

      // Execute all API calls in parallel
      await Promise.all([
        fetchEmployeeData(),
        fetchHighRisk(),
        fetchMediumRisk(),
        fetchLowRisk(),
        fetchPromotionCount(),
        fetchCriticalPromotionCount()
      ]);
    };

    fetchAllData();
  }, [currentUser?.employeeId, currentUser?.token]); // Only depend on user credentials

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

        {/* Main Content Area */}
        <div className="flex flex-1">
          {/* Vertical Segment Navigation */}
          <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">Analytics</h3>
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveSegment('attrition')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-3 ${
                    activeSegment === 'attrition'
                      ? 'bg-pink-50 text-[#E20074] border-l-4 border-[#E20074]'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"/>
                  </svg>
                  <span className="font-medium">Attrition Risk</span>
                </button>
                
                <button
                  onClick={() => setActiveSegment('promotion')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-3 ${
                    activeSegment === 'promotion'
                      ? 'bg-pink-50 text-[#E20074] border-l-4 border-[#E20074]'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                  </svg>
                  <span className="font-medium">Promotion Eligible</span>
                </button>
                
                <button
                  onClick={() => setActiveSegment('offers')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-3 ${
                    activeSegment === 'offers'
                      ? 'bg-pink-50 text-[#E20074] border-l-4 border-[#E20074]'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  <span className="font-medium">Offer Management</span>
                </button>

              </nav>
            </div>
          </div>
          
          {/* Main Content Panel */}
          <div className="flex-1 p-8">
            {activeSegment === 'attrition' && (
              <div className="flex h-full">
                {/* Risk Metrics Cards - Vertical Left Alignment */}
                <div className="w-64 space-y-4 pr-6">
                  {/* High Risk Card */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">High Risk</span>
                      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="m21 16-4 4-4-4"/>
                        <path d="M17 20V4"/>
                        <path d="m3 8 4-4 4 4"/>
                        <path d="M7 4v16"/>
                      </svg>
                    </div>
                    {loadingHighRisk ? (
                      <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
                    ) : (
                      <div className="text-2xl font-bold text-red-600">{highRiskCount || 2}</div>
                    )}
                  </div>

                  {/* Medium Risk Card */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Medium Risk</span>
                      <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
                        <path d="m12 9 0 4"/>
                        <path d="m12 17 .01 0"/>
                      </svg>
                    </div>
                    {loadingMediumRisk ? (
                      <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
                    ) : (
                      <div className="text-2xl font-bold text-yellow-600">{mediumRiskCount || 1}</div>
                    )}
                  </div>

                  {/* Low Risk Card */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Low Risk</span>
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="m3 16 4 4 4-4"/>
                        <path d="M7 20V4"/>
                        <path d="m21 8-4-4-4 4"/>
                        <path d="M17 4v16"/>
                      </svg>
                    </div>
                    {loadingLowRisk ? (
                      <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
                    ) : (
                      <div className="text-2xl font-bold text-green-600">{lowRiskCount || 2}</div>
                    )}
                  </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1">
                  {/* Additional content can go here */}
                </div>
              </div>
            )}
            
            {activeSegment === 'promotion' && (
              <div className="flex h-full">
                {/* Promotion Cards - Left Alignment */}
                <div className="w-80 space-y-4">
                  {/* Ready for Promotion Card */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-700">Ready for Promotion</h3>
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M5 13l4 4L19 7"/>
                        </svg>
                      </div>
                    </div>
                    {loadingPromotion ? (
                      <div className="h-12 w-16 bg-gray-200 rounded animate-pulse mb-2"></div>
                    ) : (
                      <div className="text-4xl font-bold text-gray-900 mb-2">{promotionCount || 3}</div>
                    )}
                  </div>

                  {/* Critical Promotions Due Card */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-700">Critical Promotions Due</h3>
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M5 13l4 4L19 7"/>
                        </svg>
                      </div>
                    </div>
                    {loadingCriticalPromotion ? (
                      <div className="h-12 w-16 bg-gray-200 rounded animate-pulse mb-2"></div>
                    ) : (
                      <div className="text-4xl font-bold text-gray-900 mb-2">{criticalPromotionCount || 2}</div>
                    )}
                  </div>
                </div>
                
                {/* Main Content Area */}
                <div className="flex-1 ml-8">
                  {/* Additional content can go here */}
                </div>
              </div>
            )}
            
            {activeSegment === 'offers' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  <h2 className="text-xl font-semibold text-gray-900">Offer Management</h2>
                </div>
                <p className="text-gray-600">Track and manage job offers, negotiations, and hiring pipeline.</p>
              </div>
            )}

          </div>
        </div>

        {/* Floating Chat Button */}
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 bg-[#E20074] text-white p-4 rounded-full shadow-lg hover:bg-pink-700 transition-colors z-40"
          aria-label="Open Chat"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
        </button>

        {/* Chat Sidebar */}
        <div className={`fixed top-0 right-0 h-full w-1/2 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isChatOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="h-full flex flex-col">
            <div className="bg-[#E20074] p-4 text-white flex items-center justify-between">
              <h2 className="text-lg font-semibold">HR Assistant</h2>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-white hover:text-gray-200 transition-colors"
                aria-label="Close Chat"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <div className="flex-1">
              <ChatWindow />
            </div>
          </div>
        </div>

        {/* Chat Sidebar Overlay */}
        {isChatOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsChatOpen(false)}
          />
        )}

        {/* Reportee Profile Modal */}
        {showProfileModal && (
          <ProfileSectionScreen
            employeeData={selectedReporteeProfile}
            currentUser={currentUser}
            onClose={() => setShowProfileModal(false)}
          />
        )}
      </div>
    </div>
  );
};
export default LandingScreen;
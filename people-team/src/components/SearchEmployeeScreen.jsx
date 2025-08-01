import React, { useState, useEffect } from 'react';
import ProfileSectionScreen from './ProfileSectionScreen';

const SearchEmployeeScreen = ({ onClose, currentUser, employeeData }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (query.length > 2 && currentUser?.token) {
        setLoading(true);
        try {
          const response = await fetch(
            `http://localhost:8080/api/admin/employees/search?query=${encodeURIComponent(query)}`,
            {
              headers: {
                Authorization: `Bearer ${currentUser.token}`,
              },
            }
          );
          const data = await response.json();
          if (data.success && Array.isArray(data.employees)) setResults(data.employees);
          else setResults([]);
        } catch {
          setResults([]);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
      }
    };
    fetchResults();
  }, [query, currentUser]);

  // Fetch profile data for selected employee
  const handleEmployeeClick = async (employeeCode) => {
    if (!employeeCode || !currentUser?.token) return;
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/admin/employee/${employeeCode}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      const data = await response.json();
      if (data.success) setSelectedProfile(data);
    } catch {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  // Show profile overlay if selected
  if (selectedProfile) {
    return (
      <ProfileSectionScreen
        employeeData={selectedProfile}
        reportees={selectedProfile?.reportees}
        currentUser={currentUser}
        onClose={() => setSelectedProfile(null)}
      />
    );
  }

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
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">Search Employee</h2>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mb-4"
          placeholder="Enter employee name, email, or ID"
        />
        <div className="text-gray-500 text-center mt-8">
          {query.length < 3 && "Type at least 3 characters to search."}
          {query.length >= 3 && loading && "Searching..."}
          {query.length >= 3 && !loading && results.length > 0 && (
            <ul className="text-left space-y-2 mt-2 max-h-96 overflow-y-auto">
              {results.map(emp => (
                <li
                  key={emp.employeeCode}
                  className="border-b pb-2 cursor-pointer hover:bg-gray-100 rounded"
                  onClick={() => handleEmployeeClick(emp.employeeCode)}
                >
                  <span className="font-semibold">{emp.employeeName}</span>
                  <span className="ml-2 text-gray-400">({emp.email})</span>
                  <div className="text-xs text-gray-600">
                    {emp.position} | {emp.department} | {emp.employeeCode}
                  </div>
                </li>
              ))}
            </ul>
          )}
          {query.length >= 3 && !loading && results.length === 0 && (
            <span>No matching employees found.</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchEmployeeScreen;
import React, { useState } from 'react';

const SearchEmployeeScreen = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null); // null = not searched, [] = searched but no results

  // Placeholder for future API integration
  // React.useEffect(() => {
  //   if (query.length > 2) {
  //     fetch(`/api/employees?search=${query}`)
  //       .then(res => res.json())
  //       .then(data => setResults(data));
  //   } else {
  //     setResults(null);
  //   }
  // }, [query]);

  // Demo: simulate no matches if query is "none"
  React.useEffect(() => {
    if (query.length > 2) {
      // Simulate API: "none" returns empty, anything else returns fake data
      setTimeout(() => {
        if (query.toLowerCase() === "none") setResults([]);
        else setResults([{ id: 1, name: "Employee 1", email: "employee1@company.com" }]);
      }, 400);
    } else {
      setResults(null);
    }
  }, [query]);

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
          {query.length >= 3 && results === null && "Searching..."}
          {query.length >= 3 && results && results.length > 0 && (
            <ul className="text-left space-y-2 mt-2">
              {results.map(emp => (
                <li key={emp.id} className="border-b pb-2">
                  <span className="font-semibold">{emp.name}</span> <span className="text-gray-400">({emp.email})</span>
                </li>
              ))}
            </ul>
          )}
          {query.length >= 3 && results && results.length === 0 && (
            <span>No matching employees found.</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchEmployeeScreen;
import React, { useState } from 'react';
import { Clipboard, Mail, User, Briefcase, Building2, Users, MapPin, Calendar, UserCircle2 } from "lucide-react"; // If using lucide-react or use your own icons

const collapsibleSections = [
  { key: 'Klaar Data.xlsx', label: 'Klaar Data' },
  { key: 'Amber Data.xlsx', label: 'Amber Data' },
  { key: 'Offer Data.xlsx', label: 'Offer Data' },
  { key: 'Employee Master Darwin.xlsx', label: 'Employee Master Darwin' },
  { key: 'New Hire Requsition Portal Data.xlsx', label: 'New Hire Requisition Portal Data' },
  { key: 'reportees', label: 'Reportees' },
];

// Helper to format date strings
const formatDate = (dateStr) => {
  if (!dateStr || dateStr === "0.0") return null;
  // Try to parse ISO or DD-MM-YYYY or YYYY-MM-DD
  let d = new Date(dateStr);
  if (isNaN(d.getTime())) {
    // Try DD-MM-YYYY
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      d = new Date(parts[2], parts[1] - 1, parts[0]);
    }
  }
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

// Helper to render only non-empty fields
const renderData = (data, prefer = {}) =>
  Object.entries(data)
    .filter(([key, value]) =>
      value !== undefined &&
      value !== null &&
      value !== "" &&
      value !== "0.0" &&
      value !== "-" &&
      value !== "NA"
    )
    .filter(([key]) => !prefer[key]) // Remove duplicates if prefer has this key
    .map(([key, value]) => {
      // Special handling for Employee Profile Link
      if (
        key.toLowerCase().includes("profile link") &&
        typeof value === "string" &&
        value.startsWith("http")
      ) {
        return (
          <div key={key} className="flex justify-between py-1 border-b last:border-b-0">
            <span className="text-gray-600">{key.replace(/_/g, ' ')}</span>
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-700 underline break-all max-w-xs text-right"
              title={value}
            >
              View Profile
            </a>
          </div>
        );
      }
      return (
        <div key={key} className="flex justify-between py-1 border-b last:border-b-0">
          <span className="text-gray-600">{key.replace(/_/g, ' ')}</span>
          <span className="font-medium text-gray-900">
            {key.toLowerCase().includes("date") ? formatDate(value) : value}
          </span>
        </div>
      );
    });

// Unified Profile section with preference for Klaar Data
const UnifiedProfileSection = ({ profile, klaarData }) => {
  const [copied, setCopied] = useState(false);

  // Prefer klaarData for gender, dob, etc.
  const gender = klaarData.gender || profile.gender || "-";
  const dob = klaarData.date_of_birth || klaarData.dob || profile.dob || "-";
  const department = klaarData["Dummy Department"] || profile.department || "-";
  const email = klaarData.email || profile.email || "-";
  const buddy = profile.buddy || "-";
  const employeeId = profile.employeeId || klaarData["employee code"] || "-";
  const company = profile.company || "Deutsche Telekom Digital Labs";
  const hrbpRole = profile.hrbpRole || "-";
  const location = klaarData.location || profile.location || "-";
  const designation = klaarData.title || profile.position || klaarData.Designation || "-";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="bg-gradient-to-br from-pink-50 via-white to-blue-50 rounded-2xl shadow-lg p-8 border-l-8 border-pink-600 mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <UserCircle2 className="w-10 h-10 text-pink-600" />
            <span className="text-3xl font-extrabold text-gray-900 tracking-tight">{profile.full_name || profile.name || klaarData.full_name || "-"}</span>
          </div>
          <div className="flex items-center gap-2 text-lg text-gray-700">
            <Building2 className="w-5 h-5 text-pink-600" />
            <span>{department}</span>
          </div>
        </div>
        <div className="mt-6 md:mt-0 flex flex-col gap-2 items-end">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400 font-semibold">Employee ID</span>
            <span className="text-lg text-gray-800 font-bold">{employeeId}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-blue-600" />
            <span className="text-lg text-gray-800">{email}</span>
            <button onClick={handleCopy} className="ml-1 text-gray-400 hover:text-pink-600" title="Copy Email">
              <Clipboard className="w-4 h-4" />
            </button>
            {copied && <span className="text-xs text-green-600 ml-1">Copied!</span>}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 text-gray-500 mb-1">
            <Users className="w-4 h-4" />
            <span className="font-semibold">Buddy</span>
          </div>
          <div className="text-lg text-gray-800">{buddy}</div>
        </div>
        <div>
          <div className="flex items-center gap-2 text-gray-500 mb-1">
            <MapPin className="w-4 h-4" />
            <span className="font-semibold">Location</span>
          </div>
          <div className="text-lg text-gray-800">{location}</div>
        </div>
        <div>
          <div className="flex items-center gap-2 text-gray-500 mb-1">
            <Building2 className="w-4 h-4" />
            <span className="font-semibold">Company</span>
          </div>
          <div className="text-lg text-gray-800">{company}</div>
        </div>
        <div>
          <div className="flex items-center gap-2 text-gray-500 mb-1">
            <User className="w-4 h-4" />
            <span className="font-semibold">HRBP Role</span>
          </div>
          <div className="text-lg text-gray-800">{hrbpRole}</div>
        </div>
        <div>
          <div className="flex items-center gap-2 text-gray-500 mb-1">
            <User className="w-4 h-4" />
            <span className="font-semibold">Gender</span>
          </div>
          <div className="text-lg text-gray-800">{gender}</div>
        </div>
        <div>
          <div className="flex items-center gap-2 text-gray-500 mb-1">
            <Calendar className="w-4 h-4" />
            <span className="font-semibold">Date Of Birth</span>
          </div>
          <div className="text-lg text-gray-800">{dob !== "-" ? formatDate(dob) : "-"}</div>
        </div>
      </div>
    </div>
  );
};

const Section = ({ label, open, onClick, children }) => (
  <div className="border rounded-lg mb-4 bg-white shadow">
    <button
      className="w-full flex justify-between items-center px-4 py-3 text-lg font-semibold text-pink-700 hover:bg-pink-50 transition"
      onClick={onClick}
      aria-expanded={open}
    >
      <span>{label}</span>
      <span className="ml-2">{open ? '▲' : '▼'}</span>
    </button>
    {open && <div className="px-4 pb-4">{children}</div>}
  </div>
);

const ProfileSectionScreen = ({ employeeData, currentUser, onClose, isModal }) => {
  const [openSection, setOpenSection] = useState('unifiedProfile');
  const [selectedReportee, setSelectedReportee] = useState(null);
  const [loadingReportee, setLoadingReportee] = useState(false);
  const [reporteeError, setReporteeError] = useState(null);
  const dataFromFiles = employeeData?.employee?.dataFromFiles || {};
  const reporteesList = employeeData?.employee?.reportees || [];
  const klaarData = dataFromFiles['Klaar Data.xlsx'] || {};
  const feedback = klaarData.Feedback || null;
  const feedbackBy = klaarData.Feedback_Given_By || null;
  const isFeedbackByCurrentUser = feedbackBy && feedbackBy === currentUser?.email;
  const profile = employeeData?.employee?.unifiedProfile || {};

  const unifiedProfileFields = [
    "employee code", "Employee Code", "Emp ID",
    "full_name", "Name", "Full Name", "firstName", "lastName",
    "email", "Email", "Official Email ID",
    "Dummy Department", "Department", "Department (Value Stream)",
    "title", "Designation", "Designation3",
    "location", "Location",
    "company",
    "hrbpRole", "HRBP Mapping",
    "Buddy_Name", "buddy",
    "gender", "Gender",
    "date_of_birth", "DOB",
    "date_of_joining", "Joining Date", "DOJ (DTDL)",
    "manager", "Manager Name",
    "status", "Status", "Employee Status",
    "Personal Email", "Personal Email ID",
    "mobile_number", "Phone Number",
    "level", "Employee Grade", "Level",
    "Band",
    "Team",
    "Country",
    "business unit", "Business Business Unit",
    "HR_Code",
    "Highest Degree", "Highest Qualification", "Education Qualification/Degree"
  ];

  const handleReporteeClick = async (employeeId) => {
    setLoadingReportee(true);
    setReporteeError(null);
    setSelectedReportee(null);
    try {
      const res = await fetch(
        `http://localhost:8080/api/admin/employee/${employeeId}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      if (!res.ok) throw new Error('Failed to fetch profile');
      const data = await res.json();
      setSelectedReportee(data);
    } catch (err) {
      setReporteeError('Could not load reportee profile.');
    } finally {
      setLoadingReportee(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-none shadow-2xl w-full h-full max-w-none max-h-none relative overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-gray-400 hover:text-gray-600 text-3xl z-10"
          aria-label="Close"
        >
          &times;
        </button>
        <div className="p-8 pt-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-pink-700 tracking-tight">Employee Profile</h2>
          
          {/* Always visible Profile Overview */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Profile Overview</h3>
            <UnifiedProfileSection profile={profile} klaarData={klaarData} />
          </div>

          <div>
            {collapsibleSections.map(({ key, label }) => {
              let content = null;
              if (key === 'unifiedProfile') {
                content = (
                  <UnifiedProfileSection
                    profile={profile}
                    klaarData={klaarData}
                  />
                );
              } else if (key === 'reportees') {
                content = reporteesList.length ? (
                  <ul className="space-y-2">
                    {reporteesList.map((r) => (
                      <li
                        key={r['Emp ID']}
                        className="border-b last:border-b-0 pb-2 cursor-pointer hover:bg-pink-50 transition rounded"
                        onClick={() => handleReporteeClick(r['Emp ID'])}
                      >
                        <span className="font-semibold">{r['Full Name']}</span>
                        <span className="ml-2 text-gray-500">({r['Official Email ID']})</span>
                        <div className="text-xs text-gray-400">{r['Designation']} | {r['Department (Value Stream)']} | {r['Location']}</div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-gray-500">No reportees found.</div>
                );
              } else if (dataFromFiles[key]) {
                // Remove fields already shown in UnifiedProfileSection
                content = renderData(
                  dataFromFiles[key],
                  unifiedProfileFields.reduce((acc, k) => ({ ...acc, [k]: true }), {})
                );
              }

              // Special: Feedback in Klaar Data
              if (key === 'Klaar Data.xlsx' && feedback && isFeedbackByCurrentUser) {
                content = (
                  <>
                    {content}
                    <div className="mt-4 p-4 bg-pink-50 rounded-lg border border-pink-200">
                      <div className="font-semibold text-pink-700 mb-2">Feedback</div>
                      <div className="text-gray-800">{feedback}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Given by: {feedbackBy}
                        <span className="ml-2 text-green-600 font-semibold">(You)</span>
                      </div>
                    </div>
                  </>
                );
              }

              return (
                <Section
                  key={key}
                  label={label}
                  open={openSection === key}
                  onClick={() => setOpenSection(openSection === key ? null : key)}
                >
                  {content}
                </Section>
              );
            })}
          </div>
        </div>
      </div>
      {selectedReportee && (
        <ProfileSectionScreen
          employeeData={selectedReportee}
          currentUser={currentUser}
          onClose={() => setSelectedReportee(null)}
          isModal={true}
        />
      )}
      {loadingReportee && (
        <div className="fixed inset-0 z-70 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl p-6 text-center text-lg font-semibold text-pink-700">
            Loading reportee profile...
          </div>
        </div>
      )}
      {reporteeError && (
        <div className="fixed inset-0 z-70 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl p-6 text-center text-lg font-semibold text-red-600">
            {reporteeError}
            <button
              className="block mt-4 mx-auto px-4 py-2 bg-pink-600 text-white rounded"
              onClick={() => setReporteeError(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSectionScreen;
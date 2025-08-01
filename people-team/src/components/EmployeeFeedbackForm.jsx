import React, { useState } from 'react';

const initialFeedback = {
  date: '',
  time: '',
  employeeName: '',
  employeeId: '',
  meetingSummary: '',
};

const EmployeeFeedbackForm = ({ onClose, onSubmit, currentUser }) => {
  const [feedback, setFeedback] = useState(initialFeedback);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(feedback);

    setSaving(true);
    try {
      await fetch(
        `http://localhost:8080/api/admin/employee/${feedback.employeeId}/feedback`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            employeeId: feedback.employeeId,
            feedback: feedback.meetingSummary,
            feedbackGivenBy: currentUser.email || '',
          }),
        }
      );
      setFeedback(initialFeedback);
      if (onClose) onClose();
    } catch (error) {
      alert('Failed to save feedback');
    } finally {
      setSaving(false);
    }
  };

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
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">Employee Feedback</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-gray-700 text-sm font-medium mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={feedback.date}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 text-sm font-medium mb-1">Time</label>
              <input
                type="time"
                name="time"
                value={feedback.time}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Employee Name</label>
            <input
              type="text"
              name="employeeName"
              value={feedback.employeeName}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Employee ID</label>
            <input
              type="text"
              name="employeeId"
              value={feedback.employeeId}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Meeting Summary</label>
            <textarea
              name="meetingSummary"
              value={feedback.meetingSummary}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              rows={3}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Submit Feedback'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeFeedbackForm;
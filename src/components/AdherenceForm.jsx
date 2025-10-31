// src/components/AdherenceForm.jsx
import React, { useState } from "react";

const AdherenceForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    drug: "",
    duration: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // In real app, API call will go here
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-lg">
      <h2 className="text-2xl font-semibold text-green-700 mb-4">
        Patient Adherence Follow-Up
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Patient Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., John Doe"
            className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Contact (Phone)
          </label>
          <input
            type="tel"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="e.g., 09012345678"
            className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Drug(s)
          </label>
          <input
            type="text"
            name="drug"
            value={formData.drug}
            onChange={handleChange}
            placeholder="e.g., Amoxicillin, Paracetamol"
            className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Duration (Days)
          </label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="e.g., 7"
            className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Start Reminder
        </button>
      </form>

      {submitted && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-green-700 font-medium">Reminder Scheduled ✅</h3>
          <p className="text-sm text-gray-700 mt-1">
            PharmIQ will send branded daily reminders to{" "}
            <span className="font-semibold">{formData.name}</span> ({formData.contact})
            for <span className="font-semibold">{formData.duration}</span> days
            regarding <span className="font-semibold">{formData.drug}</span>.
          </p>
        </div>
      )}
    </div>
  );
};

export default AdherenceForm;

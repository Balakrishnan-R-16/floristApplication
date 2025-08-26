// src/FloristForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FloristForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    flowerSpecialties: "",
    experience: "",
    storeLocation: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    const phoneRegex = /^\+91[0-9]{10}$/;

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.flowerSpecialties.trim())
      newErrors.flowerSpecialties = "Flower specialties are required";
    if (!formData.experience.trim())
      newErrors.experience = "Experience is required";
    if (!formData.storeLocation.trim())
      newErrors.storeLocation = "Store location is required";
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
    else if (!phoneRegex.test(formData.phoneNumber))
      newErrors.phoneNumber = "Phone must start with +91 and 10 digits";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/addFlorist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (data.success) {
        setSubmitSuccess(true);
        setFormData({ name: "", flowerSpecialties: "", experience: "", storeLocation: "", phoneNumber: "" });
        setTimeout(() => navigate("/florists"), 2000);
      } else {
        setErrors({ submit: data.message || "Failed to submit application" });
      }
    } catch {
      setErrors({ submit: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  if (submitSuccess)
    return (
      <div className="max-w-lg mx-auto bg-green-50 p-6 rounded-lg text-center shadow">
        <div className="text-3xl">✅</div>
        <h2 className="text-xl font-semibold mt-2">Application Submitted Successfully!</h2>
        <p className="text-gray-600">Thank you for applying. Redirecting...</p>
      </div>
    );

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        backgroundImage:
          "url('https://previews.123rf.com/images/cylonphoto/cylonphoto1807/cylonphoto180700023/107378007-fresh-flowers-outside-of-a-florist-shop-pink-flower-tree.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-lg w-full bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Florist Application Form</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full border p-3 rounded focus:ring-2 focus:ring-pink-400"
          />
          <input
            name="experience"
            type="text"
            placeholder="Experience"
            value={formData.experience}
            onChange={handleInputChange}
            className="w-full border p-3 rounded focus:ring-2 focus:ring-pink-400"
          />
          <input
            name="storeLocation"
            type="text"
            placeholder="Store Location"
            value={formData.storeLocation}
            onChange={handleInputChange}
            className="w-full border p-3 rounded focus:ring-2 focus:ring-pink-400"
          />
          <input
            name="phoneNumber"
            type="tel"
            placeholder="+91XXXXXXXXXX"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="w-full border p-3 rounded focus:ring-2 focus:ring-pink-400"
          />
          <textarea
            name="flowerSpecialties"
            rows="3"
            placeholder="Flower Specialties"
            value={formData.flowerSpecialties}
            onChange={handleInputChange}
            className="w-full border p-3 rounded focus:ring-2 focus:ring-pink-400"
          />
          {errors.submit && <p className="text-red-500">{errors.submit}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-600 text-white py-3 rounded hover:bg-pink-700 disabled:opacity-50 transition"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FloristForm;

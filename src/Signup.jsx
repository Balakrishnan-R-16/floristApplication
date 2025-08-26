// src/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({ setUser }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "FLORIST",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (response.ok && data.success) {
        const newUser = {
          username: form.username,
          role: form.role,
          token: data.token || "dummy-jwt",
        };
        localStorage.setItem("user", JSON.stringify(newUser));
        setUser(newUser);

        if (form.role === "FLORIST") navigate("/apply");
        else if (form.role === "ADMIN") navigate("/florists");
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      setError("Server error. Try again later.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        backgroundImage:
          "url('https://static.wixstatic.com/media/846d71_da72ff4e1a644479abdf51f1e1524c55~mv2.jpg/v1/fill/w_980,h_653,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/846d71_da72ff4e1a644479abdf51f1e1524c55~mv2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-md w-full bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="FLORIST">Florist</option>
            <option value="ADMIN">Admin</option>
          </select>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition"
          >
            Signup
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-pink-600 font-medium"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;

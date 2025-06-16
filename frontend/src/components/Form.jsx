import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const Form = () => {
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e, role = "user") => {
    e.preventDefault();

    const formData = {
      firstname,
      lastname,
      email,
      password,
      mobile,
      role,
    };

    if (!firstname || !lastname || !email || !password || !mobile) {
      setError("Please fill in all fields");
      return;
    }

    if (role === "admin") {
      const admincode = prompt("Enter Admin Secret Code:");
      if (!admincode) {
        alert("Admin code is required");
        return;
      }
      formData.admincode = admincode;
    }

    try {
      const response = await axiosInstance.post("/user/register", formData);
      console.log("Registration successful:", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Error during registration:", error);
      const message =
        error.response?.data?.message ||
        error.response?.data?.errors?.[0]?.msg || // for array-based validation errors
        "Registration failed. Please try again.";
      setError(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-50 from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Register
        </h2>
        <form onSubmit={(e) => handleSubmit(e, "user")} className="space-y-4">
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          />
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          />
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Register
          </button>

          <button
            type="button"
            onClick={(e) => handleSubmit(e, "admin")}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Register as Admin
          </button>
        </form>

        {error && (
          <div className="mt-4 text-sm text-red-600 text-center">{error}</div>
        )}

        <div className="mt-6 text-center text-sm">
          <button
            onClick={() => navigate("/login")}
            className="text-gray-600 hover:underline"
          >
            Already registered?{" "}
            <span className="text-blue-600 font-semibold">Login here</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;

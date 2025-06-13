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

  // Main registration handler (for both user and admin)
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
      alert("Please fill in all fields");
      return;
    }
    if(role==="admin"){
      const admincode = prompt("Enter Admin Secret Code:");
    
      if (!admincode) {
          alert("Admin code is required");
      return;
      }
      formData.admincode=admincode;
      
      }

    try {
      const response = await axiosInstance.post("/user/register", formData);
      console.log("Registration successful:", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration failed, please try again later.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>
      <form onSubmit={(e) => handleSubmit(e, "user")} className="space-y-4">
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="tel"
          name="mobile"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="w-full p-2 border rounded"
        />

        {/* User Register Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Register
        </button>

        {/* Admin Register Button */}
        <button
          type="button"
          onClick={(e) => handleSubmit(e, "admin")}
          className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700 mt-2"
        >
          Register as Admin
        </button>
      </form>
    </div>
  );
};

export default Form;

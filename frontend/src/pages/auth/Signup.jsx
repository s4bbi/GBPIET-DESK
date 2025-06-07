import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import collegelogo from "../../assets/images/collegelogowhiteV.svg";
import ill1 from "../../assets/images/su_ill_1.svg";
import bg_grid from "../../assets/images/bg_grid.svg";
import { departments, batches } from "../../utils/data.js";
import { HiChevronDown } from "react-icons/hi";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    instituteId: "",
    email: "",
    password: "",
    department: "",
    batch: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Basic frontend validation (optional, backend will also validate)
    if (
      !formData.name ||
      !formData.instituteId ||
      !formData.email ||
      !formData.password ||
      !formData.department ||
      !formData.batch
    ) {
      setError("Please fill all fields.");
      return;
    }

    try {
      const res = await fetch("/api/v1/students/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to signup");
      } else {
        setSuccess("Signup successful! Please login.");
        setFormData({
          name: "",
          instituteId: "",
          email: "",
          password: "",
          department: "",
          batch: "",
        });
      }
    } catch (err) {
      setError("Something went wrong, please try again.");
    }
  };

  return (
    <div
      className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[#235782]"
      style={{
        backgroundImage: `url(${bg_grid})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {/* Left Side: Logo & Illustration */}
      <div className="flex flex-col justify-center items-center p-6 text-white relative">
        <div className="mb-6 flex gap-6 items-center">
          <img src={collegelogo} alt="GBPIET Logo" className="w-18 lg:w-28 mx-auto mb-2" />
          <div className="mb-4">
            <h2 className="text-lg lg:text-2xl font-sB">GBPIET</h2>
            <p className="text-sm lg:text-xl font-sL">Pauri-Garhwal, Uttarakhand</p>
          </div>
        </div>
        <img src={ill1} alt="Students Illustration" className="w-4/5 max-w-md hidden sm:flex" />
      </div>

      {/* Right Side: Elevated Form */}
      <div className="flex justify-center items-center bg-transparent px-6 pb-8 sm:py-10">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-12">
          <h2 className="text-2xl text-left mb-8 font-rR font-extralight">Let’s Get Started</h2>

          <form onSubmit={handleSubmit} className="space-y-4 font-sL">
            {error && <p className="text-red-600">{error}</p>}
            {success && <p className="text-green-600">{success}</p>}

            <div>
              <label className="block text-sm mb-1">Full Name</label>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Institute ID</label>
              <input
                name="instituteId"
                type="text"
                value={formData.instituteId}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm mb-1">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div className="relative">
              <label className="block text-sm mb-1">Password</label>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-9 text-gray-500 hover:text-gray-700 focus:outline-none"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
              </button>
            </div>
            {/* Department Dropdown */}
            <div>
              <label className="block text-sm mb-1">Department</label>
              <div className="relative">
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <option value="">Select Department</option>
                  {departments.map((dept, idx) => (
                    <option key={idx} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
                <HiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Batch Dropdown */}
            <div>
              <label className="block text-sm mb-1">Batch</label>
              <div className="relative">
                <select
                  name="batch"
                  value={formData.batch}
                  onChange={handleChange}
                  className="w-full appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <option value="">Select Batch</option>
                  {batches.map((batch, idx) => (
                    <option key={idx} value={batch}>
                      {batch}
                    </option>
                  ))}
                </select>
                <HiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#3C89C9] text-white py-2 rounded-md hover:bg-[#15446f] transition font-rR"
            >
              Signup
            </button>
          </form>

          <p className="text-sm text-center mt-4 font-sL">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

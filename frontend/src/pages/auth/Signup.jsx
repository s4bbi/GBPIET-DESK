import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { HiChevronDown } from "react-icons/hi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import collegelogo from "../../assets/images/collegelogowhiteV.svg";
import ill1 from "../../assets/images/su_ill_1.svg";
import { departments, batches } from "../../utils/data.js";
import Loader from "../../components/common/Loader";
import api from "../../api"; // ✅ Central Axios instance

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
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "password") {
      if (!passwordRegex.test(value)) {
        setPasswordError(
          "Password must be at least 8 characters and include uppercase, lowercase, number & special character."
        );
      } else {
        setPasswordError("");
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(formData).some((val) => val.trim() === "")) {
      toast.error("Please fill all fields.");
      return;
    }

    if (passwordError) {
      toast.error("Please fix the password before submitting.");
      return;
    }

    const delay = new Promise((resolve) => setTimeout(resolve, 1200));
    setIsLoading(true);

    try {
      // ✅ Signup API call
      const signupPromise = api.post("/api/v1/students/signup", formData);
      const [signupRes] = await Promise.all([signupPromise, delay]);

      // ✅ Auto-login after signup
      const loginRes = await api.post("/api/v1/students/login", {
        email: formData.email,
        password: formData.password,
      });

      const loginData = loginRes.data;
      localStorage.setItem("token", loginData.token);
      localStorage.setItem("user", JSON.stringify(loginData.data));

      toast.success("Signup and login successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Signup error:", err);
      const message =
        err.response?.data?.message ||
        err.response?.data?.error?.message ||
        "Signup failed";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row relative">
      <ToastContainer />
      {isLoading && <Loader />}

      {/* Left Side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-[#235782] text-white p-6">
        <div className="mb-6 flex gap-4 items-center">
          <img src={collegelogo} alt="GBPIET Logo" className="w-20 lg:w-28" />
          <div>
            <h2 className="text-xl lg:text-2xl font-sB">GBPIET</h2>
            <p className="text-sm lg:text-lg font-sL">
              Pauri-Garhwal, Uttarakhand
            </p>
          </div>
        </div>
        <img
          src={ill1}
          alt="Students Illustration"
          className="w-4/5 max-w-md hidden lg:flex"
        />
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-[#235782]">
        <div className="w-full max-w-md rounded-2xl shadow-2xl p-10 z-10 bg-white m-6">
          <h2 className="text-2xl text-left mb-8 font-rR font-extralight">
            Let’s Get Started
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 font-sR">
            <div>
              <label className="block text-sm mb-1">Full Name</label>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Institute ID</label>
              <input
                name="instituteId"
                type="text"
                value={formData.instituteId}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="username"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="relative">
              <label className="block text-sm mb-1">Password</label>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                className={`w-full px-4 py-2 border rounded-md pr-10 ${
                  passwordError ? "border-red-500" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-9 text-gray-500"
              >
                {showPassword ? (
                  <AiFillEyeInvisible size={20} />
                ) : (
                  <AiFillEye size={20} />
                )}
              </button>
              {passwordError && (
                <p className="text-red-600 text-xs mt-1">{passwordError}</p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-1">Department</label>
              <div className="relative">
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Department</option>
                  {departments.map((dept, idx) => (
                    <option key={idx} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
                <HiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1">Batch</label>
              <div className="relative">
                <select
                  name="batch"
                  value={formData.batch}
                  onChange={handleChange}
                  className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Batch</option>
                  {batches.map((batch, idx) => (
                    <option key={idx} value={batch}>
                      {batch}
                    </option>
                  ))}
                </select>
                <HiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !!passwordError}
              className={`w-full py-2 rounded-md mt-2 font-rR transition ${
                isLoading || passwordError
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#3C89C9] hover:bg-[#15446f] text-white"
              }`}
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

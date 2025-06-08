import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import collegelogo from "../../assets/images/collegelogowhiteV.svg";
import ill1 from "../../assets/images/su_ill_1.svg";
import bg_grid from "../../assets/images/bg_grid.svg";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields.");
      return;
    }

    try {
        const res = await fetch("http://localhost:3001/api/v1/admin/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        
        console.log(res.body);
        const data = await res.json();
        console.log("Login response:", res.status, data);
        

        if (!res.ok) {
          console.error("Login error:", data);
          const errorMessage =
            data?.error?.message || data?.message || "Failed to login";
          toast.error(errorMessage);
        } else {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          toast.success("Login successful!");
          navigate("/dashboard");
        }
      } catch (err) {
        console.error("Login fetch error:", err);
        toast.error("Something went wrong, please try again.");
      }
    }

  return (
    <div
      className="min-h-screen flex flex-col md:flex-row"
      style={{
        backgroundImage: `url(${bg_grid})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <ToastContainer />

      {/* Left Side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-[#235782] text-white p-6">
        <div className="mb-6 flex gap-4 items-center">
          <img src={collegelogo} alt="GBPIET Logo" className="w-20 lg:w-28" />
          <div>
            <h2 className="text-xl lg:text-2xl font-sB">GBPIET</h2>
            <p className="text-sm lg:text-lg font-sL">Pauri-Garhwal, Uttarakhand</p>
          </div>
        </div>
        <img src={ill1} alt="Students Illustration" className="w-4/5 max-w-md hidden lg:flex" />
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center relative bg-[#235782]">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-10  z-10 m-6">
          <h2 className="text-2xl text-left mb-8 font-rR font-extralight">Welcome Back!</h2>

          <form className="space-y-4 font-sL" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm mb-1">Email</label>
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

            <button
              type="submit"
              className="w-full bg-[#3C89C9] text-white py-2 rounded-md hover:bg-[#15446f] transition font-rR mt-2"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-center mt-4 font-sL">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 underline">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HiChevronDown } from "react-icons/hi";
import collegelogo from "../../assets/images/collegelogowhiteV.svg";
import ill1 from "../../assets/images/su_ill_1.svg";
import Loader from "../../components/common/Loader";
import api from "../../api"; // ✅ central Axios instance

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loginRole, setLoginRole] = useState("student");
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || (!forgotPasswordMode && !formData.password)) {
      toast.error("Please fill all fields.");
      return;
    }

    setIsLoading(true);
    const delay = new Promise((res) => setTimeout(res, 2000));

    if (forgotPasswordMode) {
      try {
        const [res] = await Promise.all([
          api.post("/api/v1/students/forgot-password", {
            email: formData.email,
          }),
          delay,
        ]);
        toast.success("Password reset link sent to your email.");
        setForgotPasswordMode(false);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to send reset link.");
      } finally {
        setIsLoading(false);
      }
      return;
    }

    const endpoint =
      loginRole === "admin"
        ? "/api/v1/admin/login"
        : "/api/v1/students/login";

    try {
      const [res] = await Promise.all([
        api.post(endpoint, formData),
        delay,
      ]);

      const data = res.data;
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.data));
      toast.success("Login successful!");

      navigate(loginRole === "admin" ? "/admin/dashboard" : "/dashboard");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        err.response?.data?.error?.message ||
        "Login failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row font-sM relative">
      <ToastContainer />
      {isLoading && <Loader />}

      {/* Left Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-[#235782] text-white p-6">
        <div className="mb-6 flex gap-4 items-center">
          <img src={collegelogo} alt="GBPIET Logo" className="w-20 lg:w-28" />
          <div>
            <h2 className="text-xl lg:text-2xl font-sB">GBPIET</h2>
            <p className="text-sm lg:text-lg">Pauri-Garhwal, Uttarakhand</p>
          </div>
        </div>
        <img
          src={ill1}
          alt="Illustration"
          className="w-4/5 max-w-md hidden lg:flex"
        />
      </div>

      {/* Right Section */}
      <div className="w-full h-screen md:w-1/2 flex justify-center items-center bg-[#235782] p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-10 z-10">
          <h2 className="text-2xl mb-8 text-left font-rR">
            {forgotPasswordMode ? "Reset Password" : "Welcome Back!"}
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {!forgotPasswordMode && (
             <div className="relative">
              <label className="block text-sm mb-1">Login as</label>

              <div className="relative">
                <select
                  value={loginRole}
                  onChange={(e) => setLoginRole(e.target.value)}
                  className="w-full px-4 pr-10 py-2 border border-gray-300 rounded-md appearance-none"
                >
                  <option value="student">Student</option>
                  <option value="admin">Admin</option>
                </select>

                <HiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>
            )}

            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {!forgotPasswordMode && (
              <div className="relative">
                <label className="block text-sm mb-1">Password</label>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md pr-10"
                  required
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
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#3C89C9] text-white py-2 rounded-md hover:bg-[#15446f] transition duration-200"
            >
              {forgotPasswordMode ? "Send Reset Link" : "Login"}
            </button>
          </form>

          {!forgotPasswordMode && (
            <p
              onClick={() => setForgotPasswordMode(true)}
              className="text-sm text-blue-600 text-left mt-4 cursor-pointer hover:underline"
            >
              Forgot Password?
            </p>
          )}

          {!forgotPasswordMode && (
            <p className="text-sm text-center mt-2">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-blue-600 underline">
                Signup
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;

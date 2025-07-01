import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import api from "../../api"; // ✅ Centralized Axios instance

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validatePassword = (password) => {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    return pattern.test(password);
  };

  const handleReset = async () => {
    if (!newPassword || !confirmPassword) {
      toast.error("Please fill both fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!validatePassword(newPassword)) {
      toast.error("Password must be at least 8 characters, include uppercase, lowercase, number, and special character");
      return;
    }

    try {
      const res = await api.post(`/api/v1/students/reset-password/${token}`, { newPassword });
      toast.success("Password successfully changed!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error("Reset password error:", err);
      const code = err?.response?.data?.code;
      const msg = err?.response?.data?.message;

      if (code === "TOKEN_EXPIRED") {
        toast.error("Reset link has expired. Please request a new one.");
        setTimeout(() => navigate("/login"), 3000);
      } else if (code === "INVALID_RESET_TOKEN") {
        toast.error("Invalid reset token. Please request a new link.");
        setTimeout(() => navigate("/login"), 3000);
      } else {
        toast.error(msg || "Failed to reset password.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#235782] font-sR px-5">
      <ToastContainer />
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md relative">
        <h2 className="text-2xl font-rR mb-6 text-left">Reset Your Password</h2>

        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-300 pr-10"
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
          </button>
        </div>

        <div className="relative mb-4">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-300 pr-10"
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-500"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
          </button>
        </div>

        <button
          onClick={handleReset}
          className="w-full bg-[#3C89C9] text-white py-2 rounded-md hover:bg-[#15446f] transition"
        >
          Update Password
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;

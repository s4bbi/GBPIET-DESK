import React, { useEffect, useState } from "react";
import StudentLayout from '../../components/layouts/StudentLayout';
import { HiOutlineAcademicCap } from "react-icons/hi";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProfilePage() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser || {});
  }, []);

  return (
    <StudentLayout>
      <div className="max-w-5xl mx-auto p-6 sm:p-8">
        <h2 className="text-3xl font-bold text-[#235782] text-center mb-8 font-sB">My Profile</h2>

        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row items-center justify-center sm:items-start gap-6 mb-8">
            <div className="w-32 h-32 bg-[#3C89C9] text-white rounded-full flex items-center justify-center text-5xl">
              <HiOutlineAcademicCap size={48} />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-2xl font-semibold text-[#235782]">{user.name || "Student Name"}</h3>
              <p className="text-gray-500 text-sm">{user.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm sm:text-base font-sM">
            <ProfileField label="Department" value={user.department || "Not Provided"} />
            <ProfileField label="Institute ID" value={user.instituteId || "Not Provided"} />
            <ProfileField label="Batch" value={user.batch || "Not Provided"} />
            <ProfileField label="Resume Link" value={
              user.resume ? <a href={user.resume} target="_blank" className="text-blue-600 underline">View Resume</a> : "Not Provided"
            } />
          </div>

          {/* Optional Edit Button */}
          {/* <div className="mt-8 text-center">
            <button className="bg-[#235782] text-white px-6 py-2 rounded-lg hover:bg-[#1d476a] transition">
              Edit Profile
            </button>
          </div> */}
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </StudentLayout>
  );
}

function ProfileField({ label, value, name, editable, onChange }) {
  return (
    <div className="flex flex-col">
      <span className="text-gray-500 font-medium mb-1">{label}</span>
      {editable ? (
        <input
          type="text"
          name={name}
          value={value || ""}
          onChange={onChange}
          className="border border-gray-300 rounded px-2 py-1"
        />
      ) : (
        <span className="text-gray-800">{value || "Not Provided"}</span>
      )}
    </div>
  );
}

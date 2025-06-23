import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProfileCompletion({ percent }) {
  const navigate = useNavigate();
  const circlePercent = Math.max(0, Math.min(percent, 100));
  const dashArray = `${(circlePercent * 100) / 100}, 100`;
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="bg-white rounded-xl shadow p-4 sm:p-5 flex flex-col items-center w-full max-w-xs mx-auto">
      {/* Circular progress bar */}
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-4">
        <svg className="w-full h-full" viewBox="0 0 36 36">
          <path
            className="text-gray-200"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="text-[#235782]"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeDasharray={dashArray}
            strokeLinecap="round"
          />
          <text
            x="18"
            y="20"
            className="text-xs font-sB fill-[#235782]"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {circlePercent}%
          </text>
        </svg>
      </div>

      <div className="text-center text-sm sm:text-base font-sB mb-3">
        Your Profile is {circlePercent}% Complete.
      </div>

      <button 
        onClick={() => navigate(`/profile/${user?._id}`)}
        className="px-4 py-2 bg-[#235782] text-white text-sm font-sB rounded hover:bg-[#1d476a] transition">
        Complete Your Profile
      </button>
    </div>
  );
}

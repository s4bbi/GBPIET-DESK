import React from 'react';
// src/components/ProfileCompletion.js
export default function ProfileCompletion({ percent }) {
  // Calculate the stroke-dasharray for the circular progress
  const circlePercent = Math.max(0, Math.min(percent, 100));
  const dashArray = `${(circlePercent * 100) / 100}, 100`;

  return (
    <div className="bg-white rounded-xl shadow p-4 sm:p-5 flex flex-col items-center w-full max-w-xs mx-auto">
      {/* Circular progress bar */}
      <div className="relative w-16 h-16 sm:w-28 sm:h-28 mb-3 sm:mb-4">
        <svg className="" viewBox="0 0 36 36">
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
      <div className="text-center text-xs sm:text-sm font-sB">
        Your Profile is {circlePercent}% Complete.
      </div>
    </div>
  );
}

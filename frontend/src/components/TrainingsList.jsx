import React, { useState } from "react";
import { HiOutlineArrowRight } from "react-icons/hi";
import Pagination from "./Pagination";

const trainings = [
  { company: "Scaler", role: "DSA Training", details: "Online • 8 weeks", deadline: "7th June" },
  { company: "Coding Ninjas", role: "Web Dev Training", details: "Online • 6 weeks", deadline: "8th June" },
  { company: "Udemy", role: "Python Full Stack", details: "Online • Self-paced", deadline: "10th June" },
  { company: "Coursera", role: "Cloud Computing", details: "Online • 4 weeks", deadline: "11th June" },
  { company: "Simplilearn", role: "AI & ML", details: "Online • 8 weeks", deadline: "14th June" },
  { company: "edX", role: "Cyber Security", details: "Online • 6 weeks", deadline: "16th June" },
  { company: "Internshala", role: "Data Science", details: "Online • 8 weeks", deadline: "18th June" },
  { company: "NPTEL", role: "OS & DBMS", details: "Online • 12 weeks", deadline: "20th June" },
  { company: "Great Learning", role: "AI Foundation", details: "Online • 10 weeks", deadline: "23rd June" },
  { company: "GeeksforGeeks", role: "System Design", details: "Online • 5 weeks", deadline: "25th June" }
];

const ITEMS_PER_PAGE = 7;

export default function TrainingsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(trainings.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = trainings.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="relative">
      <div className="bg-white rounded-xl shadow p-2 sm:p-6 overflow-x-auto divide-y mx-auto">
        {currentItems.map((item, i) => (
          <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 gap-2">
            <span className="font-sB text-base sm:text-lg">{item.company}</span>
            <span className="text-gray-700 text-sm sm:text-base font-sL text-center sm:text-left w-full sm:w-auto">
              {item.role} - {item.details} - {item.deadline}
            </span>
            <button className="font-sL bg-gradient-to-b from-[#3C89C9] to-[#235782] text-white px-6 py-2 rounded-md flex items-center gap-2 shadow text-sm">
              View <HiOutlineArrowRight size={18} />
            </button>
          </div>
        ))}
      </div>
      {/* Centered Pagination BELOW the card, matching card's width */}
      <div className="flex justify-center mt-6 max-w-3xl mx-auto">
        <Pagination
          current={currentPage}
          total={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

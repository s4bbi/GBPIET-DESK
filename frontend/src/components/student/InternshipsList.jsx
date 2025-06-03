import React, { useState } from "react";
import { HiOutlineArrowRight } from "react-icons/hi";
import Pagination from "../common/Pagination";

const internships = [
  { company: "Microsoft", role: "Software Intern", details: "Remote • 2 months", deadline: "5th June" },
  { company: "Google", role: "UI/UX Intern", details: "On Site • 3 months", deadline: "6th June" },
  { company: "Amazon", role: "Backend Intern", details: "Remote • 6 months", deadline: "10th June" },
  { company: "Flipkart", role: "Frontend Intern", details: "Hybrid • 3 months", deadline: "12th June" },
  { company: "Adobe", role: "ML Intern", details: "On Site • 2 months", deadline: "15th June" },
  { company: "Swiggy", role: "Mobile Dev Intern", details: "Remote • 2 months", deadline: "18th June" },
  { company: "Zomato", role: "React Intern", details: "Hybrid • 3 months", deadline: "20th June" },
  { company: "Paytm", role: "DevOps Intern", details: "Remote • 2 months", deadline: "22nd June" },
  { company: "TCS", role: "Security Intern", details: "On Site • 2 months", deadline: "25th June" },
  { company: "Infosys", role: "Java Intern", details: "Hybrid • 3 months", deadline: "30th June" }
];

const ITEMS_PER_PAGE = 7;

export default function InternshipsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(internships.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = internships.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
        <Pagination current={currentPage} total={totalPages} onPageChange={setCurrentPage} />
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { HiOutlineArrowRight } from "react-icons/hi";
import Pagination from "./Pagination"; // Import your custom pagination component

const jobs = [
  { company: "Microsoft", role: "Data Analyst", details: "On Site • Full Time", deadline: "27th May" },
  { company: "Google", role: "Frontend Developer", details: "On Site • 3 months", deadline: "28th May" },
  { company: "Amazon", role: "Data Analyst", details: "On Site • 6 months", deadline: "27th May" },
  { company: "Adobe", role: "Data Analyst", details: "On Site • 6 months", deadline: "27th May" },
  { company: "Infosys", role: "Data Analyst", details: "On Site • 6 months", deadline: "27th May" },
  { company: "IBM", role: "Data Analyst", details: "On Site • 6 months", deadline: "27th May" },
  { company: "TCS", role: "Data Analyst", details: "On Site • 6 months", deadline: "27th May" },
  { company: "S4BBI", role: "Data Analyst", details: "On Site • 6 months", deadline: "27th May" },
  { company: "Capgemini", role: "Backend Developer", details: "Remote • 3 months", deadline: "29th May" },
  { company: "Wipro", role: "UI/UX Designer", details: "Hybrid • 6 months", deadline: "30th May" },
];

const JOBS_PER_PAGE = 7;

export default function JobsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(jobs.length / JOBS_PER_PAGE);

  const start = (currentPage - 1) * JOBS_PER_PAGE;
  const end = start + JOBS_PER_PAGE;
  const visibleJobs = jobs.slice(start, end);

  return (
    <div>
      <div className="bg-white rounded-xl shadow p-2 sm:p-6 overflow-x-auto">
        <div className="divide-y">
          {visibleJobs.map((job, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 gap-2"
            >
              <span className="font-sB text-base sm:text-lg w-40">{job.company}</span>

              <div className="text-gray-700 text-sm sm:text-base font-sL text-center flex-1">
                {job.role} - {job.details} - {job.deadline}
              </div>

              <button className="font-sL bg-gradient-to-b from-[#3C89C9] to-[#235782] text-white px-6 py-2 rounded-md flex items-center gap-2 shadow text-sm">
                View <HiOutlineArrowRight size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

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

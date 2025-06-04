import React, { useState } from "react";
import Layout from "../../components/layouts/AdminLayout";
import JobsList from "../../components/common/JobsList.jsx";
import { HiOutlineUpload } from "react-icons/hi";

export default function PostJobs() {
  const [search, setSearch] = useState("");

  const handleViewJob = (job) => {
    alert(`Viewing job at ${job.company}: ${job.role}`);
  };

  const handleAddJob = () => {
    alert("Open job posting form (to be implemented)");
  };

  return (
    <Layout active="Post Jobs">
      <div className="max-w-full mx-auto p-4 sm:p-6">
        <h2 className="text-2xl font-sB mb-8 -mt-6 -ml-2">Recently Posted Jobs</h2>
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <div className="flex w-full justify-between mx-auto">
            <input
              type="text"
              placeholder="Search jobs..."
              className=" px-4 py-2 rounded-full w-full sm:w-72 shadow-sm focus:outline-none focus:ring-1 focus:ring-[#235782] text-sm sm:text-base border border-gray-300"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button
              className="flex gap-2 items-center bg-gradient-to-b from-[#3C89C9] to-[#235782] text-white px-5 py-2 rounded-full font-sM text-sm md:text-base shadow"
              onClick={handleAddJob}
            >
              Upload
              <HiOutlineUpload className="w-6 h-4 md:w-8 md:h-5" />
            </button>
          </div>
        </div>
        <JobsList onViewJob={handleViewJob} search={search} />
      </div>
    </Layout>
  );
}

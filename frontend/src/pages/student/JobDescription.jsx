import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../components/layouts/StudentLayout";

export default function JobDescription() {
  const { id } = useParams(); // Get job ID from route
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/v1/hiring/`);
        const data = await res.json();
        if (res.ok) {
          setJob(data.data); // assuming your response is { success, data }
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Failed to fetch job:", error);
      }
    };

    fetchJob();
  }, [id]);

  if (!job) return <Layout active="Jobs"><div className="p-6">Loading...</div></Layout>;

  return (
    <Layout active="Jobs">
      <div className="p-6 space-y-6">
        {/* Title */}
        <div className="border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-800">{job.companyName}</h2>
          <p className="text-gray-600">
            <span className="font-medium">{job.role}</span> - Remote • {job.type} • {new Date(job.createdAt).toLocaleDateString()}
          </p>
          <div className="mt-2">
            <button className="bg-blue-600 text-white px-5 py-1.5 rounded-full text-sm hover:bg-blue-700 transition">
              Apply ↗
            </button>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-3 text-gray-700 text-sm leading-relaxed">
          <p><strong>Deadline:</strong> {new Date(job.lastDate).toDateString()}</p>
          <p><strong>Location:</strong> {job.location}</p>
          <p><strong>Eligibility:</strong> {job.eligibility}</p>
          <p><strong>For Batch:</strong> {job.batch}</p>
          <p><strong>For Department:</strong> {job.departments?.join(", ")}</p>
        </div>

        {/* Job Description */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Job Description</h3>
          <p className="text-gray-700 whitespace-pre-line text-sm">{job.description}</p>
        </div>

        {/* Qualifications */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Qualifications</h3>
          <p className="text-gray-700 whitespace-pre-line text-sm">{job.qualifications}</p>
        </div>
      </div>
    </Layout>
  );
}

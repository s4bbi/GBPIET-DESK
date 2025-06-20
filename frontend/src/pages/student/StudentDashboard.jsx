import React from 'react';
import Layout from '../../components/layouts/StudentLayout';
import WelcomeCard from '../../components/student/WelcomeCard';
import JobCard from '../../components/student/JobCard';
import ProfileActions from '../../components/student/ProfileActions';
import ProfileCompletion from '../../components/student/ProfileCompletion';
import { jobs } from "../../utils/jobs.js";

export default function StudentDashboard() {
  // ✅ Get user data from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Layout active="Dashboard">
      <WelcomeCard
        name={user?.name || "Student"}
        branch={user?.department || "Branch"}
        batch={user?.batch || "Batch"}
      />
      
      <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
        {/* Left: Latest Jobs */}
        <div className="flex-1">
          <div className="bg-white rounded-xl shadow p-4 md:p-8">
            <h2 className="text-lg md:text-2xl font-sB mb-4 md:mb-6">Latest Job Openings</h2>
            <div className="flex flex-col gap-3 md:gap-4 max-h-80 overflow-y-auto">
              {jobs.map((job, i) => (
                <JobCard key={i} {...job} />
              ))}
            </div>
          </div>
        </div>

        {/* Right: Profile Actions & Completion */}
        <div className="w-full lg:w-72 flex flex-col gap-4 md:gap-6">
          <ProfileActions />
          <ProfileCompletion percent={82} />
        </div>
      </div>
    </Layout>
  );
}

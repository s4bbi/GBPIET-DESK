import React from 'react';
// src/pages/Dashboard.js
import Sidebar from '../components/Sidebar.jsx';
import Header from '../components/Header.jsx';
import WelcomeCard from '../components/WelcomeCard.jsx';
import JobCard from '../components/JobCard.jsx';
import ProfileActions from '../components/ProfileActions.jsx';
import ProfileCompletion from '../components/ProfileCompletion.jsx';

const jobs = [
  {
    company: "Microsoft",
    role: "Data Analyst",
    type: "On Site",
    duration: "6 months",
    deadline: "27th May",
  },
  {
    company: "CosmicAI",
    role: "ML Engineer",
    type: "Remote",
    duration: "4 months",
    deadline: "29th May",
  },
  {
    company: "TCS",
    role: "System Designer",
    type: "Remote",
    duration: "1 month",
    deadline: "1st June",
  },
];

export default function Dashboard() {
  return (
     <div className="flex min-h-screen bg-[#F5F5F5]">
      <div className="hidden md:flex">
        <Sidebar /> {/* <-- Sidebar is always in the flex row */}
      </div>
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 md:p-8 flex flex-col gap-4 md:gap-6">
          <WelcomeCard name="Yashpreet Singh" branch="CSE" batch="2022-2026" />
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
        </main>
      </div>
    </div>
  );
}

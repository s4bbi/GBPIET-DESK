// src/pages/JobsPage.jsx
import React from "react";
import Layout from "../../components/layouts/StudentLayout";
import JobsList from "../../components/student/JobsList";
import Pagination from "../../components/common/Pagination";

export default function JobsPage() {
  return (
    <Layout active="Jobs">
      <h1 className="text-2xl lg:text-4xl font-sR mb-4 sm:mb-6 text-center sm:text-left">Explore Opportunities</h1>
      <JobsList />
      
    </Layout>
  );
}

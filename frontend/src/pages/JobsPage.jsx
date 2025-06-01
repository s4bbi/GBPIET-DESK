// src/pages/JobsPage.jsx
import React from "react";
import Layout from "../components/Layout";
import JobsList from "../components/JobsList";
import Pagination from "../components/Pagination";

export default function JobsPage() {
  return (
    <Layout active="Jobs">
      <h1 className="text-2xl lg:text-4xl font-sR mb-4 sm:mb-6 text-center sm:text-left">Explore Opportunities</h1>
      <JobsList />
      
    </Layout>
  );
}

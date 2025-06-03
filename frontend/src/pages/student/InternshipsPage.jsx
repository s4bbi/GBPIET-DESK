import React from "react";
import Layout from "../../components/layouts/StudentLayout";
import InternshipsList from "../../components/student/InternshipsList";

export default function InternshipsPage() {
  return (
     <Layout active="Jobs">
          <h1 className="text-2xl lg:text-4xl font-sR mb-4 sm:mb-6 text-center sm:text-left">Explore the latest Internships</h1>
          <InternshipsList />
      </Layout>
  );
}

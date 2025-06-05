import React from "react"; 
import "../index.css"
import StudentDashboard from "../pages/student/StudentDashboard";
import JobsPage from "../pages/student/JobsPage";
import InternshipsPage from "../pages/student/InternshipsPage";
import TrainingsPage from "../pages/student/TrainingsPage";

const studentRoutes = [
  { path: "/dashboard", element: <StudentDashboard /> },
  { path: "/jobs", element: <JobsPage /> },
  { path: "/internships", element: <InternshipsPage /> },
  { path: "/trainings", element: <TrainingsPage /> },
];

export default studentRoutes;

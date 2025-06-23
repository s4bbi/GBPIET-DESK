import React from "react"; 
import "../index.css"
import StudentDashboard from "../pages/student/StudentDashboard";
import JobsPage from "../pages/student/JobsPage";
import InternshipsPage from "../pages/student/InternshipsPage";
import TrainingsPage from "../pages/student/TrainingsPage";
import StudentProfile from "../pages/student/StudentProfile";
import ResetPassword from "../components/student/ResetPassword";

const studentRoutes = [
  { path: "/dashboard", element: <StudentDashboard /> },
  { path: "/jobs", element: <JobsPage /> },
  { path: "/internships", element: <InternshipsPage /> },
  { path: "/trainings", element: <TrainingsPage /> },
  { path: "/profile/:id", element: <StudentProfile /> },
  {path: "/reset-password/:token", element: <ResetPassword /> }

];

export default studentRoutes;

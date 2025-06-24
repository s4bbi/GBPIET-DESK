import React from "react";
import "../index.css";
import StudentDashboard from "../pages/student/StudentDashboard";
import JobsPage from "../pages/student/JobsPage";
import InternshipsPage from "../pages/student/InternshipsPage";
import TrainingsPage from "../pages/student/TrainingsPage";
import StudentProfile from "../pages/student/StudentProfile";
import ResetPassword from "../components/student/ResetPassword";
import ProtectedRoute from "../pages/auth/ProtectedRoute";  // ✅ Correct import

const studentRoutes = [
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute allowedRole="student">
        <StudentDashboard />
      </ProtectedRoute>
    )
  },
  {
    path: "/jobs",
    element: (
      <ProtectedRoute allowedRole="student">
        <JobsPage />
      </ProtectedRoute>
    )
  },
  {
    path: "/internships",
    element: (
      <ProtectedRoute allowedRole="student">
        <InternshipsPage />
      </ProtectedRoute>
    )
  },
  {
    path: "/trainings",
    element: (
      <ProtectedRoute allowedRole="student">
        <TrainingsPage />
      </ProtectedRoute>
    )
  },
  {
    path: "/profile/:id",
    element: (
      <ProtectedRoute allowedRole="student">
        <StudentProfile />
      </ProtectedRoute>
    )
  },
  {
    path: "/reset-password/:token",
    element: <ResetPassword />   // this is public
  }
];

export default studentRoutes;

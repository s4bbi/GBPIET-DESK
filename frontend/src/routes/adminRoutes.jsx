import React from "react";
import "../index.css"
import AdminDashboard from "../pages/admin/AdminDashboard";
import StudentsData from "../pages/admin/StudentsData";
import PostJobs from "../pages/admin/PostJobs";
import PostTrainings from "../pages/admin/PostTrainings";
import PostInternships from "../pages/admin/PostInternships";
import UploadJobs from '../pages/admin/UploadJobs';
import UploadInternships from '../pages/admin/UploadInternships';
import UploadTrainings from '../pages/admin/UploadInternships';
import ProtectedRoute from "../pages/auth/ProtectedRoute";  // ✅ Add protection here too

const adminRoutes = [
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute allowedRole="admin">
        <AdminDashboard />
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/students",
    element: (
      <ProtectedRoute allowedRole="admin">
        <StudentsData />
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/jobs",
    element: (
      <ProtectedRoute allowedRole="admin">
        <PostJobs />
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/trainings",
    element: (
      <ProtectedRoute allowedRole="admin">
        <PostTrainings />
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/internships",
    element: (
      <ProtectedRoute allowedRole="admin">
        <PostInternships />
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/post-job",
    element: (
      <ProtectedRoute allowedRole="admin">
        <UploadJobs />
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/post-internship",
    element: (
      <ProtectedRoute allowedRole="admin">
        <UploadInternships />
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/post-training",
    element: (
      <ProtectedRoute allowedRole="admin">
        <UploadTrainings />
      </ProtectedRoute>
    )
  }
];

export default adminRoutes;

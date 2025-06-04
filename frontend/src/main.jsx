// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./pages/App.jsx";
import Login from "./pages/auth/Login.jsx";
import Signup from "./pages/auth/Signup.jsx";
import JobsPage from "./pages/student/JobsPage.jsx";
import InternshipsPage from "./pages/student/InternshipsPage.jsx";
import TrainingsPage from "./pages/student/TrainingsPage.jsx";
import StudentDashboard from "./pages/student/StudentDashboard.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import StudentsData from "./pages/admin/StudentsData.jsx";
import PostJobs from "./pages/admin/PostJobs.jsx";
import PostInternships from "./pages/admin/PostInternships.jsx";
import PostTrainings from "./pages/admin/PostTrainings.jsx";

// Optional: Create a fallback or 404 page later if needed
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Signup /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/dashboard", element: <StudentDashboard /> },
      { path: "/jobs", element: <JobsPage /> },
      { path: "/internships", element: <InternshipsPage /> },
      { path: "/trainings", element: <TrainingsPage /> },
      { path: "/admin/dashboard", element: <AdminDashboard /> },
      { path: "/admin/students", element: <StudentsData /> },
      { path: "/admin/jobs", element: <PostJobs /> },
      { path: "/admin/internships", element: <PostInternships /> },
      { path: "/admin/trainings", element: <PostTrainings /> },

    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

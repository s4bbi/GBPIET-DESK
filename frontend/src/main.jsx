// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./pages/App.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import JobsPage from "./pages/JobsPage.jsx";
import InternshipsPage from "./pages/InternshipsPage.jsx";
import TrainingsPage from "./pages/TrainingsPage.jsx";

// Optional: Create a fallback or 404 page later if needed
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Signup /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/jobs", element: <JobsPage /> },
      { path: "/internships", element: <InternshipsPage /> },
      { path: "/trainings", element: <TrainingsPage /> },

    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

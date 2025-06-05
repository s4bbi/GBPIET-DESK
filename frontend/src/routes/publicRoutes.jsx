import React from "react";
import "../index.css"
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";

const publicRoutes = [
  { path: "/", element: <Signup /> },
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },
  { path: "*", element: <div className="text-center mt-20 text-xl font-sB">404 - Page Not Found</div> },
];

export default publicRoutes;

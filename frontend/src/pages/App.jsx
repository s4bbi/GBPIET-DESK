// src/pages/App.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const App = () => {
  return (
    <div className="app">
      {/* Common layout like header/footer can go here */}
      <Outlet />
    </div>
  );
};

export default App;

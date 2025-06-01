// src/components/Layout.jsx
import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout({ children, active }) {
  return (
    <div className="flex bg-[#F5F5F5] min-h-screen">
      {/* Sidebar */}
      <div className="hidden md:block">
        <Sidebar active={active} />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-4 sm:p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}

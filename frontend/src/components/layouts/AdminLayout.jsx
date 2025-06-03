// src/components/Layout.jsx
import React from "react";
import Header from "../common/Header";
import AdminSidebar from "../admin/AdminSidebar";

export default function Layout({ children, active }) {
  return (
    <div className="flex bg-[#F5F5F5] min-h-screen">
      {/* Sidebar */}
      <div className="hidden md:block">
        <AdminSidebar active={active} />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 px-4 pb-6 sm:px-6 md:px-8">{children}</main>
      </div>
    </div>
  );
}

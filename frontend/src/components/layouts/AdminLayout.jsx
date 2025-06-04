// src/components/layouts/AdminLayout.jsx
import React from "react";
import AdminSidebar from "../admin/AdminSidebar"; // ✅ Ensure it's ADMIN sidebar
import Header from "../common/Header";

export default function AdminLayout({ active, children }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar active={active} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

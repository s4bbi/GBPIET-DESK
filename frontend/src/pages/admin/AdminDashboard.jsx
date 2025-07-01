import React, { useState, useEffect } from "react";
import {
  HiOutlineUserGroup,
  HiOutlineBriefcase,
  HiUsers,
} from "react-icons/hi";
import StatsCard from "../../components/admin/StatsCard";
import AdminList from "../../components/admin/AdminList";
import Layout from "../../components/layouts/AdminLayout";
import LineChart from "../../components/admin/LineChart";
import BranchPieChart from "../../components/admin/BranchPieChart";
import api from "../../api"; // ✅ Centralized Axios instance

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalHirings: 0,
    totalAdmin: 0,
  });

  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    fetchAdmins();
  }, []); // ✅ Only run once on mount

  const fetchStats = async () => {
    try {
      const res = await api.get("/api/v1/admin/stats");
      setStats(res.data?.data || {});
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchAdmins = async () => {
    try {
      const res = await api.get("/api/v1/admin/all");
      setAdmins(res.data?.data || []);
    } catch (error) {
      console.error("Error fetching admins:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/v1/admin/${id}`);
      setAdmins((prev) => prev.filter((admin) => admin._id !== id));
      setStats((prev) => ({ ...prev, totalAdmin: prev.totalAdmin - 1 }));
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };

  return (
    <Layout active="Dashboard">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-sB mb-6 -mt-6">
        <StatsCard
          title="Total Students Enrolled"
          count={stats.totalStudents}
          icon={<HiOutlineUserGroup />}
        />
        <StatsCard
          title="Total Jobs Posted"
          count={stats.totalHirings}
          icon={<HiOutlineBriefcase />}
        />
        <StatsCard
          title="Total Admins"
          count={stats.totalAdmin}
          icon={<HiUsers />}
        />
      </div>

      {/* Admin List and Pie Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <AdminList admins={admins} onDelete={handleDelete} loading={loading} />
        <BranchPieChart />
      </div>

      {/* Line Chart */}
      <div className="mt-6">
        <LineChart />
      </div>
    </Layout>
  );
}

import React, { useState, useEffect } from "react";
import axios from "axios";
import { HiOutlineUserGroup, HiOutlineBriefcase, HiUsers } from "react-icons/hi";
import StatsCard from "../../components/admin/StatsCard";
import AdminList from "../../components/admin/AdminList";
import Layout from "../../components/layouts/AdminLayout";
import ActivityLog from "../../components/admin/ActivityLog";
import LineChart from "../../components/admin/LineChart";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalHirings: 0,
    totalAdmin: 0
  });

  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    fetchAdmins();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/v1/admin/stats", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setStats(response.data.data || {});
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchAdmins = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/v1/admins/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setAdmins(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching admins:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/v1/admins/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setAdmins(prev => prev.filter(admin => admin._id !== id));
      setStats(prev => ({ ...prev, totalAdmin: prev.totalAdmin - 1 }));
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };

  const logs = [
    { message: "Ayush Joshi added a new job post.", time: "07:23 AM" },
    { message: "Yashpreet Singh removed an admin", time: "05:41 PM" },
    { message: "24 more students enrolled yesterday!", time: "Yesterday" }
  ];

  return (
    <Layout active="Dashboard">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-sB mb-6">
        <StatsCard title="Total Students Enrolled" count={stats.totalStudents} icon={<HiOutlineUserGroup />} />
        <StatsCard title="Total Jobs Posted" count={stats.totalHirings} icon={<HiOutlineBriefcase />} />
        <StatsCard title="Total Admins" count={stats.totalAdmin} icon={<HiUsers />} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <AdminList admins={admins} onDelete={handleDelete} loading={loading} />
        <ActivityLog logs={logs} />
      </div>

      <div className="mt-6">
        <LineChart />
      </div>
    </Layout>
  );
}

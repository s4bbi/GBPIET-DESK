import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  HiOutlineLogout,
  HiOutlineBriefcase,
  HiOutlineAcademicCap,
  HiOutlineClipboardList,
  HiOutlineTemplate,
  HiOutlineIdentification
} from "react-icons/hi";

export default function Sidebar() {
  const location = useLocation();

  // Define your nav items with their paths
  const navItems = [
    {
      label: "Dashboard",
      icon: <HiOutlineTemplate size={22} />,
      to: "/dashboard"
    },
    {
      label: "Jobs",
      icon: <HiOutlineBriefcase size={22} />,
      to: "/jobs"
    },
    {
      label: "Internships",
      icon: <HiOutlineClipboardList size={22} />,
      to: "/internships"
    },
    {
      label: "Trainings",
      icon: <HiOutlineIdentification size={22} />,
      to: "/trainings"
    }
  ];

  return (
    <aside className="w-64 bg-gradient-to-b from-[#3C89C9] to-[#235782] text-white flex flex-col justify-between py-8 px-4 min-h-3/4 m-10 rounded-2xl">
      <div>
        <div className="flex flex-col items-center mb-10">
          <div className="bg-[#498BC6] w-24 h-24 rounded-full p-4 mb-2 flex justify-center items-center">
            <HiOutlineAcademicCap size={48} className='flex items-center' />
          </div>
        </div>
        <nav className="flex flex-col gap-2 text-center font-sM">
          {navItems.map(({ label, icon, to }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={label}
                to={to}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition
                  ${isActive
                    ? 'bg-white text-[#235782] font-bold'
                    : 'text-gray-200 hover:bg-[#498BC6] hover:text-white'
                  }`}
              >
                {icon}
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
      <button className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#5f8db4] transition font-sB">
        <HiOutlineLogout size={22} />
        Logout
      </button>
    </aside>
  );
}

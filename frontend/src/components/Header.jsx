import React from 'react'
import { HiOutlineUserCircle } from "react-icons/hi";

export default function Header() {
  return (
    <header className="flex items-center justify-between gap-10 sm:gap-0 m-6 sm:m-10">
      <input
        type="text"
        placeholder="Search"
        className="w-full sm:w-1/3 px-4 py-2 rounded-full border border-gray-300 shadow-sm focus:outline-none text-sm sm:text-base"
      />
      <div className="flex items-center gap-2">
        <HiOutlineUserCircle size={28} className="text-gray-700" />
        <span className="font-sM text-gray-700 text-sm sm:text-base hidden sm:flex">Yashpreet Singh</span>
      </div>
    </header>
  );
}

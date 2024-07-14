import React from "react";
import { IoNotificationsOutline, IoPersonCircleOutline } from "react-icons/io5";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button className="text-gray-500 hover:text-orange-600 focus:outline-none focus:text-orange-600 mr-4"></button>
            <span className="text-2xl font-bold text-orange-600">
              Public Library
            </span>
          </div>
          <div className="flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="bg-gray-100 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
              />
              <span className="absolute left-3 top-2 text-gray-400">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </span>
            </div>
            <button className="ml-4 text-gray-500 hover:text-orange-600 focus:outline-none focus:text-orange-600">
              <IoNotificationsOutline className="h-6 w-6" />
            </button>
            <button className="ml-4 text-gray-500 hover:text-orange-600 focus:outline-none focus:text-orange-600">
              <IoPersonCircleOutline className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

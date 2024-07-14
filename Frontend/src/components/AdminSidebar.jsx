import React from "react";
import {
  IoHomeOutline,
  IoSearchOutline,
  IoBookOutline,
  IoSettingsOutline,
  IoHelpCircleOutline,
} from "react-icons/io5";
import { RiDashboardLine, RiUserLine, RiBookletLine } from "react-icons/ri";

export default function AdminSidebar() {
  return (
    <div className="bg-gradient-to-b  overflow-y-hidden from-orange-600 to-orange-800 w-64 min-h-screen text-white">
      <div className="p-6">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
      </div>
      <nav className="mt-6">
        <SidebarLink icon={<RiDashboardLine />} text="Dashboard" />
        <SidebarLink icon={<IoHomeOutline />} text="Home" />
        <SidebarLink icon={<IoSearchOutline />} text="Search" />
        <SidebarLink icon={<IoBookOutline />} text="Books" />
        <SidebarLink icon={<RiUserLine />} text="Users" />
        <SidebarLink icon={<RiBookletLine />} text="Loans" />
        <SidebarLink icon={<IoSettingsOutline />} text="Settings" />
      </nav>
      <div className="absolute bottom-0 w-full p-6 border-t border-orange-500">
        <FooterLink icon={<IoHelpCircleOutline />} text="Help & Support" />
      </div>
    </div>
  );
}

function SidebarLink({ icon, text }) {
  return (
    <a
      href="#"
      className="flex items-center px-6 py-3 text-white hover:bg-orange-700 transition-colors duration-200">
      <span className="mr-4 text-xl">{icon}</span>
      <span className="text-sm font-medium">{text}</span>
    </a>
  );
}

function FooterLink({ icon, text }) {
  return (
    <a
      href="#"
      className="flex items-center text-sm text-white hover:text-orange-200">
      <span className="mr-2 text-lg">{icon}</span>
      {text}
    </a>
  );
}

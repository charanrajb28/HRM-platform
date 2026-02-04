"use client";

import Link from "next/link";
import { ReactNode } from "react";

const sidebarMenus = [
    {id:1, label:"Overview", href:"/dashboard"},
    {id:2, label:"Attendance", href:"/dashboard/attendance"},
    {id:3, label:"Leave", href:"/dashboard/leave"},
    {id:4, label:"Approval", href:"/dashboard/approval"},
    {id:5, label:"HR Reports", href:"/dashboard/hr_reports"},
    {id:6, label:"General Setup", href:"/dashboard/general_setup"},
    {id:7, label:"Payrolsl", href:"/dashboard/payrosll"},
    {id:8, label:"Shift Setup", href:"/dashboard/Shift Setup"},
    {id:9, label:"Employee Management", href:"/dashboard/employee_management"},
    {id:10, label:"Management", href:"/dashboard/management"},
    {id:11, label:"Performance", href:"/dashboard/performance"},
]

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold">Dashboard</h2>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {sidebarMenus.map((menu) => (
              <li key={menu.id}>
                <Link
                  href={menu.href}
                  className="block px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  {menu.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button className="w-full px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-gray-50">
        {children}
      </main>
    </div>
  );
}

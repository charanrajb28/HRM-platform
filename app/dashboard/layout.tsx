"use client";

import Link from "next/link";
import { ReactNode } from "react";

const sidebarMenus = [
  { id: 1, label: "Overview", href: "/dashboard" },
  { id: 2, label: "Students", href: "/dashboard/students" },
  { id: 3, label: "Teachers", href: "/dashboard/teachers" },
  { id: 4, label: "Classes", href: "/dashboard/classes" },
  { id: 5, label: "Reports", href: "/dashboard/reports" },
  { id: 6, label: "Settings", href: "/dashboard/settings" },
];

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

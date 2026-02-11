"use client";

import Link from "next/link";
import { ReactNode, useState, useEffect } from "react";
import { usePathname , useSearchParams} from "next/navigation";

const sidebarMenus = [
    {id:1, label:"Overview", href:"/dashboard"},
    {id:2, label:"Attendance", href:"#", subItems:[
      { id: "2-1", label: "Report", href: "/dashboard/attendance/report" },
      { id: "2-2", label: "Summary", href: "/dashboard/attendance/summary" },
    ]},
    {id:3, label:"Leave", href:"/dashboard/leave", subItems:[
      { id: "3-1", label: "Requests", href: "/dashboard/leave/requests" },
      { id: "3-2", label: "Balances", href: "/dashboard/leave/balances" },
    ]},
    {id:4, label:"Approval", href:"/dashboard/approval"},
    {id:5, label:"HR Reports", href:"/dashboard/hr_reports", subItems:[
      { id: "5-1", label: "Headcount", href: "/dashboard/hr_reports/headcount" },
      { id: "5-2", label: "Turnover", href: "/dashboard/hr_reports/turnover" },
    ]},
    {id:6, label:"General Setup", href:"/dashboard/general_setup", subItems:[
      { id: "6-1", label: "Departments", href: "/dashboard/general_setup/departments" },
      { id: "6-2", label: "Locations", href: "/dashboard/general_setup/locations" },
    ]},
    {id:7, label:"Payroll", href:"/dashboard/payroll", subItems:[
      { id: "7-1", label: "Runs", href: "/dashboard/payroll/runs" },
      { id: "7-2", label: "Deductions", href: "/dashboard/payroll/deductions" },
    ]},
    {id:8, label:"Shift Setup", href:"/dashboard/shift-setup", subItems:[
      { id: "8-1", label: "Shifts", href: "/dashboard/shift-setup/shifts" },
      { id: "8-2", label: "Policies", href: "/dashboard/shift-setup/policies" },
    ]},
    {id:9, label:"Employee Management", href:"/dashboard/employee_management", subItems:[
      { id: "9-1", label: "Employee Info", href: "/dashboard/employee_management/emp_info" },
      { id: "9-2", label: "Department", href: "/dashboard/employee_management/department" },
    ]},
    {id:10, label:"Management", href:"/dashboard/management", subItems:[
      { id: "10-1", label: "Teams", href: "/dashboard/management/teams" },
      { id: "10-2", label: "Roles", href: "/dashboard/management/roles" },
    ]},
    {id:11, label:"Performance", href:"/dashboard/performance", subItems:[
      { id: "11-1", label: "Goals", href: "/dashboard/performance/goals" },
      { id: "11-2", label: "Reviews", href: "/dashboard/performance/reviews" },
    ]},
]

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [expandedMenuId, setExpandedMenuId] = useState<number | null>(null);
  const pathname= usePathname();
  const searchParams= useSearchParams();

  const toggleMenu = (menuId: number, hasSubItems: boolean) => {
    if (!hasSubItems) return;
    setExpandedMenuId((current) => (current === menuId ? null : menuId));
  };

  useEffect(()=>{
    const activeMenu=sidebarMenus.find(menu=>
      menu.subItems?.some(sub=>pathname.startsWith(sub.href))
    );
    if(activeMenu){
      setExpandedMenuId(activeMenu.id);
    }
  },[pathname]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold">Dashboard</h2>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {sidebarMenus.map((menu) => {
              const hasSubItems = Boolean(menu.subItems?.length);
              const isExpanded = expandedMenuId === menu.id;

              return (
                <li key={menu.id}>
                  <div className="flex items-center gap-2">
                    {hasSubItems ? (
                      <button
                        type="button"
                        onClick={() => toggleMenu(menu.id, hasSubItems)}
                        className="flex-1 px-4 py-2 rounded-lg text-left hover:bg-gray-700 transition-colors"
                        aria-expanded={isExpanded}
                        aria-controls={`submenu-${menu.id}`}
                      >
                        {menu.label}
                      </button>
                    ) : (
                      <Link
                        href={menu.href}
                        className="flex-1 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        {menu.label}
                      </Link>
                    )}
                    {hasSubItems && (
                      <button
                        type="button"
                        onClick={() => toggleMenu(menu.id, hasSubItems)}
                        className="flex h-7 w-7 items-center justify-center rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                        aria-expanded={isExpanded}
                        aria-controls={`submenu-${menu.id}`}
                      >
                        <svg
                          viewBox="0 0 20 20"
                          className={`h-4 w-4 transition-transform ${
                            isExpanded ? "rotate-90" : "rotate-0"
                          }`}
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L11.586 10 7.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    )}
                  </div>

                  {hasSubItems && isExpanded && (
                    <ul id={`submenu-${menu.id}`} className="mt-1 space-y-1 pl-4">
                      {menu.subItems?.map((subItem) => (
                        <li key={subItem.id}>
                          <Link
  href={`${subItem.href}?${searchParams.toString()}`}
  className={`block px-3 py-1.5 rounded-md text-sm transition-colors ${
    pathname === subItem.href
      ? "bg-gray-700 text-white"
      : "text-gray-300 hover:bg-gray-800 hover:text-white"
  }`}
>
  {subItem.label}
</Link>

                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
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

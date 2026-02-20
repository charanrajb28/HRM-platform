"use client";
import { useState } from "react";
import Link from "next/link";

import { departments as db_departments, employees as db_employees } from "@/app/data/dummy";

export default function EmpManagementLayout({ children, }: { children: React.ReactNode; }) {
  const [department, setDepartment] = useState("Department");
  const [employee, setEmployee] = useState("Employee");

  const [deptOpen, setDeptOpen] = useState(false);
  const [empOpen, setEmpOpen] = useState(false);

  const data: Record<string, string[]> = {};
  db_departments.forEach(dep => {
    data[dep.name] = db_employees.filter(emp => emp.departmentId === dep.id).map(emp => emp.name);
  });

  const departments = Object.keys(data);
  const employees =
    department === "Department" ? [] : data[department] || [];


  return (
    <div className="h-screen bg-blue-50 text-gray-600">
      <h1 className="mb-4 font-semibold">Employee Info</h1>
      <div className="w-full bg-white py-3 my-3">
        {/* SIDE BY SIDE */}
        <div className="flex gap-4 w-full px-4">
          {/* Department Dropdown */}
          <div className="relative w-lg">
            <button
              onClick={() => setDeptOpen(!deptOpen)}
              className="w-full border px-4 py-2 flex justify-between bg-white"
            >
              {department} <span>⌄</span>
            </button>

            {deptOpen && (
              <div className="absolute z-20 mt-1 w-full bg-white border rounded shadow">
                <ul>
                  {departments.map((d) => (
                    <li
                      key={d}
                      onClick={() => {
                        setDepartment(d);
                        setEmployee("Employee"); // reset
                        setDeptOpen(false);
                      }}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Employee Dropdown */}
          <div className="relative w-lg">
            <button
              disabled={department === "Department"}
              onClick={() => setEmpOpen(!empOpen)}
              className="w-full border px-4 py-2 rounded flex justify-between bg-white disabled:opacity-50"
            >
              {employee} <span>⌄</span>
            </button>

            {empOpen && (
              <div className="absolute z-20 mt-1 w-full bg-white border rounded shadow">
                <ul>
                  {employees.map((e) => (
                    <li
                      key={e}
                      onClick={() => {
                        setEmployee(e);
                        setEmpOpen(false);
                      }}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
            )}


          </div>
          <button className="bg-blue-500 text-white px-4 h-10">Show</button>
          <button className="bg-green-400 text-white px-4 h-10 min-w-[110px]">Add New</button>
          <button className="bg-red-500 text-white px-4 h-10">Import</button>
        </div>
      </div>

      <div className=" w-full py-3 my-3"> {children}</div>
    </div>

  );
}
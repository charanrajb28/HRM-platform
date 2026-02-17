"use client";

import { useState } from "react";

// Use your employees dummy data here
import { employees } from "../lib/dummyData"; // adjust path if needed

export default function AttendanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [empOpen, setEmpOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col gap-4 p-8">

      {/* Page Title */}
      <header className="text-2xl font-bold text-gray-800">
        Attendance Report
      </header>

      {/* Filter Card */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm px-6 py-4">
        <div className="flex flex-wrap gap-4 items-end">

          {/* Employee Dropdown */}
          <div className="relative w-64">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Employee
            </label>

            <button
              onClick={() => setEmpOpen(!empOpen)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 flex justify-between bg-white"
            >
              {selectedEmployee || "Select Employee"} <span>⌄</span>
            </button>

            {empOpen && (
              <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-md shadow">
                <ul>
                  {employees.map((emp) => (
                    <li
                      key={emp.id}
                      onClick={() => {
                        setSelectedEmployee(
                          emp.firstName + " " + emp.lastName
                        );
                        setEmpOpen(false);
                      }}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    >
                      {emp.firstName} {emp.lastName}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Start Date */}
          <div className="flex flex-col w-56">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          {/* End Date */}
          <div className="flex flex-col w-56">
            <label className="text-sm font-medium text-gray-600 mb-1">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 ml-auto">
            <button
              onClick={() => {
                setSelectedEmployee("");
                setStartDate("");
                setEndDate("");
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
            >
              Clear
            </button>

            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Show
            </button>

            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
              Export
            </button>
          </div>

        </div>
      </div>

      {/* Dynamic Content */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 flex-1 overflow-auto">
        {children}
      </div>

    </div>
  );
}

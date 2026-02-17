"use client";
import { useState } from "react";

export default function AttendanceLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <div className="h-screen bg-blue-50 text-gray-600">

      {/* Page Title */}
      <h1 className="mb-4 font-semibold text-lg">
        {title}
      </h1>

      {/* Filter Bar */}
      <div className="w-full bg-white py-3 my-3">
        <div className="flex gap-4 w-full px-4 items-center">

          {/* Name Input */}
          <input
            type="text"
            placeholder="Employee Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border px-4 py-2 rounded bg-white"
          />

          {/* Start Date */}
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border px-4 py-2 rounded bg-white"
          />

          {/* End Date */}
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border px-4 py-2 rounded bg-white"
          />

          {/* Buttons */}
          <button className="bg-blue-500 text-white px-4 h-10">
            Show
          </button>

          <button
            onClick={() => {
              setName("");
              setStartDate("");
              setEndDate("");
            }}
            className="bg-gray-500 text-white px-4 h-10"
          >
            Clear
          </button>

          <button className="bg-green-400 text-white px-4 h-10 min-w-[110px]">
            Export
          </button>

        </div>
      </div>

      {/* Dynamic Content Area */}
      <div className="w-full py-3 my-3 px-4">
        {children}
      </div>

    </div>
  );
}

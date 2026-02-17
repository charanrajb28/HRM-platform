"use client";

import { useState } from "react";

export default function AttendancePage() {
  const [filters, setFilters] = useState({
    name: "",
    startDate: "",
    endDate: "",
  });

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm px-6 py-4">
        <div className="flex gap-4 items-end">
          <input
            type="text"
            placeholder="Employee Name"
            value={filters.name}
            onChange={(e) =>
              setFilters({ ...filters, name: e.target.value })
            }
            className="border px-3 py-2 rounded-md"
          />

          <input
            type="date"
            value={filters.startDate}
            onChange={(e) =>
              setFilters({ ...filters, startDate: e.target.value })
            }
            className="border px-3 py-2 rounded-md"
          />

          <input
            type="date"
            value={filters.endDate}
            onChange={(e) =>
              setFilters({ ...filters, endDate: e.target.value })
            }
            className="border px-3 py-2 rounded-md"
          />
        </div>
      </div>

      <div className="bg-white mt-6 p-6 rounded-lg shadow-sm">
        {/* Attendance table */}
      </div>
    </>
  );
}

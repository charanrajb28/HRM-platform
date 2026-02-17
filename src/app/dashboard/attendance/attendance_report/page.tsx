"use client";

import { useState, useEffect } from "react";

interface AttendanceRow{
  id:string;
  employeeName:string;
  date:string;
  day: string;
  inTime: string;
  outTime: string;
  status: string;
  totalHours: string;
}

export default function AttendanceReportPage() {
  const [filters, setFilters] = useState({
    name: "",
    startDate: "",
    endDate: ""
  });

const [data,setData]= useState<AttendanceRow[]>([]);
const [loading,setLoading]=useState(false);

const fetchAttendance = async()=>{
  setLoading(true);
  const query=new URLSearchParams({
    name:filters.name,
    startDate: filters.startDate,
      endDate: filters.endDate,
  });

  try{
    const res=await fetch(`/api/attendance-report?${query.toString()}`);
    const result=await res.json();
    setData(result);
  }catch(err){
    console.error("Error fetching attendance", err);
  }
  finally{
    setLoading(false);
  }
};

useEffect(()=>{
  fetchAttendance();
},[filters]);

  return (
  <div className="text-black bg-gray-300 flex flex-col gap-4 h-full p-8">
    
    {/* Header */}
    <header className="text-black font-bold text-2xl">
      Attendance Report
    </header>

    {/* Filters Section */}
    <div className="grid grid-cols-4 gap-4 px-6 py-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="col-span-3 flex gap-4">
        <input
          type="text"
          placeholder="Employee Name"
          value={filters.name}
          onChange={(e) =>
            setFilters({ ...filters, name: e.target.value })
          }
          className="border border-gray-300 rounded-md p-2 w-1/3"
        />

        <input
          type="date"
          value={filters.startDate}
          onChange={(e) =>
            setFilters({ ...filters, startDate: e.target.value })
          }
          className="border border-gray-300 rounded-md p-2 w-1/3"
        />

        <input
          type="date"
          value={filters.endDate}
          onChange={(e) =>
            setFilters({ ...filters, endDate: e.target.value })
          }
          className="border border-gray-300 rounded-md p-2 w-1/3"
        />
      </div>

      <div className="flex gap-4 justify-end">
        <button
          onClick={() =>
            setFilters({ name: "", startDate: "", endDate: "" })
          }
          className="bg-blue-500 text-white px-4 py-2 rounded-md w-1/2 hover:bg-blue-600 transition-colors"
        >
          Clear
        </button>
      </div>
    </div>

    {/* Table Section */}
    <div className="px-6 py-3 bg-gray-50 flex flex-col gap-4">
      <h1 className="font-semibold text-lg">Attendance List</h1>

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full text-sm">
          
          <thead className="bg-gray-100 text-left text-gray-700">
            <tr className="border-b border-gray-200">
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Date</th>
              <th className="px-4 py-3 font-semibold">Day</th>
              <th className="px-4 py-3 font-semibold">IN</th>
              <th className="px-4 py-3 font-semibold">OUT</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Total Hours</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                  No records found
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr
                  key={row.id}
                  className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {row.employeeName}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {row.date}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {row.day}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {row.inTime}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {row.outTime}
                  </td>
                  <td
                    className={`px-4 py-3 font-semibold ${
                      row.status === "PRESENT"
                        ? "text-green-600"
                        : row.status === "ABSENT"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {row.status}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {row.totalHours}
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  </div>
);

}

"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function AttendanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Sync input with URL
  useEffect(() => {
    setName(searchParams.get("name") || "");
    setStartDate(searchParams.get("start") || "");
    setEndDate(searchParams.get("end") || "");
  }, [searchParams]);

  const handleSearch = () => {
    if(!name || !startDate || !endDate){
      return;
    }
    const query = new URLSearchParams({
      name,
      start: startDate,
      end: endDate,
    }).toString();

    router.push(`${pathname}?${query}`);
  };

  return (
    <div className="h-screen bg-blue-50 text-gray-600">

      <h1 className="mb-4 font-semibold text-lg">
        Attendance
      </h1>

      {/* Filter Bar */}
      <div className="w-full bg-white py-3 my-3">
        <div className="flex gap-4 w-full px-4 items-center">

          <input
            type="text"
            placeholder="Employee Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-400 px-4 py-2  bg-white"
          />

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-400 px-4 py-2 bg-white"
          />

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-gray-400 px-4 py-2  bg-white"
          />

          {/* <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 h-10"
          >
            Show
          </button> */}
          <button onClick={handleSearch}>
            Show
          </button>

        </div>
      </div>

      {/* Navigation Tabs */}
      

      {/* Main Area */}
      <div className="bg-white mx-4 p-4 ">
        {children}
      </div>

    </div>
  );
}

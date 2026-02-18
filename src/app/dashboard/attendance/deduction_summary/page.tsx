"use client";

import { useState, useMemo } from "react";

type AttendanceRecord = {
  employeeId: number;
  date: string;
  status: "Present" | "Absent";
};

type LeaveRecord = {
  employeeId: number;
  date: string;
  type: "Unpaid" | "Suspension";
};

const employees = [
  {
    id: 1,
    name: "Ibad ur Rahman",
    joiningDate: "2019-01-02",
    separationDate: null,
  },
];

const attendanceData: AttendanceRecord[] = [
  { employeeId: 1, date: "2023-01-01", status: "Absent" },
  { employeeId: 1, date: "2023-01-02", status: "Present" },
  { employeeId: 1, date: "2023-01-03", status: "Absent" },
  { employeeId: 1, date: "2023-01-04", status: "Absent" },
  { employeeId: 1, date: "2023-01-05", status: "Present" },
];

const leaveData: LeaveRecord[] = [
  { employeeId: 1, date: "2023-01-06", type: "Unpaid" },
  { employeeId: 1, date: "2023-01-07", type: "Suspension" },
];

export default function AttendanceSummary() {
  const [selectedEmployee, setSelectedEmployee] = useState(1);
  const [startDate, setStartDate] = useState("2023-01-01");
  const [endDate, setEndDate] = useState("2023-01-31");

  const summary = useMemo(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const employee = employees.find(e => e.id === selectedEmployee);
    if (!employee) return null;

    const filteredAttendance = attendanceData.filter(record => {
      const recordDate = new Date(record.date);
      return (
        record.employeeId === selectedEmployee &&
        recordDate >= start &&
        recordDate <= end
      );
    });

    const filteredLeaves = leaveData.filter(record => {
      const recordDate = new Date(record.date);
      return (
        record.employeeId === selectedEmployee &&
        recordDate >= start &&
        recordDate <= end
      );
    });

    const absentDays = filteredAttendance.filter(
      r => r.status === "Absent"
    ).length;

    const unpaidLeaves = filteredLeaves.filter(
      r => r.type === "Unpaid"
    ).length;

    const suspensionDays = filteredLeaves.filter(
      r => r.type === "Suspension"
    ).length;

    

    return {
      absentDays,
      unpaidLeaves,
      suspensionDays,
      totalDeduction: absentDays + unpaidLeaves + suspensionDays,
    };
  }, [selectedEmployee, startDate, endDate]);

  return (
    <div className="p-8 text-black">
      <h1 className="text-2xl font-bold mb-6">
        Attendance Summary Report
      </h1>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select
          value={selectedEmployee}
          onChange={e => setSelectedEmployee(Number(e.target.value))}
          className="border p-2"
        >
          {employees.map(emp => (
            <option key={emp.id} value={emp.id}>
              {emp.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          className="border p-2"
        />

        <input
          type="date"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
          className="border p-2"
        />
      </div>

      {/* Summary Table */}
      {summary && (
        <table className="border w-full text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border">Absent Days</th>
              <th className="p-3 border">Unpaid Leaves</th>
              <th className="p-3 border">Suspension Days</th>
              <th className="p-3 border">Total Deduction</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border">{summary.absentDays}</td>
              <td className="p-3 border">{summary.unpaidLeaves}</td>
              <td className="p-3 border">{summary.suspensionDays}</td>
              <td className="p-3 border font-semibold">
                {summary.totalDeduction}
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

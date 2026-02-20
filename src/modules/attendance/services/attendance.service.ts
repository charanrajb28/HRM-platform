import { attendanceDailySummary } from "@/lib/data/attendance.data";
import { employees } from "@/lib/data/employee.data";

type AttendanceFilters = {
  name?: string;
  start?: string;
  end?: string;
};

export async function getAttendanceReport(filters: AttendanceFilters) {
  const { name, start, end } = filters;

  await new Promise((resolve) => setTimeout(resolve, 100));

  // 1️⃣ Find employee EXACT match
  const employee = employees.find(
    (emp) =>
      `${emp.firstName} ${emp.lastName}`.toLowerCase() ===
      name?.toLowerCase()
  );

  if (!employee) return [];

  // 2️⃣ Filter by employeeId
  let records = attendanceDailySummary.filter(
    (record) => record.employeeId === employee.id
  );

  // 3️⃣ Filter by date range (SAFE DATE COMPARISON)
  if (start && end) {
    const startDate = new Date(start);
    const endDate = new Date(end);

    records = records.filter((r) => {
      const recordDate = new Date(r.date);
      return recordDate >= startDate && recordDate <= endDate;
    });
  }

  // 4️⃣ Format response
  return records.map((record) => ({
    id: record.id,
    employeeName: `${employee.firstName} ${employee.lastName}`,
    date: record.date,
    inTime: record.firstIn,
    outTime: record.lastOut,
    status: record.attendanceStatus,
  }));
}

"use client";
import React, { useState, useMemo } from "react";
import { employees, shifts, shiftWorkingDays, leaveRequests } from "@/app/data/dummy";

// Utility to get day name
const getDayName = (date: Date) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
};

export default function PayrollRunsPage() {
    const [selectedEmpId, setSelectedEmpId] = useState("EMP001");
    const [selectedMonth, setSelectedMonth] = useState("2023-01"); // Jan 2023

    // Mock calculations dynamically generated for selected month and employee
    const payrollData = useMemo(() => {
        const emp = employees.find(e => e.id === selectedEmpId);
        if (!emp) return null;

        const [yearStr, monthStr] = selectedMonth.split("-");
        const year = parseInt(yearStr);
        const month = parseInt(monthStr) - 1; // 0-indexed

        const date = new Date(year, month, 1);
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Let's assume Employee has shift ID 1 for now if missing.
        const empShiftId = 1;
        const workingDaysMap = new Set(
            shiftWorkingDays.filter(swd => swd.shiftId === empShiftId).map(swd => swd.day)
        );

        // Filter employee's leave requests (Approved only)
        const empLeaves = leaveRequests.filter(lr => lr.employeeId === selectedEmpId && lr.status === "Approved");

        let stats = {
            present: 0,
            absent: 0,
            weekend: 0,
            paidLeave: 0,
            unpaidLeave: 0,
            sickLeave: 0,
            totalDays: daysInMonth
        };

        const dailyLog = [];

        for (let i = 1; i <= daysInMonth; i++) {
            const currentDate = new Date(year, month, i);
            const dayName = getDayName(currentDate);
            const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;

            const isWorkingDay = workingDaysMap.has(dayName as any);

            // Check if there's a leave covering this date
            const leave = empLeaves.find(lr => dateStr >= lr.startDate && dateStr <= lr.endDate);

            let status = "";
            let category = "Normal";

            if (!isWorkingDay) {
                status = "Weekend";
                category = "Weekend";
                stats.weekend++;
            } else if (leave) {
                status = "Leave";
                category = leave.leaveType;
                if (leave.leaveType === "Paid Leave") stats.paidLeave++;
                else if (leave.leaveType === "Sick Leave") stats.sickLeave++;
                else stats.unpaidLeave++; // assuming unpaid
            } else {
                // Mock random presence to simulate real data (say 95% present)
                // Seeding randomly for consistent UI based on date
                const pseudoRandom = (i * 17) % 100;
                if (pseudoRandom > 90) {
                    status = "Absent";
                    stats.absent++;
                } else {
                    status = "Present";
                    stats.present++;
                }
            }

            dailyLog.push({ date: dateStr, dayName, status, category, leave });
        }

        const basicSalary = emp.basicSalary || 0;
        const ratePerDay = basicSalary / daysInMonth;
        const ratePerHour = ratePerDay / 8; // Assuming 8 hr shift

        // Paid days: Present + Weekend + Paid Leave + Sick Leave (Assuming paid)
        const totalPaidDays = stats.present + stats.weekend + stats.paidLeave + stats.sickLeave;
        // Unpaid days: Absent + Unpaid Leave
        const totalDeductedDays = stats.absent + stats.unpaidLeave;

        const grossPay = basicSalary - (totalDeductedDays * ratePerDay);

        return {
            emp,
            dailyLog,
            stats,
            basicSalary,
            ratePerDay,
            ratePerHour,
            totalPaidDays,
            totalDeductedDays,
            grossPay
        };

    }, [selectedEmpId, selectedMonth]);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Payroll Calculations & Mock Run</h1>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-wrap gap-4 items-end">
                <div>
                    <label className="block text-sm text-gray-600 mb-1">Select Employee</label>
                    <select
                        value={selectedEmpId}
                        onChange={(e) => setSelectedEmpId(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                    >
                        {employees.map((emp) => (
                            <option key={emp.id} value={emp.id}>{emp.name} ({emp.id})</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm text-gray-600 mb-1">Month</label>
                    <input
                        type="month"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                    />
                </div>
            </div>

            {payrollData && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Summary Pane */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Salary Details ({selectedMonth})</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600">Base Salary (Monthly)</span>
                                    <span className="font-semibold text-gray-900">₹ {payrollData.basicSalary.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600">Per Day Rate</span>
                                    <span className="font-semibold text-gray-900">₹ {payrollData.ratePerDay.toFixed(2)} / day</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600">Hourly Rate</span>
                                    <span className="font-semibold text-gray-900">₹ {payrollData.ratePerHour.toFixed(2)} / hr</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Attendance Summary</h2>
                            <ul className="space-y-3 text-sm">
                                <li className="flex justify-between">
                                    <span className="text-gray-600">Total Calendar Days</span>
                                    <span className="font-medium text-gray-800">{payrollData.stats.totalDays}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span className="text-green-600">Present</span>
                                    <span className="font-medium text-green-700">{payrollData.stats.present}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span className="text-blue-600">Weekends / Off Days</span>
                                    <span className="font-medium text-blue-700">{payrollData.stats.weekend}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span className="text-purple-600">Paid Leave & Sick Leave</span>
                                    <span className="font-medium text-purple-700">{payrollData.stats.paidLeave + payrollData.stats.sickLeave} <span className="text-xs ml-1">(Marks as Paid Day)</span></span>
                                </li>
                                <li className="flex justify-between border-t pt-2">
                                    <span className="text-red-600">Absent</span>
                                    <span className="font-medium text-red-700">{payrollData.stats.absent}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span className="text-orange-600">Unpaid Leave</span>
                                    <span className="font-medium text-orange-700">{payrollData.stats.unpaidLeave}</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-blue-600 p-6 rounded-xl shadow-sm text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <h2 className="text-lg font-medium text-blue-100 mb-1">Net Calculated Pay</h2>
                                <div className="text-3xl font-bold mb-4">₹ {payrollData.grossPay.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                                <div className="text-sm text-blue-200">
                                    Deductions: {payrollData.totalDeductedDays} days (₹ {(payrollData.totalDeductedDays * payrollData.ratePerDay).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })})
                                </div>
                            </div>
                            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                        </div>
                    </div>

                    {/* Timeline Pane */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                                <h3 className="font-medium text-gray-800">Daily Log Markings</h3>
                            </div>
                            <div className="max-h-[600px] overflow-y-auto">
                                <table className="w-full text-left text-sm border-collapse">
                                    <thead className="sticky top-0 bg-white shadow-sm border-b border-gray-100">
                                        <tr className="text-gray-500">
                                            <th className="px-5 py-3 font-medium">Date</th>
                                            <th className="px-5 py-3 font-medium">Day</th>
                                            <th className="px-5 py-3 font-medium">Status / Category</th>
                                            <th className="px-5 py-3 font-medium">Payroll Impact</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {payrollData.dailyLog.map((log) => {
                                            const isLeave = log.status === "Leave";
                                            const isAbsent = log.status === "Absent";
                                            const isWeekend = log.status === "Weekend";
                                            const isUnpaid = isAbsent || log.category === "Unpaid Leave";

                                            return (
                                                <tr key={log.date} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-5 py-3 text-gray-800 tabular-nums">{log.date}</td>
                                                    <td className="px-5 py-3 text-gray-600">{log.dayName}</td>
                                                    <td className="px-5 py-3">
                                                        {isLeave ? (
                                                            <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-700 border border-purple-200">
                                                                {log.category} (Approved)
                                                            </span>
                                                        ) : isWeekend ? (
                                                            <span className="text-gray-400 italic">Weekend Off</span>
                                                        ) : isAbsent ? (
                                                            <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-700">Absent</span>
                                                        ) : (
                                                            <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700">Present</span>
                                                        )}
                                                    </td>
                                                    <td className="px-5 py-3">
                                                        {isUnpaid ? (
                                                            <span className="text-red-500 font-medium">- ₹{payrollData.ratePerDay.toFixed(2)}</span>
                                                        ) : (
                                                            <span className="text-green-600 text-xs font-medium bg-green-50 px-2 py-1 rounded">Counts as Paid Day</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

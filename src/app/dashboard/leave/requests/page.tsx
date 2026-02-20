"use client";
import React, { useState } from "react";
import { leaveRequests as initialLeaves, employees } from "@/app/data/dummy";

export default function LeaveEntriesPage() {
    const [leaves, setLeaves] = useState(initialLeaves);
    const [isFormOpen, setIsFormOpen] = useState(false);

    // Form state
    const [employeeId, setEmployeeId] = useState("");
    const [leaveCategory, setLeaveCategory] = useState("Casual Leave");
    const [duration, setDuration] = useState<"Full Day" | "First Half" | "Second Half">("Full Day");
    const [contactNumber, setContactNumber] = useState("");
    const [approvedBy, setApprovedBy] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [reason, setReason] = useState("");

    const handleAddLeave = (e: React.FormEvent) => {
        e.preventDefault();
        if (!employeeId || !startDate || !endDate) return;

        const newLeave = {
            id: Date.now(),
            employeeId,
            leaveType: "Paid Leave" as const,
            leaveCategory,
            duration,
            contactNumber,
            approvedBy,
            startDate,
            endDate,
            status: "Approved" as const, // Implicitly approved when entered directly
            reason,
        };

        setLeaves([newLeave, ...leaves]);
        setEmployeeId("");
        setLeaveCategory("Casual Leave");
        setDuration("Full Day");
        setContactNumber("");
        setApprovedBy("");
        setStartDate("");
        setEndDate("");
        setReason("");
        setIsFormOpen(false);
    };

    const handleDelete = (id: number) => {
        setLeaves(leaves.filter((l) => l.id !== id));
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">Leave Entries</h1>
                <button
                    onClick={() => setIsFormOpen(!isFormOpen)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                    {isFormOpen ? "Close Form" : "+ Enter Leave Data"}
                </button>
            </div>

            {isFormOpen && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
                    <h2 className="text-lg font-medium text-gray-800 mb-4">New Leave Entry</h2>
                    <form onSubmit={handleAddLeave} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Employee</label>
                            <select
                                value={employeeId}
                                onChange={(e) => setEmployeeId(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                                required
                            >
                                <option value="">Select Employee</option>
                                {employees.map((emp) => (
                                    <option key={emp.id} value={emp.id}>
                                        {emp.name} ({emp.id})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Leave Category</label>
                            <select
                                value={leaveCategory}
                                onChange={(e) => setLeaveCategory(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                            >
                                <option value="Casual Leave">Casual Leave</option>
                                <option value="Medical Leave">Medical Leave</option>
                                <option value="Annual Leave">Annual Leave</option>
                                <option value="Maternity Leave">Maternity Leave</option>
                                <option value="Paternity Leave">Paternity Leave</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Duration</label>
                            <select
                                value={duration}
                                onChange={(e) => setDuration(e.target.value as any)}
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                            >
                                <option value="Full Day">Full Day</option>
                                <option value="First Half">First Half</option>
                                <option value="Second Half">Second Half</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Date of Leave</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">End of Leave</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Contact Number During Leave</label>
                            <input
                                type="text"
                                value={contactNumber}
                                onChange={(e) => setContactNumber(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                                placeholder="Phone number"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Approved By (Manager)</label>
                            <input
                                type="text"
                                value={approvedBy}
                                onChange={(e) => setApprovedBy(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                                placeholder="Manager or self"
                            />
                        </div>
                        <div className="lg:col-span-1">
                            <label className="block text-sm text-gray-600 mb-1">Reason / Notes</label>
                            <input
                                type="text"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                                placeholder="Optional notes"
                            />
                        </div>
                        <div className="lg:col-span-3 flex justify-end mt-2">
                            <button
                                type="submit"
                                className="bg-green-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                            >
                                Save Entry
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-sm">
                                <th className="px-6 py-4 font-medium">Employee</th>
                                <th className="px-6 py-4 font-medium">Category & Duration</th>
                                <th className="px-6 py-4 font-medium">Date of Leave</th>
                                <th className="px-6 py-4 font-medium">End of Leave</th>
                                <th className="px-6 py-4 font-medium">Reason & Contact</th>
                                <th className="px-6 py-4 font-medium">Approver</th>
                                <th className="px-6 py-4 font-medium text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {leaves.map((leave) => {
                                const emp = employees.find((e) => e.id === leave.employeeId);

                                return (
                                    <tr key={leave.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                                                    {emp?.name?.charAt(0) || "U"}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-800">{emp?.name || "Unknown"}</p>
                                                    <p className="text-xs text-gray-500">{leave.employeeId}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-medium text-sm text-gray-700">{leave.leaveCategory}</p>
                                            <p className="text-xs text-gray-500">{leave.duration}</p>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {leave.startDate}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {leave.endDate}
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-gray-600 max-w-xs truncate">{leave.reason || "-"}</p>
                                            {leave.contactNumber && <p className="text-xs text-gray-400 mt-1">📞 {leave.contactNumber}</p>}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {leave.approvedBy || "Admin"}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center">
                                                <button
                                                    onClick={() => handleDelete(leave.id)}
                                                    className="p-1.5 rounded-md text-red-500 hover:bg-red-50 transition-colors"
                                                    title="Delete Entry"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    {leaves.length === 0 && (
                        <div className="p-8 text-center text-gray-500">
                            No leave entries found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

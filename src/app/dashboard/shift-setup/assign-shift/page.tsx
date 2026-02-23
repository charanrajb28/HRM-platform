"use client";
import React, { useState } from "react";
import { shifts, departments, employees } from "@/app/data/dummy";

type Assignment = {
    id: number;
    shiftName: string;
    targetType: "Department" | "Role" | "Employee";
    targetName: string;
};

export default function AssignShiftPage() {
    const [targetType, setTargetType] = useState<"Department" | "Role" | "Employee">("Department");
    const [selectedShift, setSelectedShift] = useState("");
    const [selectedDept, setSelectedDept] = useState("");
    const [selectedRole, setSelectedRole] = useState("");
    const [selectedEmp, setSelectedEmp] = useState("");

    const [assignments, setAssignments] = useState<Assignment[]>([
        { id: 1, shiftName: "Morning Shift", targetType: "Department", targetName: "Information Technology" },
        { id: 2, shiftName: "Evening Shift", targetType: "Role", targetName: "Manager (Finance)" },
    ]);

    const activeDepartment = departments.find(d => d.id === Number(selectedDept));
    const roleOptions = activeDepartment?.roles || [];
    const empOptions = employees.filter(e => e.departmentId === Number(selectedDept));

    const handleAssign = () => {
        if (!selectedShift || !selectedDept) return;
        if (targetType === "Role" && !selectedRole) return;
        if (targetType === "Employee" && !selectedEmp) return;

        const shift = shifts.find(s => s.id === Number(selectedShift));
        if (!shift) return;

        let targetName = "";
        if (targetType === "Department") {
            targetName = activeDepartment?.name || "";
        } else if (targetType === "Role") {
            targetName = `${selectedRole} (${activeDepartment?.name})`;
        } else {
            const emp = employees.find(e => e.id === selectedEmp);
            targetName = `${emp?.name} (${activeDepartment?.name})`;
        }

        const newAssignment: Assignment = {
            id: Date.now(),
            shiftName: shift.name,
            targetType,
            targetName,
        };

        setAssignments([newAssignment, ...assignments]);

        // Reset
        setSelectedRole("");
        setSelectedEmp("");
    };

    return (
        <div className="min-h-screen bg-blue-50 text-gray-700 p-6">
            <h1 className="text-xl font-medium mb-6">Assign Shift</h1>

            <div className="bg-white p-6 shadow-sm mb-8 rounded-md">
                <h2 className="text-sm font-semibold mb-4 text-gray-600 border-b pb-2">Create New Assignment</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    {/* Shift Selection */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Select Shift</label>
                        <select
                            value={selectedShift}
                            onChange={(e) => setSelectedShift(e.target.value)}
                            className="w-full border border-gray-300 px-3 py-2 bg-white text-sm"
                        >
                            <option value="">-- Choose Shift --</option>
                            {shifts.map(s => (
                                <option key={s.id} value={s.id}>{s.name} ({s.shiftIn} - {s.shiftOut})</option>
                            ))}
                        </select>
                    </div>

                    {/* Target Type */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Assign To (Target Level)</label>
                        <select
                            value={targetType}
                            onChange={(e) => {
                                setTargetType(e.target.value as any);
                                setSelectedRole("");
                                setSelectedEmp("");
                            }}
                            className="w-full border border-gray-300 px-3 py-2 bg-white text-sm"
                        >
                            <option value="Department">Whole Department</option>
                            <option value="Role">Specific Role in Department</option>
                            <option value="Employee">Specific Employee</option>
                        </select>
                    </div>

                    {/* Department Selection */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Select Department</label>
                        <select
                            value={selectedDept}
                            onChange={(e) => {
                                setSelectedDept(e.target.value);
                                setSelectedRole("");
                                setSelectedEmp("");
                            }}
                            className="w-full border border-gray-300 px-3 py-2 bg-white text-sm"
                        >
                            <option value="">-- Choose Department --</option>
                            {departments.map(d => (
                                <option key={d.id} value={d.id}>{d.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Role Selection (If Role is chosen) */}
                    {targetType === "Role" && (
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Select Role</label>
                            <select
                                value={selectedRole}
                                onChange={(e) => setSelectedRole(e.target.value)}
                                className="w-full border border-gray-300 px-3 py-2 bg-white text-sm disabled:opacity-50"
                                disabled={!selectedDept}
                            >
                                <option value="">-- Choose Role --</option>
                                {roleOptions.map(r => (
                                    <option key={r.name} value={r.name}>{r.name}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Employee Selection (If Employee is chosen) */}
                    {targetType === "Employee" && (
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Select Employee</label>
                            <select
                                value={selectedEmp}
                                onChange={(e) => setSelectedEmp(e.target.value)}
                                className="w-full border border-gray-300 px-3 py-2 bg-white text-sm disabled:opacity-50"
                                disabled={!selectedDept}
                            >
                                <option value="">-- Choose Employee --</option>
                                {empOptions.map(emp => (
                                    <option key={emp.id} value={emp.id}>{emp.name}</option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={handleAssign}
                        className="px-6 py-2 bg-teal-600 text-white text-sm rounded-md shadow-sm hover:bg-teal-700 transition"
                    >
                        Save Assignment
                    </button>
                </div>
            </div>

            <h2 className="text-lg font-medium mb-4">Current Shift Assignments</h2>
            <div className="bg-white shadow-sm overflow-x-auto rounded-md border border-gray-100">
                <table className="w-full text-sm border-collapse">
                    <thead className="bg-gray-100 text-gray-600">
                        <tr>
                            <th className="px-6 py-3 text-left border-b font-medium">Shift</th>
                            <th className="px-6 py-3 text-left border-b font-medium">Target Level</th>
                            <th className="px-6 py-3 text-left border-b font-medium">Target Name</th>
                            <th className="px-6 py-3 text-center border-b font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assignments.length > 0 ? (
                            assignments.map((assignment, idx) => (
                                <tr key={assignment.id} className={`border-b border-gray-100 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition`}>
                                    <td className="px-6 py-3 text-gray-800 font-medium">{assignment.shiftName}</td>
                                    <td className="px-6 py-3 text-gray-600">
                                        <span className={`px-2 py-1 rounded text-xs font-semibold
                                            ${assignment.targetType === 'Department' ? 'bg-blue-100 text-blue-800' :
                                                assignment.targetType === 'Role' ? 'bg-purple-100 text-purple-800' :
                                                    'bg-green-100 text-green-800'}`}
                                        >
                                            {assignment.targetType}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3 text-gray-600">{assignment.targetName}</td>
                                    <td className="px-6 py-3 text-center text-red-500 cursor-pointer hover:text-red-700" onClick={() => setAssignments(assignments.filter(a => a.id !== assignment.id))}>
                                        <i className="fa-solid fa-trash"></i> Delete
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                    No shift assignments found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

"use client";

import { useMemo, useState } from "react";

type Shift = {
    id: number;
    name: string;
    shiftIn: string;
    shiftOut: string;
    workingDays: string[];
    lateRelaxationMins: number;
    overdueRelaxationMins: number;
    hoursPerDay: number;
    daysPerMonth: number;
};

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

const initialShifts: Shift[] = [
    {
        id: 1,
        name: "Morning Shift",
        shiftIn: "08:00 AM",
        shiftOut: "04:00 PM",
        workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        lateRelaxationMins: 10,
        overdueRelaxationMins: 15,
        hoursPerDay: 8,
        daysPerMonth: 22,
    },
    {
        id: 2,
        name: "Evening Shift",
        shiftIn: "04:00 PM",
        shiftOut: "12:00 AM",
        workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        lateRelaxationMins: 5,
        overdueRelaxationMins: 20,
        hoursPerDay: 8,
        daysPerMonth: 22,
    },
    {
        id: 3,
        name: "Night Shift",
        shiftIn: "12:00 AM",
        shiftOut: "08:00 AM",
        workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        lateRelaxationMins: 15,
        overdueRelaxationMins: 25,
        hoursPerDay: 8,
        daysPerMonth: 22,
    },
];

const emptyForm: Omit<Shift, "id"> = {
    name: "",
    shiftIn: "",
    shiftOut: "",
    workingDays: [],
    lateRelaxationMins: 0,
    overdueRelaxationMins: 0,
    hoursPerDay: 0,
    daysPerMonth: 0,
};

export default function shifts() {
    const [shifts, setShifts] = useState<Shift[]>(initialShifts);
    const [searchText, setSearchText] = useState("");
    const [searchId, setSearchId] = useState("");
    const [form, setForm] = useState<Omit<Shift, "id">>(emptyForm);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<"details" | "relaxation" | "policy">("details");

    const filteredShifts = useMemo(() => {
        const text = searchText.trim().toLowerCase();
        const id = searchId.trim();

        return shifts.filter((shift) => {
            const matchesText = text
                ? shift.name.toLowerCase().includes(text) ||
                                    shift.workingDays.join(" ").toLowerCase().includes(text)
                : true;
            const matchesId = id ? String(shift.id).includes(id) : true;

            return matchesText && matchesId;
        });
    }, [searchText, searchId, shifts]);

    const handleChange = (field: keyof Omit<Shift, "id">, value: string) => {
        if (
            field === "lateRelaxationMins" ||
            field === "overdueRelaxationMins" ||
            field === "hoursPerDay" ||
            field === "daysPerMonth"
        ) {
            setForm((prev) => ({ ...prev, [field]: Number(value) }));
            return;
        }
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const toggleWorkingDay = (day: typeof weekDays[number]) => {
        setForm((prev) => {
            const exists = prev.workingDays.includes(day);
            return {
                ...prev,
                workingDays: exists
                    ? prev.workingDays.filter((current) => current !== day)
                    : [...prev.workingDays, day],
            };
        });
    };

    const resetForm = () => {
        setForm(emptyForm);
        setEditingId(null);
    };

    const openAddModal = () => {
        resetForm();
        setActiveTab("details");
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        resetForm();
    };

    const handleAddOrUpdate = () => {
        if (
            !form.name ||
            !form.shiftIn ||
            !form.shiftOut ||
            form.workingDays.length === 0 ||
            form.hoursPerDay <= 0 ||
            form.daysPerMonth <= 0
        ) {
            return;
        }

        if (editingId) {
            setShifts((prev) =>
                prev.map((shift) =>
                    shift.id === editingId ? { ...shift, ...form } : shift
                )
            );
            resetForm();
            setIsModalOpen(false);
            return;
        }

        const nextId = shifts.length ? Math.max(...shifts.map((shift) => shift.id)) + 1 : 1;
        setShifts((prev) => [{ id: nextId, ...form }, ...prev]);
        resetForm();
        setIsModalOpen(false);
    };

    const handleEdit = (shift: Shift) => {
        setEditingId(shift.id);
        const { id, ...rest } = shift;
        setForm(rest);
        setActiveTab("details");
        setIsModalOpen(true);
    };

    const handleDelete = (shiftId: number) => {
        setShifts((prev) => prev.filter((shift) => shift.id !== shiftId));
        if (editingId === shiftId) {
            resetForm();
        }
    };

    return(
        <div className="text-black bg-gray-300 flex flex-col gap-4 h-full p-8">
            <header className="text-black   font-bold text-2xl">
                Master Shift Setup
            </header>

            <div className="grid grid-cols-4 gap-4 px-6 py-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="col-span-3 flex gap-4">
                    <input
                        type="text"
                        placeholder="Search Shifts"
                        value={searchText}
                        onChange={(event) => setSearchText(event.target.value)}
                        className="border border-gray-300 rounded-md p-2 w-1/2"
                    />
                    <input
                        type="text"
                        placeholder="Search By ID"
                        value={searchId}
                        onChange={(event) => setSearchId(event.target.value)}
                        className="border border-gray-300 rounded-md p-2 w-1/2"
                    />
                </div>
                <div className="flex gap-4 justify-end">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md w-1/2 hover:bg-blue-600 transition-colors"
                        onClick={() => {
                            setSearchText("");
                            setSearchId("");
                        }}
                    >
                        Clear
                    </button>
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded-md w-1/2 hover:bg-green-600 transition-colors"
                        onClick={openAddModal}
                    >
                        Add Shift
                    </button>
                </div>
            </div>

            <div className="px-6 py-3 bg-gray-50 flex flex-col gap-4"> 
                <h1 className="font-semibold text-lg">Shift List</h1>
                <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
                  <table className="min-w-full text-sm">
                    <thead className="bg-gray-100 text-left text-gray-700">
                        <tr className="border-b border-gray-200">
                          <th className="px-4 py-3 font-semibold">Shift ID</th>
                          <th className="px-4 py-3 font-semibold">Shift Name</th>
                          <th className="px-4 py-3 font-semibold">Shift In</th>
                          <th className="px-4 py-3 font-semibold">Shift Out</th>
                          <th className="px-4 py-3 font-semibold">Working Days</th>
                          <th className="px-4 py-3 font-semibold">Late Relaxation</th>
                          <th className="px-4 py-3 font-semibold">Overdue Relaxation</th>
                                                    <th className="px-4 py-3 font-semibold">Hours/Day</th>
                                                    <th className="px-4 py-3 font-semibold">Days/Month</th>
                          <th className="px-4 py-3 font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredShifts.map(shift => (
                            <tr key={shift.id} className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition-colors">
                                <td className="px-4 py-3 font-medium text-gray-900">{shift.id}</td>
                                <td className="px-4 py-3 text-gray-700">{shift.name}</td>
                                <td className="px-4 py-3 text-gray-700">{shift.shiftIn}</td>
                                <td className="px-4 py-3 text-gray-700">{shift.shiftOut}</td>
                                <td className="px-4 py-3 text-gray-700">{shift.workingDays.join(", ")}</td>
                                <td className="px-4 py-3 text-gray-700">{shift.lateRelaxationMins} mins</td>
                                <td className="px-4 py-3 text-gray-700">{shift.overdueRelaxationMins} mins</td>
                                <td className="px-4 py-3 text-gray-700">{shift.hoursPerDay}</td>
                                <td className="px-4 py-3 text-gray-700">{shift.daysPerMonth}</td>
                                <td className="px-4 py-3">
                                    <button
                                        className="bg-yellow-500 text-white px-3 py-1.5 rounded-md mr-2 hover:bg-yellow-600 transition-colors"
                                        onClick={() => handleEdit(shift)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-600 transition-colors"
                                        onClick={() => handleDelete(shift.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="w-full max-w-3xl rounded-xl bg-white shadow-xl">
                        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">
                                    {editingId ? "Edit Shift" : "Add Shift"}
                                </h2>
                                <p className="text-sm text-gray-500">Configure shift matrix and relaxation rules.</p>
                            </div>
                            <button
                                type="button"
                                onClick={closeModal}
                                className="rounded-md px-3 py-1 text-gray-500 hover:bg-gray-100"
                            >
                                Close
                            </button>
                        </div>

                        <div className="flex border-b border-gray-200 px-6">
                            <button
                                type="button"
                                onClick={() => setActiveTab("details")}
                                className={`-mb-px border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                                    activeTab === "details"
                                        ? "border-indigo-600 text-indigo-600"
                                        : "border-transparent text-gray-500 hover:text-gray-700"
                                }`}
                            >
                                Shift Details
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab("relaxation")}
                                className={`-mb-px border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                                    activeTab === "relaxation"
                                        ? "border-indigo-600 text-indigo-600"
                                        : "border-transparent text-gray-500 hover:text-gray-700"
                                }`}
                            >
                                Relaxation Rules
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab("policy")}
                                className={`-mb-px border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                                    activeTab === "policy"
                                        ? "border-indigo-600 text-indigo-600"
                                        : "border-transparent text-gray-500 hover:text-gray-700"
                                }`}
                            >
                                Work Policy
                            </button>
                        </div>

                        <div className="px-6 py-5">
                            {activeTab === "details" && (
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2 flex flex-col gap-1">
                                        <label className="text-sm font-medium text-gray-700">Shift Name</label>
                                        <input
                                            type="text"
                                            value={form.name}
                                            onChange={(event) => handleChange("name", event.target.value)}
                                            className="border border-gray-300 rounded-md p-2"
                                            placeholder="Morning Shift"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-sm font-medium text-gray-700">Shift In</label>
                                        <input
                                            type="text"
                                            value={form.shiftIn}
                                            onChange={(event) => handleChange("shiftIn", event.target.value)}
                                            className="border border-gray-300 rounded-md p-2"
                                            placeholder="08:00 AM"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-sm font-medium text-gray-700">Shift Out</label>
                                        <input
                                            type="text"
                                            value={form.shiftOut}
                                            onChange={(event) => handleChange("shiftOut", event.target.value)}
                                            className="border border-gray-300 rounded-md p-2"
                                            placeholder="04:00 PM"
                                        />
                                    </div>
                                    <div className="col-span-2 flex flex-col gap-2">
                                        <label className="text-sm font-medium text-gray-700">Working Days</label>
                                        <div className="grid grid-cols-4 gap-2">
                                            {weekDays.map((day) => (
                                                <label key={day} className="flex items-center gap-2 text-sm text-gray-700">
                                                    <input
                                                        type="checkbox"
                                                        checked={form.workingDays.includes(day)}
                                                        onChange={() => toggleWorkingDay(day)}
                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                    />
                                                    {day}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === "relaxation" && (
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <label className="text-sm font-medium text-gray-700">Late Relaxation (mins)</label>
                                        <input
                                            type="number"
                                            min={0}
                                            value={form.lateRelaxationMins}
                                            onChange={(event) => handleChange("lateRelaxationMins", event.target.value)}
                                            className="border border-gray-300 rounded-md p-2"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-sm font-medium text-gray-700">Overdue Relaxation (mins)</label>
                                        <input
                                            type="number"
                                            min={0}
                                            value={form.overdueRelaxationMins}
                                            onChange={(event) => handleChange("overdueRelaxationMins", event.target.value)}
                                            className="border border-gray-300 rounded-md p-2"
                                        />
                                    </div>
                                </div>
                            )}

                            {activeTab === "policy" && (
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <label className="text-sm font-medium text-gray-700">Hours per Day</label>
                                        <input
                                            type="number"
                                            min={1}
                                            value={form.hoursPerDay}
                                            onChange={(event) => handleChange("hoursPerDay", event.target.value)}
                                            className="border border-gray-300 rounded-md p-2"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-sm font-medium text-gray-700">Days per Month</label>
                                        <input
                                            type="number"
                                            min={1}
                                            value={form.daysPerMonth}
                                            onChange={(event) => handleChange("daysPerMonth", event.target.value)}
                                            className="border border-gray-300 rounded-md p-2"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-4">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleAddOrUpdate}
                                className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                            >
                                {editingId ? "Save Changes" : "Add Shift"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
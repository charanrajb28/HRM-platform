"use client";
import { useState } from "react";
import DepartmentForm from "./components/DepartmentForm";
import DepartmentTable from "./components/DepartmentTable";

export default function Department() {

  const [departments, setDepartments] = useState<any[]>([
    { id: 1, name: "Finance", roles: [{ name: "Analyst", rate: 30 }, { name: "Manager", rate: 50 }] },
    { id: 2, name: "Human Resource", roles: [{ name: "HR Manager", rate: 45 }, { name: "Recruiter", rate: 25 }] },
    { id: 3, name: "Information Technology", roles: [{ name: "Developer", rate: 40 }, { name: "Admin", rate: 35 }] },
    { id: 4, name: "Management", roles: [{ name: "Director", rate: 80 }, { name: "VP", rate: 100 }] },
    { id: 5, name: "Sales", roles: [{ name: "Sales Rep", rate: 20 }, { name: "Area Manager", rate: 40 }] },
  ]);

  const [showTable, setShowTable] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingDept, setEditingDept] = useState<any>(null);

  const handleSaveDepartment = (data: any) => {
    if (data.id) {
      setDepartments(prev => prev.map(d => d.id === data.id ? { ...d, ...data } : d));
    } else {
      setDepartments(prev => [
        ...prev,
        { id: Date.now(), ...data }
      ]);
    }
    setShowForm(false);
    setEditingDept(null);
  };

  const handleEdit = (dept: any) => {
    setEditingDept(dept);
    setShowForm(true);
  };


  return (
    <div className="min-h-screen bg-blue-50 text-gray-700 p-4">

      {/* Page title */}
      <h1 className="text-lg font-medium mb-4">Department</h1>

      {/* Control bar */}
      <div className="flex items-center gap-3 bg-white p-4  shadow-sm mb-6">
        <input
          type="text"
          placeholder="Department Name"
          className="flex-1 border border-gray-300 px-3 py-2  text-sm"
        />

        <button onClick={() => setShowTable(true)} className="bg-blue-500 text-white px-4 py-2 text-sm  hover:bg-blue-600">
          Show
        </button>

        <button onClick={() => {
          setEditingDept(null);
          setShowForm(true);
        }} className="bg-teal-600 text-white px-4 py-2 text-sm  hover:bg-teal-700">
          Add New
        </button>
      </div>

      {showForm && (
        <DepartmentForm
          initialData={editingDept}
          onSave={handleSaveDepartment}
          onClose={() => {
            setShowForm(false);
            setEditingDept(null);
          }}
        />
      )}

      {showTable && (
        <DepartmentTable departments={departments} onEdit={handleEdit} />
      )}
    </div>
  );
}

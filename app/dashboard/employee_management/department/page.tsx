"use client";
import {useState} from "react";
import DepartmentForm from "./components/DepartmentForm";
import DepartmentTable from "./components/DepartmentTable";

export default function Department() {

  const [departments, setDepartments] = useState([
    { id: 1, name: "Finance" },
    { id: 2, name: "Human Resource" },
    { id: 3, name: "Information Technology" },
    { id: 4, name: "Management" },
    { id: 5, name: "Sales" },
  ]);

    const [showTable, setShowTable] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const addDepartment = (name: string)=> {
      setDepartments(prev =>[
        ...prev,
        {id: Date.now(), name}
      ]);
      setShowForm(false);
      setShowTable(false);
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

        <button onClick={()=>setShowTable(true)} className="bg-blue-500 text-white px-4 py-2 text-sm  hover:bg-blue-600">
          Show
        </button>

        <button onClick={()=>setShowForm(true)} className="bg-teal-600 text-white px-4 py-2 text-sm  hover:bg-teal-700">
          Add New
        </button>
      </div>

      {showForm && (
        <DepartmentForm 
        onSave={addDepartment}
        onClose={()=>setShowForm(false)}
        />
      )}
         
      {showTable && (
        <DepartmentTable departments={departments} />
      )}
    </div>
  );
}

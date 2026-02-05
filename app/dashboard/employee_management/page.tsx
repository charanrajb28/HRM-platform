"use client";
import { useState } from "react";
import Link from "next/link";

const data = {
  Sales: ["Alice", "Bob"],
  Developers: ["Charlie", "David"],
};

const emp_data = [
  {
    id: "EMP001",
    name: "Kruthi",
    email: "kruthianu66@gmail.com",
    department: "Developers",
    authority: "Admin",
  },
  {
    id: "EMP002",
    name: "Alice",
    email: "alice.sales@company.com",
    department: "Sales",
    authority: "Manager",
  },
  {
    id: "EMP003",
    name: "Bob",
    email: "bob.sales@company.com",
    department: "Sales",
    authority: "Executive",
  },
  {
    id: "EMP004",
    name: "Charlie",
    email: "charlie.dev@company.com",
    department: "Developers",
    authority: "Developer",
  },
  {
    id: "EMP005",
    name: "David",
    email: "david.dev@company.com",
    department: "Developers",
    authority: "Senior Developer",
  },
  {
    id: "EMP006",
    name: "Anita",
    email: "anita.hr@company.com",
    department: "HR",
    authority: "HR Manager",
  },
];


export default function EmpInfo() {
  const [department, setDepartment] = useState("Department");
  const [employee, setEmployee] = useState("Employee");

  const [deptOpen, setDeptOpen] = useState(false);
  const [empOpen, setEmpOpen] = useState(false);

  const departments = Object.keys(data);
  const filteredEmployees =
    department === "Department" ? emp_data : emp_data.filter(emp => emp.department === department );
  
  const employees= department === "Department" ?[]: filteredEmployees.map(emp=>emp.name)
  return (
    <div className="h-screen bg-gray-200">
      <h1 className="mb-4 font-semibold">Employee Info</h1>
    <div className="w-full bg-white py-3 my-3">
      {/* SIDE BY SIDE */}
      <div className="flex gap-4 w-full px-4">
        {/* Department Dropdown */}
        <div className="relative w-lg">
          <button
            onClick={() => setDeptOpen(!deptOpen)}
            className="w-full border px-4 py-2 flex justify-between bg-white"
          >
            {department} <span>⌄</span>
          </button>

          {deptOpen && (
            <div className="absolute z-20 mt-1 w-full bg-white border rounded shadow">
              <ul>
                {departments.map((d) => (
                  <li
                    key={d}
                    onClick={() => {
                      setDepartment(d);
                      setEmployee("Employee"); // reset
                      setDeptOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Employee Dropdown */}
        <div className="relative w-lg">
          <button
            disabled={department === "Department"}
            onClick={() => setEmpOpen(!empOpen)}
            className="w-full border px-4 py-2 rounded flex justify-between bg-white disabled:opacity-50"
          >
            {employee} <span>⌄</span>
          </button>

          {empOpen && (
            <div className="absolute z-20 mt-1 w-full bg-white border rounded shadow">
              <ul>
                {employees.map((e) => (
                  <li
                    key={e}
                    onClick={() => {
                      setEmployee(e);
                      setEmpOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          )}

          
          
        </div>
         <button className="bg-blue-500 text-white px-4 h-10">Show</button>
          <button className="bg-green-400 text-white px-4 h-10 min-w-[110px]">Add New</button>
          <button className="bg-red-500 text-white px-4 h-10">Import</button>
      </div>
    </div>

  <div className="bg-white w-full py-3 my-3 overflow-x-auto">
  <table className="w-full border-collapse">
    
    <thead className="bg-gray-200">
      <tr className="text-gray-500 ">
        <th className="w-[25%] px-4 mx-9 py-4 text-left">Name</th>
        <th className="px-4 py-2 text-left">Emp Code</th>
        <th className="px-4 py-2 text-left">Email</th>
        <th className="px-4 py-2 text-left">Authority</th>
        <th className="px-4 py-2 text-left">View / PDF / Edit / Delete</th>
      </tr>
    </thead>

    <tbody>
      {filteredEmployees.map((emp) => (
        <tr key={emp.id} className=" hover:bg-gray-100 py-7">
          <td className="px-4 py-6">{emp.name}</td>
          <td className="px-4 py-2">{emp.id}</td>
          <td className="px-4 py-2">{emp.email}</td>
          <td className="px-4 py-2">{emp.authority}</td>

          <td className="px-6 py-4">
         <div className="flex gap-7 items-center text-gray-600">
          <i className="fa-solid fa-eye cursor-pointer hover:text-blue-500"></i>
          <i className="fa-solid fa-file-pdf cursor-pointer hover:text-purple-500"></i>
          <Link href={`/dashboard/employee_management/edit/${emp.id}`}>
          <i className="fa-solid fa-pen cursor-pointer hover:text-green-500"></i>
          </Link>
          <i className="fa-solid fa-trash cursor-pointer hover:text-red-500"></i>
        </div>
        </td>
        </tr>
      ))}
    </tbody>

  </table>
</div>

    </div>
  
  );
}

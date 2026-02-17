"use client";
import { useState } from "react";
import Link from "next/link";

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

export default function EmployeeTable(){
  return (
  <div className="bg-white w-full py-3 my-3 overflow-x-auto">
  <table className="w-full border-collapse">
    
    <thead className="bg-gray-100">
      <tr className="text-gray-500 ">
        <th className="w-[25%] px-4 mx-9 py-4 text-left">Name</th>
        <th className="px-4 py-2 text-left">Emp Code</th>
        <th className="px-4 py-2 text-left">Email</th>
        <th className="px-4 py-2 text-left">Authority</th>
        <th className="px-4 py-2 text-left">View / PDF / Edit / Delete</th>
      </tr>
    </thead>

    <tbody>
      {emp_data.map((emp) => (
        <tr key={emp.id} className=" hover:bg-gray-100 py-7">
          <td className="px-4 py-6">{emp.name}</td>
          <td className="px-4 py-2">{emp.id}</td>
          <td className="px-4 py-2">{emp.email}</td>
          <td className="px-4 py-2">{emp.authority}</td>

          <td className="px-6 py-4">
         <div className="flex gap-7 items-center text-gray-600">
          <i className="fa-solid fa-eye cursor-pointer hover:text-blue-500"></i>
          <i className="fa-solid fa-file-pdf cursor-pointer hover:text-purple-500"></i>
          <Link href={`/dashboard/employee_management/emp_info/edit/${emp.id}`}>
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
  );
}

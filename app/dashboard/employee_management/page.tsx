"use client";
import { useRouter } from "next/router";
import { useState } from "react";

const [open, setOpen]=useState(false);
const [search, setSearch] =useState("");
const departments= ["Sales", "Developers"];

export default function EmpInfo(){
  const [department, setDepartment] =useState("Department");

  const filteredDepartments= departments.filter((dept)=>{
    dept.toLowerCase().includes(search.toLowerCase())
  });

  return(
    <div>
        <h1>Employee Info</h1>

        <div>
          <button onClick={()=>{setOpen(!open)}} className="w-full border px-4 py-2 rounded flex justify-between items-center bg-white">
            <span>{department}</span>
            <span>V</span>
            </button>
        </div>
    </div>
  )
}
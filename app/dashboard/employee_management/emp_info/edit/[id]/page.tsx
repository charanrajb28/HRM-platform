"use client";
import React,{ useState}  from "react";
import Link from "next/link";


export default function EditEmployee({ params }:{params:{id:string}}) {
  const {id}  =  params;

  const tabs=["Employee Info",
    "Contact Info",
    "Employment Info",
    "Payroll",
    "Security",
    "Files",
    ];

   const payrollItems =[
    {key:"Pf", label:"PF"},
    {key:"sses", label:"SSES"},
    {key:"eobi", label:"EOBI"},
   ]

   const employmentInfoFields = [
  { label: "Hire Date", type: "date" },
  { label: "Joining Date", type: "date" },
  { label: "Basic Salary", numeric: true },
  { label: "Status" },
  { label: "Payment Method" },
  { label: "Employment Type", type: "date" },

  { label: "Bank Name" },
  { label: "Branch" },
  { label: "Account Title" },
  { label: "Branch Code" },
  { label: "Account No", numeric: true },
  { label: "Swift Code" },
];

  const employmentMetaFields = [
  { label: "Location" },
  { label: "Designation" },
  { label: "Department" },
  { label: "CNIC", numeric: true },
  { label: "Employment Code" },
  { label: "Separation Date", type: "date" },
];

type FieldProps ={
  label: string;
  type?: string;
  numeric?: boolean;
};

  const InputField = ({ label, type="text" , numeric }: FieldProps)=>(
     <div>
      <label className="block text-sm text-gray-600 mb-1">
        {label}
      </label>
      <input type={type} inputMode= {numeric? "numeric":undefined} onInput={numeric? allowOnlyNumbers : undefined} className="w-full border border-gray-300 px-3 py-2"/>
     </div>
  );

   const securityRoles=[
    "Admin",
    "HR",
    "Manager",
    "Employee"
   ]

   const recordAuthorities =[
    "COO",
    "HR",
    "HOD",
    "Second In",
   ]

    const [activeTab, setActiveTab] = useState("Employee Info");
    const [streetAddress, setStreetAddress] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [city, setCity] = useState("");
    const [regionState, setRegionState] = useState("");
    const [country, setCountry] = useState("");


   const handlePincode= async(e: React.FocusEvent<HTMLInputElement>)=>{
    const pin =e.target.value;
    if(!pin || pin.length!=6) return;

    const res= await fetch(`https://api.postalpincode.in/pincode/${pin}`);
    const data=await res.json();

    if(data[0]?.Status === "Success"){
        const location=data[0].PostOffice[0];
        setCity(location.District);
        setRegionState(location.State);
        setCountry("India");
    }
   };
 
   const allowOnlyNumbers = (e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, ""); 
   };

  return (
    <div className=" flex flex-col gap-6 md:flex-row">
       <div className="flex-[1] self-start h-fit p-4 shadow-sm bg-white">
        <h3 className="font-medium mb-3">Employee Details</h3>
        <div className="flex flex-col items-center gap-3">
          <img src="/globe.svg" alt="Profile" className="w-28 h-28 rounded-full object-cover"/>
          <h1>Name</h1>

          
            <input type="file" className="text-sm text-gray-500 border border-gray-300" />
            <button className="px-4 py-1.5 text-sm bg-teal-600  text-gray-100 justify-end"> Update</button>
         
        </div>
       </div>
  
       <div className="flex-[2]  p-4 shadow-sm bg-white">
        <div className="flex flex-wrap gap-4 ">
            {tabs.map((tab)=>(
                <button key={tab} onClick={() => setActiveTab(tab)}
              className={`pb-1 text-sm font-medium ${
                activeTab === tab
                  ? "text-blue-400"
                  : "text-gray-500 hover:text-gray-700"
              }`}>{tab}</button>
            ))}
        </div>

        <div className="mt-6">
            {activeTab === "Employee Info" && (
  <form className="mt-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Name */}
      <div>
        <label className="block text-sm text-gray-600 mb-1">Name</label>
        <input className="w-full border border-gray-300 px-3 py-2" />
      </div>

      <div>
        <label className=" text-sm text-gray-600 mb-1">Gender</label>
        <div className="flex gap-4 mt-2">
          <label><input type="radio" name="gender" /> Male</label>
          <label><input type="radio" name="gender" /> Female</label>
          <label><input type="radio" name="gender" /> None</label>
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Machine Code</label>
        <input className="w-full border border-gray-300 py-2" disabled />
      </div>

      {/* Date of Birth */}
      <div>
        <label className="block text-sm text-gray-600 mb-1">Date of Birth</label>
        <input type="date" className="w-full  border border-gray-300 py-2" />
      </div>
      
  <div>
    <label>Street Address</label>
    <input 
           value={streetAddress} 
           onChange={(e)=>setStreetAddress(e.target.value)} 
           className="border border-gray-300 w-full p-2 rounded" />
  </div>
  
  <div>
  <label className="block text-sm text-gray-600 mb-1">City</label>
  <input
    value={city}
    onChange={(e) => setCity(e.target.value)}
    className="border border-gray-300 w-full p-2 rounded"
  />
</div>


  <div>
    <label>Postal Code</label>
    <input 
    value={postalCode}
    onChange={(e)=>setPostalCode(e.target.value)}
    onBlur={handlePincode} 
    className="border border-gray-300 w-full p-2 rounded" />
  </div>

  <div>
  <label className="block text-sm text-gray-600 mb-1">Country</label>
  <input
    value={country}
    onChange={(e) => setCountry(e.target.value)}
    className="border border-gray-300 w-full p-2 rounded"
  />
</div>

      
    </div>
    <hr />
  </form>
)}


{activeTab === "Contact Info" && (
    <form action="">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
        <label className="block text-sm text-gray-600 mb-1">Email</label>
        <input className="w-full border border-gray-300 px-3 py-2" type="email" />
        </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">Home Phone</label>
        <input className="w-full border border-gray-300 px-3 py-2" type="tel" inputMode="numeric"
    pattern="[0-9]*" onInput={allowOnlyNumbers}/>
    </div> 

    <div>
        <label className="block text-sm text-gray-600 mb-1">Home Phone</label>
        <input className="w-full border border-gray-300 px-3 py-2" type="tel" inputMode="numeric"
    pattern="[0-9]*" onInput={allowOnlyNumbers}/>
     </div>


     <div>
        <label className="block text-sm text-gray-600 mb-1">Work Phone</label>
        <input className="w-full border border-gray-300 px-3 py-2" type="tel" inputMode="numeric"
    pattern="[0-9]*" onInput={allowOnlyNumbers}/>
      </div>

    <div>
        <label className="block text-sm text-gray-600 mb-1">Emergency Contact</label>
        <input className="w-full border border-gray-300 px-3 py-2" type="tel" inputMode="numeric"
    pattern="[0-9]*" onInput={allowOnlyNumbers}/>
      </div>

      </div>
    </form>
)}

{activeTab === "Employment Info" && (
  <form className="space-y-6">

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {employmentInfoFields.map((field) => (
        <InputField key={field.label} {...field} />
      ))}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {employmentMetaFields.map((field) => (
        <InputField key={field.label} {...field} />
      ))}
    </div>

  </form>
)}


{activeTab === "Payroll" && (
  <form action="">
    {payrollItems.map((item)=>(
      <div key={item.key}>
        <h2 className=" mb-1 pt-3">{item.label}</h2>

         <div className="grid grid-cols-1  md:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm text-gray-600 mb-1">Type</label>
        <select name="" id="" className="w-full border border-gray-300 px-3 py-3 text-gray-600">
          <option>Select</option>
            <option>Percentage</option>
            <option>Fixed</option>
        </select>
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Employer Contribution</label>
        <input className="w-full border border-gray-300 px-3 py-2" inputMode="numeric"
              onInput={allowOnlyNumbers}/>
      </div>
  
      <div>
        <label className="block text-sm text-gray-600 mb-1">Employee Contribution</label>
        <input className="w-full border border-gray-300 px-3 py-2" inputMode="numeric"
              onInput={allowOnlyNumbers}/>
      </div>

    
    </div>
      </div>
    ))}
    
  </form>
)}

{activeTab=== "Security" &&(
  <form action="">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
      <div>
        <label className="block text-sm text-gray-600 mb-1">Security Role</label>
        <select className="w-full border border-gray-300 text-gray-600 px-3 py-2">
          {securityRoles.map((role)=>(
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">
          Leave Entry Days
        </label>
        <input
          className="w-full border border-gray-300 px-3 py-2"
          inputMode="numeric"
          onInput={allowOnlyNumbers}
          placeholder="e.g. 100"
        />
      </div>

      <div>
        <label className="block  text-gray-600 mb-1">
          Password
        </label>
        <input
          type="text"
          className="w-full border border-gray-300 px-3 py-2"
        />
      </div>
    </div>

    <div className="py-2 text-sm text-gray-500">
      <label className="text-gray-600 ">Record level authority</label>
      <div className="flex flex-wrap gap-6">
        {recordAuthorities.map((auth)=>(
          <label key={auth} className="flex items-center gap-2 text-sm">
            <input type="checkbox" />
            {auth}
          </label>
        ))}
      </div>
    </div>
  </form>
)}

        </div>
       </div>
    </div>
  );
}
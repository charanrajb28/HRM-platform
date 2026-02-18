import { employees } from "@/src/lib/data/employee.data";
import { attendanceDailySummary } from "@/src/lib/data/attendance.data";
import { join } from "path";

type SummaryFilters= {
    name?:string;
    start?:string;
    end?:string;
};

export async function getAttendanceSummary(filters:SummaryFilters) {
    const {name,start,end}= filters;

    if(!name || !start || !end) return [];

    const employee= employees.find((emp)=>
    `${emp.firstName}${emp.lastName}`.toLowerCase().includes(name.toLowerCase())
    );

    if(!employee) return [];

    const startDate= new Date(start);
    const endDate=new Date(end);
    const joiningDate = new Date(employee.joiningDate);

    const totalDays =
    (endDate.getTime() - startDate.getTime()) /
      (1000 * 60 * 60 * 24) +
    1;

    let daysBeforeJoining=0;
    if(startDate< joiningDate){
        const lastDate = endDate < joiningDate? endDate : joiningDate;

        daysBeforeJoining= (lastDate.getTime()- startDate.getTime())/(1000 * 60 * 60 * 24);
    }

    const records= attendanceDailySummary.filter((r)=>
    r.employeeId===employee.id &&
    r.date >= start &&
    r.date <= end
);

 const presentDays = records.length;

 const absentDays =
    totalDays - presentDays - daysBeforeJoining;

    return [
    {
      id: employee.id,
      name: `${employee.firstName} ${employee.lastName}`,
      joiningDate: employee.joiningDate,
      separationDate: "-", // no separation logic yet
      daysBeforeJoining: Math.max(0, Math.floor(daysBeforeJoining)),
      daysAfterSeparation: 0,
      absentDays: Math.max(0, Math.floor(absentDays)),
      unpaidLeave: 0,
      suspensionDays: 0,
      daysToBeDeducted: Math.max(0, Math.floor(absentDays)),
    },
  ];

}
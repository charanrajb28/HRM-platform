import { employees, attendanceLogs } from "./dummyData";

export interface AttendanceQuery {
    name?: string;
    startDate?: string;
    endDate?: string;
}

export function getAttendanceReport(query: AttendanceQuery){
    const {name="", startDate, endDate}=query;

    if(!startDate || !endDate) return [];

    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const search = name.trim().toLowerCase();

    const employeeMap = Object.fromEntries(
        employees.map(emp=>[
            emp.id,
            `${emp.personalInfo.firstName} ${emp.personalInfo.lastName}`.toLowerCase()
        ])
    );

    return attendanceLogs.filter(log=>{
      const logTime = new Date(log.date).getTime();
    const fullName = employeeMap[log.employeeId] || "";

    return (
      logTime >= start &&
      logTime <= end &&
      (search === "" || fullName.includes(search))
    );
});
};

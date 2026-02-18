"use client";
import { useMemo, useState } from "react";
import {employees, attendanceLogs, leaves, leaveTypes } from "../dummyData";

function getDateRange(start: Date, end: Date){
    const dates=[];
    const current = new Date(start);
    const last= new Date(end);

    while(current <= last){
        dates.push(new Date(current));
        current.setDate(current.getDate()+1);
    }
    return dates;
}


export default function DayDeductionSummary(){
    const startDate = new Date("2023-01-01");

  const endDate = new Date("2023-01-31");

    const summaryData = useMemo(()=>{
        const range= getDateRange(startDate, endDate);

        return employees.map((emp)=>{
            const joinDate =new Date(emp.joiningDate);
            const separtionDate = emp.separationDate? new Date(emp.separationDate) : null;

            let daysBeforeJoining=0;
            let daysAfterJoining =0;

            range.forEach((date)=>{
                if(date < joinDate) daysBeforeJoining++;
                if(date > separtionDate) daysAfterJoining++;
            });


        })
    },)

}
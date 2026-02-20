import { getAttendanceSummary } from "@/modules/attendance/services/summary.service";
export default async function SummaryPage({searchParams,}:{searchParams: Promise<{
    name?: string;
    start?: string;
    end?: string;
  }>;
}){
    const params = await searchParams;
  const { name, start, end } = params;

  if (!name || !start || !end) {
    return (
      <div className="text-center p-6 text-gray-500">
        Please enter Name, Start Date, and End Date and click Show.
      </div>
    );
  }
  
  const data = await getAttendanceSummary(params);

  if (data.length === 0) {
    return (
      <div className="text-center p-6">
        No summary found
      </div>
    );
  }

  return (
  <div className="bg-white w-full py-3 my-3 overflow-x-auto">
    <h1 className="mb-4 font-semibold text-gray-800">Employee Info</h1>
  <table className="w-full border-collapse">
    
    <thead className="bg-gray-100">
      <tr className="text-gray-500 ">
        <th className="w-[25%] px-4 mx-9 py-4 text-left">Name</th>
        <th className="px-4 py-2 text-left">Joining Date</th>
        <th className="px-4 py-2 text-left">Separation Date </th>
        <th className="px-4 py-2 text-left">Days before joining</th>
        <th className="px-4 py-2 text-left">Days after separation</th>
        <th className="px-4 py-2 text-left">Absent Days </th>
        <th className="px-4 py-2 text-left">Unpaid Leave</th>
        <th className="px-4 py-2 text-left">Suspension Days</th>
        <th className="px-4 py-2 text-left">Days to be deducted</th>
      </tr>
    </thead>

    <tbody>
          {data.map((row) => (
            <tr key={row.id} className="border-t">
              <td className="px-4 py-3">{row.name}</td>
              <td className="px-4 py-3">{row.joiningDate}</td>
              <td className="px-4 py-3">{row.separationDate}</td>
              <td className="px-4 py-3">{row.daysBeforeJoining}</td>
              <td className="px-4 py-3">{row.daysAfterSeparation}</td>
              <td className="px-4 py-3">{row.absentDays}</td>
              <td className="px-4 py-3">{row.unpaidLeave}</td>
              <td className="px-4 py-3">{row.suspensionDays}</td>
              <td className="px-4 py-3 font-semibold">
                {row.daysToBeDeducted}
              </td>
            </tr>
          ))}
        </tbody>

  </table>
</div>
  );
}
import { getAttendanceReport } from "@/modules/attendance/services/attendance.service";

export default async function ReportPage({
  searchParams,
}: {
  searchParams: Promise<{
    name?: string;
    start?: string;
    end?: string;
  }>;
}) {
  const params = await searchParams; // ✅ unwrap promise

  const { name, start, end } = params;

  if (!name || !start || !end) {
    return (
      <div className="text-center p-6 text-gray-500">
        Please enter Name, Start Date, and End Date and click Show.
      </div>
    );
  }

  const data = await getAttendanceReport(params);

  return (
    <table className="w-full border-collapse">
      <thead className="bg-gray-100">
        <tr>
          <th className="border p-2">Name</th>
          <th className="border p-2">Date</th>
          <th className="border p-2">IN</th>
          <th className="border p-2">OUT</th>
          <th className="border p-2">Status</th>
        </tr>
      </thead>

      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={5} className="text-center p-4">
              No records found
            </td>
          </tr>
        ) : (
          data.map((row: any) => (
            <tr key={row.id} className="text-center">
              <td className="border p-2">{row.employeeName}</td>
              <td className="border p-2">{row.date}</td>
              <td className="border p-2">{row.inTime}</td>
              <td className="border p-2">{row.outTime}</td>
              <td className="border p-2">{row.status}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

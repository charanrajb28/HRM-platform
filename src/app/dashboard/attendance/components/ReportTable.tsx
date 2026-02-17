export default function ReportTable({ data }: { data: any[] }) {
  return (
    <table className="w-full border-collapse">
      <thead className="bg-gray-100">
        <tr>
          <th className="border p-2">Name</th>
          <th className="border p-2">Date</th>
          <th className="border p-2">IN</th>
          <th className="border p-2">OUT</th>
          <th className="border p-2">Status</th>
          <th className="border p-2">Hours</th>
        </tr>
      </thead>

      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={6} className="text-center p-4">
              No records found
            </td>
          </tr>
        ) : (
          data.map((row) => (
            <tr key={row.id} className="text-center hover:bg-gray-50">
              <td className="border p-2">{row.employeeName}</td>
              <td className="border p-2">{row.date}</td>
              <td className="border p-2">{row.inTime}</td>
              <td className="border p-2">{row.outTime}</td>
              <td className="border p-2 font-semibold">{row.status}</td>
              <td className="border p-2">{row.totalHours}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

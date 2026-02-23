import { DepartmentType } from "./DepartmentForm";

export default function DepartmentTable({ departments, onEdit }: { departments: DepartmentType[]; onEdit: (dept: DepartmentType) => void; }) {
  return (
    <div className="bg-white  shadow-sm overflow-x-auto">
      <h2 className="px-4 py-3 text-sm font-medium border-b">
        Departments
      </h2>

      <table className="w-full text-sm border-collapse">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Department ID</th>
            <th className="px-4 py-2 text-center">Edit</th>
            <th className="px-4 py-2 text-center">Delete</th>
          </tr>
        </thead>

        <tbody>
          {departments.map((dept, index) => (
            <tr
              key={dept.id}
              className={`border-t ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100 align-top`}
            >
              <td className="px-4 py-3 pt-4">{dept.name}</td>
              <td className="px-4 py-3 pt-4">{dept.id || "-"}</td>

              <td className="px-4 py-3 text-center cursor-pointer pt-4" onClick={() => onEdit(dept)}>
                ✏️
              </td>

              <td className="px-4 py-3 text-center cursor-pointer">
                🗑️
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
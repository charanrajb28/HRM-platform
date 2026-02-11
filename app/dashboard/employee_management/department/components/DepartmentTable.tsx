export default function DepartmentTable({departments,}:{departments:{id: number; name:string}[];}){
    return(
        <div className="bg-white  shadow-sm overflow-x-auto">
        <h2 className="px-4 py-3 text-sm font-medium border-b">
          Departments
        </h2>

        <table className="w-full text-sm border-collapse">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-center">Edit</th>
              <th className="px-4 py-2 text-center">Delete</th>
            </tr>
          </thead>

          <tbody>
            {departments.map((dept, index) => (
              <tr
                key={dept.id}
                className={`border-t ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100`}
              >
                <td className="px-4 py-3">{dept.name}</td>

                <td className="px-4 py-3 text-center cursor-pointer">
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
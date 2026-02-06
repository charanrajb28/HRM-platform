export default function Department() {
  const departments = [
    { id: 1, name: "Finance" },
    { id: 2, name: "Human Resource" },
    { id: 3, name: "Information Technology" },
    { id: 4, name: "Management" },
    { id: 5, name: "Sales" },
  ];

  return (
    <div className="min-h-screen bg-blue-50 text-gray-700 p-4">

      {/* Page title */}
      <h1 className="text-lg font-medium mb-4">Department</h1>

      {/* Control bar */}
      <div className="flex items-center gap-3 bg-white p-4  shadow-sm mb-6">
        <input
          type="text"
          placeholder="Department Name"
          className="flex-1 border border-gray-300 px-3 py-2  text-sm"
        />

        <button className="bg-blue-500 text-white px-4 py-2 text-sm  hover:bg-blue-600">
          Show
        </button>

        <button className="bg-teal-600 text-white px-4 py-2 text-sm  hover:bg-teal-700">
          Add New
        </button>
      </div>

      {/* Table section */}
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

    </div>
  );
}

import { useState } from "react";

export type RoleData = {
  name: string;
  rate: number | string;
};

export type DepartmentType = {
  id?: number;
  name: string;
  roles?: RoleData[];
};

export default function DepartmentForm({
  initialData,
  onSave,
  onClose,
}: {
  initialData?: DepartmentType;
  onSave: (data: DepartmentType) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState(initialData?.name || "");
  const [roles, setRoles] = useState<RoleData[]>(initialData?.roles || []);

  const handleAddRole = () => {
    setRoles([...roles, { name: "", rate: "" }]);
  };

  const handleRoleChange = (index: number, field: "name" | "rate", value: string) => {
    const newRoles = [...roles];
    newRoles[index][field] = value;
    setRoles(newRoles);
  };

  const handleRemoveRole = (index: number) => {
    setRoles(roles.filter((_, i) => i !== index));
  };

  return (
    <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white shadow-lg p-4 w-[28rem] z-50 max-h-[80vh] overflow-y-auto">
      <h2 className="text-sm font-medium mb-3">{initialData ? "Edit Department" : "Add Department"}</h2>

      <div className="mb-4">
        <label className="block text-xs mb-1">Department Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Department name"
          className="w-full border px-3 py-2 text-sm"
        />
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <label className="block text-xs font-semibold">Roles & Rates</label>
          <button onClick={handleAddRole} className="text-xs bg-gray-200 px-2 py-1 rounded">
            + Add Role
          </button>
        </div>

        {roles.length === 0 && <p className="text-xs text-gray-400">No roles added.</p>}

        {roles.map((role, index) => (
          <div key={index} className="flex gap-2 mb-2 items-center">
            <input
              type="text"
              value={role.name}
              onChange={(e) => handleRoleChange(index, "name", e.target.value)}
              placeholder="Role Name"
              className="flex-1 border px-2 py-1 text-sm"
            />
            <input
              type="number"
              value={role.rate}
              onChange={(e) => handleRoleChange(index, "rate", e.target.value)}
              placeholder="Rate/hr"
              className="w-24 border px-2 py-1 text-sm"
            />
            <button onClick={() => handleRemoveRole(index)} className="text-red-500 text-xs px-2">
              X
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-2 mt-6">
        <button
          onClick={onClose}
          className="px-3 py-1 text-sm border"
        >
          Close
        </button>

        <button
          onClick={() => name.trim() && onSave({ id: initialData?.id, name, roles: roles.filter(r => r.name.trim()) })}
          className="px-3 py-1 text-sm bg-blue-600 text-white"
        >
          Save
        </button>
      </div>
    </div>
  );
}

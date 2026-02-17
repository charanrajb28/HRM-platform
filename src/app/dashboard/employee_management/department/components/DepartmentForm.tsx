import { useState } from "react";

export default function DepartmentForm({
  onSave,
  onClose,
}: {
  onSave: (name: string) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState("");

  return (
    <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white shadow-lg p-4 w-80 z-50">
      <h2 className="text-sm font-medium mb-3">Add Department</h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Department name"
        className="w-full border px-3 py-2 text-sm mb-4"
      />

      <div className="flex justify-end gap-2">
        <button
          onClick={onClose}
          className="px-3 py-1 text-sm border"
        >
          Close
        </button>

        <button
          onClick={() => name.trim() && onSave(name)}
          className="px-3 py-1 text-sm bg-blue-600 text-white"
        >
          Save
        </button>
      </div>
    </div>
  );
}

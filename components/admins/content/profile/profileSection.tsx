import React, { useEffect, useState } from "react";
import { getAdminByEmail, getAdminById, updateAdmin } from "@/lib/api";
import { updateAdminSchema, UpdateAdminData } from "@/lib/validation";
import { Admin } from "@/lib/types";

interface ProfileSectionProps {
  email: string;
}

export default function AdminProfile({ email }: ProfileSectionProps) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Admin>>({});

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getAdminByEmail(email); // replace with dynamic ID
        setAdmin(data);
        setFormData(data);
      } catch (err) {
        console.error("Error loading admin profile", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleSave = async () => {
    if (!admin) return;

    const parsed = updateAdminSchema.safeParse(formData as UpdateAdminData);
    if (!parsed.success) {
      alert(parsed.error.issues[0].message);
      return;
    }

    try {
      const payload = Object.fromEntries(
        Object.entries(parsed.data).filter(([_, v]) => v !== undefined)
      );
      await updateAdmin(admin.id, payload);
      const refreshed = await getAdminById(admin.id);
      setAdmin(refreshed);
      setFormData(refreshed);
      setEditing(false);
    } catch (err) {
      console.error("Failed to update admin:", err);
      alert("An unexpected error occurred.");
    }
  };

  if (loading) return <div className="text-gray-600">Loading profile...</div>;
  if (!admin) return <div className="text-red-600">No admin profile found</div>;

  return (
    <div className="bg-white rounded-lg shadow border border-gray-100 p-6 max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-100 pb-4">
        <h2 className="text-2xl font-bold text-gray-900">Admin Profile</h2>
        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Edit
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              Save
            </button>
            <button
              onClick={() => {
                setFormData(admin);
                setEditing(false);
              }}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Profile Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded border border-gray-200">
          <span className="block text-sm font-medium text-gray-600">ID</span>
          <span className="text-gray-900">{admin.id}</span>
        </div>

        <div className="bg-gray-50 p-4 rounded border border-gray-200">
          <span className="block text-sm font-medium text-gray-600">Email</span>
          <span className="text-gray-900">{admin.email}</span>
        </div>

        <div className="bg-gray-50 p-4 rounded border border-gray-200">
          <span className="block text-sm font-medium text-gray-600">Name</span>
          {editing ? (
            <input
              type="text"
              name="fullName"
              value={formData.fullName || ""}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded p-2 text-sm text-gray-400"
            />
          ) : (
            <span className="text-gray-900">{admin.fullName}</span>
          )}
        </div>

        <div className="bg-gray-50 p-4 rounded border border-gray-200">
          <span className="block text-sm font-medium text-gray-600">Age</span>
          {editing ? (
            <input
              type="number"
              name="age"
              value={formData.age || ""}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded p-2 text-sm text-gray-400"
            />
          ) : (
            <span className="text-gray-900">{admin.age}</span>
          )}
        </div>

        <div className="bg-gray-50 p-4 rounded border border-gray-200 col-span-2">
          <span className="block text-sm font-medium text-gray-600">LinkedIn</span>
          {editing ? (
            <input
              type="text"
              name="linkedInUrl"
              value={formData.linkedInUrl || ""}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded p-2 text-sm text-gray-400"
            />
          ) : (
            <a
              href={admin.linkedInUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              {admin.linkedInUrl}
            </a>
          )}
        </div>

        <div className="bg-gray-50 p-4 rounded border border-gray-200">
          <span className="block text-sm font-medium text-gray-600">Joining Date</span>
          <span className="text-gray-900">{new Date(admin.joiningDate).toLocaleDateString()}</span>
        </div>

        <div className="bg-gray-50 p-4 rounded border border-gray-200">
          <span className="block text-sm font-medium text-gray-600">Status</span>
          <span
            className={`inline-block mt-1 px-3 py-1 rounded-full text-sm ${
              admin.status === "active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {admin.status}
          </span>
        </div>
      </div>
    </div>
  );
}

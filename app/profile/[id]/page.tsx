"use client";

import AdminMainContent from "@/components/admins/content/adminContent";
import AdminHeader from "@/components/admins/adminHeader";
// Remove AdminSidebar import since it's now in the header
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getAdminById } from "@/lib/api"; 
import { Admin } from "@/lib/types";

export default function ProfilePage() {
  const params = useParams();
  const id = Number(params.id); 
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAdmin() {
      try {
        if (id) {
          const data = await getAdminById(id); 
          setAdmin(data); 
        }
      } catch (error) {
        console.error("Failed to fetch admin:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAdmin();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-lg text-gray-600">Loading...</div>
    </div>
  ); 

  if (!admin) return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-lg text-red-600">Admin not found</div>
    </div>
  ); 

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader email={admin.email} activeTab={activeTab} onTabChange={setActiveTab}/>     
      <div className="w-full py-8 px-4">
        <AdminMainContent activeTab={activeTab} email={admin.email}/>
      </div>
    </div>
  );
}
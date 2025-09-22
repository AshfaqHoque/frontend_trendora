"use client";

import AdminMainContent from "@/components/admins/content/adminContent";
import AdminHeader from "@/components/admins/adminHeader";
import AdminSidebar from "@/components/admins/adminSiderBar";
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

  if (loading) return <div>Loading...</div>; 

  if (!admin) return <div>Admin not found</div>; 

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader email={admin.email} />    
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex">
          <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
          <AdminMainContent activeTab={activeTab} email={admin.email} />
        </div>
      </div>
    </div>
  );
}

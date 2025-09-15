// app/profile/[email]/page.tsx
"use client";

import AdminMainContent from "@/components/admins/adminContent";
import AdminHeader from "@/components/admins/adminHeader";
import AdminSidebar from "@/components/admins/adminSiderBar";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
  const params = useParams();
  const email = params.email as string;
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader email={email} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex">
          <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
          <AdminMainContent activeTab={activeTab} email={email} />
        </div>
      </div>
    </div>
  );
}
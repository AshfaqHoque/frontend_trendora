import ActiveUsers from "@/components/admins/dashboard/activeUsers";
import ConversionFunnel from "@/components/admins/dashboard/conversionFunel";
import DashboardStats from "@/components/admins/dashboard/dashboardStats";
import MonthlyTarget from "@/components/admins/dashboard/monthlyTarget";
import RevenueChart from "@/components/admins/dashboard/revenueChart";
import TopCategories from "@/components/admins/dashboard/topCategories";
import StoreInsights from "./storeInsights";


export default function Dashboard() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      
      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <MonthlyTarget />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <TopCategories />
        <ConversionFunnel />
        <StoreInsights />
      </div>

      <ActiveUsers />
    </div>
  );
}
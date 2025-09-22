import ActiveUsers from "@/components/admins/content/dashboard/activeUsers";
import ConversionFunnel from "@/components/admins/content/dashboard/conversionFunel";
import DashboardStats from "@/components/admins/content/dashboard/dashboardStats";
import MonthlyTarget from "@/components/admins/content/dashboard/monthlyTarget";
import RevenueChart from "@/components/admins/content/dashboard/revenueChart";
import TopCategories from "@/components/admins/content/dashboard/topCategories";
import StoreInsights from "./topSellingProducts";
import RevenueLineChart from "./revenueLineChart";


export default function Dashboard() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      
      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <RevenueLineChart />
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
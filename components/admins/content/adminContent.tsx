import Dashboard from "./dashboard";
import LogoutComponent from "./logout/logoutComponent";
import OrdersSection from "./order/orderSection";
import ProductsSection from "./product/productSection";
import ProfileSection from "./profile/profileSection";
import VendorSection from "./vendor/vendorSection";

interface AdminMainContentProps {
  activeTab: string;
  email: string;
  onLogoutSuccess?: () => void;
}

export default function AdminMainContent({ activeTab, email, onLogoutSuccess }: AdminMainContentProps) {
  return (
    <div className="flex-1 ml-6">
      {activeTab === "dashboard" && <Dashboard />}
      {activeTab === "profile" && <ProfileSection email={email}/>}
      {activeTab === "products" && <ProductsSection/>}
      {activeTab === "orders" && <OrdersSection/>}
      {activeTab === "vendors" && <VendorSection/>}
      {activeTab === "logout" && <LogoutComponent onLogoutSuccess={onLogoutSuccess} />}
    </div>
  );
}
// components/admin/AdminMainContent.tsx
import { Users, Package, ShoppingCart, Store } from "lucide-react";
import Dashboard from "./dashboard";

interface AdminMainContentProps {
  activeTab: string;
  email: string;
}

export default function AdminMainContent({ activeTab, email }: AdminMainContentProps) {
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      
      case 'admins':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Admin Management
            </h2>
            <p className="text-gray-600">
              Admin features coming soon...
            </p>
          </div>
        );
        
      case 'products':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Product Management  
            </h2>
            <p className="text-gray-600">
              Product features coming soon...
            </p>
          </div>
        );
        
      case 'orders':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Order Management
            </h2>
            <p className="text-gray-600">
              Order features coming soon...
            </p>
          </div>
        );
        
      case 'vendors':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Vendor Management
            </h2>
            <p className="text-gray-600">
              Vendor features coming soon...
            </p>
          </div>
        );
        
      case 'settings':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Settings
            </h2>
            <p className="text-gray-600">
              Settings coming soon...
            </p>
          </div>
        );
        
      default:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Welcome {email}!
            </h2>
            <p className="text-gray-600">
              Select a section from the sidebar.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 bg-white rounded-lg shadow-md p-6">
      {renderContent()}
    </div>
  );
}
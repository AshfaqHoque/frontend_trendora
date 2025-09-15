import { BarChart3, Users, Package, ShoppingCart, Store, Settings } from "lucide-react";

// components/admin/AdminSidebar.tsx
interface AdminSidebarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export default function AdminSidebar({ activeTab, onTabChange }: AdminSidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'admins', label: 'Admins', icon: Users },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'vendors', label: 'Vendors', icon: Store },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <nav className="w-64 bg-white rounded-lg shadow-md p-6 mr-8">
      <div className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange?.(item.id)}
              className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
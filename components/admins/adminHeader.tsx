import React from 'react';
import { BarChart3, Package, ShoppingCart, Store, User, LogOut } from "lucide-react";
import NotificationBell from './notificationBell';

interface AdminHeaderProps {
  email: string;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function AdminHeader({ email, activeTab, onTabChange }: AdminHeaderProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'vendors', label: 'Vendors', icon: Store },
  ];

  return (
    <header className="bg-gray-800 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-full mx-auto px-6">
        <div className="flex justify-between items-center py-3">

          {/* Left side - Logo & Navigation */}
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-extrabold tracking-tight">Admin Panel</h1>

            {/* Navigation Items */}
            <nav className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className={`flex items-center px-4 py-2 rounded text-sm font-medium transition-all duration-150
                      ${activeTab === item.id
                        ? 'bg-white text-gray-800 font-bold shadow'
                        : 'text-gray-300 hover:text-white hover:bg-gray-700'}
                    `}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right side - Notifications & Logout */}
          <div className="flex items-center space-x-4">
            <NotificationBell />

            <button
              onClick={() => onTabChange('logout')}
              className="flex items-center px-3 py-2 rounded text-sm font-medium text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all duration-150"
              title="Logout"
            >
              <LogOut className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-gray-700 pt-3 pb-2">
          <nav className="flex space-x-1 overflow-x-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`flex items-center px-3 py-2 rounded text-sm font-medium whitespace-nowrap transition-all duration-150
                    ${activeTab === item.id
                      ? 'bg-white text-gray-800 font-bold shadow'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'}
                  `}
                >
                  <Icon className="w-4 h-4 mr-1" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}

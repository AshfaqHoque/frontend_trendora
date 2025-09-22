import { getTotalOrders, getTotalSales } from '@/lib/api';
import { TrendingUp, TrendingDown, ShoppingCart, Users, DollarSign } from 'lucide-react';
import { useEffect, useState } from 'react';

interface StatCardProps {
  title: string;
  value: number;
  growth: number;
  icon: React.ComponentType<any>;
  prefix?: string;
}

const StatCard = ({ title, value, growth, icon: Icon, prefix = 'BDT ' }: StatCardProps) => (
  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm text-gray-500">{title}</span>
      <Icon className="w-5 h-5 text-gray-400" />
    </div>
    <div className="flex items-end justify-between">
      <span className="text-2xl font-bold text-gray-900">
        {prefix}{typeof value === 'number' ? value.toLocaleString() : value}
      </span>
      <div className={`flex items-center text-sm ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        {growth >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
        <span>{Math.abs(growth)}%</span>
      </div>
    </div>
    <span className="text-xs text-gray-400">vs last year</span>
  </div>
);

export default function DashboardStats() {
  const [totalSales, setTotalSales] = useState<number>(0);
  const [salesGrowth, setSalesGrowth] = useState<number>(0);
  useEffect(() => {
    async function fetchTotalSales() {
      try {
        const response = await getTotalSales();
        setTotalSales(response.totalSales); 
        setSalesGrowth(response.salesGrowth);
      } catch (error) {
        console.error('Failed to fetch total sales', error);
      }
    }
    fetchTotalSales();
  }, []);

  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [ordersGrowth, setOrdersGrowth] = useState<number>(0);

  useEffect(() => {
    async function fetchTotalOrders() {
      try {
        const response = await getTotalOrders();
        setTotalOrders(response.totalOrders); 
        setOrdersGrowth(response.ordersGrowth);
      } catch (error) {
        console.error('Failed to fetch total orders', error);
      }
    }
    fetchTotalOrders();
  }, []);

  

  const stats = {
    totalVisitors: 237782,
    visitorsGrowth: -8.02
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCard
        title="Total Sales"
        value={totalSales}
        growth={salesGrowth}
        icon={DollarSign}
      />
      <StatCard
        title="Total Orders"
        value={totalOrders}
        growth={ordersGrowth}
        icon={ShoppingCart}
        prefix=""
      />
      <StatCard
        title="Total Visitors"
        value={stats.totalVisitors}
        growth={stats.visitorsGrowth}
        icon={Users}
        prefix=""
      />
    </div>
  );
}
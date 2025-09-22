"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getYearlyStats } from "@/lib/api";

export default function RevenueChart() {
  const [yearlyData, setYearlyData] = useState< { year: number; sales: number; orders: number }[]>([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await getYearlyStats(); 
      setYearlyData(data);
    } catch (err) {
      console.error(err);
    }
  };

  fetchData();
}, []);

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Revenue Analytics (Last 7 Years)
        </h3>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={yearlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="year" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#f97316"
              strokeWidth={3}
              dot={{ r: 4 }}
              name="Total Sales"
            />
            <Line
              type="monotone"
              dataKey="orders"
              stroke="#fdba74"
              strokeWidth={3}
              dot={{ r: 4 }}
              name="Total Orders"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

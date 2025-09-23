"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { fetchOrderStatusSummary } from "@/lib/api";
import { StatusData } from "@/lib/types";

// Dark professional colors
const STATUS_COLORS: Record<string, string> = {
  completed: "#15803d",   // dark green
  paid: "#1e40af",        // dark blue
  shipped: "#ca8a04",     // dark yellow
  pending: "#c2410c",     // dark orange
  cancelled: "#b91c1c",   // dark red
  other: "#6b7280",       // dark gray
};

export default function OrderStatusChart() {
  const [data, setData] = useState<StatusData[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchOrderStatusSummary();
        setData(result);
      } catch (error) {
        console.error("Failed to fetch order status summary:", error);
      }
    };
    loadData();
  }, []);

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900">Order Status</h3>
      <div className="h-70">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data as { [key: string]: any }[]}
              dataKey="count"
              nameKey="status"
              cx="50%"
              cy="50%"
              outerRadius={80}   // slightly smaller pie
              innerRadius={40}   // donut style to give space for labels
              labelLine={true}
              label={({ percent, name }) =>
                `${(name as string).charAt(0).toUpperCase() + (name as string).slice(1)} ${((percent as number) * 100).toFixed(0)}%`
              }
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={STATUS_COLORS[entry.status] || STATUS_COLORS["other"]}
                  stroke="#ffffff"  // slice separation
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number, name: string) => [
                `${value}`,
                `${name.charAt(0).toUpperCase() + name.slice(1)}`,
              ]}
            />
            <Legend
              formatter={(value: string) => value.charAt(0).toUpperCase() + value.slice(1)}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

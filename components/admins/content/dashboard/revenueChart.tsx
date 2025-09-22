// components/admin/dashboard/RevenueChart.tsx

export default function RevenueChart() {
  const revenueData = [
    { month: '13 Aug', revenue: 12000, orders: 8000 },
    { month: '14 Aug', revenue: 13500, orders: 9200 },
    { month: '15 Aug', revenue: 11800, orders: 7800 },
    { month: '16 Aug', revenue: 14200, orders: 9800 },
    { month: '17 Aug', revenue: 15100, orders: 10500 },
    { month: '18 Aug', revenue: 13800, orders: 9000 },
    { month: '19 Aug', revenue: 14521, orders: 9800 }
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Revenue Analytics</h3>
        <button className="px-4 py-2 bg-orange-500 text-white text-sm rounded-lg hover:bg-orange-600">
          Last 7 Days
        </button>
      </div>
      
      <div className="mb-4">
        <span className="text-2xl font-bold text-gray-900">$14,521</span>
        <span className="text-sm text-gray-500 ml-2">Current Revenue</span>
      </div>

      {/* Simple Chart */}
      <div className="h-48 flex items-end space-x-3 border-b border-gray-100">
        {revenueData.map((data, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div className="w-full bg-gray-100 rounded-t-lg relative" style={{ height: '150px' }}>
              <div 
                className="bg-orange-500 rounded-t-lg absolute bottom-0 w-full"
                style={{ height: `${(data.revenue / 16000) * 100}%` }}
              ></div>
              <div 
                className="bg-orange-300 rounded-t-lg absolute bottom-0 w-full opacity-50"
                style={{ height: `${(data.orders / 16000) * 100}%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-500 mt-2">{data.month}</span>
          </div>
        ))}
      </div>
      
      <div className="flex items-center justify-between mt-4 text-sm">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-orange-500 rounded mr-2"></div>
          <span className="text-gray-600">Revenue</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-orange-300 rounded mr-2"></div>
          <span className="text-gray-600">Orders</span>
        </div>
      </div>
    </div>
  );
}
// components/admin/dashboard/StoreInsights.tsx

export default function StoreInsights() {
  const topProducts = [
    { name: "Nike Air Max", sales: 1200, revenue: "$45,000" },
    { name: "Adidas Ultraboost", sales: 980, revenue: "$38,000" },
    { name: "Apple AirPods", sales: 750, revenue: "$75,000" },
    { name: "Samsung Galaxy Watch", sales: 600, revenue: "$48,000" },
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
    <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Top Selling Products</h3>
        <button className="text-gray-400 hover:text-gray-600">•••</button>
    </div>
    
    <div className="space-y-4">
        {topProducts.map((product, index) => (
        <div
            key={index}
            className="flex items-center justify-between border-b border-gray-100 pb-2 last:border-none"
        >
            <span className="text-sm text-gray-700">{product.name}</span>
            <div className="text-right">
            <p className="text-sm font-semibold">{product.sales} sold</p>
            <p className="text-xs text-gray-500">{product.revenue}</p>
            </div>
        </div>
        ))}
    </div>
    </div>
  );
}

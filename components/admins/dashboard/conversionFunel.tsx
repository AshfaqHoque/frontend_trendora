// components/admin/dashboard/ConversionFunnel.tsx

export default function ConversionFunnel() {
  const funnelData = [
    { stage: 'Product Views', value: 25000, percentage: 100 },
    { stage: 'Add to Cart', value: 12000, percentage: 48 },
    { stage: 'Proceed to Checkout', value: 8500, percentage: 34 },
    { stage: 'Completed Purchases', value: 6200, percentage: 25 },
    { stage: 'New Orders', value: 3000, percentage: 12 }
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Conversion Rate</h3>
        <button className="px-3 py-1 bg-orange-500 text-white text-xs rounded">This Week</button>
      </div>
      
      <div className="space-y-4">
        {funnelData.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{item.stage}</span>
              <span className="text-sm font-semibold">{item.value.toLocaleString()}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div 
                className="bg-orange-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-500">{item.percentage}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
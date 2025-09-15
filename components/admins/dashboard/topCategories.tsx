// components/admin/dashboard/TopCategories.tsx
type CircularProgressProps = {
  percentage: number;
  size?: number;
};

const CircularProgress = ({ percentage, size = 100 }: CircularProgressProps) => {
  const radius = (size - 20) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgb(249 250 251)"
          strokeWidth="8"
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgb(249 115 22)"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-300"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900">{percentage}%</div>
        </div>
      </div>
    </div>
  );
};

export default function TopCategories() {
  const categories = [
    { name: 'Electronics', sales: 1200000, color: 'bg-orange-500' },
    { name: 'Fashion', sales: 950000, color: 'bg-yellow-400' },
    { name: 'Home & Kitchen', sales: 750000, color: 'bg-orange-300' },
    { name: 'Beauty & Personal Care', sales: 500000, color: 'bg-orange-200' }
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Top Categories</h3>
        <button className="text-orange-500 text-sm hover:text-orange-600">See All</button>
      </div>
      
      <div className="mb-6 flex flex-col items-center">
        <CircularProgress percentage={75} size={100} />
        <div className="text-center mt-2">
          <p className="font-semibold">Total Sales</p>
          <p className="text-lg font-bold text-gray-900">$3,400,000</p>
        </div>
      </div>
      
      <div className="space-y-3">
        {categories.map((category, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-3 ${category.color}`}></div>
              <span className="text-sm text-gray-700">{category.name}</span>
            </div>
            <span className="text-sm font-semibold">${category.sales.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
// components/admin/dashboard/MonthlyTarget.tsx

interface CircularProgressProps {
  percentage: number;
  size?: number;
}

const CircularProgress = ({ percentage, size = 120 }: CircularProgressProps) => {
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
          strokeWidth="10"
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgb(249 115 22)"
          strokeWidth="10"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-300"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{percentage}%</div>
          <div className="text-xs text-gray-500">Target</div>
        </div>
      </div>
    </div>
  );
};

export default function MonthlyTarget() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Monthly Target</h3>
        <button className="text-gray-400 hover:text-gray-600">•••</button>
      </div>
      
      <div className="flex flex-col items-center">
        <CircularProgress percentage={85} />
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">+8.02% from last month</p>
          <p className="text-xs text-gray-500 mt-1">Great Progress! 🎉</p>
          <p className="text-xs text-gray-500">Our achievements increased by 200% 000, let's reach 100% next month</p>
        </div>
        
        <div className="flex items-center justify-between w-full mt-6 pt-4 border-t border-gray-100">
          <div className="text-center">
            <p className="text-sm font-semibold">$600,000</p>
            <p className="text-xs text-gray-500">Achieved</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold">$610,000</p>
            <p className="text-xs text-gray-500">Target</p>
          </div>
        </div>
      </div>
    </div>
  );
}
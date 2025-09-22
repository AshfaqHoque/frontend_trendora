// components/admin/dashboard/ActiveUsers.tsx

export default function ActiveUsers() {
  const usersData = [
    { country: 'United States', percentage: 36, users: '892K' },
    { country: 'United Kingdom', percentage: 24, users: '594K' },
    { country: 'Indonesia', percentage: 17.5, users: '433K' },
    { country: 'Russia', percentage: 15, users: '371K' }
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Active Users</h3>
          <p className="text-sm text-gray-500">2,758 Users (+8.02% from last month)</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {usersData.map((user, index) => (
          <div key={index} className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">{user.country}</span>
              <span className="text-sm font-semibold">{user.percentage}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div 
                className="bg-orange-500 h-2 rounded-full"
                style={{ width: `${user.percentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500">{user.users} users</p>
          </div>
        ))}
      </div>
    </div>
  );
}
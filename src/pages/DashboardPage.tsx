import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';

export const DashboardPage = () => {
  const stats = [
    {
      label: 'Account Balance',
      value: '$10,000.00',
      change: '+5.2%',
      trend: 'up',
      icon: DollarSign,
    },
    {
      label: 'Total Profit',
      value: '$2,450.00',
      change: '+12.3%',
      trend: 'up',
      icon: TrendingUp,
    },
    {
      label: 'Active Positions',
      value: '8',
      change: '3 new',
      trend: 'neutral',
      icon: Activity,
    },
    {
      label: 'Win Rate',
      value: '68%',
      change: '+3.5%',
      trend: 'up',
      icon: TrendingUp,
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Zendriv</h1>
        <p className="text-gray-600">Your trading dashboard overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${
                  stat.trend === 'up' ? 'bg-green-100' : 'bg-blue-100'
                }`}>
                  <Icon className={`w-6 h-6 ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-blue-600'
                  }`} />
                </div>
                {stat.trend === 'up' ? (
                  <span className="text-green-600 text-sm font-semibold flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    {stat.change}
                  </span>
                ) : stat.trend === 'down' ? (
                  <span className="text-red-600 text-sm font-semibold flex items-center gap-1">
                    <TrendingDown className="w-4 h-4" />
                    {stat.change}
                  </span>
                ) : (
                  <span className="text-gray-600 text-sm font-semibold">
                    {stat.change}
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Trades</h2>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((trade) => (
              <div key={trade} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Volatility 100</p>
                    <p className="text-sm text-gray-600">CALL - 5 ticks</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">+$45.00</p>
                  <p className="text-sm text-gray-600">2 min ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Market Overview</h2>
          <div className="space-y-4">
            {[
              { name: 'Volatility 100', value: '5,234.56', change: '+2.3%' },
              { name: 'Volatility 75', value: '3,456.78', change: '+1.8%' },
              { name: 'Volatility 50', value: '2,789.34', change: '-0.5%' },
              { name: 'Volatility 25', value: '1,567.89', change: '+3.1%' },
            ].map((market, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">{market.name}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{market.value}</p>
                </div>
                <span className={`text-sm font-semibold ${
                  market.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {market.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

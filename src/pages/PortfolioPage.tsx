import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Activity, Clock } from 'lucide-react';
import { useDerivWebSocket } from '../hooks/useDerivWebSocket';

export const PortfolioPage = () => {
  const { connected, activeSymbols, tickData, subscribeTicks } = useDerivWebSocket();
  const [selectedSymbols] = useState(['1HZ100V', '1HZ75V', '1HZ50V', '1HZ25V']);

  useEffect(() => {
    if (connected && selectedSymbols.length > 0) {
      subscribeTicks(selectedSymbols);
    }
  }, [connected, selectedSymbols, subscribeTicks]);

  const openPositions = [
    {
      id: 1,
      symbol: 'Volatility 100',
      type: 'CALL',
      stake: 10.0,
      payout: 19.5,
      entryPrice: 5234.56,
      currentPrice: 5245.23,
      profit: 5.2,
      duration: '5 ticks',
      status: 'active',
    },
    {
      id: 2,
      symbol: 'Volatility 75',
      type: 'PUT',
      stake: 15.0,
      payout: 29.0,
      entryPrice: 3456.78,
      currentPrice: 3450.12,
      profit: 8.5,
      duration: '5 ticks',
      status: 'active',
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Portfolio</h1>
            <p className="text-gray-600">Manage your positions and track performance</p>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
            <span className="text-sm text-gray-600">
              {connected ? 'Connected to Market' : 'Disconnected'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Positions</p>
              <p className="text-2xl font-bold text-gray-900">{openPositions.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Profit</p>
              <p className="text-2xl font-bold text-green-600">
                +${openPositions.reduce((sum, pos) => sum + pos.profit, 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Stake</p>
              <p className="text-2xl font-bold text-gray-900">
                ${openPositions.reduce((sum, pos) => sum + pos.stake, 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Open Positions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Symbol</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Stake</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Entry</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Current</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Profit/Loss</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Duration</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {openPositions.map((position) => (
                <tr key={position.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">{position.symbol}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                      position.type === 'CALL'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {position.type === 'CALL' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      {position.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-900">${position.stake.toFixed(2)}</td>
                  <td className="px-6 py-4 text-gray-900">{position.entryPrice.toFixed(2)}</td>
                  <td className="px-6 py-4 text-gray-900">{position.currentPrice.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className="text-green-600 font-semibold">
                      +${position.profit.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{position.duration}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-700">
                      {position.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Live Market Prices</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {selectedSymbols.map((symbol) => {
              const tick = tickData[symbol] as Record<string, unknown> | undefined;
              const quote = tick?.quote as number | undefined;

              return (
                <div key={symbol} className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">{symbol}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {quote ? quote.toFixed(2) : 'Loading...'}
                  </p>
                  {activeSymbols.length > 0 && (
                    <p className="text-xs text-green-600 mt-1">Live</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

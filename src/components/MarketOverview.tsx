
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { MarketIndices } from '../types';

interface MarketOverviewProps {
  indices: MarketIndices;
}

const MarketOverview: React.FC<MarketOverviewProps> = ({ indices }) => {
  const IndexCard = ({ name, value, change, changePercent }: {
    name: string;
    value: number;
    change: number;
    changePercent: number;
  }) => {
    const isPositive = change >= 0;
    
    return (
      <div className="finance-card">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">{name}</h3>
            <p className="text-2xl font-bold text-gray-900">
              {value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className={`flex items-center space-x-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
            <div className="text-right">
              <p className="font-semibold">
                {isPositive ? '+' : ''}{change.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </p>
              <p className="text-sm">
                ({isPositive ? '+' : ''}{changePercent.toFixed(2)}%)
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Market Overview</h2>
        <span className="text-sm text-gray-500">Last updated: {new Date().toLocaleTimeString()}</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <IndexCard
          name="NIFTY 50"
          value={indices.nifty50.value}
          change={indices.nifty50.change}
          changePercent={indices.nifty50.changePercent}
        />
        <IndexCard
          name="SENSEX"
          value={indices.sensex.value}
          change={indices.sensex.change}
          changePercent={indices.sensex.changePercent}
        />
        <IndexCard
          name="NIFTY BANK"
          value={indices.niftyBank.value}
          change={indices.niftyBank.change}
          changePercent={indices.niftyBank.changePercent}
        />
      </div>
    </section>
  );
};

export default MarketOverview;

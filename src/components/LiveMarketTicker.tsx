
import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TickerItem {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

const LiveMarketTicker = () => {
  const [tickerData, setTickerData] = useState<TickerItem[]>([
    { symbol: 'NIFTY', price: 19845.65, change: 125.30, changePercent: 0.63 },
    { symbol: 'SENSEX', price: 66598.91, change: 398.27, changePercent: 0.60 },
    { symbol: 'RELIANCE', price: 2485.50, change: 28.75, changePercent: 1.17 },
    { symbol: 'TCS', price: 3624.80, change: -45.20, changePercent: -1.23 },
    { symbol: 'HDFC', price: 1678.25, change: 15.80, changePercent: 0.95 },
    { symbol: 'INFY', price: 1456.70, change: 22.30, changePercent: 1.56 },
    { symbol: 'ITC', price: 456.85, change: -3.45, changePercent: -0.75 },
    { symbol: 'WIPRO', price: 432.60, change: 8.90, changePercent: 2.10 }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerData(prev => 
        prev.map(item => ({
          ...item,
          price: item.price + (Math.random() - 0.5) * 20,
          change: item.change + (Math.random() - 0.5) * 5,
          changePercent: item.changePercent + (Math.random() - 0.5) * 0.5
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-900 text-white py-2 overflow-hidden relative">
      <div className="animate-marquee flex space-x-8 whitespace-nowrap">
        {[...tickerData, ...tickerData].map((item, index) => (
          <div key={`${item.symbol}-${index}`} className="flex items-center space-x-2 shrink-0">
            <span className="font-semibold">{item.symbol}</span>
            <span className="text-gray-300">₹{item.price.toFixed(2)}</span>
            <div className={`flex items-center space-x-1 ${
              item.change >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {item.change >= 0 ? 
                <TrendingUp className="h-3 w-3" /> : 
                <TrendingDown className="h-3 w-3" />
              }
              <span className="text-sm">
                {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)} 
                ({item.change >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveMarketTicker;

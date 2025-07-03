
import React, { useState, useEffect } from 'react';
import { Activity, TrendingUp, TrendingDown, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface LiveUpdate {
  id: string;
  type: 'price' | 'news' | 'alert';
  title: string;
  message: string;
  timestamp: Date;
  symbol?: string;
  change?: number;
}

const RealTimeUpdates = () => {
  const [liveUpdates, setLiveUpdates] = useState<LiveUpdate[]>([]);
  const [isLive, setIsLive] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      // Simulate real-time updates
      const updates: LiveUpdate[] = [
        {
          id: Date.now().toString(),
          type: 'price',
          title: 'RELIANCE',
          message: 'Price updated to ₹2,485.50',
          timestamp: new Date(),
          symbol: 'RELIANCE',
          change: 1.2
        },
        {
          id: (Date.now() + 1).toString(),
          type: 'news',
          title: 'Market Alert',
          message: 'Nifty crosses 19,800 levels amid positive sentiment',
          timestamp: new Date()
        },
        {
          id: (Date.now() + 2).toString(),
          type: 'alert',
          title: 'Portfolio Alert',
          message: 'TCS shows strong buying interest',
          timestamp: new Date(),
          symbol: 'TCS',
          change: 2.1
        }
      ];

      const randomUpdate = updates[Math.floor(Math.random() * updates.length)];
      
      setLiveUpdates(prev => [randomUpdate, ...prev.slice(0, 9)]);
      
      // Show toast notification for important updates
      if (randomUpdate.type === 'alert') {
        toast({
          title: randomUpdate.title,
          description: randomUpdate.message,
        });
      }
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [isLive, toast]);

  const toggleLiveUpdates = () => {
    setIsLive(!isLive);
    toast({
      title: isLive ? 'Live Updates Paused' : 'Live Updates Resumed',
      description: isLive ? 'Real-time updates have been paused' : 'Real-time updates are now active',
    });
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Activity className="h-5 w-5 text-finance-primary" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Live Updates</h3>
          {isLive && (
            <div className="flex items-center space-x-1">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-600 dark:text-green-400">LIVE</span>
            </div>
          )}
        </div>
        <button
          onClick={toggleLiveUpdates}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
            isLive 
              ? 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-300' 
              : 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-300'
          }`}
        >
          {isLive ? 'Pause' : 'Resume'}
        </button>
      </div>

      <div className="space-y-3 max-h-64 overflow-y-auto">
        {liveUpdates.length === 0 ? (
          <div className="text-center py-4 text-gray-500 dark:text-gray-400">
            <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>Waiting for live updates...</p>
          </div>
        ) : (
          liveUpdates.map((update) => (
            <div 
              key={update.id} 
              className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex-shrink-0">
                {update.type === 'price' && <TrendingUp className="h-4 w-4 text-blue-500 mt-1" />}
                {update.type === 'news' && <Activity className="h-4 w-4 text-green-500 mt-1" />}
                {update.type === 'alert' && <TrendingDown className="h-4 w-4 text-orange-500 mt-1" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {update.title}
                  </p>
                  <div className="flex items-center space-x-2">
                    {update.change && (
                      <Badge 
                        variant={update.change > 0 ? 'default' : 'destructive'}
                        className="text-xs"
                      >
                        {update.change > 0 ? '+' : ''}{update.change}%
                      </Badge>
                    )}
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {update.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {update.message}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RealTimeUpdates;

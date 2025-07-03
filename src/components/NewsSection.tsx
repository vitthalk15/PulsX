
import React, { useState } from 'react';
import { Calendar, ExternalLink, Filter, Star, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { NewsItem } from '../types';

interface NewsSectionProps {
  news: NewsItem[];
  portfolioStocks: string[];
}

const NewsSection: React.FC<NewsSectionProps> = ({ news, portfolioStocks }) => {
  const [filter, setFilter] = useState<'all' | 'portfolio' | 'general'>('all');
  
  const filteredNews = news.filter(item => {
    if (filter === 'portfolio') {
      return item.category === 'stock-specific' && 
             item.relatedStocks?.some(stock => portfolioStocks.includes(stock));
    }
    if (filter === 'general') {
      return item.category === 'general';
    }
    return true;
  });

  const getSentimentIcon = (sentiment?: string) => {
    switch (sentiment) {
      case 'positive':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'negative':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const getSentimentColor = (sentiment?: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'negative':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Less than an hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Market News</h2>
        <div className="flex space-x-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All News
          </Button>
          <Button
            variant={filter === 'portfolio' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('portfolio')}
          >
            Portfolio News
          </Button>
          <Button
            variant={filter === 'general' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('general')}
          >
            General News
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredNews.map((item) => (
          <div key={item.id} className="news-card group">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs">
                  {item.source}
                </Badge>
                {item.category === 'stock-specific' && (
                  <Badge variant="secondary" className="text-xs">
                    <Star className="h-3 w-3 mr-1" />
                    Portfolio
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-2">
                {getSentimentIcon(item.sentiment)}
                <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </div>
            </div>

            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-finance-primary transition-colors">
              {item.title}
            </h3>
            
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {item.description}
            </p>

            {item.relatedStocks && (
              <div className="flex flex-wrap gap-1 mb-3">
                {item.relatedStocks.map((stock) => (
                  <Badge key={stock} variant="outline" className="text-xs">
                    {stock}
                  </Badge>
                ))}
              </div>
            )}

            {item.sentiment && (
              <div className={`rounded-lg p-3 mb-3 border ${getSentimentColor(item.sentiment)}`}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">AI Analysis</span>
                  {item.confidenceScore && (
                    <span className="text-xs">
                      {Math.round(item.confidenceScore * 100)}% confidence
                    </span>
                  )}
                </div>
                {item.impact && (
                  <p className="text-xs mt-1">{item.impact}</p>
                )}
              </div>
            )}

            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>{formatTimeAgo(item.publishedAt)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewsSection;


import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import MarketOverview from '../components/MarketOverview';
import NewsSection from '../components/NewsSection';
import PortfolioManager from '../components/PortfolioManager';
import AIInsights from '../components/AIInsights';
import RealTimeUpdates from '../components/RealTimeUpdates';
import NotificationCenter from '../components/NotificationCenter';
import LiveMarketTicker from '../components/LiveMarketTicker';
import { mockNews, mockPortfolio, mockMarketIndices, generateMockSentiment } from '../data/mockData';
import { Portfolio, NewsItem, SentimentAnalysis } from '../types';

const Index = () => {
  const [portfolio, setPortfolio] = useState<Portfolio>(mockPortfolio);
  const [news] = useState<NewsItem[]>(mockNews);
  const [sentimentAnalysis, setSentimentAnalysis] = useState<SentimentAnalysis | null>(null);

  // Generate AI sentiment analysis when portfolio or news changes
  useEffect(() => {
    const portfolioSymbols = portfolio.stocks.map(stock => stock.symbol);
    const relevantNews = news.filter(item => 
      item.category === 'general' || 
      (item.relatedStocks && item.relatedStocks.some(stock => portfolioSymbols.includes(stock)))
    );
    
    const analysis = generateMockSentiment(portfolioSymbols, relevantNews);
    setSentimentAnalysis(analysis);
  }, [portfolio, news]);

  const handlePortfolioUpdate = (updatedPortfolio: Portfolio) => {
    setPortfolio(updatedPortfolio);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Live Market Ticker */}
      <LiveMarketTicker />
      
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-8 text-center">
          <div className="bg-gradient-to-r from-finance-primary to-blue-600 text-white p-8 rounded-2xl shadow-xl">
            <h1 className="text-4xl font-bold mb-4">
              Smart Portfolio Intelligence for Indian Markets
            </h1>
            <p className="text-xl opacity-90 mb-6">
              Get AI-powered insights on how market news impacts your stock holdings with PulsX
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm">
              <div className="flex items-center">
                <div className="h-2 w-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                Real-time News Analysis
              </div>
              <div className="flex items-center">
                <div className="h-2 w-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></div>
                Portfolio Impact Assessment
              </div>
              <div className="flex items-center">
                <div className="h-2 w-2 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
                AI-Powered Insights
              </div>
            </div>
          </div>
        </div>

        {/* Market Overview */}
        <MarketOverview indices={mockMarketIndices} />

        {/* Real-time Updates and Portfolio Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <PortfolioManager 
              portfolio={portfolio} 
              onPortfolioUpdate={handlePortfolioUpdate} 
            />
          </div>
          <div>
            <RealTimeUpdates />
          </div>
        </div>

        {/* AI Insights */}
        {sentimentAnalysis && (
          <AIInsights analysis={sentimentAnalysis} />
        )}

        {/* News Section */}
        <NewsSection 
          news={news} 
          portfolioStocks={portfolio.stocks.map(stock => stock.symbol)} 
        />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">PulsX</h3>
              <p className="text-gray-400 text-sm">
                Intelligent market analysis and portfolio insights powered by AI
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Features</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Real-time Updates</li>
                <li>Live Notifications</li>
                <li>Portfolio Tracking</li>
                <li>AI Sentiment Analysis</li>
                <li>Market Insights</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Data Sources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Economic Times</li>
                <li>Moneycontrol</li>
                <li>Business Standard</li>
                <li>Financial Express</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Disclaimer</h4>
              <p className="text-xs text-gray-400">
                This platform provides information for educational purposes only. 
                Not financial advice. Please consult professionals before investing.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 PulsX. Built with AI intelligence for smart investors.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

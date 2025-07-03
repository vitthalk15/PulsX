
import { NewsItem, Stock, Portfolio, MarketIndices } from '../types';

export const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'RBI Governor Announces New Monetary Policy, Repo Rate Unchanged at 6.5%',
    description: 'Reserve Bank of India maintains status quo on interest rates amid inflation concerns and global economic uncertainty.',
    source: 'Economic Times',
    publishedAt: '2024-01-15T10:30:00Z',
    url: '#',
    category: 'general',
    sentiment: 'neutral',
    confidenceScore: 0.75,
    impact: 'Mixed impact on banking and financial sector stocks'
  },
  {
    id: '2',
    title: 'Reliance Industries Reports Strong Q3 Results, Beats Estimates',
    description: 'RIL posts 12% YoY growth in net profit driven by strong performance in oil & gas and retail segments.',
    source: 'Moneycontrol',
    publishedAt: '2024-01-15T09:45:00Z',
    url: '#',
    category: 'stock-specific',
    relatedStocks: ['RELIANCE'],
    sentiment: 'positive',
    confidenceScore: 0.92,
    impact: 'Strong positive impact expected on stock price'
  },
  {
    id: '3',
    title: 'TCS Wins Major Digital Transformation Contract from European Bank',
    description: 'Tata Consultancy Services secures $500M multi-year deal for digital banking solutions implementation.',
    source: 'Business Standard',
    publishedAt: '2024-01-15T08:20:00Z',
    url: '#',
    category: 'stock-specific',
    relatedStocks: ['TCS'],
    sentiment: 'positive',
    confidenceScore: 0.88,
    impact: 'Positive revenue growth outlook for IT sector'
  },
  {
    id: '4',
    title: 'HDFC Bank Faces Regulatory Scrutiny Over Digital Payment Issues',
    description: 'Banking regulator raises concerns about recent technical glitches affecting customer transactions.',
    source: 'Hindu Business Line',
    publishedAt: '2024-01-15T07:15:00Z',
    url: '#',
    category: 'stock-specific',
    relatedStocks: ['HDFCBANK'],
    sentiment: 'negative',
    confidenceScore: 0.81,
    impact: 'Potential short-term pressure on banking stocks'
  },
  {
    id: '5',
    title: 'Infosys Announces Strategic Partnership with Microsoft for AI Solutions',
    description: 'New collaboration to develop AI-powered enterprise solutions targeting global markets.',
    source: 'Financial Express',
    publishedAt: '2024-01-15T06:30:00Z',
    url: '#',
    category: 'stock-specific',
    relatedStocks: ['INFY'],
    sentiment: 'positive',
    confidenceScore: 0.85,
    impact: 'Long-term growth prospects in AI sector'
  },
  {
    id: '6',
    title: 'Indian Stock Markets Rally on Strong FII Inflows',
    description: 'Foreign institutional investors pump in ₹8,500 crores in Indian equities this week.',
    source: 'Mint',
    publishedAt: '2024-01-15T05:45:00Z',
    url: '#',
    category: 'general',
    sentiment: 'positive',
    confidenceScore: 0.79,
    impact: 'Broad market optimism across sectors'
  },
  {
    id: '7',
    title: 'Coal India Production Drops 5% YoY Due to Monsoon Impact',
    description: 'Extended monsoon season affects mining operations, potentially impacting power sector.',
    source: 'Economic Times',
    publishedAt: '2024-01-14T16:20:00Z',
    url: '#',
    category: 'stock-specific',
    relatedStocks: ['COALINDIA'],
    sentiment: 'negative',
    confidenceScore: 0.73,
    impact: 'Negative impact on commodity and power stocks'
  },
  {
    id: '8',
    title: 'Bharti Airtel 5G Network Reaches 100 Cities Milestone',
    description: 'Telecom giant accelerates 5G rollout, covering major urban centers across India.',
    source: 'LiveMint',
    publishedAt: '2024-01-14T14:10:00Z',
    url: '#',
    category: 'stock-specific',
    relatedStocks: ['BHARTIARTL'],
    sentiment: 'positive',
    confidenceScore: 0.84,
    impact: 'Competitive advantage in telecom sector'
  }
];

export const mockStocks: Stock[] = [
  {
    symbol: 'RELIANCE',
    name: 'Reliance Industries Ltd',
    quantity: 100,
    avgPrice: 2450.50,
    currentPrice: 2580.75,
    change: 32.25,
    changePercent: 1.27,
    value: 258075
  },
  {
    symbol: 'TCS',
    name: 'Tata Consultancy Services',
    quantity: 50,
    avgPrice: 3420.80,
    currentPrice: 3485.20,
    change: 15.40,
    changePercent: 0.44,
    value: 174260
  },
  {
    symbol: 'HDFCBANK',
    name: 'HDFC Bank Ltd',
    quantity: 75,
    avgPrice: 1650.25,
    currentPrice: 1598.90,
    change: -12.35,
    changePercent: -0.77,
    value: 119917.5
  },
  {
    symbol: 'INFY',
    name: 'Infosys Ltd',
    quantity: 80,
    avgPrice: 1425.60,
    currentPrice: 1456.80,
    change: 8.90,
    changePercent: 0.61,
    value: 116544
  },
  {
    symbol: 'BHARTIARTL',
    name: 'Bharti Airtel Ltd',
    quantity: 200,
    avgPrice: 845.30,
    currentPrice: 867.45,
    change: 11.25,
    changePercent: 1.30,
    value: 173490
  }
];

export const mockPortfolio: Portfolio = {
  totalValue: 842286.5,
  totalGainLoss: 28456.75,
  totalGainLossPercent: 3.50,
  stocks: mockStocks
};

export const mockMarketIndices: MarketIndices = {
  nifty50: {
    value: 21845.65,
    change: 156.32,
    changePercent: 0.72
  },
  sensex: {
    value: 72456.89,
    change: 345.67,
    changePercent: 0.48
  },
  niftyBank: {
    value: 46789.23,
    change: -123.45,
    changePercent: -0.26
  }
};

// Mock AI sentiment analysis
export const generateMockSentiment = (portfolioStocks: string[], relevantNews: NewsItem[]) => {
  const positiveNews = relevantNews.filter(n => n.sentiment === 'positive').length;
  const negativeNews = relevantNews.filter(n => n.sentiment === 'negative').length;
  const neutralNews = relevantNews.filter(n => n.sentiment === 'neutral').length;
  
  let overall: 'positive' | 'negative' | 'neutral' = 'neutral';
  let score = 0.5;
  
  if (positiveNews > negativeNews) {
    overall = 'positive';
    score = 0.6 + (positiveNews - negativeNews) * 0.1;
  } else if (negativeNews > positiveNews) {
    overall = 'negative';
    score = 0.4 - (negativeNews - positiveNews) * 0.1;
  }
  
  score = Math.max(0, Math.min(1, score));
  
  return {
    overall,
    score,
    reasoning: `Analysis of ${relevantNews.length} news items shows ${positiveNews} positive, ${negativeNews} negative, and ${neutralNews} neutral developments affecting your portfolio.`,
    stockImpacts: portfolioStocks.map(symbol => {
      const stockNews = relevantNews.filter(n => n.relatedStocks?.includes(symbol));
      const stockSentiment = stockNews.length > 0 ? stockNews[0].sentiment || 'neutral' : 'neutral';
      
      return {
        symbol,
        impact: stockSentiment,
        confidence: Math.random() * 0.3 + 0.7, // 0.7 to 1.0
        reason: stockNews.length > 0 ? stockNews[0].impact || 'No specific impact identified' : 'No relevant news found'
      };
    })
  };
};

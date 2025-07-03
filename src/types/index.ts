
export interface NewsItem {
  id: string;
  title: string;
  description: string;
  source: string;
  publishedAt: string;
  url: string;
  category: 'general' | 'stock-specific';
  relatedStocks?: string[];
  sentiment?: 'positive' | 'negative' | 'neutral';
  confidenceScore?: number;
  impact?: string;
}

export interface Stock {
  symbol: string;
  name: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  change: number;
  changePercent: number;
  value: number;
}

export interface Portfolio {
  totalValue: number;
  totalGainLoss: number;
  totalGainLossPercent: number;
  stocks: Stock[];
}

export interface SentimentAnalysis {
  overall: 'positive' | 'negative' | 'neutral';
  score: number;
  reasoning: string;
  stockImpacts: {
    symbol: string;
    impact: 'positive' | 'negative' | 'neutral';
    confidence: number;
    reason: string;
  }[];
}

export interface MarketIndices {
  nifty50: {
    value: number;
    change: number;
    changePercent: number;
  };
  sensex: {
    value: number;
    change: number;
    changePercent: number;
  };
  niftyBank: {
    value: number;
    change: number;
    changePercent: number;
  };
}

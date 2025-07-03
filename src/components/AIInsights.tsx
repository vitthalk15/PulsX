
import React from 'react';
import { Brain, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, XCircle, Minus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { SentimentAnalysis } from '../types';

interface AIInsightsProps {
  analysis: SentimentAnalysis;
}

const AIInsights: React.FC<AIInsightsProps> = ({ analysis }) => {
  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'negative':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Minus className="h-5 w-5 text-gray-600" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'negative':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <Brain className="h-6 w-6 mr-2 text-finance-primary" />
          AI Market Intelligence
        </h2>
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          Powered by AI
        </Badge>
      </div>

      {/* Overall Market Sentiment */}
      <Card className="mb-6 border-l-4 border-l-finance-primary">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Overall Portfolio Sentiment</span>
            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${getSentimentColor(analysis.overall)}`}>
              {getSentimentIcon(analysis.overall)}
              <span className="font-semibold capitalize">{analysis.overall}</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Sentiment Score</span>
                <span className="text-sm font-bold">{Math.round(analysis.score * 100)}/100</span>
              </div>
              <Progress value={analysis.score * 100} className="h-3" />
            </div>
            <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded-lg">
              <AlertTriangle className="h-4 w-4 inline mr-2 text-amber-500" />
              {analysis.reasoning}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Individual Stock Impacts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {analysis.stockImpacts.map((impact) => (
          <Card key={impact.symbol} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>{impact.symbol}</span>
                {getSentimentIcon(impact.impact)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className={`px-3 py-2 rounded-lg text-sm font-medium ${getSentimentColor(impact.impact)}`}>
                  {impact.impact.charAt(0).toUpperCase() + impact.impact.slice(1)} Impact
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-600">Confidence Level</span>
                    <span className={`text-xs font-bold ${getConfidenceColor(impact.confidence)}`}>
                      {Math.round(impact.confidence * 100)}%
                    </span>
                  </div>
                  <Progress value={impact.confidence * 100} className="h-2" />
                </div>

                <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                  {impact.reason}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Disclaimer */}
      <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <p className="text-sm text-amber-800">
          <AlertTriangle className="h-4 w-4 inline mr-2" />
          <strong>Disclaimer:</strong> AI analysis is for informational purposes only. 
          Market predictions are inherently uncertain. Always conduct your own research and 
          consult with financial advisors before making investment decisions.
        </p>
      </div>
    </section>
  );
};

export default AIInsights;

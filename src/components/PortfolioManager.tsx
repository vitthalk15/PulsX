
import React, { useState } from 'react';
import { Plus, Trash2, Edit3, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Portfolio, Stock } from '../types';

interface PortfolioManagerProps {
  portfolio: Portfolio;
  onPortfolioUpdate: (portfolio: Portfolio) => void;
}

const PortfolioManager: React.FC<PortfolioManagerProps> = ({ portfolio, onPortfolioUpdate }) => {
  const [isAddingStock, setIsAddingStock] = useState(false);
  const [newStock, setNewStock] = useState({
    symbol: '',
    name: '',
    quantity: '',
    avgPrice: ''
  });

  const handleAddStock = () => {
    if (!newStock.symbol || !newStock.quantity || !newStock.avgPrice) return;

    // Mock current price (in real app, this would come from API)
    const currentPrice = parseFloat(newStock.avgPrice) * (0.95 + Math.random() * 0.1);
    const quantity = parseInt(newStock.quantity);
    const avgPrice = parseFloat(newStock.avgPrice);
    const value = currentPrice * quantity;
    const change = currentPrice - avgPrice;
    const changePercent = (change / avgPrice) * 100;

    const stock: Stock = {
      symbol: newStock.symbol.toUpperCase(),
      name: newStock.name || `${newStock.symbol} Company`,
      quantity,
      avgPrice,
      currentPrice,
      change,
      changePercent,
      value
    };

    const updatedStocks = [...portfolio.stocks, stock];
    const totalValue = updatedStocks.reduce((sum, s) => sum + s.value, 0);
    const totalInvested = updatedStocks.reduce((sum, s) => sum + (s.avgPrice * s.quantity), 0);
    const totalGainLoss = totalValue - totalInvested;
    const totalGainLossPercent = (totalGainLoss / totalInvested) * 100;

    const updatedPortfolio: Portfolio = {
      totalValue,
      totalGainLoss,
      totalGainLossPercent,
      stocks: updatedStocks
    };

    onPortfolioUpdate(updatedPortfolio);
    setNewStock({ symbol: '', name: '', quantity: '', avgPrice: '' });
    setIsAddingStock(false);
  };

  const handleRemoveStock = (symbol: string) => {
    const updatedStocks = portfolio.stocks.filter(s => s.symbol !== symbol);
    const totalValue = updatedStocks.reduce((sum, s) => sum + s.value, 0);
    const totalInvested = updatedStocks.reduce((sum, s) => sum + (s.avgPrice * s.quantity), 0);
    const totalGainLoss = totalValue - totalInvested;
    const totalGainLossPercent = totalInvested > 0 ? (totalGainLoss / totalInvested) * 100 : 0;

    const updatedPortfolio: Portfolio = {
      totalValue,
      totalGainLoss,
      totalGainLossPercent,
      stocks: updatedStocks
    };

    onPortfolioUpdate(updatedPortfolio);
  };

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">My Portfolio</h2>
        <Dialog open={isAddingStock} onOpenChange={setIsAddingStock}>
          <DialogTrigger asChild>
            <Button className="finance-button">
              <Plus className="h-4 w-4 mr-2" />
              Add Stock
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Stock</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="symbol">Stock Symbol</Label>
                <Input
                  id="symbol"
                  placeholder="e.g., RELIANCE"
                  value={newStock.symbol}
                  onChange={(e) => setNewStock({...newStock, symbol: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="name">Company Name (Optional)</Label>
                <Input
                  id="name"
                  placeholder="e.g., Reliance Industries Ltd"
                  value={newStock.name}
                  onChange={(e) => setNewStock({...newStock, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="e.g., 100"
                  value={newStock.quantity}
                  onChange={(e) => setNewStock({...newStock, quantity: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="avgPrice">Average Price (₹)</Label>
                <Input
                  id="avgPrice"
                  type="number"
                  step="0.01"
                  placeholder="e.g., 2450.50"
                  value={newStock.avgPrice}
                  onChange={(e) => setNewStock({...newStock, avgPrice: e.target.value})}
                />
              </div>
              <Button onClick={handleAddStock} className="w-full finance-button">
                Add to Portfolio
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <Wallet className="h-4 w-4 mr-2" />
              Total Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-900">
              ₹{portfolio.totalValue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              {portfolio.totalGainLoss >= 0 ? (
                <TrendingUp className="h-4 w-4 mr-2 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-2 text-red-600" />
              )}
              Total P&L
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-bold ${portfolio.totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {portfolio.totalGainLoss >= 0 ? '+' : ''}₹{portfolio.totalGainLoss.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </p>
            <p className={`text-sm ${portfolio.totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ({portfolio.totalGainLoss >= 0 ? '+' : ''}{portfolio.totalGainLossPercent.toFixed(2)}%)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Holdings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-900">{portfolio.stocks.length}</p>
            <p className="text-sm text-gray-500">Stocks</p>
          </CardContent>
        </Card>
      </div>

      {/* Holdings List */}
      <div className="space-y-4">
        {portfolio.stocks.map((stock) => (
          <div key={stock.symbol} className="portfolio-item">
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">{stock.symbol}</h4>
                  <p className="text-sm text-gray-600">{stock.name}</p>
                  <p className="text-xs text-gray-500">
                    {stock.quantity} shares @ ₹{stock.avgPrice.toFixed(2)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    ₹{stock.currentPrice.toFixed(2)}
                  </p>
                  <p className={`text-sm ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {stock.change >= 0 ? '+' : ''}₹{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                  </p>
                  <p className="text-xs text-gray-500">
                    Value: ₹{stock.value.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleRemoveStock(stock.symbol)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PortfolioManager;

import React from 'react';
import { TrendingUp, TrendingDown, BarChart2 } from 'lucide-react';

const MarketOverview: React.FC = () => {

  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-4">Market Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-green-600 flex items-center">
            <TrendingUp size={18} className="mr-1" />
            Top Gainers
          </h3>
          
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2 text-red-600 flex items-center">
            <TrendingDown size={18} className="mr-1" />
            Top Losers
          </h3>
          
        </div>
      </div>
    </div>
  );
};

export default MarketOverview;
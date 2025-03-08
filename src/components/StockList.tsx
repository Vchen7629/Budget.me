import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

const StockList: React.FC = () => {

  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Stock List */}
      <div className="md:col-span-2 bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-bold mb-4">Market</h2>
        <div className="overflow-auto max-h-[500px]">

        </div>
      </div>
      
      {/* Trade Panel */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-bold mb-4">Trade</h2>

      </div>
    </div>
  );
};

export default StockList;
import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

const IncomeCard: React.FC = () => {
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Income List */}
      <div className="md:col-span-2 bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-bold mb-4">Income</h2>
        <div className="overflow-auto max-h-[500px]">

        </div>
      </div>
      
      {/* Add Income Panel */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-bold mb-4">Add</h2>

      </div>
    </div>
  );
};

export default IncomeCard;
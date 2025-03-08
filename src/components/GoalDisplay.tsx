import React from 'react';
import { Wallet, TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';

const GoalDisplay: React.FC = () => {
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-4">Goal Display</h2>

      {/* have savings goal amount and savings goal progress here */}
      
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg flex flex-col items-center justify-between">
          <div className="flex items-center text-blue-700 mb-1">
            <Wallet size={20} className="mr-2" />
            <span className="text-sm font-medium">Cash</span>
          </div>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg flex flex-col items-center justify-between">
          <div className="flex items-center text-purple-700 mb-1">
            <BarChart3 size={20} className="mr-2" />
            <span className="text-sm font-medium">Net&nbsp;Worth</span>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default GoalDisplay;
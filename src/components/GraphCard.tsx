import React from 'react';
import Graph from './Graph';

interface GraphCardProps {
  data: any[];
}

const GraphCard: React.FC<GraphCardProps> = ({ data }) => {
  const balanceHistory = data.filter(item => item.required === -1).map(item => ({
    date: item.date,
    amount: item.amount,
  }));

  const spendingHistory = data.filter(item => item.required !== -1).map(item => ({
    date: item.date,
    amount: -item.amount,
  }));

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4">Balance & Spending History</h2>
          <Graph 
            bHistory={balanceHistory} 
            sHistory={spendingHistory} 
            width={700} 
            height={200} 
          />
        </div>

        <div className="flex space-x-2">
        </div>
      </div>
    </div>
  );
};

export default GraphCard;
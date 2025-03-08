import React from 'react';
import Graph from './Graph';

const GraphCard: React.FC = () => {

  const data = {
    balanceHistory: [100, 120, 110, 130, 140],
    spendingHistory: [20, 30, 25, 35, 40],
    spendingGoal: 100,
    incomeArray: [
      { income: 1000, period: 'Month' },
      { income: 500, period: 'Week' }
    ],
    aiRecs: [
      { title: 'Rec1', body: 'Recommendation 1' },
      { title: 'Rec2', body: 'Recommendation 2' }
    ]
  };
    

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4">Graph</h2>
          <Graph data={data} width={700} height={200} />
        </div>

        <div className="flex space-x-2">
        </div>
      </div>
    </div>
  );
};

export default GraphCard;
import React, { useState, useEffect } from 'react';
import Graph from './Graph';
import { Data } from '../types';

const GraphCard: React.FC = () => {

  //for testing only
  const data: Data = {
    
    balanceHistory: [
      { date: '2024-01-01', amount: 100 },
      { date: '2024-01-15', amount: 120 },
      { date: '2024-02-01', amount: 110 },
      { date: '2024-02-15', amount: 130 },
      { date: '2024-03-01', amount: 140 },
      { date: '2024-03-15', amount: 123 },
      { date: '2024-04-01', amount: 123 },
      { date: '2024-04-15', amount: 123 },
      { date: '2024-05-01', amount: 123 },
    ],
    spendingHistory: [
      { date: '2024-01-01', amount: 20 },
      { date: '2024-01-15', amount: 30 },
      { date: '2024-02-01', amount: 25 },
      { date: '2024-02-15', amount: 35 },
      { date: '2024-03-01', amount: 40 },
      { date: '2024-03-02', amount: 50 },
      { date: '2024-04-30', amount: 100 },
    ],
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

  const [containerWidth, setContainerWidth] = useState(0);

  const containerRef = React.createRef<HTMLDivElement>();

  useEffect(() => {
    if (containerRef.current) {
      const observer = new ResizeObserver((entries) => {
        for (let entry of entries) {
          setContainerWidth(entry.contentRect.width);
        }
      });
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-4" ref={containerRef}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4">Graph</h2>
          <Graph data={data} width={Math.min(containerWidth - 100, 700)} height={200} />
        </div>

        <div className="flex space-x-2">
        </div>
      </div>
    </div>
  );
};

export default GraphCard;

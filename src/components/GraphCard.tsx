import React, { useRef, useState, useEffect } from 'react';
import Graph from './Graph';

interface GraphCardProps {
  data: any[];
  initalBalance: number;
}

const GraphCard: React.FC<GraphCardProps> = ({ data, initalBalance: initialBalance }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(700);

  useEffect(() => {
    if (containerRef.current) {
      const observer = new ResizeObserver((entries) => {
        for (let entry of entries) {
          setContainerWidth(entry.contentRect.width);
        }
      });
      observer.observe(containerRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  const incomeHistory = data.filter(item => item.required === -1).map(item => ({
    date: item.date,
    amount: item.amount,
  }));

  const spendingHistory = data.filter(item => item.required !== -1).map(item => ({
    date: item.date,
    amount: -item.amount,
  }));

  return (
    <div ref={containerRef} className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4">Balance, Income & Spending History</h2>
          <Graph 
            iHistory={incomeHistory} 
            sHistory={spendingHistory} 
            width={Math.min(700, containerWidth)} 
            height={200}
            initialBalance={initialBalance}
          />
        </div>

        <div className="flex space-x-2">
        </div>
      </div>
    </div>
  );
};

export default GraphCard;
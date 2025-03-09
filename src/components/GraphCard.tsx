import React, { useState, useEffect } from 'react';
import Graph from './Graph';
// import { Data } from '../types';

const GraphCard: React.FC = () => {
                          //^
  //get data variable passed in (construct a data variable in other files)

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
          <h2 className="text-xl font-bold mb-4">Balance & Spending History</h2>
          <Graph 
            // data={data} 
            width={Math.min(containerWidth - 100, 700)} 
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

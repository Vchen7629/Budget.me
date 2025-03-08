import React from 'react';
import { Data } from '../types';

interface GraphProps {
  data: Data;
  width?: number;
  height?: number;
}

const Graph: React.FC<GraphProps> = ({
  data,
  width = 300,
  height = 150
}) => {
  const balanceHistory = data.balanceHistory;
  const spendingHistory = data.spendingHistory;
  
  // If we don't have enough data points, show a placeholder
  if (balanceHistory.length < 2 || spendingHistory.length < 2) {
    return (
      <div 
        className="flex items-center justify-center bg-gray-100 rounded"
        style={{ width, height }}
      >
        <p className="text-gray-500">Not Enough Data</p>
      </div>
    );
  }
  
  // Find min and max for scaling
  const maxPrice = Math.max(...balanceHistory);
  const minPrice = Math.min(...balanceHistory);
  const range = maxPrice - minPrice;
  
  // Calculate points for the SVG path
  const points = balanceHistory.map((price, index) => {
    const x = (index / (balanceHistory.length - 1)) * width;
    // Add padding to avoid touching the edges
    const normalizedPrice = range === 0 
      ? 0.5 
      : (price - minPrice) / range;
    const y = height - (normalizedPrice * (height * 0.8) + (height * 0.1));
    return `${x},${y}`;
  }).join(' ');
  
  // Determine line color based on price trend
  const firstPrice = balanceHistory[0];
  const lastPrice = balanceHistory[balanceHistory.length - 1];
  const lineColor = 'stroke-green-500';
  
  // Calculate grid line positions
  const numGridLines = 5;
  const gridLineSpacing = (height * 0.8) / (numGridLines - 1);
  const gridLineValues = Array(numGridLines).fill(0).map((_, i) => {
    const value = minPrice + (i / (numGridLines - 1)) * range;
    return value;
  });
  
  return (
    <div className="bg-white rounded-lg p-2" style={{ width: width + 50, marginLeft: 30 }}>
      <div style={{ marginLeft: 30 }}>
        <svg width={width} height={height} className="overflow-visible">
          {/* Current price indicator */}
          <circle
            cx={(balanceHistory.length - 1) / (balanceHistory.length - 1) * width}
            cy={height - ((lastPrice - minPrice) / range * (height * 0.8) + (height * 0.1))}
            r="3"
            className={lineColor.replace('stroke', 'fill')}
          />
          
          {/* Grid lines */}
          {gridLineValues.map((value, index) => {
            const y = height - ((value - minPrice) / range * (height * 0.8) + (height * 0.1));
            return (
              <React.Fragment key={index}>
                <line
                  x1={0}
                  y1={y}
                  x2={width}
                  y2={y}
                  stroke="lightgray"
                  strokeWidth="1"
                />
                <text
                  x={-20}
                  y={y + 5}
                  textAnchor="end"
                  fontSize="12"
                  fill="gray"
                >
                  ${value.toFixed(2)}
                </text>
              </React.Fragment>
            );
          })}
          {/* Price line rendered AFTER gray lines*/}
          <polyline
            points={points}
            fill="none"
            className={`${lineColor} stroke-2`}
          />
        </svg>
      </div>
      
      <div className="mt-2 flex justify-between text-sm">
        <span className="font-medium">${balanceHistory[balanceHistory.length - 1].toFixed(2)}</span>
        <span className={lastPrice >= firstPrice ? 'text-green-600' : 'text-red-600'}>
          {((lastPrice - firstPrice) / firstPrice * 100).toFixed(2)}%
        </span>
      </div>
    </div>
  );
};

export default Graph;
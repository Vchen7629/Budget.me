import React, { useState } from 'react';
import { Data } from '../types';

interface GraphProps {
  data?: Data;
  width?: number;
  height?: number;
}

const Graph: React.FC<GraphProps> = ({
  data = {
    balanceHistory: [
      { date: '2024-01-01', amount: 1 },
      { date: '2024-01-15', amount: 2 },
      { date: '2024-02-01', amount: 3 },
      { date: '2024-02-15', amount: 4 },
      { date: '2024-03-01', amount: 5 },
      { date: '2024-03-15', amount: 6 },
      { date: '2024-04-01', amount: 7 },
      { date: '2024-04-15', amount: 8 },
      { date: '2024-05-01', amount: 9 },
    ],
    spendingHistory: [
      { date: '2024-01-01', amount: 0 },
      { date: '2024-01-15', amount: 1 },
      { date: '2024-02-01', amount: 2 },
      { date: '2024-02-15', amount: 3 },
      { date: '2024-03-01', amount: 4 },
      { date: '2024-03-15', amount: 5 },
      { date: '2024-04-30', amount: 8 },
    ]},
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
  const maxPrice = Math.max(
    Math.max(...balanceHistory.map(item => item.amount)),
    Math.max(...spendingHistory.map(item => item.amount))
  );
  const minPrice = Math.min(
    Math.min(...balanceHistory.map(item => item.amount)),
    Math.min(...spendingHistory.map(item => item.amount))
  );
  const range = maxPrice - minPrice;

  // Parse dates for scaling
  const balanceDates = balanceHistory.map(item => new Date(item.date));
  const spendingDates = spendingHistory.map(item => new Date(item.date));

  // Find min and max dates
  const minDate = new Date(Math.min(
    Math.min(...balanceDates.map(date => date.getTime())),
    Math.min(...spendingDates.map(date => date.getTime()))
  ));
  const maxDate = new Date(Math.max(
    Math.max(...balanceDates.map(date => date.getTime())),
    Math.max(...spendingDates.map(date => date.getTime()))
  ));

  // Calculate points for the SVG path
  const bpoints = balanceHistory.map((item, _) => {
    const x = (new Date(item.date).getTime() - minDate.getTime()) / (maxDate.getTime() - minDate.getTime()) * width;
    // Add padding to avoid touching the edges
    const normalizedPrice = range === 0 
      ? 0.5 
      : (item.amount - minPrice) / range;
    const y = height - (normalizedPrice * (height * 0.8) + (height * 0.1));
    return { x, y, price: item.amount, date: item.date };
  });

  // Calculate points for the SVG path
  const spoints = spendingHistory.map((item, _) => {
    const x = (new Date(item.date).getTime() - minDate.getTime()) / (maxDate.getTime() - minDate.getTime()) * width;
    // Add padding to avoid touching the edges
    const normalizedPrice = range === 0 
      ? 0.5 
      : (item.amount - minPrice) / range;
    const y = height - (normalizedPrice * (height * 0.8) + (height * 0.1));
    return { x, y, price: item.amount, date: item.date };
  });

  const bLineColor = 'stroke-green-500';
  const sLineColor = 'stroke-red-500';

  interface Point {
    x: number;
    y: number;
    price: number;
    date: string;
  }

  const [hoveredPoint, setHoveredPoint] = useState<Point | null>(null);

  const handleMouseOver = (point: Point) => {
    setHoveredPoint(point);
  };

  const handleMouseOut = () => {
    setHoveredPoint(null);
  };

  // Calculate grid line positions
  const numGridLines = 5;
  const gridLineValues = Array(numGridLines).fill(0).map((_, i) => {
    const value = minPrice + (i / (numGridLines - 1)) * range;
    return value;
  });

  return (
    <div className="bg-white rounded-lg p-2" style={{ width: width + 50, marginLeft: 30 }}>
      <div style={{ marginLeft: 30 }}>
        <svg width={width} height={height} className="overflow-visible">
          {/* Current price indicator */}
          {/* <circle
            cx={(balanceHistory.length - 1) / (balanceHistory.length - 1) * width}
            cy={height - ((bLastPrice - minPrice) / range * (height * 0.8) + (height * 0.1))}
            r="3"
            className={bLineColor.replace('stroke', 'fill')}
          />
          <circle
            cx={(spendingHistory.length - 1) / (spendingHistory.length - 1) * width}
            cy={height - ((sLastPrice - minPrice) / range * (height * 0.8) + (height * 0.1))}
            r="3"
            className={sLineColor.replace('stroke', 'fill')}
          /> */}
          
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
            points={bpoints.map(point => `${point.x},${point.y}`).join(' ')}
            fill="none"
            className={`${bLineColor} stroke-2`}
          />
          <polyline
            points={spoints.map(point => `${point.x},${point.y}`).join(' ')}
            fill="none"
            className={`${sLineColor} stroke-2`}
          />
          {/* Hover points */}
          {bpoints.map((point, index) => (
            <React.Fragment key={index}>
              <circle
                cx={point.x}
                cy={point.y}
                r="4"
                fill="green"
              />
              {/* Invisible larger circle for hover area */}
              <circle
                cx={point.x}
                cy={point.y}
                r="12" // Adjust the radius to change the hover area size
                fill="transparent"
                stroke="none"
                onMouseOver={() => handleMouseOver(point)}
                onMouseOut={handleMouseOut}
              />
            </React.Fragment>
          ))}
          {spoints.map((point, index) => (
            <React.Fragment key={index}>
            <circle
              cx={point.x}
              cy={point.y}
              r="4"
              fill="red"
            />
            {/* Invisible larger circle for hover area */}
            <circle
              cx={point.x}
              cy={point.y}
              r="12" // Adjust the radius to change the hover area size
              fill="transparent"
              stroke="none"
              onMouseOver={() => handleMouseOver(point)}
              onMouseOut={handleMouseOut}
            />
          </React.Fragment>
          ))}
          {/* Tooltip */}
          {hoveredPoint && (
            <foreignObject 
              x={hoveredPoint.x - 50} 
              y={hoveredPoint.y - 40} 
              width={70} 
              height={40}               
              onMouseOver={() => handleMouseOver(hoveredPoint)}
              onMouseOut={handleMouseOut}
            >
              <div 
                className="bg-white rounded p-1 text-center shadow-md" 
                style={{ userSelect: 'none', fontSize: '10px', lineHeight: '1.2' }}
              >
                <div className="text-gray-500 text-xs">
                  {new Date(hoveredPoint.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
                <div className="text-black font-medium">
                  ${hoveredPoint.price.toFixed(2)}
                </div>
              </div>
            </foreignObject>
          )}
        </svg>
      </div>
      
      <div className="mt-2 flex justify-between text-sm">
        <span className="font-medium">${balanceHistory[balanceHistory.length - 1].amount.toFixed(2)}</span>
        {/* <span className={balanceHistory[balanceHistory.length - 1].amount - spendingHistory[spendingHistory.length - 1].amount > 0 ? 'text-green-600' : 'text-red-600'}>
          {(balanceHistory[balanceHistory.length - 1].amount - spendingHistory[spendingHistory.length - 1].amount).toFixed(2)}%
        </span> */}
      </div>
    </div>
  );
};

export default Graph;
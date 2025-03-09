import React from 'react';

interface GraphProps {
  iHistory: { date: string; amount: number }[];
  sHistory: { date: string; amount: number }[];
  width: number;
  height: number;
  initialBalance: number;
}

interface Point {
  x: number;
  y: number;
  price: number;
  date: string;
  type: string;
}

const Graph: React.FC<GraphProps> = ({
  iHistory,
  sHistory,
  width,
  height,
  initialBalance = 0,
}) => {
  const incomeHistory = iHistory;
  const spendingHistory = sHistory.map(item => ({ ...item, amount: -item.amount }));

  if (incomeHistory.length < 2 || spendingHistory.length < 2) {
    return (
      <div 
        className="flex items-center justify-center bg-gray-100 rounded"
        style={{ width, height }}
      >
        <p className="text-gray-500">Not Enough Data</p>
      </div>
    );
  }

  const maxi = Math.max(...incomeHistory.map(item => item.amount));

  const maxPrice = Math.max(
    maxi,
    Math.max(...spendingHistory.map(item => Math.abs(item.amount))),
    Math.max(initialBalance + maxi)
  );
  const minPrice = Math.min(
    Math.min(...incomeHistory.map(item => item.amount)),
    0
  );
  const range = maxPrice - minPrice;

  const incomeDates = incomeHistory.map(item => new Date(item.date));
  const spendingDates = spendingHistory.map(item => new Date(item.date));

  const minDate = new Date(Math.min(
    Math.min(...incomeDates.map(date => date.getTime())),
    Math.min(...spendingDates.map(date => date.getTime()))
  ));
  const maxDate = new Date(Math.max(
    Math.max(...incomeDates.map(date => date.getTime())),
    Math.max(...spendingDates.map(date => date.getTime()))
  ));

  const bpoints = incomeHistory.map((item, _) => {
    const x = (new Date(item.date).getTime() - minDate.getTime()) / (maxDate.getTime() - minDate.getTime()) * (width - 40);
    const normalizedPrice = range === 0 
      ? 0.5 
      : (item.amount - minPrice) / range;
    const y = height - (normalizedPrice * (height * 0.8) + (height * 0.1)); // Adjusted y calculation
    return { x: x + 20, y, price: item.amount, date: item.date, type: 'income' };
  });

  const spoints = spendingHistory.map((item, _) => {
    const x = (new Date(item.date).getTime() - minDate.getTime()) / (maxDate.getTime() - minDate.getTime()) * (width - 40);
    const normalizedPrice = range === 0 
      ? 0.5 
      : (Math.abs(item.amount) - minPrice) / range;
    const y = height - (normalizedPrice * (height * 0.8) + (height * 0.1));
    return { x: x + 20, y, price: item.amount, date: item.date, type: 'spending' };
  });

  let balance = initialBalance;
  const cumulativePoints = [...incomeHistory, ...spendingHistory].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA.getTime() - dateB.getTime();
  }).map((item, _) => {
    if (item.amount > 0) {
      balance += item.amount;
    } else {
      balance -= Math.abs(item.amount);
    }
    const x = (new Date(item.date).getTime() - minDate.getTime()) / (maxDate.getTime() - minDate.getTime()) * (width - 40);
    const normalizedPrice = range === 0 
      ? 0.5 
      : (balance - minPrice) / range;
    const y = height - (normalizedPrice * (height * 0.8) + (height * 0.1));
    return { x: x + 20, y, price: balance, date: item.date, type: 'cumulative' };
  });

  const [hoveredPoint, setHoveredPoint] = React.useState<Point | null>(null);

  const handleMouseOver = (point: Point) => {
    setHoveredPoint(point);
  };

  const handleMouseOut = () => {
    setHoveredPoint(null);
  };

  const numGridLines = 5;
  const gridLineValues = Array(numGridLines).fill(0).map((_, i) => {
    const value = minPrice + (i / (numGridLines - 1)) * range;
    return value;
  });

  return (
    <div className="pl-14 bg-white rounded-lg p-2" style={{ width: width }}>
      <svg width={width} height={height} className="overflow-visible">
        {/* Grid lines */}
        {gridLineValues.map((value, index) => {
          const normalizedValue = range === 0 
            ? 0.5 
            : (value - minPrice) / range;
          const y = height - (normalizedValue * (height * 0.8) + (height * 0.1));
          return (
            <React.Fragment key={index}>
              <line
                x1={20}
                y1={y}
                x2={width - 20}
                y2={y}
                stroke="lightgray"
                strokeWidth="1"
              />
              <text
                x={10}
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
        {/* Price lines */}
        <polyline
          points={bpoints.map(point => `${point.x},${point.y}`).join(' ')}
          fill="none"
          stroke="green"
          strokeWidth="2"
        />
        <polyline
          points={spoints.map(point => `${point.x},${point.y}`).join(' ')}
          fill="none"
          stroke="red"
          strokeWidth="2"
        />
        <polyline
          points={cumulativePoints.map(point => `${point.x},${point.y}`).join(' ')}
          fill="none"
          stroke="blue"
          strokeWidth="2"
        />
        {/* Points */}
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
              r="12" 
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
              r="12" 
              fill="transparent"
              stroke="none"
              onMouseOver={() => handleMouseOver(point)}
              onMouseOut={handleMouseOut}
            />
          </React.Fragment>
        ))}
        {cumulativePoints.map((point, index) => (
          <React.Fragment key={index}>
            <circle
              cx={point.x}
              cy={point.y}
              r="4"
              fill="blue"
            />
            {/* Invisible larger circle for hover area */}
            <circle
              cx={point.x}
              cy={point.y}
              r="12" 
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
              style={{
                backgroundColor: hoveredPoint.type === 'income' ? '#C6F4D6' : hoveredPoint.type === 'spending' ? '#FFC5C5' : '#bee3f8',
                borderRadius: '5px',
                padding: '5px',
                textAlign: 'center',
                boxShadow: '0 0 5px rgba(0,0,0,0.2)',
                userSelect: 'none',
                fontSize: '10px',
                lineHeight: '1.2'
              }}
            >
              <div style={{ color: '#6B7280', fontSize: '8px' }}>
                {new Date(hoveredPoint.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </div>
              <div style={{ color: '#000000', fontSize: '10px', fontWeight: 'bold' }}>
                ${hoveredPoint.price.toFixed(2)}
              </div>
            </div>
          </foreignObject>        
        )}
      </svg>
      {/* Legend */}
      <div className="flex space-x-4 mt-4 ml-4">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
          <span>Income</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
          <span>Spending</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-600 rounded-full mr-2"></div>
          <span>Cumulative Balance</span>
        </div>
      </div>
    </div>
  );
};

export default Graph;
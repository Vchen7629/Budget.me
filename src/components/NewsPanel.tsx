import React from 'react';
import { Newspaper, TrendingUp, TrendingDown } from 'lucide-react';

const NewsPanel: React.FC = () => {
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center mb-4">
        <Newspaper size={20} className="mr-2 text-blue-600" />
        <h2 className="text-xl font-bold">Market News</h2>
      </div>
    </div>
  );
};

export default NewsPanel;
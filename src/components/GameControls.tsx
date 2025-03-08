import React from 'react';
import { RotateCcw, Calendar } from 'lucide-react';

const GameControls: React.FC = () => {

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Calendar size={20} className="mr-2 text-blue-600" />
        </div>

        <div className="flex space-x-2">
          
        </div>
      </div>
    </div>
  );
};

export default GameControls;
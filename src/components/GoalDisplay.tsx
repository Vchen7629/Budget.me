import React, { useState } from 'react';
import { Wallet, TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';
import { Input } from './ui/input';
import { toast } from 'sonner';

const GoalDisplay: React.FC = () => {
  const [goalValue, setGoalValue] = useState("")

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    setGoalValue(value)
  }

  function handleAddNewSavingsGoal() {
    toast.success("Successfully added new savings goal")
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-4">Goal Display</h2>

      {/* have savings goal amount and savings goal progress here */}
      
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg flex flex-col items-center justify-between">
          <div className="flex items-center text-blue-700 mb-1">
            <Wallet size={20} className="mr-2" />
            <span className="text-sm font-medium">Cash</span>
          </div>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg flex flex-col items-center justify-between">
          <div className="flex items-center text-purple-700 mb-1">
            <BarChart3 size={20} className="mr-2" />
            <span className="text-sm font-medium">Net&nbsp;Worth</span>
          </div>
        </div>
      </div> */}
      <div className='flex h-[30vh]'>
        <div className='w-[55%]'></div>
        <div className='w-[45%] h-[100%] space-y-[2vh]'>
          <div className='px-2'>
            <h1 className='text-lg font-bold mb-4'>Enter a savings Goal</h1>
            <div className='space-x-2 flex'>
              <Input value={goalValue} onChange={handleInputChange} type="amount" placeholder="New Savings Goal" className="w-[82%] border-2 z-0 border-gray-400 text-gray-400"/>
              <button onSubmit={handleAddNewSavingsGoal} className='flex text-center items-center bg-green-400 px-2 rounded-lg'>
                <h1 className='text-sm font-semibold'>Add</h1>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalDisplay;
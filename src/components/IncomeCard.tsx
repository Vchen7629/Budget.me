import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Plus } from 'lucide-react';
import { Input } from './ui/input';
import { PeriodDropdownComponent } from './PeriodDropdown';
import { toast } from 'sonner';

const IncomeCard: React.FC = () => {
  const [incomeValue, setIncomeValue] = useState("");

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    setIncomeValue(value);
  }

  function handleAddNewIncome() {
    toast.success("Successfully added new income stream")
  }

  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Income List */}
      <div className="md:col-span-2 bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-bold mb-4">Income</h2>
        <div className="overflow-auto max-h-[500px]">

        </div>
      </div>
      
      {/* Add Income Panel */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className='flex justify-between'>
          <h2 className="text-lg font-bold mb-4">Add New Income</h2>
          <PeriodDropdownComponent />
        </div>  
        <div className="flex justify-between space-x-2">
          <Input value={incomeValue} onChange={handleInputChange} type="amount" placeholder="Enter a new income stream" className="w-[82%] border-2 z-0 border-gray-400 text-gray-400"/>
          <button onClick={handleAddNewIncome} className='flex items-center justify-center bg-green-400 w-[15%] rounded-lg'>
            <Plus className='text-white'/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncomeCard;
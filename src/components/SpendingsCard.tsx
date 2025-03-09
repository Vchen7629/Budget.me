import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { PeriodDropdownComponent } from './PeriodDropdown';
import { Input } from './ui/input';
import { toast } from 'sonner';

const SpendingsCard: React.FC = () => {
  const [spendingValue, setSpendingValue] = useState("");

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    setSpendingValue(value);
  }

  function handleAddNewSpending() {
    toast.success("Successfully added new spending source")
  }

  
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {/* Spendings Display */}
      <div className="md:col-span-3 bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-bold mb-4">Spendings</h2>
        {/* Add spendings display content here */}
        {/* map spending array to elements */}
      </div>
      {/* Add Spending Panel */}
      <div className="md:col-span-2 bg-white rounded-lg shadow-md p-4">
        <div className='flex justify-between'>
          <h2 className="text-lg font-bold mb-4">Add Spending</h2>
          <PeriodDropdownComponent />
        </div>  
        <div className="flex justify-between space-x-2">
          <Input value={spendingValue} onChange={handleInputChange} type="amount" placeholder="Enter Spending Per Period" className="w-[82%] border-2 z-0 border-gray-400 text-gray-400"/>
          <button onClick={handleAddNewSpending} className='flex items-center justify-center bg-green-400 w-[15%] rounded-lg'>
            <Plus className='text-white w-4'/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpendingsCard;
import React, { useState } from 'react';
import { RotateCcw, Calendar, Plus } from 'lucide-react';
import { PeriodDropdownComponent } from './PeriodDropdown';
import { Input } from './ui/input';
import { toast } from 'sonner';

const BalanceCard: React.FC = () => {
  const [balanceValue, setBalanceValue] = useState("");

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    setBalanceValue(value);
  }

  function handleAddNewIncome() {
    toast.success("Successfully added income")
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <h2 className="text-xl font-bold mb-4">Balance</h2>
        </div>

        <div className="flex space-x-2 ">
          <h1 className='text-3xl font-bold'>$10,000,000,000</h1>
        </div>

        <div className="bg-white rounded-lg p-4">
          <div className='flex justify-between space-x-6'>
            <h2 className="text-lg font-bold mb-4">Add Balance</h2>
            <PeriodDropdownComponent />
          </div>  
          <div className="flex justify-between space-x-2">
            <Input value={balanceValue} onChange={handleInputChange} type="amount" placeholder="Add more Balance" className="w-[82%] border-2 z-0 border-gray-400 text-gray-400"/>
            <button onClick={handleAddNewIncome} className='flex items-center justify-center bg-green-400 w-[15%] rounded-lg'>
              <Plus className='text-white'/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
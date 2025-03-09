import React, { useState } from 'react';
import { Plus } from 'lucide-react';
// import { PeriodDropdownComponent } from './PeriodDropdown';
import { Input } from './ui/input';
import { toast } from 'sonner';

const BalanceCard: React.FC<{ data: any }> = ({ data }) => {
  const [balanceValue, setBalanceValue] = useState("");

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    setBalanceValue(value);
  }

  function handleAddNewIncome() {
    toast.success("Successfully added income")
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {/* Balance Display */}
      <div className="md:col-span-3 bg-white rounded-lg shadow-md p-4 ">
        <h2 className="text-xl font-bold mb-4">Balance</h2>
        {/* Add last balance from Data here instead of a bajillion monies*/}
        <h1 className='text-3xl font-bold'>{balanceValue}</h1>
      </div>

      {/* Add Balance Panel */}
      <div className="md:col-span-2 bg-white rounded-lg shadow-md p-4">
        <div className='flex justify-between'>
          <h2 className="text-lg font-bold mb-4">Edit&nbsp;Initial&nbsp;Balance</h2>
          {/* <PeriodDropdownComponent />  */}
          {/* balance is only accessed once right? */}
        </div>  
        <div className="flex justify-between space-x-2">
          <Input value={balanceValue} onChange={handleInputChange} type="amount" placeholder="Enter Amount" className="w-[82%] border-2 z-0 border-gray-400 text-gray-400"/>
          {/* MAKE A FUNCTION TO CHANGE BALANCE HISTORY END ENTRY */}
          <button onClick={handleAddNewIncome} className='flex items-center justify-center bg-green-400 w-[15%] rounded-lg'>
            <Plus className='text-white w-4'/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
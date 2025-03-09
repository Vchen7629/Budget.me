import React, { useState } from 'react';
// import { PeriodDropdownComponent } from './PeriodDropdown';
import { Input } from './ui/input';

const BalanceCard: React.FC<{ balance: any, initialBalance: any, setInitialBalance: any }> = 
({ balance, initialBalance, setInitialBalance }) => {
  const [balanceValue, setBalanceValue] = useState(balance);

  // console.log(balanceValue)

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (parseInt(value) > 0) {
      setInitialBalance(parseInt(value));
    } else {
      setInitialBalance(0);
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {/* Balance Display */}
      <div className="md:col-span-3 bg-white rounded-lg shadow-md p-4 ">
        <h2 className="text-xl font-bold mb-4">Balance</h2>
        {/* Add last balance from Data here instead of a bajillion monies*/}
        <h1 className='text-3xl font-bold'>${balanceValue}</h1>
      </div>

      {/* Add Balance Panel */}
      <div className="md:col-span-2 bg-white rounded-lg shadow-md p-4">
        <div className='flex justify-between'>
          <h2 className="text-lg font-bold mb-4">Edit&nbsp;Initial&nbsp;Balance</h2>
          {/* <PeriodDropdownComponent />  */}
          {/* balance is only accessed once right? */}
        </div>  
        <div className="flex justify-between space-x-2">
          <Input value={initialBalance} onChange={handleInputChange} type="amount" placeholder="Enter Amount" className="w-[82%] border-2 z-0 border-gray-400 text-gray-400"/>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
import React, { useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { Input } from './ui/input';

const BalanceCard: React.FC<{ balance: any, initialBalance: any, setInitialBalance: any }> = 
({ balance, initialBalance, setInitialBalance }) => {
  const [balanceValue, setBalanceValue] = useState(balance);
  const base = balance; //set base value in order to not go to infinity

  function handleInputChange(values: { value: string }) {
    const value = parseFloat(values.value);
    if (!isNaN(value)) {
      setInitialBalance(value);
      setBalanceValue(base + value);
    } else {
      setInitialBalance(0);
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {/* Balance Display */}
      <div className="md:col-span-3 bg-white rounded-lg shadow-md p-4 ">
        <h2 className="text-xl font-bold mb-4">Current Balance</h2>
        <h1 className='text-3xl font-bold'>${balanceValue}</h1>
      </div>

      {/* Add Balance Panel */}
      <div className="md:col-span-2 bg-white rounded-lg shadow-md p-4">
        <div className='flex justify-between'>
          <h2 className="text-lg font-bold mb-4">Edit&nbsp;Initial&nbsp;Balance</h2>
        </div>  
        <div className="flex justify-between space-x-2">
          <NumericFormat 
            value={initialBalance} 
            onValueChange={handleInputChange} 
            decimalScale={2} 
            allowNegative={false} 
            customInput={Input} 
            className="w-[82%] border-2 z-0 border-gray-400 text-gray-400"
          />
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;

import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { PeriodDropdownComponent } from './PeriodDropdown';
import { Input } from './ui/input';
import { toast } from 'sonner';
import { useGetUserDataQuery } from '@/app/api-slices/usersApiSlice';

const SpendingsCard: React.FC = () => {
  const [spendingValue, setSpendingValue] = useState("");
  const { data } = useGetUserDataQuery();
  const [spendingData, setSpendingData] = useState<any[]>([])
  
   useEffect(() => {
      if (data) {
        setSpendingData(data)
      } 
    }, [data])

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
        <div className="overflow-auto max-h-[500px]">
          {spendingData.filter(spendingData => spendingData.required !== -1)
            .map((income, index) => (
                <div 
                  key={income.id}
                  className="flex justify-between"
                >
                  <div>{income?.date}</div>
                  <div>{income?.description}</div>
                  <div className='text-red-500'>${income?.amount}</div>
                </div>          
            ))}
        </div>
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
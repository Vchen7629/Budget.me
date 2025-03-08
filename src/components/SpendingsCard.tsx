import React, { useState } from 'react';
import { TrendingUp, TrendingDown, BarChart2, Plus } from 'lucide-react';
import { PeriodDropdownComponent } from './PeriodDropdown';
import { Input } from './ui/input';
import { toast } from 'sonner';

const SpendingsCard: React.FC = () => {
  const [spendingValue, setSpendingValue] = useState("");
	const [disabled, setDisabled] = useState(false);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    setSpendingValue(value);
  }

  function handleAddNewIncome() {
		// Prevent spam-clicking
		setDisabled(true);
		setTimeout(() => {
			setDisabled(false);
		}, 500);

		if (isNaN(spendingValue) || spendingValue == "") {
			toast.error("Please enter a numerical value");
		} else if (spendingValue <= 0) {
			toast.error("Please enter a positive value");
		} else {
			// TODO: Add actual server data
			toast.success("Successfully added new spending source")
			setSpendingValue("");
		}
  }

  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2 bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-bold mb-4">Spendings</h2>
        <div className="overflow-auto max-h-[500px]">

        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className='flex justify-between'>
          <h2 className="text-lg font-bold mb-4">Add New Spending</h2>
          <PeriodDropdownComponent />
        </div>  
        <div className="flex justify-between space-x-2">
          <Input value={spendingValue} onChange={handleInputChange} type="amount" placeholder="Enter a new spending source" className="w-[82%] border-2 z-0 border-gray-400 text-gray-400"/>
          <button onClick={handleAddNewIncome} className='flex items-center justify-center bg-green-400 w-[15%] rounded-lg' disabled={disabled}>
            <Plus className='text-white'/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpendingsCard;

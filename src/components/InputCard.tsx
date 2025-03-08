import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Plus } from 'lucide-react';
import { Input } from './ui/input';
import { PeriodDropdownComponent } from './PeriodDropdown';
import { toast } from 'sonner';

const InputCard: React.FC = ({successMessage, placeholder, cardName}) => {
  const [inputValue, setInputValue] = useState("");
	const [disabled, setDisabled] = useState(false);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    setInputValue(value);
  }

  function handleAddNewIncome() {
		// Prevent spam-clicking
		setDisabled(true);
		setTimeout(() => {
			setDisabled(false);
		}, 500);

		if (isNaN(inputValue) || inputValue == "") {
			toast.error("Please enter a numerical value");
		} else if (inputValue <= 0) {
			toast.error("Please enter a positive value");
		} else {
			// TODO: Add actual server data
			toast.success(successMessage);
			setInputValue("");
		}
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
          <h2 className="text-lg font-bold mb-4">{cardName}</h2>
          <PeriodDropdownComponent />
        </div>  
        <div className="flex justify-between space-x-2">
          <Input value={inputValue} onChange={handleInputChange} type="amount" placeholder={placeholder} className="w-[82%] border-2 z-0 border-gray-400 text-gray-400"/>
          <button onClick={handleAddNewIncome} className='flex items-center justify-center bg-green-400 w-[15%] rounded-lg'>
            <Plus className='text-white'/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputCard;

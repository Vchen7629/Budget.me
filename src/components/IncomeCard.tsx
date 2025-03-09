import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { Input } from './ui/input';
import { PeriodDropdownComponent } from './PeriodDropdown';
import { toast } from 'sonner';

const IncomeCard: React.FC<{ data: any }> = ({ data }) => {
  const [incomeData, setIncomeData] = useState<any[]>([])
  const [incomeValue, setIncomeValue] = useState("");
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    if (data) {
      setIncomeData(data)
      console.log(data)
      console.log(incomeData)
    } 
  }, [data])

  function handleIncomeFieldChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    setIncomeValue(value);
  }

  function handleDateFieldChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    setDate(value);
  }

  function handleDescFieldChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    setDesc(value);
  }

  function handleAddNewIncome() {
    toast.success("Successfully added new income stream")
  }

  useEffect(() => {

  })

  
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {/* Income List */}
      <div className="md:col-span-3 bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-bold mb-4">Income</h2>
        <div className="overflow-auto max-h-[500px]">
          {incomeData.filter(incomeData => incomeData.required === -1)
          .map((income, _) => (
              <div 
                key={income.id}
                className="flex justify-between"
              >
                <div>{income?.date}</div>
                <div>{income?.description}</div>
                <div className='text-green-500'>${income?.amount}</div>
              </div>          
          ))}
        </div>
      </div>
      
      {/* Add Income Panel */}
      <div className="md:col-span-2 bg-white rounded-lg shadow-md p-4">
        <div className='flex justify-between'>
          <h2 className="text-lg font-bold mb-4">Add New Income</h2>
          <PeriodDropdownComponent />
        </div>
        <div className='flex flex-col space-y-4'>
          <Input value={date} onChange={handleDateFieldChange} type="date" placeholder="mm/dd/yyyy" className="w-[82%] border-2 z-0 border-gray-400 text-gray-400"/>
          <Input value={desc} onChange={handleDescFieldChange} type="text" placeholder="Enter Description" className="w-[82%] border-2 z-0 border-gray-400 text-gray-400"/>
          <div className="flex justify-between space-x-2">
          <Input value={incomeValue} onChange={handleIncomeFieldChange} type="amount" placeholder="Enter Amount Per Period" className="w-[82%] border-2 z-0 border-gray-400 text-gray-400"/>
            <button onClick={handleAddNewIncome} className='flex items-center justify-center bg-green-400 w-[15%] rounded-lg'>
              <Plus className='text-white w-4'/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeCard;
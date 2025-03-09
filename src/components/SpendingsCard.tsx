import React, { useEffect, useState } from 'react';
import { MinusIcon, Plus } from 'lucide-react';
import { Input } from './ui/input';
import { toast } from 'sonner';
import { useAddNewExpenseMutation, useDeleteEntryMutation } from '@/app/api-slices/usersApiSlice';

const SpendingsCard: React.FC<{ data: any, refetch: any }> = ({ data, refetch }) => {
  const [spendingValue, setSpendingValue] = useState("");
  const [spendingData, setSpendingData] = useState<any[]>([])
  const [date, setDate] = useState("")
  const [description, setDescription] = useState("")
  const [addNewExpense] = useAddNewExpenseMutation<any[]>()
  const [deleteRow] = useDeleteEntryMutation()
  
  
  useEffect(() => {
      if (data) {
        setSpendingData(data)
      } 
  }, [data])

  function handleSpendingInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    setSpendingValue(value);
  }

  function handleDateInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    setDate(value);
  }

  function handleDescInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    setDescription(value);
  }

  async function handleAddNewSpending() {
    const result = date.split("-")
    const newFormattedDate = `${result[1]}-${result[2]}-${result[0]}`
    
    try {
      await addNewExpense({ 
        spendingValue: spendingValue, 
        description: description, 
        date: newFormattedDate 
      }).unwrap()
      
      toast.success("Successfully added new income stream")
      refetch()
      
      setSpendingValue("")
      setDescription("")
      setDate("")
    } catch (error) {
      toast.error("Failed to add income stream")
      console.error(error)
    }
  }

  async function handleDeleteRow(id: string) {
    await deleteRow(id);
    refetch();
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {/* Spendings Display */}
      <div className="md:col-span-3 bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-bold mb-4">Spendings</h2>
        <div className="overflow-auto space-y-2 max-h-[500px]">
          {spendingData.filter(spendingData => spendingData.required !== -1)
            .map((income) => (
              <div 
                key={income.id}
                className="flex justify-between items-center"
              >
                <div className="w-[30%]">{income?.date}</div>
                <div className="w-[40%]">{income?.description}</div>
                <div className="w-[20%] text-red-500">${income?.amount.toFixed(2)}</div>
                <div className="flex justify-end">
                  <button onClick={() => {handleDeleteRow(income?.id)}} className='flex bg-red-400 rounded-lg'>
                    <MinusIcon />
                  </button>
                </div>
              </div>          
            ))}
        </div>
      </div>
      {/* Add Spending Panel */}
      <div className="md:col-span-2 bg-white rounded-lg shadow-md p-4">
        <div className='flex justify-between'>
          <h2 className="text-lg font-bold mb-4">Add New Spending</h2>
          {/* <PeriodDropdownComponent /> */}
        </div>
        <div className='flex flex-col space-y-4'>
          <Input value={date} onChange={handleDateInputChange} type="date" placeholder="mm/dd/yyyy" className="w-[82%] border-2 z-0 border-gray-400 text-gray-400"/>
          <Input value={description} onChange={handleDescInputChange} type="text" placeholder="Enter Description of Spending" className="w-[82%] border-2 z-0 border-gray-400 text-gray-400"/>
          <div className="flex justify-between space-x-2">
          <Input value={spendingValue} onChange={handleSpendingInputChange} type="number" placeholder="Enter Amount" className="w-[82%] border-2 z-0 border-gray-400 text-gray-400"/>
            <button onClick={handleAddNewSpending} className='flex items-center justify-center bg-green-400 w-[15%] rounded-lg'>
              <Plus className='text-white w-4'/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );  
};

export default SpendingsCard;
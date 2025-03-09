import React, { useState, useEffect } from 'react';
import IncomeCard from '../components/IncomeCard';
import GoalDisplay from '../components/GoalDisplay';
import Recommendations from '../components/Recommendations';
import BalanceCard from '../components/BalanceCard';
import GraphCard from '../components/GraphCard';
import SpendingsCard from '../components/SpendingsCard';
import AuthCard from "../components/AuthCard.tsx";
import { useNavigate } from 'react-router';
import { Toaster } from "@/components/ui/sonner"
import PdfDropZone from '@/components/PdfDropZone.tsx';
import { useGetUserDataQuery } from '@/app/api-slices/usersApiSlice';

const Homepage = () => {
  const { data, isLoading, isError, refetch } = useGetUserDataQuery();
  const [initialBalance, setInitialBalance] = useState(0);
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  console.log(data);

  const incomeHistory = data.filter(item => item.required === -1).map(item => ({
    date: item.date,
    amount: item.amount,
  }));

  const spendingHistory = data.filter(item => item.required !== -1).map(item => ({
    date: item.date,
    amount: item.amount,
  }));

  const totalIncome = incomeHistory.reduce((acc, curr) => acc + curr.amount, 0);
  const totalSpending = spendingHistory.reduce((acc, curr) => acc + curr.amount, 0);

  console.log(totalIncome);
  console.log(totalSpending);

  const currBalance = Number((totalIncome + totalSpending).toFixed(2));

  console.log(currBalance);

  // Function to convert date string to Date object
  function convertToDate(dateString: string) {
    const [day, month, year] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day); // Months are 0-based in JavaScript
  }

  // Find the most recent entry in each history
  const mostRecentIncome = incomeHistory.reduce((a, b) => {
    return convertToDate(a.date) > convertToDate(b.date) ? a : b;
  });

  const mostRecentSpending = spendingHistory.reduce((a, b) => {
    return convertToDate(a.date) > convertToDate(b.date) ? a : b;
  });

  // Determine the most recent overall entry
  const mostRecentEntry = convertToDate(mostRecentIncome.date) > convertToDate(mostRecentSpending.date)
    ? mostRecentIncome
    : mostRecentSpending;

  console.log(mostRecentEntry);

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster richColors expand={true} className='z-50'/>
      <header className="flex items-center px-[2vw] justify-between bg-green-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Budget.me</h1>
        </div>
        <div className="flex">
          <AuthCard />
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* left side menus on pc */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <GraphCard data={data} initalBalance={initialBalance} />
            <BalanceCard balance={currBalance} initialBalance={initialBalance} setInitialBalance={setInitialBalance} />
            <IncomeCard data={data} refetch={refetch}/>
            <SpendingsCard data={data} refetch={refetch}/>
          </div>

        {/* right side menus on pc */}
          <div className="space-y-6">
            <PdfDropZone refetch={refetch}/>
            <GoalDisplay data={data}/>
            <Recommendations data={data} />
          </div>
        </div>
      </main>

      <footer className="z-10 bg-gray-800 text-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-sm">
          Budget.me &copy; 2025
        </div>
      </footer>
    </div>
  )
}

export default Homepage;
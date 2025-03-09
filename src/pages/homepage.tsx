import { useState, useRef, useEffect } from 'react';
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

const Homepage = () => {
    const navigate = useNavigate();

    function navigateLogin() {
      navigate("/login")
    }
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
              <GraphCard />
              <BalanceCard />
              <IncomeCard />
              <SpendingsCard />
            </div>

          {/* right side menus on pc */}
            <div className="space-y-6">
              <PdfDropZone />
              <GoalDisplay />
              <Recommendations />
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

export default Homepage

import { useState, useRef, useEffect } from 'react';
import IncomeCard from '../components/IncomeCard';
import GoalDisplay from '../components/GoalDisplay';
import Recommendations from '../components/Recommendations';
import BalanceCard from '../components/BalanceCard';
import GraphCard from '../components/GraphCard';
import SpendingsCard from '../components/SpendingsCard';
import { useNavigate } from 'react-router';
import { LucideLogIn } from 'lucide-react';
import { Toaster } from "@/components/ui/sonner"


const Homepage = () => {
    const navigate = useNavigate();

    function navigateLogin() {
      navigate("/login")
    }
    return (
      <div className="min-h-screen bg-gray-100">
                <Toaster richColors expand={true} className='z-50'/>

        <header className="flex items-center px-[2vw] justify-between bg-blue-600 text-white shadow-md">
          <div className="container mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold">Budget App (name pending)</h1>
          </div>
          <button onClick={navigateLogin} className="flex bg-blue-550 p-2 h-fit  items-center border-2 border-white space-x-2 rounded-md shadow-md">
            <h1>Login</h1>
            <LucideLogIn />
          </button>
        </header>

        <main className="container mx-auto px-4 py-6">

          {/* left side menu on pc */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <GraphCard />
              <BalanceCard />
              <IncomeCard />
              <SpendingsCard />
            </div>

          {/* right side menu on pc */}
            <div className="space-y-6">
              <GoalDisplay />
              <Recommendations />
            </div>
          </div>
        </main>

        <footer className="z-10 bg-gray-800 text-white py-4 mt-8">
          <div className="container mx-auto px-4 text-center text-sm">
            Budget App (name pending) &copy; 2025
          </div>
        </footer>
      </div>
    )
}

export default Homepage
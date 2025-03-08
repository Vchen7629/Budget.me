import { useState, useRef, useEffect } from 'react';
import InputCard from '../components/InputCard';
import GoalDisplay from '../components/GoalDisplay';
import Recommendations from '../components/Recommendations';
import BalanceCard from '../components/BalanceCard';
import GraphCard from '../components/GraphCard';
import AuthCard from "../components/AuthCard.tsx";
import { useNavigate } from 'react-router';
import { Toaster } from "@/components/ui/sonner"

const Homepage = () => {
    const navigate = useNavigate();

    return (
      <div className="min-h-screen bg-gray-100">
                <Toaster richColors expand={true} className='z-50'/>

        <header className="flex items-center px-[2vw] justify-between bg-blue-600 text-white shadow-md">
          <div className="container mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold">Budget App (name pending)</h1>
          </div>
						<AuthCard />
        </header>

        <main className="container mx-auto px-4 py-6">

          {/* left side menu on pc */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <GraphCard />
              <BalanceCard />
              <InputCard cardName="Add New Income" placeholder="Enter a new income stream" successMessage="Successfully added new income source"/>
              <InputCard cardName="Add New Spending" placeholder="Enter a new spending source" successMessage="Successfully added new spending source"/>
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

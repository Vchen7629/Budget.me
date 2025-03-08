import React from 'react';
import BalanceCard from './components/BalanceCard';
import IncomeCard from './components/IncomeCard';

const App: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">Budgeting App</h1>
      <div className="flex flex-wrap justify-center gap-4">
        <BalanceCard />
        <IncomeCard />
      </div>
    </div>
  );
};

export default App;
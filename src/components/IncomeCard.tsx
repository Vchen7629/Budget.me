import React, { useState } from 'react';
import axios from 'axios';

const IncomeCard: React.FC = () => {
  const [incomes, setIncomes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newIncomeAmount, setNewIncomeAmount] = useState('');
  const [newIncomePeriod, setNewIncomePeriod] = useState('');

  const fetchIncomes = async () => {
    try {
      const response = await axios.get('/api/income/sources');
      setIncomes(response.data);
    } catch (error) {
      console.error('Error fetching incomes:', error);
    }
  };

  const addIncome = async () => {
    try {
      await axios.post('/api/income/sources', { amount: parseFloat(newIncomeAmount), period: newIncomePeriod });
      fetchIncomes();
      setModalOpen(false);
      setNewIncomeAmount('');
      setNewIncomePeriod('');
    } catch (error) {
      console.error('Error adding income:', error);
    }
  };

  React.useEffect(() => {
    fetchIncomes();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-4">Income</h2>
      <ul>
        {incomes.map((income, index) => (
          <li key={index} className="mb-2">
            {income}
            {/* ${income.amount.toFixed(2)} every {income.period} */}
          </li>
        ))}
      </ul>
      <button
        onClick={() => setModalOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
      >
        Add
      </button>

    </div>
  );
};

export default IncomeCard;
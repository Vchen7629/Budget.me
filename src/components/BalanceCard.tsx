import React, { useState } from 'react';
import axios from 'axios';

const BalanceCard: React.FC = () => {
  const [balance, setBalance] = useState(0);
  const [editing, setEditing] = useState(false);
  const [newBalance, setNewBalance] = useState('');

  const fetchBalance = async () => {
    try {
      const response = await axios.get('/api/income');
      setBalance(response.data.balance);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const updateBalance = async () => {
    try {
      await axios.post('/api/income', { balance: parseFloat(newBalance) });
      setBalance(parseFloat(newBalance));
      setEditing(false);
    } catch (error) {
      console.error('Error updating balance:', error);
    }
  };

  React.useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-4">Balance</h2>
      {editing ? (
        <div>
          <input
            type="number"
            value={newBalance}
            onChange={(e) => setNewBalance(e.target.value)}
            className="w-full p-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
          />
          <button
            onClick={updateBalance}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Save
          </button>
          <button
            onClick={() => setEditing(false)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 ml-2"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <p className="text-lg font-medium mb-2">Current Balance: ${balance.toFixed(2)}</p>
          <button
            onClick={() => setEditing(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Add/Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default BalanceCard;

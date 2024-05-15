'use client';
import React, { useState } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';

interface Transaction {
  id: number;
  email: string;
  amount: number;
  method: string;
  trxId: string;
  action: string;
}

const TransactionSearch: React.FC = () => {
  const [email, setEmail] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('Access token not found');
      }

      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await axios.post<Transaction[]>('http://localhost:3000/transaction-history/search', { email }, { headers });
      setTransactions(response.data);
    } catch (error) {
      setError('Error fetching transaction history');
      console.error('Error fetching transaction history:', error);
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50">
      <div className="max-w-4xl w-full p-6 bg-blue rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-black mb-4">Search Transaction History</h2>
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mr-2 px-4 py-2 border border-gray-400 rounded-md w-full"
          />
          <button onClick={handleSearch} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Search</button>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && transactions.length > 0 && (
          <table className="w-full border-collapse border border-gray-400">
            <thead>
              <tr>
                <th className="px-4 py-2 border border-gray-400 text-black">ID</th>
                <th className="px-4 py-2 border border-gray-400 text-black">Email</th>
                <th className="px-4 py-2 border border-gray-400 text-black">Amount</th>
                <th className="px-4 py-2 border border-gray-400 text-black">Method</th>
                <th className="px-4 py-2 border border-gray-400 text-black">Transaction ID</th>
                <th className="px-4 py-2 border border-gray-400 text-black">Action</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-blue-200' : 'bg-blue-100'}>
                  <td className="px-4 py-2 border border-gray-400 text-black">{transaction.id}</td>
                  <td className="px-4 py-2 border border-gray-400 text-black">{transaction.email}</td>
                  <td className="px-4 py-2 border border-gray-400 text-black">{transaction.amount}</td>
                  <td className="px-4 py-2 border border-gray-400 text-black">{transaction.method}</td>
                  <td className="px-4 py-2 border border-gray-400 text-black">{transaction.trxId}</td>
                  <td className="px-4 py-2 border border-gray-400 text-black">{transaction.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {!loading && !error && transactions.length === 0 && <p>No transactions found for the provided email.</p>}
      </div>
    </div>
  );
};

export default TransactionSearch;

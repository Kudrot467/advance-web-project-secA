'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';

const Payment: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [trxId, setTrxId] = useState('');
  const [message, setMessage] = useState('');
  const [accountBalance, setAccountBalance] = useState<number | null>(null);

  useEffect(() => {
    const fetchAccountBalance = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          throw new Error('Access token not found');
        }
        const response = await axios.get('http://localhost:3000/users/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setAccountBalance(response.data.accountBalance);
      } catch (error) {
        console.error('Error fetching account balance:', error);
      }
    };

    fetchAccountBalance();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('Access token not found');
      }
      const response = await axios.post('http://localhost:3000/payment', {
        amount: parseFloat(amount),
        method: '', 
        trxId,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setMessage(response.data.message);
    } catch (error: any) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50">
      <div className="max-w-md w-full p-6 bg-blue rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold mb-4 text-center">Make Payment</h1>
        <form onSubmit={handleSubmit} className="max-w-md">
          <div className="mb-4">
            <label htmlFor="amount" className="block mb-1">Amount</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="trxId" className="block mb-1">Transaction ID</label>
            <input
              type="text"
              id="trxId"
              value={trxId}
              onChange={(e) => setTrxId(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>
          {accountBalance !== null && parseFloat(amount) > accountBalance && (
            <p className="text-red-500">Insufficient balance</p>
          )}
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full">Make Payment</button>
        </form>
        {message && <p className="mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default Payment;

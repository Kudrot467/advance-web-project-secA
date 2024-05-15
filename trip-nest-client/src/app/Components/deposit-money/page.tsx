'use client';
import React, { useState } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';

const DepositMoney: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('');
  const [trxId, setTrxId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('Access token not found');
      }
      const response = await axios.post('http://localhost:3000/deposits', {
        amount: parseFloat(amount),
        method,
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
        <h1 className="text-3xl font-semibold mb-4 text-center">Deposit Money</h1>
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
            <label className="block mb-1">Method</label>
            <div>
              <input
                type="radio"
                id="bKash"
                value="bKash"
                checked={method === 'bKash'}
                onChange={() => setMethod('bKash')}
                className="mr-2"
                required
              />
              <label htmlFor="bKash" className="mr-4">bKash</label>
              <input
                type="radio"
                id="Nagad"
                value="Nagad"
                checked={method === 'Nagad'}
                onChange={() => setMethod('Nagad')}
                className="mr-2"
              />
              <label htmlFor="Nagad" className="mr-4">Nagad</label>
              <input
                type="radio"
                id="BankAccount"
                value="Bank account"
                checked={method === 'Bank account'}
                onChange={() => setMethod('Bank account')}
                className="mr-2"
              />
              <label htmlFor="BankAccount" className="mr-4">Bank Account</label>
            </div>
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
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full">Deposit</button>
        </form>
        {message && <p className="mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default DepositMoney;

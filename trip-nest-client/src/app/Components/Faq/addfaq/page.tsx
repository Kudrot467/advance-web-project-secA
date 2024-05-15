// AddFaq.js
'use client';

import React, { useState } from 'react';
import axios from 'axios';


const AddFaq = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [faqAdded, setFaqAdded] = useState(false); // New state for tracking if FAQ is added

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('http://localhost:4000/admin/addfaq', { question, answer });
            console.log('FAQ added successfully:', response.data);
            setFaqAdded(true); // Set faqAdded state to true when FAQ is added successfully
        } catch (error) {
            setError('Error adding FAQ');
            console.error('Error adding FAQ:', error);
        }
        setLoading(false);
    };

    return (
        <div className="flex justify-center items-center h-full">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-black mb-4">Add FAQ</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-2">Question:</label>
                        <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} required className="w-full px-3 py-2 border rounded-md text-black" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-2">Answer:</label>
                        <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} required className="w-full px-3 py-2 border rounded-md text-black" />
                    </div>
                    <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 ease-in-out">Add FAQ</button>
                    {error && <p className="text-red-500">{error}</p>}
                    {faqAdded && <p className="text-green-500">FAQ added successfully</p>} {/* Render success message when FAQ is added */}
                </form>
            </div>
        </div>
    );
};

export default AddFaq;



// FaqList.js
'use client';
// FaqList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TopBar from '../../Comp/topbar';

const FaqList = () => {
    const [faqList, setFaqList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedQuestion, setSelectedQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    useEffect(() => {
        const fetchFaqList = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get('http://localhost:4000/user/Showfaq');
                setFaqList(response.data); // Assuming the response is an array of FAQ questions
            } catch (error) {
                setError('Error fetching FAQ');
                console.error('Error fetching FAQ:', error);
            }
            setLoading(false);
        };

        fetchFaqList();
    }, []);

    const handleShowButtonClick = async (question) => {
        try {
            const response = await axios.post('http://localhost:4000/user/showfaq', { question });
            setAnswer(response.data.answer);
        } catch (error) {
            console.error('Error fetching answer:', error);
        }
    };

    return (<>
     <TopBar/>
    
    
        <div className="flex justify-center items-center h-full">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-3xl  text-blue-500 font-bold mb-6 ">FAQ </h2>
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!loading && !error && (
                    <table className="w-full border-collapse border-2 border-blue-500">
                        <thead>
                            <tr>
                                <th className="text-1xl  text-blue-500 font-bold mb-6">S.No</th>
                                <th className="text-1xl  text-blue-500 font-bold mb-6">Question</th>
                                <th className="px-4 py-2 border border-gray-400">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {faqList.map((faq, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2 border border-gray-400 text-black">{index + 1}</td>
                                    <td className="px-4 py-2 border border-gray-400 text-black">{faq}</td>
                                    <td className="px-4 py-2 border border-gray-400">
                                        <button onClick={() => handleShowButtonClick(faq)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Show</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                {answer && (
                    <div className="mt-4">
                        <p className="text-black">{answer}</p>
                    </div>
                )}
            </div>
        </div>
    </>);
};

export default FaqList;


'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';

const AboutPage: React.FC = () => {
  const [aboutInfo, setAboutInfo] = useState<string>('');

  useEffect(() => {
    fetchAboutInfo();
  }, []);

  const fetchAboutInfo = async () => {
    try {
      const response = await axios.get('http://localhost:3000/about');
      setAboutInfo(response.data);
    } catch (error) {
      console.error('Error fetching about information:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50">
      <div className="max-w-lg w-full p-6 bg-blue rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold mb-4">About Us</h1>
        <p>{aboutInfo}</p>
      </div>
    </div>
  );
};

export default AboutPage;

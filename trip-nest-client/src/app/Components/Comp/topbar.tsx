'use client';
import Link from "next/link";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const TopBar = () => {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    console.log(token);
    if (token) {
      setAuthenticated(true);
    } else {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="bg-blue-500 py-4 px-6 flex justify-between items-center">
      <div className="flex items-center">
        <img
          src="https://i.ibb.co/MhD3Pbf/trip-nest-logo-removebg-preview.png"
          alt="Logo"
          className="w-12 h-12 rounded-full mr-4"
        />
        <h1 className="text-5xl font-bold text-[#F7B030]">
          <span className="text-[#38B6FF]">Trip</span> Nest
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <Link href="/Home">
          <span className="text-white hover:text-gray-200 cursor-pointer">Home</span>
        </Link>
        <Link href="/Booking">
          <span className="text-white hover:text-gray-200 cursor-pointer">Find Room</span>
        </Link>
        <Link href="/Faq/showfaq">
          <span className="text-white hover:text-gray-200 cursor-pointer">FAQ</span>
        </Link>
      </div>
    </div>
  );
};

export default TopBar;

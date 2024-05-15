'use client';
import React from 'react';
import Link from 'next/link';
import 'tailwindcss/tailwind.css';

const NavigationPage = () => {
  return (
    <div className="container">
      <h1 className="title">Transaction History</h1>
      <ul className="nav-list">
        <li className="nav-item">
          <Link href="/transaction-history/all">
            <div className="nav-link">View All Transaction History</div>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/transaction-history/mine">
            <div className="nav-link">View My Transaction History</div>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/transaction-history/search">
            <div className="nav-link">Search Transaction History</div>
          </Link>
        </li>
      </ul>

      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        .title {
          text-align: center;
          margin-bottom: 20px;
        }
        .nav-list {
          list-style: none;
          padding: 0;
        }
        .nav-item {
          margin-bottom: 10px;
        }
        .nav-link {
          cursor: pointer;
          text-decoration: none;
          color: #333;
          font-weight: bold;
          padding: 10px;
          border-radius: 4px;
          background-color: #f0f0f0;
        }
        .nav-link:hover {
          color: #007bff;
          background-color: #e0e0e0;
        }
      `}</style>
    </div>
  );
};

export default NavigationPage;

"use client"
import { AuthContext } from "@/app/utils/Provider/authcontext";
import axios from "axios";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

const Navbar = () => {
  const{user,logout}=useContext(AuthContext);
    const[users,setUsers]=useState([]);
    const signOut = () => {
      logout().then().catch();
    };
  const navItems = [
    {
      route: "Home",
      path: "/",
    },
    {
      route: "Registration",
      path: "./Components/Registration",
    },
  ];
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:3000/users'); // Adjust the endpoint URL as needed
        setUsers(res.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();}, []);
    const loggedInUser=users.find(User=>User.email===user?.email);

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navItems.map((item, index) => (
              <div key={item} >
                <Link href={item.path}>
                  <button className="btn text-lg hover:text-xl font-medium rounded-xl text-white bg-[#F7B030] hover:bg-[#38B6FF]">
                    {item.route}
                  </button>
                </Link>
              </div>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-center">
          <img
            src="https://i.ibb.co/MhD3Pbf/trip-nest-logo-removebg-preview.png"
            className="h-[90px] w-[120px]"
            alt=""
          />
          <h1 className="text-3xl font-bold text-[#F7B030]">
            <span className="text-[#38B6FF]">Trip</span> Nest
          </h1>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navItems.map((item, index) => (
            <div key={item} className="mr-3">
              <Link href={item.path}>
                <button className="btn text-lg hover:text-xl font-medium rounded-xl text-white bg-[#F7B030] hover:bg-[#38B6FF]">
                  {item.route}
                </button>
              </Link>
            </div>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
      {user ? (
          <>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img alt="" src={user?.photoURL} />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <a className="justify-between text-[#F7B030] text-lg font-bold">
                    {user?.displayName}
                    <span className="badge indicator-item badge-secondary bg-green-500"></span>
                  </a>
                </li>
                <li className="text-lg mb-2 bg-[#38B6FF] hover:bg-[#F7B030] text-white text-center">
                  {loggedInUser?.role==='admin' && (
                    <li className="mr-2">
                      {" "}
                      <div
                         className="btn text-lg hover:text-xl font-medium rounded-xl text-white bg-[#38B6FF] hover:bg-[#F7B030]"
                      >
                        <Link href="/dashboard/adminHome">--Dashboard--</Link>{" "}
                      </div>
                    </li>
                  )}
                  {loggedInUser?.role!='admin' &&(
                    <li className="mr-2">
                      {" "}
                      <div
                       className="btn text-lg hover:text-xl font-medium rounded-xl text-white bg-[#38B6FF] hover:bg-[#F7B030]"
                      >
                        <Link href="./Components/Dashboard">Dashboard</Link>{" "}
                      </div>
                    </li>
                  )}
                </li>
                <li className="w-full">
                  <button
                    onClick={signOut}
                    className="btn text-lg hover:text-xl font-medium rounded-xl text-white bg-[#38B6FF] hover:bg-[#F7B030]"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </>
        ):(
          <>
            {" "}
            <Link
             className="btn text-lg hover:text-xl font-medium rounded-xl text-white bg-[#F7B030] hover:bg-[#38B6FF]"
             href="./Components/Login"
            >
              Join Us
            </Link>{" "}
          </>
        )} 
      </div>
    </div>
  );
};

export default Navbar;

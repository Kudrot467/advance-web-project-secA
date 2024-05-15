"use client";
import { AuthContext } from "@/app/utils/Provider/authcontext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Profile from "./Profile/page";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/users"); // Adjust the endpoint URL as needed
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);
  const loggedInUser = users.find((User) => User.email === user?.email);
  console.log(users);
  console.log(loggedInUser);
  return (
    <div className="max-w-5xl mx-auto" suppressHydrationWarning={true}>
      <div>
        <Profile />
      </div>
      <div>
        <div className="card lg:card-side bg-base-100 shadow-xl">
          <figure>
            <img
              src={user?.photoURL}
              alt="Album"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{user?.displayName}</h2>
            <p>{user?.email} </p>
            <p>{loggedInUser?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

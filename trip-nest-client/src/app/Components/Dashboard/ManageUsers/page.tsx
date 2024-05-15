"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaTrashAlt, FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ManageUsers = () => {

    const[users,setUsers]=useState([]);

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

      const handleDeleteUser = (user) => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            axios.delete(`http://localhost:3000/users/${user.userId}`).then((res) => {
              
                Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success",
                });
              
            });
          }
        });
      };

    return (
        <div>
             <div className="flex justify-evenly">
        <h2 className="text-3xl">All Users</h2>
        <h2 className="text-3xl">Total Users: {users.length}</h2>
      </div>
      <table className="table table-zebra w-full">
        {/* head */}
        <thead>
          <tr className="bg-[#C6A921] text-white font-medium">
            <th></th>
            <th className="text-2xl">Name</th>
            <th className="text-2xl">Email</th>
            <th className="text-2xl">Role</th>
            <th className="text-2xl">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user?.userId}>
              <th>{index + 1}</th>
              <td className="text-[#C6A921] text-xl font-semibold rounded-xl">
                {user?.username}
              </td>
              <td className="text-[#C6A921] text-xl font-semibold">
                {user?.email}
              </td>
              <td className="text-[#C6A921] text-xl font-semibold">
                {user.role === "admin" ? (
                  "Admin"
                ) : (
                  <button
                    onClick={() => handleMakeAdmin(user)}
                    className="btn btn-lg bg-[#C6A921] hover:bg-[#C6A921] "
                  >
                    <FaUsers className="text-white"></FaUsers>Make Admin
                  </button>
                )}
              </td>
              <td>
                <button
                  onClick={() => handleDeleteUser(user)}
                  className="btn btn-ghost btn-lg"
                >
                  <FaTrashAlt className="text-red-600"></FaTrashAlt>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
    );
};

export default ManageUsers;
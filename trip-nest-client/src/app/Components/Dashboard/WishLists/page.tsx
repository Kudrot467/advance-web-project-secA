// @ts-nocheck
"use client";
import { AuthContext } from "@/app/utils/Provider/authcontext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

const WishLists = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [wishLists, setWishLists] = useState([]);
  const [items, setItems] = useState([]);
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
  console.log(loggedInUser?.userId)
  const userId=loggedInUser?.userId;

  useEffect(() => {

    const fetchWishLists = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/wishlist/${userId}`
        ); // Adjust the endpoint URL as needed
      setWishLists(res.data)
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchWishLists();
  }, []);

  console.log(wishLists)
  const handleDeleteUser = (wishList) => {
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

            try {
              // Replace 'your-api-endpoint' with the actual endpoint for deleting data
             axios.delete(`http://localhost:3000/wishlist/${wishList.id}`)
              .then(res=>{
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                  });
                const remaining=items.filter(item=>item.id!==wishList.id);
                console.log('remaining',remaining);
                setItems(remaining);
                console.log("Data deleted successfully:", res.data);
              })
             
            } catch (error) {
              console.error("Error deleting data:", error);
          };
      }
    });
  };

  return (
    <div>
        <h1>{wishLists.length===0 && <h1 className="text-2xl text-center font-bold text-red-500">You have no wishlists</h1>}</h1>
        {
            items.map(wishList=>
                <div key={wishList.id} className="card lg:card-side bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">{wishList.type}</h2>
                  <p>{wishList.itemId}</p>
                  <div className="card-actions justify-end">
                  <button
                  onClick={() => handleDeleteUser(wishList)}
                  className="btn bg-red-600 text-white hover:bg-white hover:text-red-600"
                >
                  Delete
                </button>
                  </div>
                </div>
              </div>
            )
        }
      
    </div>
  );
};

export default WishLists;

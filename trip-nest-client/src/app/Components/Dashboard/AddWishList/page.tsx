// @ts-nocheck
"use client"
import { AuthContext } from '@/app/utils/Provider/authcontext';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const AddWishList = () => {
    const { user } = useContext(AuthContext);
    const[users,setUsers]=useState([]);
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm();

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
 
    const onSubmit = async(data) => {
      
       const type=data.type;
       const itemId=parseFloat(data.itemId);
       const userId=loggedInUser.userId;

        const list = {
          type,
          itemId,
          userId
        };
        try {
            const response = await axios.post( 
              "http://localhost:3000/wishlist/addToWishlist",
            list);
            console.log(response);
            //   .then((response) => response.json())
            const responseData = response.data;
            console.log(responseData);
            if (response.status === 201) {
              reset();
              Swal.fire("Thank You!", "Wishlist added Successful!", "success");
            } else  Swal.fire({
              icon: "error",
              title: "Oops...",
              text: response.statusText,
              footer: '<a href="#">Why do I have this issue?</a>'
            });
            }
            catch(error:any){
              console.error("Error:", error);
              // seterrch(
              //   Array.isArray(error.response.data.message)
              //     ? error.response.data.message[0]
              //     : error.response.data.message
              // );
            //   setisErr(true);
            }
        }
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
              <div className="hero-content md:w-3/4 lg:w-full flex-col md:flex-row">
                <div className="card flex-shrink-0 w-full md:w-3/4 lg:w-1/2 shadow-2xl bg-base-100">
                  <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <div className="flex flex-col gap-1">
                      <div className=" text-[#F7B030] font-medium text-lg text-center flex">
                        <h1 className=" text-[#F7B030] font-bold text-2xl rounded-xl w-full underline">
                          Create a List withUs
                        </h1>
                      </div>
                      <div className="form-control">
                      <select
                    {...register("type")}
                    className="select select-bordered border-2 border-[#F7B030] mb-2"
                  >
                    <option disabled selected>
                      Choose Type
                    </option>
                    <option value="room">Room</option>
                    <option value="flight">Flight</option>
                    <option value="vehicle">Vehicle</option>
                  </select>
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text text-[#F7B030] font-medium text-lg">
                           Item Id:
                          </span>
                        </label>
                        <input
                          type="text"
                          {...register("itemId", { required: true })}
                          placeholder="Enter Item Id"
                          name="itemId"
                          className="input input-bordered border-[#F7B030]"
                        />
                        {errors.itemId && (
                          <span className="text-red-700">
                            *Write your wished Item Id
                          </span>
                        )}
                      </div>
                      
                    </div>
                    <div className="form-control mt-6">
                      <button className="btn text-white hover:bg-[#F7B030] bg-[#F7B030]">
                        Create WishList
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
        </div>
    );
};

export default AddWishList;
"use client"
import { AuthContext } from '@/app/utils/Provider/authcontext';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const AllPost = () => {
    const { user } = useContext(AuthContext);
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm();
    const [selectedOption, setSelectedOption] = useState(null);
    const [currentDate] = useState(getDate());
    function getDate() {
      const today = new Date();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();
      const date = today.getDate();
      return `${month}/${date}/${year}`;
    }
    const onSubmit = async(data) => {
        const name = user?.displayName;
        const image_url = user?.photoURL;
        const postedBy = user?.email;
        const postTitle = data.postTitle;
        const postedFor=data.postedFor;
        const postDetails = data.postDetails;
        const  postedDate = currentDate;
        const post = {
          name,
          image_url,
          postedBy,
          postTitle,
          postedFor,
          postDetails,
          postedDate
        };
        try {
            const response = await axios.post( 
              "http://localhost:3000/posts/createPost",
            post);
            console.log(response);
            //   .then((response) => response.json())
            const responseData = response.data;
            console.log(responseData);
            if (response.status === 201) {
              reset();
              Swal.fire("Thank You!", "Post Successful!", "success");
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
                          Create a Post
                        </h1>
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text text-[#F7B030] font-medium text-lg">
                            Post tile
                          </span>
                        </label>
                        <input
                          type="text"
                          {...register("postTitle", { required: true })}
                          placeholder="Enter Post Title"
                          name="postTitle"
                          className="input input-bordered border-[#F7B030]"
                        />
                        {errors.postTitle && (
                          <span className="text-red-700">
                            *Write your title
                          </span>
                        )}
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text text-[#F7B030] font-medium text-lg">
                            Posted For
                          </span>
                        </label>
                        <input
                          type="text"
                          {...register("postedFor", { required: true })}
                          placeholder="Enter Post Reason"
                          name="postedFor"
                          className="input input-bordered border-[#F7B030]"
                        />
                        {errors.postTitle && (
                          <span className="text-red-700">
                            *Write your title
                          </span>
                        )}
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text text-[#F7B030] font-medium text-lg">
                            Post Description
                          </span>
                        </label>
                        <textarea
                          className="border-2 border-[#F7B030]"
                          {...register("postDetails", { required: true })}
                          name="postDetails"
                          id="postDetails"
                          placeholder="Write Post Details"
                          cols="20"
                          rows="10"
                        ></textarea>
                        {errors.postDetails && (
                          <span className="text-red-700">
                            *Write your post details
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="form-control mt-6">
                      <button className="btn text-white hover:bg-[#F7B030] bg-[#F7B030]">
                        Create Post
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
        </div>
    );
};

export default AllPost;
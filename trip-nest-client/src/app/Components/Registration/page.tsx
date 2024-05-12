"use client"
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '@/app/utils/Provider/authcontext';

const registration = () => {
    const [showPassword, setShowPassWord] = useState(false);
    const [isErr, setisErr] = useState(false);
    const [errch, seterrch] = useState("");
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();
      const router = useRouter();
      const { createUser, setProfilePicture } = useContext(AuthContext);

      const onSubmit =async (data) => {
        const username = data.username;
        const contact=data.contact;
        const image_url = data.image_url;
        const email = data.email;
        const password = data.password;
        const role=data.role;
    
        const user = {
          username,
          contact,
          image_url,
          email,
          password,
          role
        };
        console.log(user);
        try {
        const response = await axios.post( 
          "http://localhost:3000/users/signup",
        user);
        console.log(response);
        //   .then((response) => response.json())
        const responseData = response.data;
        console.log(responseData);
        if (response.status === 201) {
          reset();
          Swal.fire("Thank You!", "Registration Successful!", "success");
          router.push("/");
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
          setisErr(true);
        }
        createUser(data.email, data.password)
        .then((result) => {
          console.log(result.user);
          setProfilePicture(data.username, data.image_url);
        })
        .catch((error) => {
          console.log(error.message);
        });
        };
    return (
        <div className="max-w-[1180px] mx-auto">
      <div className="hero bg-base-200 flex">
       
        <div className="hero-content w-full flex flex-col md:flex-row">
        <div>
        <img className='h-full w-full' src="https://i.ibb.co/cxN7XtR/Blue-Modern-Travel-Tour-Agency-Instagram-Post.png" alt="" />
        </div>
          <div className="card flex-shrink-0 w-full md:w-3/4 lg:w-1/2 shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body pl-4">
              <div className="flex flex-col md:flex-col lg:flex-row gap-1">
                <div className="form-control w-full">
                  <div className=" text-[#F7B030] font-medium text-lg text-center flex">
                     <h1 className=" text-[#F7B030] font-bold text-2xl rounded-xl w-full underline">
                      Registration
                    </h1>
                  </div>
                  <label className="label">
                    <span className="label-text text-[#F7B030] font-medium text-lg">
                      User Name:
                    </span>
                  </label>
                  <div>
                  <input
                    type="text"
                    {...register("username", { required: true })}
                    placeholder="enter your username"
                    name="username"
                    className="border-2 border-[#F7B030]"
                  />
                  {errors.username && (
                    <span className="text-red-700">*User Name is required</span>
                  )}
                  </div>
                </div>
              </div>
              <div>
                   <div className="form-control">
                  <label className="label">
                    <span className="label-text text-[#F7B030] font-medium text-lg">
                     Contact No.
                    </span>
                  </label>
                  <div>
                  <input
                    type="text"
                    {...register("contact", { required: true })}
                    placeholder="Contact no."
                    name="contact"
                    className="border-2 border-[#F7B030]"
                  />
                  {errors.contact && (
                    <span className="text-red-700">*contact number is required</span>
                  )}
                  </div>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-[#F7B030] font-medium text-lg">
                      Image URL
                    </span>
                  </label>
                 <div>
                 <input
                    type="text"
                    {...register("image_url", { required: true })}
                    placeholder="Image url"
                    name="image_url"
                    className="border-2 border-[#F7B030]"
                  />
                  {errors.image_url && (
                    <span className="text-red-700">*image is required</span>
                  )}
                 </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-[#F7B030] font-medium text-lg">
                      Email
                    </span>
                  </label>
                  <div>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    placeholder="email"
                    name="email"
                    className="border-2 border-[#F7B030]"
                  />
                  {errors.email && (
                    <span className="text-red-700">*Email is required</span>
                  )}
                  </div>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-[#F7B030] font-medium text-lg">
                      Password
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: true,
                        minLength: 6,
                        pattern:
                          /(?=.*[a-zA-Z >>!#$%&? "<<])[a-zA-Z0-9 >>!#$%&?<< ]/,
                      })}
                      placeholder="password"
                      name="password"
                      className="border-2 border-[#F7B030]"
                    />
                    {errors.password?.type === "required" && (
                      <span className="text-red-700">
                        *Password is required
                      </span>
                    )}
                    {errors.password?.type === "pattern" && (
                      <span className="text-red-700">
                        *Provie a special Character,one capital letter
                      </span>
                    )}
                    {errors.password?.type === "minLength" && (
                      <span className="text-red-700">
                        *Password must be 6 characters
                      </span>
                    )}
                    <span
                      className="absolute top-3 right-2"
                      onClick={() => setShowPassWord(!showPassword)}
                    >
                      
                    </span>
                  </div>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-[#F7B030] font-medium text-lg">
                      Role
                    </span>
                  </label>
                 <div>
                 <input
                    type="text"
                    {...register("role", { required: true })}
                    placeholder="which role ?"
                    name="role"
                    className="border-2 border-[#F7B030]"
                  />
                  {errors.image_url && (
                    <span className="text-red-700">*enter your role</span>
                  )}
                 </div>
                </div>
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="text-white hover:bg-[#F7B030] bg-[#F7B030] p-2 rounded-lg">
                  Registration
                </button>
              </div>
            </form>
            <p className="text-center font-medium text-lg text-[#F7B030]">
              Already have an account ?{" "}
              <Link className="text-red-400" href="/Login">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
    );
};

export default registration;
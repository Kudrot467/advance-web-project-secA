"use client"
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { useAuth } from "@/app/utils/Provider/authcontext";

export default function Login() {
//   const router = useRouter();
  const form = useForm();
  const { register, handleSubmit, formState, reset, setValue } = form;
  const { errors } = formState;
  const [errch, seterrch] = useState("");
  const [isErr, setisErr] = useState(false);
  const [showPassword, setShowPassWord] = useState(false);
  const {login,user}=useAuth();
  const onSubmit = async (data) => {
    console.log("Form submitted", data);
    const email=data.email;
    const password=data.password;
    const userData = {
      email,
      password
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/auth/login",
        userData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log(res);

      // Check if the response status is successful (e.g., HTTP status code 200)
      if (res.status >= 200 && res.status < 300) {
        // You may want to store the authentication token or user information
        // in the state or context
        // For example:
        // localStorage.setItem("token", res.data.token);

        // Redirect the user to the appropriate page
        console.log("cookie: " + document.cookie);
        login(
          res.data.username,
          userData.password,
          userData.email,
          document.cookie
        );
        Swal.fire({
            position: "center",
            icon: "success",
            title: "login successful",
            showConfirmButton: false,
            timer: 1500
          });
        // router.push({
        //   pathname: "/",
        // }); // Replace "/dashboard" with the actual URL
      }
    } catch (error) {
      console.log(error);
      //alert("Wrong Email or Password");

      setisErr(true);
      console.log(errch);
      reset();
      // Handle other errors (e.g., network issues, server errors)
      // You can show an error message, handle it in some way, etc.
    }
    console.log(user);
  };
  return (
    <div className="max-w-[1180px] mx-auto">
      <div className="hero">
      <div className="hero-content w-full md:w-3/4 lg:w-1/2 flex flex-col md:flex-row">
      <div className="">
      <img
            className="w-full h-full"
            src="https://i.ibb.co/ZK6xP04/Blue-and-White-Illustrated-Login-Page-Mobile-Prototype.png"
            alt=""
          />
        </div>
        <div className="card w-full md:w-3/4 shadow-2xl bg-base-100 rounded-xl">
        
          <form onSubmit={handleSubmit(onSubmit)} className="card-body p-7 ">
          <div className="text-center flex items-center">
          <img src="https://i.ibb.co/MhD3Pbf/trip-nest-logo-removebg-preview.png" className="h-[100] w-[120px]" alt="" />
          <h1 className="font-bold text-[#F7B030]">Login|TripNest</h1>
          </div>
          <div className="form-control">
                  <label className="label">
                    <span className="label-text text-[#C6A921] font-medium text-lg">
                      Email
                    </span>
                  </label>
                  <div>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    placeholder="email"
                    name="email"
                    className="border-2 border-[#C6A921]"
                  />
                  {errors.email && (
                    <span className="text-red-700">*Email is required</span>
                  )}
                  </div>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-[#C6A921] font-medium text-lg">
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
                      className="border-[#C6A921] border-2"
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
                      className="absolute top-1 right-10"
                      onClick={() => setShowPassWord(!showPassword)}
                    >
                      {showPassword ? (
                        <FaEyeSlash></FaEyeSlash>
                      ) : (
                        <FaEye></FaEye>
                      )}
                    </span>
                  </div>
                </div>
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
            <div className="form-control mt-6">
             
             <button className="w-full text-white hover:bg-[#C6A921] bg-[#A3CA33] font-medium px-4 py-2 rounded-lg">
                Login
              </button>
             
            </div>
          </form>
          <p className="text-center font-medium text-lg text-[#C6A921]">
            New Applicant ?{" "}
            <Link className="text-red-400" href="/Registration">
              Register
            </Link>
          </p>
          <div className="flex items-center justify-center my-6 text-[#C6A921]">
          <FaGoogle></FaGoogle>
            <button  className="btn  text-[#C6A921] pl-2">
              Continue with Google
            </button>
          </div>
        </div>
        
      </div>
    </div>
    </div>
  );
}

"use client"
import { useContext } from "react";
import { AuthContext, useAuth } from "./utils/Provider/authcontext";

export default function Home() {
  const { user } = useContext(AuthContext);
  
  
  return (
    <div>
      <div className="flex items-center justify-center"  suppressHydrationWarning={true}>
      <img src="https://i.ibb.co/MhD3Pbf/trip-nest-logo-removebg-preview.png" className="h-[100] w-[120px]" alt="" />
      <h1 className="text-5xl font-bold text-[#F7B030]"><span className="text-[#38B6FF]">Trip</span> Nest {user?.email}</h1>
    </div>
    </div>
  );
}

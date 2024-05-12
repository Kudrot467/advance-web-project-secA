"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../globals.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "@/app/utils/Provider/authcontext";
import Link from "next/link";
import { FaAd, FaBullhorn, FaHome, FaList, FaUser, FaUsers } from "react-icons/fa";
import dynamic from 'next/dynamic';

const inter = Inter({ subsets: ["latin"] });

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const{user}=useContext(AuthContext);
    const[users,setUsers]=useState([]);
    const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])
 

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
        <div className="flex">
             <div className="w-64 min-h-screen bg-[#38B6FF]">
             {isClient ? <div >
      
      <div >
       <ul className="menu">
         {
           loggedInUser?.role==='admin' ? <>
            <li >
           <Link
             href="/dashboard/adminProfile"
           >
           <FaUser></FaUser>
            My Profile--
           </Link>
         </li>
         <hr /><hr />
         <li>
           <Link
             href="/dashboard/manageUsers"
             
           >
              <FaUsers></FaUsers>
           Manage Users
           </Link>
         </li>
         <hr />
         <hr />
         <li>
           <Link
             href="/dashboard/makeAnnouncements"
             className=""
             
           >
           <FaBullhorn></FaBullhorn>
            Make Announcement
           </Link>
         </li>
         <li>
           <Link
             href="/Dashboard/addPost"
           >
               <FaAd></FaAd>
            Add Post--
           </Link>
         </li>
         <hr /><hr />
         <li>
           <Link
             href="/dashboard/myPosts"
             className=""
           >
               <FaList></FaList>
            My Posts--
           </Link>
         </li>
         <hr />
         <hr />
         <li>
           <Link
             href="/dashboard/membership"
             className=""
           >
               <FaList></FaList>
            Member Ship
           </Link>
         </li>
         <hr />
         <hr />

           </>:
           //users dashboard links
           <>
               <li >
           <Link
             href="/dashboard/myProfile"
            className="text-white font-semibold text-lg hover:text-[#F7B030] hover:text-xl hover:bg-white"
           >
           <FaUser></FaUser>
            My Profile--
           </Link>
         </li>
         <hr /><hr />
         <li>
           <Link
             href="/Components/Dashboard/AllPost"
             className="text-white font-semibold text-lg hover:text-[#F7B030] hover:text-xl hover:bg-white"
           >
               <FaAd></FaAd>
            Add Post--
           </Link>
         </li>
         <hr /><hr />
         <li>
           <Link
             href="/Components/Dashboard/MyPosts"
             className="text-white font-semibold text-lg hover:text-[#F7B030] hover:text-xl hover:bg-white"
           >
               <FaList></FaList>
            My Posts--
           </Link>
         </li>
         <hr />
         <hr />
         <li>
           <Link
             href="/dashboard/membership"
             className="text-white font-semibold text-lg hover:text-[#F7B030] hover:text-xl hover:bg-white"
           >
               <FaList></FaList>
            Member Ship
           </Link>
         </li>
         <hr />
         <hr />
           </>
         }
         <hr />
         <hr />
         <li>
           <Link
             href="/"
             className="text-white font-semibold text-lg hover:text-[#F7B030] hover:text-xl hover:bg-white"
           >
               <FaHome></FaHome>
            Home
           </Link>
         </li>
       </ul>
     </div>
      
      </div> : 'Prerendered'}
             </div>
     <div className="flex-1">
      {
         isClient &&
      children}
      </div>
        </div>
       
      
  );
}

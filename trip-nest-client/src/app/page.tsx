// @ts-nocheck
"use client"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./utils/Provider/authcontext";
import Banner from "./Components/Banner/page";
import axios from "axios";
import { FaComment } from "react-icons/fa";
import Link from "next/link";
import CurrencyConverter from "./Components/CurrencyConverter/page";

export default function Home() {
  const { user } = useContext(AuthContext);
  const[posts,setPosts]=useState([]);
  const[comments,setComments]=useState([]);
  const[postComment,setPostComment]=useState([]);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:3000/posts'); // Adjust the endpoint URL as needed
        // setPosts(res.data);
        const reversedPosts = res.data.slice().reverse(); // Reverse the order of posts if needed
        setPosts(reversedPosts);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchPosts();}, []);
 
    const reversedPosts = posts.slice().reverse();

    useEffect(() => {
      const fetchComment = async () => {
        try {
          const res = await axios.get(`http://localhost:3000/comments`); // Adjust the endpoint URL as needed
          setComments(res.data);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };
      fetchComment();
    }, []);
    
    const postsWithCommentsCount = posts.map(post => ({
      ...post,
      commentsCount: comments.filter(comment => comment.postId === post.postId).length,
    }));
    console.log(postsWithCommentsCount)
  return (
    <div>
     <div>
     <Banner/>
     </div>

     <div className="text-center ">
      <CurrencyConverter/>
     </div>
      {/* <div className="flex items-center justify-center"  suppressHydrationWarning={true}>
      <img src="https://i.ibb.co/MhD3Pbf/trip-nest-logo-removebg-preview.png" className="h-[100] w-[120px]" alt="" />
      <h1 className="text-5xl font-bold text-[#F7B030]"><span className="text-[#38B6FF]">Trip</span> Nest {user?.email}</h1>
    </div> */}
    <div className="max-w-6xl mx-auto my-5">
    <h1 className="text-2xl font-bold underline text-[#F7B030]">All Posts</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
       
      {
        postsWithCommentsCount.map(post=>
          <div key={post.postId} >
          <div className="card rounded-xl card-compact bg-base-100 shadow-xl border-2 border-[#F7B030]">
            <div className="navbar  bg-base-100">
              <div className="flex-1">
                <a className="btn btn-ghost text-xl">{post.postedDate}</a>
              </div>
              <div className="flex-none">
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-14 rounded-full">
                      <img alt="author image" src={post.image_url} />
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <div className="card-body w-full rounded-b-xl bg-[#38B6FF]">
              <h2 className="card-title text-white ">
                Title:{post.postTitle}
              </h2>
              <p className="text-white text-xl font-medium">
                Post type or reason:
                <span className="font-bold text-white">
                  {" "}
                  {post.postedFor}
                </span>
              </p>
              <p className="text-xl font-medium text-white">
                Description:
                <span className="text-lg font-bold">{post.postDetails} </span>
              </p>
              <div className="card-actions">
                <Link
                  className="btn bg-white text-lg hover:text-xl hover:bg-[#F7B030] hover:text-white text-[#38B6FF] font-medium"
                  href={`./Components/Comments/${post.postId}`}
                >
                  <FaComment></FaComment>
                  Comments - <span className="font-bold">{post.commentsCount}</span>
                </Link>
              </div>
            </div>
          </div>
          </div>
        )
      }
      </div>
    </div>
    </div>
  );
}

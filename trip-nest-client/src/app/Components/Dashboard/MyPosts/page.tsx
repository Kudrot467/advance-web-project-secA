// @ts-nocheck
"use client";
import { AuthContext } from "@/app/utils/Provider/authcontext";
import axios from "axios";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

const MyPosts = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  // const [myPost,setMyPosts]=useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/posts`);
        setPosts(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchPosts();
  }, []);

  const [isDeleted, setIsDeleted] = useState(false);
  const myPosts = posts.filter((post) => post.postedBy == user?.email);
  console.log(myPosts);
  
  const[items,setItems]=useState(myPosts);

  const handleDeleteUser = (post) => {
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
             axios.delete(`http://localhost:3000/posts/${post.postId}`)
              .then(res=>{
                setIsDeleted(true);
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                  });
                const remaining=items.filter(item=>item.postId!==post.postId);
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
  console.log("items",items)

  return (
    <div className="max-w-[1120px] mx-auto">
        <h1>
            {myPosts.length===0 && <div>
                <p className="text-4xl text-red-600 font-bold">Your created post is 00</p>
                </div>}
        </h1>
      {myPosts.map((myPost) => (
        <div key={myPost.postId} className="grid grid-cols-1 md:grid-cols-3">
          <div className="card card-compact bg-base-100 shadow-xl my-3">
            <div className="navbar bg-base-100">
              <div className="flex-1">
                <a className="btn btn-ghost text-xl">{myPost.postedDate}</a>
              </div>
              <div className="flex-none">
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-14 rounded-full">
                      <img alt="author image" src={myPost.image_url} />
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <div className="card-body bg-[#38B6FF]">
              <h2 className="card-title h-[30px] text-white ">
                Title:{myPost.postTitle}
              </h2>
              <p className="text-white text-xl font-medium">
                Post type or reason:
                <span className="font-bold text-white">
                  {" "}
                  {myPost.postedFor}
                </span>
              </p>
              <p className="text-xl font-medium text-white">
                Description:
                <span className="text-lg font-bold">{myPost.postDetails} </span>
              </p>
              <div className="card-actions">
                <Link
                  className="btn bg-white text-lg hover:text-xl hover:bg-[#F7B030] hover:text-white text-[#38B6FF] font-medium"
                  href={`/Components/Dashboard/UpdatePost/${myPost.postId}`}
                >
                  Update Post
                </Link>
                <button
                  onClick={() => handleDeleteUser(myPost)}
                  className="btn bg-red-600 text-white hover:bg-white hover:text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyPosts;

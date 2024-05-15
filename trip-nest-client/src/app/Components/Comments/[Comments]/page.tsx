"use client"
import { AuthContext } from '@/app/utils/Provider/authcontext';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaArrowAltCircleDown, FaArrowAltCircleRight } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Comments = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();

      const {user}=useContext(AuthContext);
      const[comments,setComments]=useState([]);
      const id = window.location.pathname.split("/").pop();
      

      useEffect(() => {
        const fetchComment = async () => {
          try {
            const res = await axios.get(`http://localhost:3000/comments/${id}`); // Adjust the endpoint URL as needed
            setComments(res.data);
          } catch (error) {
            console.error("Error fetching users:", error);
          }
        };
        fetchComment();
      }, []);
    console.log(comments)
     
    const onSubmit = async(data) => {
        const commentText=data.addComment;
        const commentedBy=user?.email;
        const postId=id;
        const commentInfo={
            commentText,
            commentedBy,
            postId
        }
        try {
            const response = await axios.post( 
              "http://localhost:3000/comments/createComment",
            commentInfo);
            console.log(response);
            //   .then((response) => response.json())
            const responseData = response.data;
            console.log(responseData);
            if (response.status === 201) {
              reset();
              Swal.fire("Thank You!", "Comment Successfull Successful!", "success");
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
            }
        
    }

    return (
        <div className='max-w-5xl mx-auto flex flex-col md:flex-row justify-around '>
            <form onSubmit={handleSubmit(onSubmit)} >
            <table className="table table-zebra">
                {/* head */}
                <thead className="bg-[#C6A921] text-white">
                  <tr className='text-center'>
                    <th></th>
                    <th className="text-2xl">Add Comments</th>
                    <th className="text-2xl">email</th>
                  </tr>
                </thead>
                <tbody>
                   <tr>
                   <th></th>
                    <td className="text-[#C6A921] text-xl font-semibold rounded-xl">
                    <div className="form-control">
                        <textarea
                          className="border-2 border-[#C6A921]"
                          name="addComment"
                          {...register("addComment",{required:true,maxLength: 20})}
                          id="addComment"
                          placeholder="Write Comment here..."
                          cols="3"
                          rows="5"
                        ></textarea>
                        <button className="btn text-white hover:bg-[#C6A921] bg-[#C6A921]">Add Comment</button>
                        {errors.addComment?.type === "maxLength" && (
                      <span className="text-red-700">
                        *you can not add comments more than 20
                      </span>
                    )}
                      </div>
                    </td>
                    <td className="text-[#C6A921] text-xl text-center font-semibold">{user?.email}</td>

                   </tr>
                </tbody>
              </table>
            </form> 
            <div>
            <div className="text-[#38B6FF]  text-xl font-semibold border-2 rounded-xl border-[#38B6FF]">
                    <div className="text-2xl flex items-center">Comments {comments.length} <FaArrowAltCircleDown></FaArrowAltCircleDown></div>
                    {
                      comments.map(comment=>
                          <div key={comment.commentId}>
                            <h2>
                            {comment.commentText}
                            </h2>
                            <hr />
                            <hr />
                          </div>

                      )
                    }
                    </div>
              </div>  
        </div>
    );
};

export default Comments;
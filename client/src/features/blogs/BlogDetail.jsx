import React, { useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBlogs } from '../../context/BlogsContext';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {fetchBlogDetailsById, addCommentToBlog, deleteCommentFromBlog, updateCommentOnBlog, updateLikesForBlog} from "../../MongoDB/request";
import moment from 'moment';
import { Link } from 'react-router-dom';
const BlogDetail = () => {
  const { _id } = useParams();
  const { blogs, loading, deleteBlog, newComment, setNewComment, commentText, setCommentText, setEditComment, editComment } = useBlogs();
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();
  const {userName, currentUser} = useAuth();
  const [liked, setLiked] = useState(false);


    useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const blogDetails = await fetchBlogDetailsById(_id);
        setBlog(blogDetails);
        setLiked(blogDetails.likes > 0);
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
      
    };

    fetchBlogDetails();
  }, [_id]);



  const handleDelete = async () => {
    try {
      await deleteBlog(_id);
      navigate('/');
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!blog) {
    return <div>Blog not found</div>;
  }

  const formattedCreatedAt = moment(blog.createdAt).format('MMMM Do YY');

  const handleAddComment = async () => {
    try {
      if (_id) {
        await addCommentToBlog(_id, { text: commentText, name: userName  });
        const updatedBlogDetails = await fetchBlogDetailsById(_id);
        setBlog(updatedBlogDetails);
        setCommentText("");
      } else {
        console.error("Blog ID is undefined");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      console.log("Deleting comment:", commentId);
      if (_id && commentId) {
        console.log("Blog ID:", _id);
        await deleteCommentFromBlog(_id, commentId);
        const updatedBlogDetails = await fetchBlogDetailsById(_id);
        console.log("Updated Blog after deletion:", updatedBlogDetails);
        setBlog(updatedBlogDetails);
      } else {
        console.error("Blog ID or Comment ID is undefined");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const populateFunction = (commentId, commentText) => {
    setEditComment({
      commentId,
      text: commentText,
    });
    setCommentText(commentText);
  };
  

  const handleUpdateCommentFunction = async () => {
    try {
      if (_id && editComment.commentId) {
        await updateCommentOnBlog(_id, editComment.commentId, { text: commentText, name: userName });
        const updatedBlogDetails = await fetchBlogDetailsById(_id);
        setBlog(updatedBlogDetails);
        setCommentText("");
        setEditComment({ commentId: null, text: "" });
      } else {
        console.error("Blog ID or Comment ID is undefined");
      }
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const handleLikeClick = async () => {
    try {
      if (_id) {
        const currentLikes = blog.likes || 0;
        await updateLikesForBlog(_id, currentLikes + 1);
        const updatedBlogDetails = await fetchBlogDetailsById(_id);
        setBlog(updatedBlogDetails);
      } else {
        console.error("Blog ID is undefined");
      }
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  return (
    <div>
      <h1 className=' text-[4rem] text-bold text-red-600'>{blog.title}</h1>
      <p className='text-[1.3rem] text-semibold mb-2'>{blog.content}</p>
      <p className='text-[1.3rem] text-semibold mb-2 text-red-600'>Author: {blog.author.name}</p>
      <p className='text-[1.3rem] text-semibold mb-2 text-red-600'>Tag: {blog.tags.map((tag, index) => <span key={index}>{tag}</span>)}</p>
      <div className='flex justify-center align-center'>
      {blog.imageUrl && (
  <img src={blog.imageUrl} alt={blog.title} className="h-auto max-w-[20rem] my-4 outline-dashed" />
)}
      </div>
       <p className='text-[1.3rem] text-semibold mb-2 text-blue-800 '>Created At: {formattedCreatedAt}</p>
       <p className='text-[1.3rem] text-semibold mb-2 text-blue-800 '>Likes : {blog.likes}</p>
     
       <button className='btn btn-primary flex mb-4' onClick={handleLikeClick}>
        {/* {liked ? 'Unlike' : 'Like'} */}
        Like
      </button>
      {currentUser === blog.author.name && (
        <div className='flex gap-4'>
          <button className='btn btn-primary flex' onClick={handleDelete}>
        Delete Post
      </button>
      <Link to={`/update/${_id}`}>
            <button className='bg-red-600 btn btn-danger flex'>Update Post</button>
          </Link>
        </div>
      
      
    )}
    <div className='mt-2 mb-2'>
      <h2 className='text-[1.5rem] text-red-600 text-bold mt-4 underline'>Comments</h2>
  {blog.comments && blog.comments.length > 0 ? (
  blog.comments.map((comment) => (
    <div className='w-3/4 p-2 mt-2 bg-gray-500 rounded-xl ' key={comment._id}>
      <p className='text-white'>{comment.name}</p>
      <div className='w-full p-2 mt-2 bg-black rounded-xl'>
      <p className='text-white'>{comment.text}</p>
      
    
      
      </div>
      {currentUser === comment.name ? (<div className='flex justify-between mt-2'>
        <button className='btn btn-primary' onClick={() => populateFunction(comment._id, comment.text)}>Update</button>
        <button className='btn btn-danger' onClick={() => handleDeleteComment(comment._id)}>Delete</button>
      </div>) : ("")}
      <p className='mt-2 text-xs text-white text-end'>{moment(comment.createdAt).format('MMMM Do YY')}</p>
    </div>
  ))
) : (
  <p>No comments available.</p>
)}
    </div>
    <div className='mt-2 mb-2'>
      <div className='w-3/4 p-6 bg-gray-500 rounded-xl'>
      <textarea value={commentText} placeholder='Leave your comment here'
  onChange={(e) => setCommentText(e.target.value)} className='w-full p-6 text-white bg-black border border-blue-500 focus:border-white rounded-xl' name="" id="" cols="75" rows="3"></textarea>
      <button className='btn btn-primary' onClick={editComment.commentId ? handleUpdateCommentFunction : handleAddComment}>  {editComment.commentId ? "Update comment" : "Add comment"}</button>
      </div>
      
    </div>
    </div>
  );
};

export default BlogDetail;
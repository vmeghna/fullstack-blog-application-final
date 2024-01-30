
import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";
import { createBlogApi, getBlogsApi } from "../services/apiFirestore";
import {db} from "./../firebase.js"
import {useAuth} from "./AuthContext.jsx"
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  getDoc,
  deleteDoc
} from "firebase/firestore";
import axios from "axios";

const BlogsContext = createContext();

export const BlogsProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commentText, setCommentText] = useState("");
  const [editComment, setEditComment] = useState({
    commentId: null,
    text: "",
  });
  const [ imageUrlBase64 ,setImageUrlBase64]=useState("");
  const { userName } = useAuth();


  const createBlog = async (newBlog) => {
    try {
      const data = await createBlogApi(newBlog);
      setBlogs((state) => [data, ...state]);
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  const getBlogs = async () => {
    try {
      setLoading(true);
      
      const response = await axios.get(' https://good-gray-yak-tux.cyclic.app/api/v1/posts');
      const data = response.data;
      
      setBlogs(data);
      setLoading(false);
    } catch (error) {
      console.error("Error getting blogs:", error);
      setLoading(false);
    }
  };

  const getBlogById = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(` https://good-gray-yak-tux.cyclic.app/api/v1/posts/${id}`);
      const data = response.data;

      setLoading(false);
      return data;
    } catch (error) {
      console.error(`Error getting blog with id ${id}:`, error);
      setLoading(false);
      return null;
    }
  };


  const deleteBlog = async (blogId) => {
    try {
      await axios.delete(` https://good-gray-yak-tux.cyclic.app/api/v1/posts/${blogId}`);
      
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <BlogsContext.Provider value={{ loading, blogs, createBlog, deleteBlog, getBlogById, newComment, setNewComment, commentText, setCommentText, editComment, setEditComment,imageUrlBase64,setImageUrlBase64 }}>
      {children}
    </BlogsContext.Provider>
  );
};

BlogsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useBlogs = () => useContext(BlogsContext);
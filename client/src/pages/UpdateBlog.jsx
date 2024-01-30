import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useBlogs } from '../context/BlogsContext';
import Alert from '../ui/Alert';
import Container from '../ui/Container';
import {scrollToTop} from "../utils/helperFuntions.js"
import axios from 'axios';
import { useParams } from 'react-router-dom';
import FileBase64 from "react-file-base64";


const UpdateBlog = () => {
    const [message, setMessage] = useState({});
    const [loading, setLoading] = useState(false);

    const { _id } = useParams();
  
    const { getBlogById, updateBlog,imageUrlBase64,setImageUrlBase64 } = useBlogs();
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
      setValue,
    } = useForm();
  
    const { currentUser,handleChange } = useAuth();
    if (!currentUser) return null;
  
    const uid = localStorage.getItem('userId');
  
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const blog = await getBlogById(_id);
                setValue('title', blog.title);
                setValue('subtitle', blog.subtitle);
                setValue('content', blog.content);
                setValue('tags', blog.tags);
                setValue('imageUrl', blog.imageUrl);
            } catch (error) {
                console.error('Error fetching blog details:', error);
            }
        };

        fetchBlog();
    }, [_id, setValue]);
  
   
    const updatePost = async (data) => {
        const updatedBlog = {
          author: {
            id: localStorage.getItem("userId"),
            name: currentUser,
            title: data.title,
            subtitle: data.subtitle,
            content: data.content,
            tags: Array.isArray(data.tags) ? data.tags.join(",") : data.tags,
            imageUrl: data.imageUrl,
          },
        };
      
        try {
          setLoading(true);
          const response = await axios.put(
            `http://localhost:3001/api/v1/posts/${_id}`,
            updatedBlog
          );
          console.log('Blog updated successfully:', response.data);
      
          setMessage({ type: 'success', content: 'Blog Updated Successfully' });
        } catch (error) {
          console.error('Error updating blog:', error);
          setMessage({ type: 'error', content: 'Error updating blog' });
        } finally {
          setLoading(false);
          scrollToTop();
        }
    };
    
      const handleFileBase64=({base64})=>{
        setImageUrlBase64(base64);
      }
      
  
    const handleReset = () => {
      setMessage({});
      scrollToTop();
    };

  return (
    <Container>
      <form className="space-y-5" onSubmit={handleSubmit(updatePost)}>
      <h3 className="text-4xl font-semibold">Update Blog</h3>
        {message?.type && (
          <Alert type={message.type} message={message.content} />
        )}
        <label className="form-control">
          <div className="label">Title</div>
          <input
            type="text"
            placeholder="e.g. The Future of Artificial Intelligence"
            {...register("title", { required: "The title field is required" })}
            className={`input input-bordered ${
              errors?.title?.message ? "input-error" : ""
            }`}
          />

          {errors?.title?.message && (
            <div className="label text-error">{errors?.title?.message}</div>
          )}
        </label>

        {/* Subtitle */}
        <label className="form-control">
          <div className="label">Subtitle</div>
          <input
            type="text"
            placeholder="e.g. Exploring the possibilities and potential pitfalls of AI"
            {...register("subtitle", {})}
            className={`} input input-bordered`}
          />
        </label>

        {/* Content  */}
        <label className="form-control">
          <div className="label">Write your content</div>
          <textarea
            type="text"
            {...register("content", {
              required: "The content field is required",
            })}
            className={`textarea textarea-bordered h-24 ${
              errors?.content?.message ? "textarea-error" : ""
            }`}
          />

          {errors?.content?.message && (
            <div className="label text-error">{errors?.content?.message}</div>
          )}
        </label>

        {/* Select the tag */}
        <label className="form-control">
          <div className="label">Select Tag</div>
          <select
            {...register("tags", { required: "The tag is required" })}
            className={`select select-bordered ${
              errors?.tags?.message ? "select-error" : ""
            }`}
          >
            <option value="">Pick any one tag.</option>
            <option value="Health & Wellness">Health & Wellness</option>
            <option value="Technology">Technology</option>
            <option value="Business">Business</option>
            <option value="Travel">Travel</option>
            <option value="Food">Food</option>
            <option value="Improvement">Improvement</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Travel">Travel</option>
            <option value="Environment">Environment</option>
          </select>
          {errors?.tags?.message && (
            <div className="label text-error">{errors?.tag?.message}</div>
          )}
        </label>

        {/* ImageUrl  */}
        <label className="form-control">
          <div className="label">Image</div>
          {/* <input
            type="url"
            placeholder="https://images.unsplash.com/..."
            {...register("imageUrl", {
              required: "The imageUrl field is required",
              pattern: /https:/,
            })}
            className={`input input-bordered ${
              errors?.imageUrl?.message ? "input-error" : ""
            }`}
          /> */}

        
           <FileBase64
            type="file"
            multiple={false}
            name="imageUrl"
            onDone={handleFileBase64 }
            
             
              className={`w-full input input-bordered  pt-4 ${
              errors?.imageUrl?.message ? "input-error" : ""
            }`}
          />
            {errors?.imageUrl?.message && (
            <div className="label text-error">{errors?.imageUrl?.message}</div>
          )}
        </label>
        
        <button
          className="mr-2 btn btn-primary"
          type="submit"
          disabled={loading}
        >
          Update
        </button>
        <button
          className="btn btn-neutral"
          type="reset"
          onClick={handleReset}
        >
          Clear
        </button>
      </form>
    </Container>
  );
};

export default UpdateBlog;

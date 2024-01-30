import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useBlogs } from '../context/BlogsContext';
import Alert from '../ui/Alert';
import Container from '../ui/Container';
import {scrollToTop} from "../utils/helperFuntions"
import axios from 'axios';
import FileBase64 from "react-file-base64";

const CreateBlog = () => {
  const [message, setMessage] = useState({});
  const [loading, setLoading] = useState(false);

  const {createBlog,imageUrlBase64, setImageUrlBase64} = useBlogs();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { currentUser } = useAuth();
  if (!currentUser) return null;
  // const { uid, displayName } = currentUser;

  const uid = localStorage.getItem("userId");


  const createPost = async (data) => {
    const newBlog = {
      author: { id: uid, name: currentUser },
      ...data,
      imageUrl: imageUrlBase64,
    };
    try {
      setLoading(true);
      const response = await axios.post(' https://good-gray-yak-tux.cyclic.app/api/v1/posts', newBlog);
      console.log('Blog created successfully:', response.data);

      setMessage({ type: 'success', content: 'Blog Created Successfully' });
      reset();
    } catch (error) {
      console.error('Error creating blog:', error);
      setMessage({ type: 'error', content: 'Error creating blog' });
    } finally {
      setLoading(false);
      scrollToTop();
    }
  };
  
  const handleFileBase64 = ({ base64 }) => {
    setImageUrlBase64(base64);
  };
  const handleReset = () => {
    setMessage({});
    scrollToTop();
  };

  return (
    <Container>
      <form className="space-y-5" onSubmit={handleSubmit(createPost)}>
        <h3 className="text-4xl font-semibold">Create Blog</h3>
        {message?.type && (
          <Alert type={message.type} message={message.content} />
        )}
        {/* Title  */}
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
          <div className="label ">Image</div>
          {/* <input
            type="filebase64"
            placeholder="https://images.unsplash.com/..."
            {...register("imageUrl", {
              required: "The imageUrl field is required",
              pattern: /https:/,
            })}
 
          


            
            className={`input input-bordered mb-4  ${
              errors?.imageUrl?.message ? "input-error" : ""
            }`}
          /> */}
 <FileBase64
            type="file"
            multiple={false}
            name="imageUrl"
            onDone={handleFileBase64}
          
            className={`input input-bordered ${
              errors?.imageUrl?.message ? "input-error" : ""
            }`}
          />
           

          {errors?.imageUrl?.message && (
            <div className="label text-error ">{errors?.imageUrl?.message}</div>
          )}

           {/* <FileBase64
            type="file"
            name="image"
            value={createPost.image}
            className="form-control lg:text-2xl "
            onDone={({ base64 }) => {
              // console.log(base64);
              setCreatePost({ ...createPost, image: base64 });
            }}
          /> */}
        </label>

        <button
          className="mr-2 btn btn-primary"
          type="submit"
          disabled={loading}
        >
          Publish
        </button>
        <button className="btn btn-neutral" type="reset" onClick={handleReset}>
          Clear
        </button>
      </form>
    </Container>
  );
};

export default CreateBlog;

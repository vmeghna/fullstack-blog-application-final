import axios from 'axios';

const BASE_URL = 'http://localhost:3001';




export const fetchBlogDetailsById = async (blogId) => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/posts/${blogId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch blog details for ${blogId}`);
      }
  
      const blogDetails = await response.json();
      return blogDetails;
    } catch (error) {
      throw new Error(`Error fetching blog details: ${error.message}`);
    }
  };



  export const getUserById = async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/userDetails/${userId}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.warn('User not found:', userId);
        return null;
      } else {
        console.error('Error fetching user details:', error);
        throw error;
      }
    }
  };

export const deleteBlogApi = async (blogId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/v1/blogs/${blogId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};



//for adding comments
export const addCommentToBlog = async (blogId, commentData) => {
  try {
    const url = `${BASE_URL}/api/v1/posts/${blogId}/comments`;
    console.log("Request URL:", url);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    });

  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

//for deleting comment
export const deleteCommentFromBlog = async (blogId, commentId) => {
  try {
    const url = `${BASE_URL}/api/v1/posts/${blogId}/comments/${commentId}`;
    console.log("Request URL:", url);

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete comment: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Delete Comment Response:", data);
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};


//for updating comment
// Update comment on a blog post
export const updateCommentOnBlog = async (blogId, commentId, updatedCommentData) => {
  try {
    const url = `${BASE_URL}/api/v1/posts/${blogId}/comments/${commentId}`;
    console.log("Request URL:", url);

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCommentData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update comment: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Update Comment Response:", data);
  } catch (error) {
    console.error('Error updating comment:', error);
    throw error;
  }
};

//for updating likes
export const updateLikesForBlog = async (blogId, likes) => {
  try {
    const url = `${BASE_URL}/api/v1/posts/${blogId}/likes`;
    console.log("Request URL:", url);

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ likes }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update likes: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Update Likes Response:", data);
  } catch (error) {
    console.error('Error updating likes:', error);
    throw error;
  }
};

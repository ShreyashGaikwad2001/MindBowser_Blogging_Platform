import axios from 'axios';

// Base API URL (change if needed)
const API_BASE_URL = 'http://localhost:5000/api';

// Helper to get Authorization header with JWT token
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token
    ? { Authorization: `Bearer ${token}` }
    : {};
};

// Posts APIs
export const fetchPosts = async () => {
  const response = await axios.get(`${API_BASE_URL}/posts`);
  return response.data;
};

export const fetchPostById = async (postId) => {
  const response = await axios.get(`${API_BASE_URL}/posts/${postId}`);
  return response.data;
};

export const createPost = async (postData) => {
  const response = await axios.post(`${API_BASE_URL}/posts`, postData, {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
  });
  return response.data;
};

export const updatePost = async (postId, postData) => {
  const response = await axios.put(`${API_BASE_URL}/posts/${postId}`, postData, {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
  });
  return response.data;
};

export const deletePost = async (postId) => {
  const response = await axios.delete(`${API_BASE_URL}/posts/${postId}`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

// User APIs
export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data; // typically contains token and user info
};

export const signup = async (userData) => {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, userData, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  };
  
  

export const fetchUserPosts = async (userId) => {
  const response = await axios.get(`${API_BASE_URL}/users/${userId}/posts`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

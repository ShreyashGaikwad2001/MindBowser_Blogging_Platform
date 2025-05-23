import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Editpost.css';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: '', content: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching the post:', error);
        setMessage('Failed to load post.');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('You must be logged in to update posts.');
      return;
    }

    try {
      setLoading(true);
      await axios.put(
        `http://localhost:5000/api/posts/${id}`,
        post,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      navigate(`/posts/${id}`);
    } catch (error) {
      console.error('Error updating the post:', error);
      setMessage(error.response?.data?.message || 'Failed to update post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="editpost-container container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-7 col-sm-10 col-12">
          <h2 className="mb-4 text-center">Edit Post</h2>
          {message && (
            <div
              className={`alert ${
                message.toLowerCase().includes('failed') ? 'alert-danger' : 'alert-info'
              }`}
              role="alert"
            >
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit} className="editpost-form">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-control"
                value={post.title}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="content" className="form-label">
                Content
              </label>
              <textarea
                id="content"
                name="content"
                className="form-control"
                value={post.content}
                onChange={handleChange}
                rows="6"
                required
                disabled={loading}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? 'Updating...' : 'Update Post'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPost;

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchPostById } from '../services/api';
import '../styles/Postdetail.css';

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await fetchPostById(id);
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status" aria-hidden="true"></div>
        <span className="ms-2">Loading post...</span>
      </div>
    );

  if (!post)
    return (
      <div className="container text-center mt-5">
        <h4>Post not found</h4>
        <Link to="/" className="btn btn-secondary mt-3">
          Back to Home
        </Link>
      </div>
    );

  return (
    <div className="post-detail container mt-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title">{post.title}</h2>
          <p className="card-subtitle mb-2 text-muted">
            <strong>Author:</strong> {post.author || post.username || 'Unknown'}
          </p>
          <hr />
          <p className="card-text">{post.content}</p>
          <Link to="/" className="btn btn-primary mt-3">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { fetchPosts, deletePost, fetchUserPosts } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import PostCard from '../components/PostCard';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    const getUserPosts = async () => {
      try {
        const data = await fetchPosts();
        console.log(data);
        setPosts(data);
        
      } catch (error) {
        console.error('Error fetching user posts:', error);
      } finally {
        setLoading(false);
      }
    };
    if (user?.id) {
      getUserPosts();
    }
  }, [user?.id]);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status" aria-hidden="true"></div>
        <span className="ms-2">Loading your posts...</span>
      </div>
    );

  return (
    <div className="dashboard container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4 dashboard-header">
        <h2>Your Dashboard</h2>
        <Link to="/create-post" className="btn btn-primary">
          Create New Post
        </Link>
      </div>
      <div className="posts-list row gy-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard post={post} key={post.id} isAuthor={true} showActions={true} onDelete={(id) => {
              deletePost(id); 
              setPosts(posts.filter(postItem => postItem.id !== id));
            }} />
          ))
        ) : (
          <div className="no-posts text-center w-100 py-5">
            <p className="mb-3 fs-5">You haven't created any posts yet.</p>
            <Link to="/create-post" className="btn btn-primary">
              Create your first post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useState, useEffect, useContext } from 'react';
import '../styles/Home.css'; // Import your CSS file for styling
import PostCard from '../components/PostCard';
import { fetchPosts, deletePost, fetchUserPosts } from '../services/api';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
      const getUserPosts = async () => {
        try {
          const data = await fetchPosts();
          console.log(data);
          setSearchResults(data);
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

  const handleSearchChange = async (e) => {
    setSearchTerm(e.target.value);
    if(e.target.value === '') {
      setSearchResults(await fetchPosts());
      return;
    }
    const filteredPosts = searchResults.filter((post) =>
      post.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchResults(filteredPosts);
  };
  return (
    <div className="home-container text-center py-5">
      <header className="mb-1">
        <h2 className="display-6">Welcome to the Blogging Platform</h2>
      </header>

      <form
        className="d-flex justify-content-center mb-5"
        role="search"
      >
        <input
          type="search"
          className="form-control form-control-lg search-input"
          placeholder="Filter posts by title..."
          value={searchTerm}
          onChange={handleSearchChange}
          aria-label="Search posts"
        />
      </form>

      <main className="container">
        <div className="posts-list row">
        {(
          searchResults.map((post) => (
            <PostCard post={post} key={post.id} isAuthor={true} showActions={true} onDelete={(id) => {
              deletePost(id); 
              setSearchResults(searchResults.filter(postItem => postItem.id !== id));
            }} />
          ))
        )}
      </div>
      </main>
    </div>
  );
};

export default Home;

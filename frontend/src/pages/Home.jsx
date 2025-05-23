import React, { useState } from 'react';
import '../styles/Home.css'; // Import your CSS file for styling

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
    // Add logic to handle search functionality
  };

  return (
    <div className="home-container text-center py-5">
      <header className="mb-4">
        <h1 className="display-4">Welcome to the Blogging Platform</h1>
      </header>

      <form
        onSubmit={handleSearchSubmit}
        className="d-flex justify-content-center mb-5"
        role="search"
      >
        <input
          type="search"
          className="form-control form-control-lg search-input"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={handleSearchChange}
          aria-label="Search posts"
        />
        <button type="submit" className="btn btn-primary btn-lg ms-3">
          Search
        </button>
      </form>

      <main>
        <p className="lead">Here is where the blog posts will be displayed.</p>
        {/* Add logic to display blog posts */}
      </main>
    </div>
  );
};

export default Home;

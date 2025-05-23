import React, { useState } from 'react';
import '../styles/Newpost.css'; // Import your CSS file for styling

const NewPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = { title, content };

    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('You must be logged in to create a post.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:3000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setMessage(errorData.message || 'Failed to create post');
      } else {
        setMessage('Post created successfully!');
        setTitle('');
        setContent('');
      }
    } catch {
      setMessage('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="newpost-container container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-7 col-sm-10 col-12">
          <h2 className="mb-4 text-center">Create a New Post</h2>
          {message && (
            <div
              className={`alert ${
                message.includes('success') ? 'alert-success' : 'alert-danger'
              }`}
              role="alert"
            >
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit} className="newpost-form">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title:
              </label>
              <input
                type="text"
                id="title"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Enter post title"
                disabled={loading}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="content" className="form-label">
                Content:
              </label>
              <textarea
                id="content"
                className="form-control"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="6"
                required
                placeholder="Write your post content here..."
                disabled={loading}
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Post'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPost;

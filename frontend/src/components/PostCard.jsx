import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post, isAuthor = false, showActions = false, onDelete }) => {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text text-truncate" style={{ maxHeight: '4.5em' }}>
          {post.content}
        </p>
        <p className="card-text">
          <small className="text-muted">By {post.author || post.username || 'Unknown'}</small>
        </p>
        <Link to={`/posts/${post.id}`} className="btn btn-primary btn-sm me-2">
          Read More
        </Link>
        {showActions && (
          <>
            <Link to={`/edit-post/${post.id}`} className="btn btn-warning btn-sm me-2">
              Edit
            </Link>
            <button className="btn btn-danger btn-sm" onClick={() => onDelete(post.id)}>
              Delete
            </button>
          </>
        )}
        {isAuthor && !showActions && (
          <span className="badge bg-info text-dark">Your Post</span>
        )}
      </div>
    </div>
  );
};

export default PostCard;

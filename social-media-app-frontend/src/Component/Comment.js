import React, { useState, useEffect } from 'react';
import axios from '../api'; // Import your Axios instance
import Navbar from './Navbar';

function Comment({ postId }) {
  const [comments, setComments] = useState([]); // State to hold the comments data

  useEffect(() => {
    fetchComments(); // Fetch comments data when the component mounts
  }, [postId]);

  const fetchComments = async () => {
    try {
      const response = await axios.post(`/posts/${postId}/:id/comment`,
      {
      headers: {
        'Content-type': 'application/json'
      }}); 
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  return (
    <div>
        <Navbar/>
      {comments.map((comment) => (
        <div key={comment._id} className="comment">
          <div className="comment-header">
            <img className="profile-image" src={comment.author.profileImage} alt={comment.author.username} />
            <div className="comment-author">{comment.author.username}</div>
          </div>
          <div className="comment-content">{comment.content}</div>
        </div>
      ))}
    </div>
  );
}

// CSS Styles (same as before)
const commentStyles = `
.comment {
    margin-top: 10px;
    padding: 10px;
    background-color: #f9f9f9;
    border-radius: 5px;
    border: 1px solid #ddd;
  }
  
  .comment-header {
    display: flex;
    align-items: center;
  }
  
  .profile-image {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
  }
  
  .comment-author {
    font-size: 0.9rem;
    color: #555;
  }
  
  .comment-content {
    font-size: 1rem;
    margin-top: 5px;
    color: #333;
  }
`;

// Create a style element and append the CSS to the head (same as before)
const styleElement = document.createElement('style');
styleElement.innerHTML = commentStyles;
document.head.appendChild(styleElement);

export default Comment;

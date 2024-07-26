import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const LikeButton = ({ hasLiked, onLikeToggle, likesCount }) => {
  return (
    <>
    <button
      className={`flex items-center p-3 mt-10 rounded-full ${hasLiked ? 'bg-red-500 text-white' : 'bg-gray-300'}`}
      onClick={onLikeToggle}
    >
      {hasLiked ? <FaHeart /> : <FaRegHeart />} 
      <span className="ml-2">{likesCount}</span>
    </button>

    </>
    
  );
};

export default LikeButton;

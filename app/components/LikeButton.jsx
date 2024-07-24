import React from 'react';

const LikeButton = ({ hasLiked, onLikeToggle, likesCount }) => {
  return (
    <button
      className={`p-2 text-[23px] mt-10 rounded-full ${hasLiked ? 'bg-red-500 text-white' : 'bg-gray-300'}`}
      onClick={onLikeToggle}
    >
      {hasLiked ? 'Unlike' : 'Like'} ({likesCount})
    </button>
  );
};

export default LikeButton;

import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Button } from "@nextui-org/react";

const LikeButton = ({ hasLiked, onLikeToggle, likesCount }) => {
  return (
    <>
    <Button isIconOnly radius='lg'size='lg'
      className={`flex items-center p-3 mr-3 ${hasLiked ? 'bg-red-500 text-white' : 'bg-gray-300'}`}
      onClick={onLikeToggle}
    >
      {hasLiked ? <FaHeart /> : <FaRegHeart />} 
    </Button>

    </>
    
  );
};

export default LikeButton;

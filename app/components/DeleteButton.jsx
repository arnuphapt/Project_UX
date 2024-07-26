import React from 'react';

const DeleteButton = ({ onDelete }) => {
  const handleDeleteClick = () => {
    const confirmed = window.confirm("Are you sure you want to delete this post?");
    if (confirmed) {
      onDelete();
    }
  };

  return (
    <button
      className='p-2 bg-red-500 text-white px-5 text-[23px] mt-10 rounded-full hover:scale-105 transition-all'
      onClick={handleDeleteClick}
    >
      Delete
    </button>
  );
};

export default DeleteButton;

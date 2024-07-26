import React, { useState } from 'react';
import Image from 'next/image';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import LikeButton from './LikeButton'; // Import the LikeButton component

function CommentSection({
  comments,
  handleCommentSubmit,
  newComment,
  setNewComment,
  handleCommentDelete,
  handleCommentEdit,
  userEmail,
  hasLiked,       // Receive `hasLiked` prop
  onLikeToggle,   // Receive `onLikeToggle` prop
  likesCount,     // Receive `likesCount` prop
}) {
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentText, setEditedCommentText] = useState('');
  const [areCommentsVisible, setAreCommentsVisible] = useState(true);

  const startEditing = (commentId, currentText) => {
    setEditingCommentId(commentId);
    setEditedCommentText(currentText);
  };

  const handleEditSubmit = async (event, commentId) => {
    event.preventDefault();
    if (editedCommentText.trim() === '') return;

    await handleCommentEdit(commentId, editedCommentText);
    setEditingCommentId(null);
    setEditedCommentText('');
  };

  const toggleAllComments = () => {
    setAreCommentsVisible(prevState => !prevState);
  };

  return (
    <div className='mt-8 relative'>
      <form onSubmit={handleCommentSubmit} className='mb-6 flex items-center'>
        <LikeButton
          hasLiked={hasLiked}
          onLikeToggle={onLikeToggle}
          likesCount={likesCount}
        />
        <div className='relative flex-grow'>
          <input
            type='text'
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder='Add a comment...'
            className='w-full p-4 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all pr-14' // Add padding-right to make space for button
          />
        </div>
      </form>

      <div className='flex items-center justify-between mb-4 text-gray-700'>
        <span className='font-semibold text-lg'>{comments.length} Comments</span>
        {comments.length > 0 && (
          <button
            onClick={toggleAllComments}
            className='p-3 text-black rounded-full transition-all flex items-center gap-2'
          >
            {areCommentsVisible ? (
              <>
                <AiOutlineUp /> Hide Comments
              </>
            ) : (
              <>
                <AiOutlineDown /> Show Comments
              </>
            )}
          </button>
        )}
      </div>

      {areCommentsVisible && (
        <div className='mt-6'>
          {comments.map((comment) => (
            <div key={comment.id} className='border-b py-4 flex items-start gap-4'>
              {comment.userImage && (
                <Image
                  src={comment.userImage}
                  alt='User Avatar'
                  width={40}
                  height={40}
                  className='rounded-full'
                />
              )}
              <div className='flex flex-col w-full'>
                {editingCommentId === comment.id ? (
                  <form onSubmit={(e) => handleEditSubmit(e, comment.id)} className='flex flex-col'>
                    <input
                      type='text'
                      value={editedCommentText}
                      onChange={(e) => setEditedCommentText(e.target.value)}
                      className='w-full p-3 border border-gray-300 rounded-lg shadow-sm mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
                    />
                    <div className='flex gap-2'>
                      <button
                        type='submit'
                        className='p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all'
                      >
                        Save
                      </button>
                      <button
                        type='button'
                        onClick={() => setEditingCommentId(null)}
                        className='p-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-all'
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className='font-semibold text-lg'>{comment.userName}</div>
                    <p className='text-gray-800'>{comment.text}</p>
                    <span className='text-gray-500 text-sm'>{new Date(comment.timestamp?.toDate()).toLocaleString()}</span>
                    {userEmail === comment.userEmail && (
                      <div className='flex gap-2 mt-2'>
                        <button
                          onClick={() => startEditing(comment.id, comment.text)}
                          className='text-blue-500 text-sm hover:underline'
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleCommentDelete(comment.id)}
                          className='text-red-500 text-sm hover:underline'
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentSection;

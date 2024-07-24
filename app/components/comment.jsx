import React, { useState } from 'react';
import Image from 'next/image';

function CommentSection({ comments, handleCommentSubmit, newComment, setNewComment, handleCommentDelete, handleCommentEdit, userEmail }) {
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentText, setEditedCommentText] = useState('');

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

  return (
    <div className='mt-10 relative'>
      <form onSubmit={handleCommentSubmit} className='mb-5'>
        <div className='relative'>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder='Add a comment...'
            className='w-full p-2 border rounded-md pr-16'
            rows='3'
          />
          <button
            type='submit'
            className='absolute right-2 top-2 p-2 bg-blue-500 text-white rounded-full hover:scale-105 transition-all'
          >
            Send
          </button>
        </div>
      </form>

      <div className='mt-5'>
        {comments.map((comment) => (
          <div key={comment.id} className='border-b py-2 flex items-start gap-3'>
            {comment.userImage && (
              <Image
                src={comment.userImage}
                alt='userImage'
                width={45}
                height={45}
                className='rounded-full'
              />
            )}
            <div className='flex flex-col'>
              {editingCommentId === comment.id ? (
                <form onSubmit={(e) => handleEditSubmit(e, comment.id)} className='flex flex-col'>
                  <textarea
                    value={editedCommentText}
                    onChange={(e) => setEditedCommentText(e.target.value)}
                    className='w-full p-2 border rounded-md mb-2'
                    rows='3'
                  />
                  <div className='flex gap-2'>
                    <button
                      type='submit'
                      className='p-2 bg-blue-500 text-white rounded-full hover:scale-105 transition-all'
                    >
                      Save
                    </button>
                    <button
                      type='button'
                      onClick={() => setEditingCommentId(null)}
                      className='p-2 bg-gray-500 text-white rounded-full hover:scale-105 transition-all'
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className='font-semibold'>{comment.userName}</div>
                  <p>{comment.text}</p>
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
    </div>
  );
}

export default CommentSection;

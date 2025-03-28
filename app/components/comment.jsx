import React, { useState } from 'react';
import Image from "next/image";
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import LikeButton from './LikeButton';
import { Input, Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu } from "@heroui/react";
import { IoIosMore } from "react-icons/io";

function CommentSection({
  comments,
  handleCommentSubmit,
  newComment,
  setNewComment,
  handleCommentDelete,
  handleCommentEdit,
  userEmail,
  hasLiked,
  onLikeToggle,
  likesCount,
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
    <div className='mt-5 relative'>
      <div className='mb-6 flex items-center'>
        <LikeButton
          hasLiked={hasLiked}
          onLikeToggle={onLikeToggle}
          likesCount={likesCount}
        />
        <form onSubmit={handleCommentSubmit} className='relative flex-grow'>
          <Input
            type='text'
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            label='Add a comment...'
            variant='bordered'
            radius='full'
            size='md'
          />
        </form>
      </div>

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
        <div className='mt-4'>
          {comments
            .sort((a, b) => b.timestamp.toDate() - a.timestamp.toDate())
            .map((comment) => (
              <div key={comment.id} className='border-b py-4 flex items-start gap-4'>
                {comment.userImage && (
                  <Image
                    src={comment.userImage}
                    alt='User Avatar'
                    width={40}
                    height={40}
                    className='rounded-full'
                    style={{
                      maxWidth: "100%",
                      height: "auto"
                    }} />
                )}
                <div className='flex flex-col w-full'>
                  {editingCommentId === comment.id ? (
                    <form onSubmit={(e) => handleEditSubmit(e, comment.id)} className='flex flex-col' >
                                               <div className='flex flex-col'>
                          <span className='font-semibold text-lg'>
                            {comment.userName}
                          </span>
                        </div>

                      <Input
                        type='text'
                        value={editedCommentText}
                        onChange={(e) => setEditedCommentText(e.target.value)}
                        size='lg'
                        variant='underlined'
                        radius='full'
                        placeholder='Edit a comment...'
                      />
                                            <span className='text-gray-500 text-sm mt-1'>{new Date(comment.timestamp?.toDate()).toLocaleString('th-TH', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                      })}</span>
                      <div className='flex gap-2 mt-4'>
                        <Button
                          type='submit'
                          className='p-2 bg-blue-500 text-white'
                        >
                          Save
                        </Button>
                        <Button
                          type='button'
                          onPress={() => setEditingCommentId(null)}
                          className='p-2 bg-gray-500 text-white'
                        >
                          Cancel
                        </Button>
                        
                      </div>
                      
                    </form>
                  ) : (
                    <>
                      <div className='flex flex-row items-start justify-between' >
                        <div className='flex flex-col'>
                          <span className='font-semibold text-lg'>
                            {comment.userName}
                          </span>
                          <span className='text-gray-800 mt-1'>{comment.text}</span>
                        </div>
                        {userEmail === comment.userEmail && (
                          <Dropdown>
                            <DropdownTrigger>
                              <Button variant="light" isIconOnly size='lg' className='text-[25px]' aria-label="Button for manage post">
                                <IoIosMore />
                              </Button>
                            </DropdownTrigger>
                            <DropdownMenu variant="flat" aria-label="Dropdown menu with shortcut"> 
                              <DropdownItem onPress={() => startEditing(comment.id, comment.text)}  description="Allow you to Edit the comment">
                                Edit
                              </DropdownItem>
                              <DropdownItem onPress={() => handleCommentDelete(comment.id)} key="delete" className="text-danger" color="danger" description="Permanently delete the comment">
                                Delete
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        )}
                      </div>

                      <span className='text-gray-500 text-sm mt-1'>{new Date(comment.timestamp?.toDate()).toLocaleString('th-TH', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                      })}</span>
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

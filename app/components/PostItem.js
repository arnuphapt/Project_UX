import Image from 'next/image';
import React from 'react';

const PLACEHOLDER = './Images/placeholder.jpg';

function PostItem({ post, modal = false }) {
  return (
    <div className="cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out bg-sky-50 p-2 rounded-3xl hover:bg-sky-200">
      <div className="relative w-full h-40 overflow-hidden rounded-3xl">
        <Image
          src={post.image || PLACEHOLDER}
          alt={post.title || 'banner'}
          className="rounded-3xl"
          fill
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
      </div>
      {post.title && (
        <h2 className="font-bold text-[18px] mb-1 mt-2 line-clamp-2">
          {post.title}
        </h2>
      )}
      {post.viewCount !== undefined && (
        <div className="mt-2 text-sm text-gray-600">
          <span>Views: {post.viewCount}</span>
        </div>
      )}
      {post.likes !== undefined && (
        <div className="mt-2 text-sm text-gray-600">
          <span>Likes: {post.likes.length}</span>
        </div>
      )}
    </div>
  );
}

export default PostItem;

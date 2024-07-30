import React from 'react';
import UserTag from '../UserTag';
import { useRouter } from 'next/navigation';
import { GrView } from 'react-icons/gr'; // Importing the GrView icon
import { IoHeart } from "react-icons/io5";
import { AiOutlineComment } from 'react-icons/ai'; // Import the Comment icon

const PLACEHOLDER = '/Images/placeholder.jpg';

function PinItem({ pin }) {
  const router = useRouter();
  const user = {
    name: pin?.userName,
    image: pin?.userImage,
  };

  return (
    <div
      className="cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out bg-sky-50 p-2 rounded-3xl hover:bg-sky-200"
      onClick={() => router.push("/pin/" + pin.id)}
    >
      <div className="relative w-full h-60 overflow-hidden rounded-3xl">
        <img
          src={pin.image ? pin.image : PLACEHOLDER}
          alt={pin.title}
          className="rounded-3xl w-full h-full object-cover"
        />
      </div>
      <h2 className="font-bold text-[18px] mb-1 ml-2 mt-4 line-clamp-2">{pin.title}</h2>
      <UserTag user={user} />
      <div className='flex items-center mb-4 mt-2'>
        {pin.viewCount !== undefined && (
          <div className="mt-2 ml-2 text-sm text-gray-600 flex items-center">
            <GrView className="mr-1" /> {/* Icon added here */}
            <span>{pin.viewCount}</span>
          </div>
        )}
        {pin.likes !== undefined && (
          <div className="mt-2 ml-4 text-sm text-gray-600 flex items-center">
            <IoHeart className="mr-1" /> {/* Icon added here */}
            <span>{pin.likes.length}</span>
          </div>
        )}
        {pin.commentCount !== undefined && (
          <div className="mt-2 ml-4 text-sm text-gray-600 flex items-center">
            <AiOutlineComment className="mr-1" /> {/* Comment icon added here */}
            <span>{pin.commentCount}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default PinItem;

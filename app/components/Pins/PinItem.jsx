import React, { useState, useEffect } from 'react';
import UserTag from '../UserTag';
import { useRouter } from 'next/navigation';
import { GrView } from 'react-icons/gr';
import { IoHeart } from 'react-icons/io5';
import { AiOutlineComment } from 'react-icons/ai';
import { Skeleton } from '@nextui-org/react';

const PLACEHOLDER = '/Images/placeholder.jpg';

function PinItem({ pin }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Simulate loading delay for demonstration
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // 1 second delay
    return () => clearTimeout(timer);
  }, []);

  const user = {
    name: pin?.userName,
    image: pin?.userImage,
  };

  return (
    <div
      className="cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out bg-sky-50 p-2 rounded-3xl hover:bg-sky-200"
      onClick={() => router.push("/pin/" + pin.id)}
    >
      <div className="relative w-full h-40 overflow-hidden rounded-3xl">
        {loading ? (
          <Skeleton className="w-full h-full rounded-3xl" />
        ) : (
          <img
            src={pin.image ? pin.image : PLACEHOLDER}
            alt={pin.title}
            className="rounded-3xl w-full h-full object-cover"
          />
        )}
      </div>
      <div className="mt-2">
        {loading ? (
          <Skeleton className="w-full h-6 rounded-md mb-2" />
        ) : (
          <h2 className="font-bold text-[18px] mb-1 ml-2 mt-4 line-clamp-2">{pin.title}</h2>
        )}
        {loading ? (
          <Skeleton className="w-24 h-4 rounded-md mb-4" />
        ) : (
          <UserTag user={user} />
        )}
        <div className='flex items-center mb-4 mt-2'>
          {loading ? (
            <>
              <Skeleton className="w-12 h-4 rounded-md mr-2" />
              <Skeleton className="w-12 h-4 rounded-md mr-4" />
              <Skeleton className="w-12 h-4 rounded-md" />
            </>
          ) : (
            <>
              {pin.viewCount !== undefined && (
                <div className="mt-2 ml-2 text-sm text-gray-600 flex items-center">
                  <GrView className="mr-1" />
                  <span>{pin.viewCount}</span>
                </div>
              )}
              {pin.likes !== undefined && (
                <div className="mt-2 ml-4 text-sm text-gray-600 flex items-center">
                  <IoHeart className="mr-1" />
                  <span>{pin.likes.length}</span>
                </div>
              )}
              {pin.commentCount !== undefined && (
                <div className="mt-2 ml-4 text-sm text-gray-600 flex items-center">
                  <AiOutlineComment className="mr-1" />
                  <span>{pin.commentCount}</span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default PinItem;

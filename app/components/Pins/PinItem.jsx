import Image from 'next/image';
import React from 'react';
import UserTag from '../UserTag';
import { useRouter } from 'next/navigation';

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
      <div className="relative w-full h-40 overflow-hidden rounded-3xl">
        <Image
          src={pin.image}
          alt={pin.title}
          layout="fill" // Fill the container
          objectFit="cover" // Cover the container while preserving aspect ratio
          className="rounded-3xl"
        />
      </div>
      <h2 className="font-bold text-[18px] mb-1 mt-2 line-clamp-2">{pin.title}</h2>
      <UserTag user={user} />
      {pin.viewCount !== undefined && (
        <div className="mt-2 text-sm text-gray-600">
          <span>Views: {pin.viewCount}</span>
        </div>
      )}
      {/* Display the likes count */}
      {pin.likes !== undefined && (
        <div className="mt-2 text-sm text-gray-600">
          <span>Likes: {pin.likes.length}</span>
        </div>
      )}
    </div>
  );
}

export default PinItem;

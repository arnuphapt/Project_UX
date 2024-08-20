import React from 'react';
import LikedPosts from '../Pins/Likepost';
import PinItem from '../Pins/PinItem';

function Pin({ listOfPins, userInfo }) {
  return (
    <div className="mt-7 px-5">
      <h2 className="text-2xl font-bold mb-4">{userInfo.userName}'s Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {listOfPins.map((item, index) => (
          <PinItem key={index} pin={item} />
        ))}
      </div>
      {/* Display liked posts */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">{userInfo.userName}'s Liked Posts</h2>
        <LikedPosts userEmail={userInfo.email} />
      </div>
    </div>
  );
}

export default Pin;

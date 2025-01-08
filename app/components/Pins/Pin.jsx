import React from 'react';
import PostItem from '../Pins/PostItem';

function Pin({ listOfPins, userInfo }) {
  return (
    <div className="mt-7 px-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {listOfPins.map((item, index) => (
          <PostItem key={index} pin={item} />
        ))}
      </div>

    </div>
  );
}

export default Pin;

import Image from 'next/image';
import React from 'react';
const PLACEHOLDER = '/Images/placeholder.jpg';

function PinImage({ pinDetail }) {
  const imageUrl = pinDetail.image || PLACEHOLDER;

  return (
    <div>
      <Image
        src={imageUrl}
        alt={pinDetail.title}
        width={600}
        height={600}
        className='rounded-2xl'
        style={{
          maxWidth: "100%",
          height: "auto"
        }}
      />
    </div>
  );
}

export default PinImage;

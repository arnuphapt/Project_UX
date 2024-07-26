import React from 'react';
const PLACEHOLDER = '/Images/placeholder.jpg';

function PinImage({ pinDetail }) {

  return (
    <div>
      <img
        src={pinDetail.image?pinDetail.image:PLACEHOLDER}
        alt={pinDetail.title}
        width={500}
        height={500}
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

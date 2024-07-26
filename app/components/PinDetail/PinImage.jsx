import Image from "next/image"
import React from 'react'

function PinImage({pinDetail}) {

  return (
    <div>
      <Image
        src={pinDetail.image}
        alt={pinDetail.title}
        width={600}
        height={600}
        className='rounded-2xl'
        style={{
          maxWidth: "100%",
          height: "auto"
        }} />

    </div>
  );
}

export default PinImage
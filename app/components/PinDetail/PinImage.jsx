import Image from "next/legacy/image"
import React from 'react'

function PinImage({pinDetail}) {

  return (
    <div>
      <Image src={pinDetail.image}
      alt={pinDetail.title}
      width={600}
      height={600}
    
      className='rounded-2xl'
      />

    </div>
  )
}

export default PinImage
import React from 'react'
import Image from 'next/image'

const PLACEHOLDER = './Images/placeholder.jpg';

function PostItem({ post, modal = false }) {
  return (
    <>
      <Image
        src={post.image || PLACEHOLDER}
        alt="banner"
        width={600} // specify the width of the image
        height={180} // specify the height of the image
        className="rounded-t-lg w-full h-[180px] object-cover"
        style={{
          maxWidth: "100%",
          height: "auto"
        }}
      />
    </>
  )
}

export default PostItem;

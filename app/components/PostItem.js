import React from 'react'
import { HiOutlineLocationMarker,HiOutlineCalendar } from "react-icons/hi";
import UserInfo from './UserInfo';
const PLACEHOLDER='./Images/placeholder.jpg'
function PostItem({post,modal=false}) {
  return (
   <>

    
        <img className="rounded-t-lg 
        w-full h-[180px] object-cover" 
        src={post.image?post.image:PLACEHOLDER}
         alt="banner" />
   

</> 
  )
}

export default PostItem
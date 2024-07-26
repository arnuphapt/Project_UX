import React from 'react'
import { HiOutlineLocationMarker,HiOutlineCalendar } from "react-icons/hi";
import UserInfo from './UserInfo';
const PLACEHOLDER='./Images/placeholder.jpg'
function PostItem({post,modal=false}) {
  return (
   <>
{post?
  <div className="max-w-sm bg-white border
 border-gray-200 rounded-lg shadow cursor-pointer
  dark:bg-gray-800 dark:border-gray-700 ">
    
        <img className="rounded-t-lg 
        w-full h-[180px] object-cover" 
        src={post.image?post.image:PLACEHOLDER}
         alt="banner" />
   
    <div className="p-5">
       
    <h5 className="mb-2 text-xl 
    font-bold tracking-tight 
    text-gray-900 dark:text-white">
      {post.title}
      </h5>
      <div className='flex items-center text-orange-500 gap-2 mb-2'>
        <HiOutlineCalendar className='text-[20px]'/>
        {post.date}
      </div>
      <div className='flex items-center 
      text-blue-500 gap-2 mb-2'>
        <HiOutlineLocationMarker className='text-[20px]'/>
        {post.location}
      </div>
        <p className="mb-3 font-normal
         text-gray-700 
         dark:text-gray-400">
          {post.desc}</p>

      {!modal? <UserInfo user={post} />:null}

    </div>
</div>:null}
</> 
  )
}

export default PostItem
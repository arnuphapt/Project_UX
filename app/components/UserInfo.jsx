import Image from "next/image";
import React from 'react'
import { signOut,useSession } from "next-auth/react"
import { useRouter } from 'next/navigation';
import {  Button} from "@nextui-org/react";

function UserInfo({userInfo}) {
    console.log(userInfo);
    const router=useRouter();
    const {data:session}=useSession()
    const handleLogout = () => {
      if (window.confirm("Are you sure you want to log out?")) {
        signOut();
      }
    }
  return (
    <div className='flex flex-col items-center'>
        <Image
          src={userInfo.userImage}
          alt='userImage'
          width={100}
          height={100}
          className='rounded-full'
          style={{
            maxWidth: "100%",
            height: "auto"
          }} />

        <h2 className='text-[30px]
        font-semibold'>{userInfo.userName}</h2>
        <h2 className='text-gray-400'>{userInfo.email}</h2>
        <div className='flex gap-4'>
        <Button className='bg-gray-200
         p-2 px-3 font-semibold mt-5 rounded-full'>Edit</Button>
        {session?.user.email== userInfo.email? <Button className='bg-gray-200
         p-2 px-3 font-semibold mt-5 rounded-full'
         onClick={()=>handleLogout()}>Logout</Button>:null}
      </div>
    </div>
  );
}

export default UserInfo
"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
import Image from "next/image";

function UserTag({ user }) {
  const router = useRouter();

  const navigateToProfile = () => {
    if (user?.email) {
      router.push(`/users/${user.email}`);
    }
  };

  return (
    <div className=''>
      {user ? (
        <div
          className='flex gap-3 items-center cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-all duration-200 max-w-[250px]'
          onClick={navigateToProfile}
        >
          <Image
            src={user.image}
            alt='userImage'
            width={45}
            height={45}
            className='rounded-full'
            style={{
              maxWidth: "100%",
              height: "auto"
            }} />
          <div className='flex flex-col overflow-hidden'>
            <h2 className='text-[14px] font-medium truncate'>{user.name}</h2>
            <h2 className='text-[12px] truncate'>{user.studentId || user.email}</h2> {/* แสดง studentId ถ้ามี, ไม่งั้นแสดง email */}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default UserTag;
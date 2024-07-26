"use client"
import Image from "next/image"
import React, { useEffect } from 'react'
import { HiSearch } from "react-icons/hi";
import { useSession, signIn, signOut } from "next-auth/react"
import { doc, getFirestore, setDoc } from "firebase/firestore";
import app from '../Shared/firebaseConfig'
import { useRouter } from 'next/navigation';
import { IoIosLogOut } from "react-icons/io";

function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const db = getFirestore(app);

  useEffect(() => {
    saveUserInfo();
  }, [session]);

  const saveUserInfo = async () => {
    if (session?.user) {
      await setDoc(doc(db, "user", session.user.email), {
        userName: session.user.name,
        email: session.user.email,
        userImage: session.user.image
      });
    }
  }

  const onCreateClick = () => {
    if (session) {
      router.push('/pin-builder');
    } else {
      signIn();
    }
  }

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      signOut();
    }
  }

  return (
    <div className='flex gap-3 md:gap-2 shadow-md items-center p-6 '>
      {/* logo */}
      <Image
        src='/image.png'
        alt='logo'
        width={150}
        height={150}
        className='hover:bg-gray-300 p-2 
        rounded-full cursor-pointer'
        onClick={() => router.push('/')}
        style={{
          maxWidth: "100%",
          height: "auto"
        }} />
      {/* home */}
      <button className='bg-black 
        text-white p-2 px-4 rounded-full'
        onClick={() => router.push('/')}>Home</button>
        {/* Learn */}
      <button className='bg-black 
        text-white p-2 px-4 rounded-full'
        onClick={() => router.push('/Learn')}>Learn</button>
        
      {/* Search */}
      <div className='bg-[#e9e9e9] p-3
        flex gap-3 items-center rounded-full w-full hidden md:flex'>
        <HiSearch className='text-[25px] text-gray-500' />
        <input type="text" placeholder="Search"
          className='bg-transparent outline-none' />
      </div>
      {/* Create */}
      <button className='font-semibold mx-2 p-2 px-4 rounded-full bg-blue-800 text-white'
        onClick={() => onCreateClick()}>Create</button>
      {/* User profile */}
      {session?.user ? <Image
        src={session.user.image}
        onClick={() => router.push('/' + session.user.email)}
        alt='user-image'
        width={60}
        height={60}
        className='hover:bg-gray-300 p-2
        rounded-full cursor-pointer'
        style={{
          maxWidth: "100%",
          height: "auto"
        }} /> :
        <button className='hover:bg-gray-300 font-semibold p-2 px-4 rounded-full'
          onClick={() => signIn()}>Login</button>}
      {/* Logout */}
      <button className='hover:bg-gray-300 font-semibold p-1 px-2 rounded-full flex items-center'
        onClick={handleLogout}>
        <IoIosLogOut className='text-[30px]' />
      </button>
    </div>
  );
}

export default Header;

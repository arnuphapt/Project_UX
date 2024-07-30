"use client";
import Image from "next/image";
import React, { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import app from '../Shared/firebaseConfig';
import { useRouter } from 'next/navigation';
import { IoIosLogOut } from "react-icons/io";
import { FaCirclePlus } from "react-icons/fa6";
import { FiMenu, FiX } from "react-icons/fi";

function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const db = getFirestore(app);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
  };

  const onCreateClick = () => {
    if (session) {
      router.push('/pin-builder');
    } else {
      signIn();
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      signOut();
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='relative'>
      <div className='flex justify-between items-center p-6 shadow-md'>
        <div className='flex items-center gap-3'>
          {/* Logo */}
          <Image
            src='/image.png'
            alt='logo'
            width={160}
            height={160}
            className='p-2 rounded-full cursor-pointer'
            onClick={() => router.push('/')}
            style={{ maxWidth: "100%", height: "auto" }} 
          />
        </div>
        <div className='flex items-center gap-3'>
          {/* Hamburger Menu Icon */}
          <button onClick={toggleMenu} className="md:hidden">
            {isMenuOpen ? <FiX className='text-[30px]' /> : <FiMenu className='text-[30px]' />}
          </button>
          <div className='hidden md:flex items-center gap-3'>
            <button className='font-semibold text-[16px] text-black m-2 p-1 hover:border-b-2 border-black' onClick={() => router.push('/')}>Home</button>
            <button className='font-semibold text-[16px] text-black m-2 p-1 hover:border-b-2 border-black' onClick={() => router.push('/Learn')}>Learn</button>
            <button className='text-black mx-2 p-2 flex items-center' onClick={onCreateClick}>
              <FaCirclePlus className='text-[45px]' />
            </button>
            {session?.user ? (
              <Image
                src={session.user.image}
                onClick={() => router.push('/' + session.user.email)}
                alt='user-image'
                width={60}
                height={60}
                className='hover:bg-gray-300 p-2 rounded-full cursor-pointer'
                style={{ maxWidth: "100%", height: "auto" }} 
              />
            ) : (
              <button className='hover:bg-gray-300 font-semibold p-2 px-4 rounded-full' onClick={signIn}>Login</button>
            )}
            <button className='hover:bg-gray-300 font-semibold p-1 px-2 rounded-full flex items-center' onClick={handleLogout}>
              <IoIosLogOut className='text-[30px]' />
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Navigation Links */}
      <div className={`flex flex-col items-start items-center bg-white shadow-md ${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <button className='text-[16px] text-black m-2 p-1 hover:border-b-2 border-black' onClick={() => {router.push('/'); setIsMenuOpen(false);}}>Home</button>
        <button className='text-[16px] text-black m-2 p-1 hover:border-b-2 border-black' onClick={() => {router.push('/Learn'); setIsMenuOpen(false);}}>Learn</button>
        <button className='text-[16px] text-black m-2 p-1 hover:border-b-2 border-black' onClick={onCreateClick}>Create</button>
        {session?.user && (
          <button className='text-[16px] text-black m-2 p-1 hover:border-b-2 border-black' onClick={() => {router.push('/' + session.user.email); setIsMenuOpen(false);}}>Profile</button>
        )}
        {session?.user ? (
          <button className='text-[16px] text-black m-2 p-1 hover:border-b-2 border-black' onClick={handleLogout}>Logout</button>
        ) : (
          <button className='text-[16px] text-black m-2 p-1 hover:border-b-2 border-black' onClick={signIn}>Login</button>
        )}
      </div>
    </div>
  );
}

export default Header;

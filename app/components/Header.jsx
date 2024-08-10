"use client";
import Image from "next/image";
import React, { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import app from '../Shared/firebaseConfig';
import { useRouter } from 'next/navigation';
import { CiUser } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { FiMenu, FiX } from "react-icons/fi";
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react'

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
            className='p-2 cursor-pointer'
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
            <Dropdown>
              <DropdownTrigger>
                <Button variant='light' className='font-semibold text-[16px]'>Tools</Button>

              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem href="https://www.figma.com/" color="default">figma</DropdownItem>
                <DropdownItem href="https://www.wix.com/" color="default">wix</DropdownItem>
                <DropdownItem href="https://padlet.com/" color="default">padlet</DropdownItem>

              </DropdownMenu>
            </Dropdown>
            {/* Learn */}
            <Button variant='light' className='font-semibold text-[16px] ' onClick={() => router.push('/Learn')}>Learn</Button>
            <Button size="md" className="font-semibold bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg" onClick={onCreateClick}>
              Create Posts
            </Button>
            <Dropdown>
              <DropdownTrigger>
                {session?.user ? (
                  <Image
                    src={session.user.image}
                    alt='user-image'
                    width={60}
                    height={60}
                    className='hover:bg-gray-300 p-2 rounded-full cursor-pointer'
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                ) : (
                  <Button variant='light' className='font-semibold text-[16px] ' onClick={signIn}>Login</Button>
                )}
              </DropdownTrigger>
              <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
                <DropdownItem
                  description="User Proflie"
                  onClick={() => router.push('/' + session.user.email)}
                  showDivider
                  startContent={<CiUser className="text-[25px]"/>}
                >
                  Proflie
                </DropdownItem>
                <DropdownItem
                  className="text-danger"
                  color="danger"
                  description="Logout"
                  onClick={handleLogout}
                  startContent={<IoIosLogOut className="text-[25px]"/>}
                >
                  Log Out
                </DropdownItem>

              </DropdownMenu>
            </Dropdown>

          </div>
        </div>
      </div>
      {/* Responsive */}
      <div className={`flex flex-col items-start items-center bg-white shadow-md ${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <button className='text-[16px] text-black m-2 p-1 hover:border-b-2 border-black' onClick={() => { router.push('/'); setIsMenuOpen(false); }}>Home</button>
        <button className='text-[16px] text-black m-2 p-1 hover:border-b-2 border-black' onClick={() => { router.push('/Learn'); setIsMenuOpen(false); }}>Learn</button>
        <button className='text-[16px] text-black m-2 p-1 hover:border-b-2 border-black' onClick={onCreateClick}>Create</button>
        {session?.user && (
          <button className='text-[16px] text-black m-2 p-1 hover:border-b-2 border-black' onClick={() => { router.push('/' + session.user.email); setIsMenuOpen(false); }}>Profile</button>
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

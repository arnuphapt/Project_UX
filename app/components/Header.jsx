"use client";
import Image from "next/image";
import React, { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from '../Shared/firebaseConfig';
import { useRouter, usePathname } from 'next/navigation';
import { CiUser, CiEdit } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { FiMenu, FiX } from "react-icons/fi";
import { RiAdminLine } from "react-icons/ri";
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/react";
import { getAdminEmails } from '../utils/adminEmail';

function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const db = getFirestore(app);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [adminEmails, setAdminEmails] = useState([]);
  const pathname = usePathname();
  const isActive = (path) => pathname === path;
  const [loading, setLoading] = useState(false);

  const isAdmin = (email) => {
    if (!email || !adminEmails.length) return false;
    return adminEmails.includes(email);
  };

  useEffect(() => {
    const fetchAdminEmails = async () => {
      const emails = await getAdminEmails();
      setAdminEmails(emails);
    };

    fetchAdminEmails();
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
      router.push('/post-builder');
    } else {
      signIn();
    }
  };

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleLogoutConfirm = async () => {
    setLoading(true);
    try {
      await signOut();
    } finally {
      setLoading(false);
      setIsLogoutModalOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='relative'>
      <div className='flex justify-between items-center p-4 shadow-md'>
        <div className='flex items-center gap-3'>
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
          <button aria-label="Button toggle menu for responsive" className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <FiX className='text-[30px]' /> : <FiMenu className='text-[30px]' />}
          </button>
          <div className='hidden md:flex items-center gap-3'>

            <Button aria-label="Home button" variant='light' className={`font-semibold text-[16px] ${isActive('/') ? 'bg-primary/10 text-primary' : ''}`}
              onPress={() => router.push('/')}>Home</Button>
              <Button aria-label="Post button" variant='light' className={`font-semibold text-[16px] ${isActive('/post') ? 'bg-primary/10 text-primary' : ''}`}
              onPress={() => router.push('/post')}>Posts</Button>           
            <Button aria-label="Learn button" variant='light' className={`font-semibold text-[16px] ${isActive('/Learn') ? 'bg-primary/10 text-primary' : ''}`}
              onPress={() => router.push('/Learn')}>Learn</Button>
            <Dropdown>
              <DropdownTrigger>
                <Button variant='light' className='font-semibold text-[16px]' aria-label="Tools button">Tools</Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem href="https://www.figma.com/" color="default">figma</DropdownItem>
                <DropdownItem href="https://www.wix.com/" color="default">wix</DropdownItem>
                <DropdownItem href="https://padlet.com/" color="default">padlet</DropdownItem>
                <DropdownItem href="https://claude.ai/new" color="default">claude</DropdownItem>
                <DropdownItem href="https://miro.com/" color="default">miro</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Button size="md" className="font-semibold bg-gradient-to-tr from-cyan-500 to-blue-500 text-white shadow-lg" onPress={onCreateClick} aria-label="Create button">
              Create Posts
            </Button>
            <Dropdown>
              {session?.user ? (
                <DropdownTrigger>
                  <Image
                    src={session.user.image}
                    alt='user-image'
                    width={60}
                    height={60}
                    className={`hover:bg-gray-300 p-2 rounded-full cursor-pointer ${isActive('/users/' + session.user.email) ? 'bg-primary/10 text-primary' : ''}`}
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </DropdownTrigger>
              ) : (
                <Button variant='light' className='font-semibold text-[16px]' onPress={signIn} aria-label="Login button">
                  Login
                </Button>
              )}
              <DropdownMenu variant="flat" aria-label="Dropdown menu with description">
                <DropdownItem
                  description="User Profile"
                  onPress={() => router.push('/users/' + session.user.email)}
                  startContent={<CiUser className="text-[25px]" />}
                >
                  Profile
                </DropdownItem>
                <DropdownItem
                  description="Create Your Posts"
                  onPress={onCreateClick}
                  startContent={<CiEdit className="text-[25px]" />}
                >
                  Create Posts
                </DropdownItem>

                {session?.user && isAdmin(session.user.email) && (
                  <DropdownItem
                    description="Admin Dashboard"
                    onPress={() => router.push('/admin/dashboard')}
                    startContent={<RiAdminLine className="text-[25px]" />}
                    className="text-blue-600"
                    showDivider
                  >
                    Dashboard
                  </DropdownItem>
                )}

                <DropdownItem
                  className="text-danger"
                  color="danger"
                  description="Logout"
                  onPress={handleLogoutClick}
                  startContent={<IoIosLogOut className="text-[25px]" />}
                >
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`flex flex-col items-center bg-white shadow-md ${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <button className='text-[16px] text-black m-2 p-1 hover:border-b-2 border-black' onClick={() => { router.push('/'); setIsMenuOpen(false); }}>Home</button>
        <button className='text-[16px] text-black m-2 p-1 hover:border-b-2 border-black' onClick={() => { router.push('/post'); setIsMenuOpen(false); }}>Post</button>
        <button className='text-[16px] text-black m-2 p-1 hover:border-b-2 border-black' onClick={() => { router.push('/Learn'); setIsMenuOpen(false); }}>Learn</button>
        <button className='text-[16px] text-black m-2 p-1 hover:border-b-2 border-black' onClick={onCreateClick}>Create</button>
        {session?.user && (
          <button className='text-[16px] text-black m-2 p-1 hover:border-b-2 border-black' onClick={() => { router.push('/users/' + session.user.email); setIsMenuOpen(false); }}>Profile</button>
        )}
        {session?.user && isAdmin(session.user.email) && (
          <button
            className='text-[16px] text-blue-600 m-2 p-1 hover:border-b-2 border-blue-600 font-medium'
            onClick={() => { router.push('/admin'); setIsMenuOpen(false); }}
          >
            Dashboard
          </button>
        )}
        {session?.user ? (
          <button className='text-[16px] text-black m-2 p-1 hover:border-b-2 border-black' onClick={handleLogoutClick}>Logout</button>
        ) : (
          <button className='text-[16px] text-black m-2 p-1 hover:border-b-2 border-black' onClick={signIn}>Login</button>
        )}
      </div>

      {/* Logout Confirmation Modal */}
      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        placement="center"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Confirm Logout</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to log out?
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="light"
              onPress={() => setIsLogoutModalOpen(false)}
              aria-label="Cancel button"
              isDisabled={loading}
            >
              Cancel
            </Button>
            <Button
              color="danger"
              onPress={handleLogoutConfirm}
              aria-label="Logout button"
              isLoading={loading}
            >
              {loading ? 'Logging out...' : 'Logout'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Header;
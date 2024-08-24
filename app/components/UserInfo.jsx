import Image from "next/image";
import React, { useState, useEffect } from 'react';
import { signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Select, SelectItem } from "@nextui-org/react";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import app from '../Shared/firebaseConfig'; // Adjust path based on your project structure
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams } from 'next/navigation';
import { FaUser, FaEnvelope, FaIdCard } from 'react-icons/fa'; // Import React Icons

function UserInfo({ userInfo }) {
  const [isOpen, setIsOpen] = useState(false);
  const [studentId, setStudentId] = useState('');
  const [section, setSection] = useState('');
  const router = useRouter();
  const { data: session } = useSession();
  const db = getFirestore(app);
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const adminEmails = ['arnuphap.t@kkumail.com', 'urachartsc07@gmail.com','bassball389@gmail.com','natthawee.y@kkumail.com'];
  const isPostOwner = adminEmails.includes(session?.user?.email) || session?.user?.email === userInfo.email;

  useEffect(() => {
    fetchStudentInfo();
    if (searchParams.get('openModal') === 'true') {
      setIsOpen(true);
    }
  }, []);

  const fetchStudentInfo = async () => {
    try {
      const docRef = doc(db, 'student-info', userInfo.email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setStudentId(data.studentId);
        setSection(data.section);
      }
    } catch (error) {
      console.error("Error fetching student info: ", error);
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      signOut();
    }
  }

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleSave = async () => {
    setLoading(true);
    if (!studentId.trim() || !section) {
      toast.error('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const studentInfoData = {
        studentId: studentId,
        section: section,
        userName: userInfo.userName,
        email: userInfo.email
      };

      await setDoc(doc(db, 'student-info', userInfo.email), studentInfoData);
      toast.success('Student info updated successfully');
      setLoading(false);
      setStudentId(studentId);
      setSection(section);
      handleClose();
    } catch (error) {
      console.error("Error updating document: ", error);
      toast.error('An error occurred while saving');
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

      <h2 className='text-[30px] font-semibold' >{userInfo.userName}</h2>
      <h2 className='text-[18px] text-gray-400'>{userInfo.email}</h2>
      {studentId && (
        <h2 className='text-gray-400'>Student ID: {studentId}</h2>
      )}
      {section && (
        <h2 className='text-gray-400'>Section: {section}</h2>
      )}

      <div className='flex gap-4 mt-4'>
        {isPostOwner && (
          <Button className='bg-gray-200 p-2 px-3 font-semibold rounded-full' onClick={handleOpen}>
            {studentId ? 'Edit Profile' : 'Add Student Info'}
          </Button>
        )}

        {isPostOwner && (
          <Button className='bg-gray-200 p-2 px-3 font-semibold rounded-full' onClick={handleLogout}>Logout</Button>
        )}
      </div>

      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalContent>
          <ModalHeader>{studentId ? 'Edit' : 'Add'} Student Information</ModalHeader>
          <ModalBody>
            <div className="text-rose-600 flex justify-center">{studentId ? '' : '**Add Student information before create post**'}</div>
            <Input 
              type="text"
              size='lg'
              variant='underlined'
              label='Username' 
              value={userInfo.userName}
              isDisabled
              endContent={<FaUser />}
            />
            <Input 
              type="text"
              size='lg'
              variant='underlined'
              label='Email '  
              value={userInfo.email}
              isDisabled
              endContent={<FaEnvelope />}
            />
            <Input
              type="text"
              variant='underlined'
              size='lg'
              label='Student ID'
              placeholder="65XXXXXXX-X"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className='text-base md:text-lg lg:text-xl outline-none w-full pb-2 col-span-2'
              endContent={<FaIdCard />}
            />
            <Select
              size='lg'
              variant='underlined'
              label="Section"
              defaultSelectedKeys={section}
              onChange={(e) => setSection(e.target.value)}
            >
              <SelectItem key="1" value="1">1</SelectItem>
              <SelectItem key="2" value="2">2</SelectItem>
              <SelectItem key="3" value="3">3</SelectItem>
              <SelectItem key="4" value="4">4</SelectItem>
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onClick={handleClose}>
              Close
            </Button>
            <Button color="primary" onClick={handleSave} isLoading={loading}>
              { loading ? 'Loading...' : 'Save'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ToastContainer position="bottom-center" autoClose={3000} />
    </div>
  );
}

export default UserInfo;

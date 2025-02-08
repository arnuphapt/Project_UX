import React, { useState, useEffect } from 'react';
import { signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { 
  Button,
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  Input,
  Select,
  SelectItem,
  Badge,
  Avatar,
  Card,
  CardBody,
  Divider,
  Tooltip
} from "@heroui/react";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { app } from '../Shared/firebaseConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams } from 'next/navigation';
import { FaUser, FaEnvelope, FaIdCard, FaCheck, FaPencilAlt, FaSignOutAlt } from 'react-icons/fa';
import { getAdminEmails } from '../utils/adminEmail';

function UserInfo({ userInfo }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [studentId, setStudentId] = useState('');
  const [section, setSection] = useState('');
  const [infoLoading, setInfoLoading] = useState(true);
  const router = useRouter();
  const { data: session } = useSession();
  const db = getFirestore(app);
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [adminEmails, setAdminEmails] = useState([]);
  const [isPostOwner, setIsPostOwner] = useState(false);

  useEffect(() => {
    const loadAdminEmails = async () => {
      const emails = await getAdminEmails();
      setAdminEmails(emails);
    };
    loadAdminEmails();
  }, []);

  useEffect(() => {
    setIsPostOwner(
      adminEmails.includes(session?.user?.email) || 
      session?.user?.email === userInfo.email
    );
  }, [adminEmails, session?.user?.email, userInfo.email]);

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
    } finally {
      setInfoLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    signOut();
    setIsLogoutModalOpen(false);
  };

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
    <div className="w-full max-w-sm mx-auto p-4">
      <div className="py-6">
        <div className="flex flex-col items-center gap-5">
          {userInfo.studentId ? (
            <Badge
              isOneChar
              content={<FaCheck className="text-white"/>}
              color="success"
              placement="bottom-right"
            >
              <Avatar
                isBordered
                color="success"
                size="lg"
                src={userInfo.userImage}
                alt='userImage'
                className='rounded-full text-[60px] w-28 h-28 text-large'
              />
            </Badge>
          ) : ( 
            <Avatar
              size="lg"
              src={userInfo.userImage}
              alt='userImage'
              className='rounded-full text-[60px] w-24 h-24 text-large'
            />
          )}

          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">{userInfo.userName}</h2>
            <p className="text-default-500 text-lg">{userInfo.email}</p>
            
            {(studentId || section) && (
              <>
                <Divider className="my-4" />
                <div className="space-y-1">
                  {studentId && (
                    <p className="text-small text-default-500">
                      <span className="font-semibold">Student ID:</span> {studentId}
                    </p>
                  )}
                  {section && (
                    <p className="text-small text-default-500">
                      <span className="font-semibold">Section:</span> {section}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>

          <div className='flex gap-4 '>
            {isPostOwner && (
              <Button 
                className='bg-gray-200 p-2 px-3 font-semibold rounded-full' 
                onPress={handleOpen} 
                isDisabled={infoLoading}
              >
                {studentId ? 'Edit Profile' : 'Add Student Info'}
              </Button>
            )}

            {isPostOwner && (
              <Button 
                className='bg-gray-200 p-2 px-3 font-semibold rounded-full' 
                onPress={handleLogout}
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Student Info Modal */}
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
              defaultSelectedKeys={section ? [section] : []}
              onChange={(e) => setSection(e.target.value)}
            >
              <SelectItem key="1" value="1">1</SelectItem>
              <SelectItem key="2" value="2">2</SelectItem>
              <SelectItem key="3" value="3">3</SelectItem>
              <SelectItem key="4" value="4">4</SelectItem>
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={handleClose}>
              Close
            </Button>
            <Button 
              color="primary" 
              onPress={handleSave} 
              isLoading={loading} 
              className="font-semibold bg-gradient-to-tr from-cyan-500 to-blue-500 text-white"
            >
              {loading ? 'Loading...' : 'Save'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Logout Confirmation Modal */}
      <Modal isOpen={isLogoutModalOpen} onClose={() => setIsLogoutModalOpen(false)}>
        <ModalContent>
          <ModalHeader>Confirm Logout</ModalHeader>
          <ModalBody>
            Are you sure you want to log out?
          </ModalBody>
          <ModalFooter>
            <Button 
              color="danger" 
              variant="light" 
              onPress={() => setIsLogoutModalOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              color="danger"
              onPress={confirmLogout}
              className="font-semibold text-white"
            >
              Logout
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <ToastContainer position="bottom-center" autoClose={3000} />
    </div>
  );
}

export default UserInfo;
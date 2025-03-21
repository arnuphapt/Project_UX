import React, { useState, useEffect, useCallback } from 'react';
import UserTag from '../UserTag';
import { getFirestore, doc, deleteDoc, collection, addDoc, onSnapshot, updateDoc, getDoc, getDocs } from 'firebase/firestore';
import { app } from '../../Shared/firebaseConfig';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import CommentSection from '../comment';
import PinImage from './PinImage';
import PinInfoModal from '../Editform';
import { IoIosMore } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Edit, Trash2, CheckCircle } from 'lucide-react';
import { getAdminEmails } from '../../utils/adminEmail';

import { 
  Button, 
  Dropdown, 
  DropdownTrigger, 
  DropdownItem, 
  DropdownMenu, 
  Chip, 
  Tooltip, 
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@heroui/react";
import { RxCross1 } from "react-icons/rx";

function PinInfo({ pinDetail: initialPinDetail }) {
  const { data: session } = useSession();
  const db = getFirestore(app);
  const router = useRouter();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { 
    isOpen: isDeleteModalOpen, 
    onOpen: onDeleteModalOpen, 
    onOpenChange: onDeleteModalChange 
  } = useDisclosure();
  const {
    isOpen: isSuccessModalOpen,
    onOpen: onSuccessModalOpen,
    onOpenChange: onSuccessModalChange
  } = useDisclosure();
  const [pinDetail, setPinDetail] = useState(initialPinDetail);
  const [adminEmails, setAdminEmails] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPostOwner, setIsPostOwner] = useState(false);

  useEffect(() => {
    const loadAdminEmails = async () => {
      const emails = await getAdminEmails();
      setAdminEmails(emails);
    };
    loadAdminEmails();
  }, []);

  // Update isPostOwner when adminEmails or session changes
  useEffect(() => {
    setIsPostOwner(
      adminEmails.includes(session?.user?.email) || 
      session?.user?.email === pinDetail.email
    );
  }, [adminEmails, session?.user?.email, pinDetail.email]);

  const fetchPinData = async () => {
    try {
      const pinDoc = await getDoc(doc(db, 'pinterest-post', pinDetail.id));
      if (pinDoc.exists()) {
        setPinDetail({ id: pinDoc.id, ...pinDoc.data() });
      }
    } catch (error) {
      console.error("Error fetching updated pin data: ", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchPinData();
    };
    fetchData();
  
    const postRef = doc(db, 'pinterest-post', pinDetail.id);
    const commentsRef = collection(postRef, 'comments');
  
    const unsubscribe = onSnapshot(postRef, (doc) => {
      const data = doc.data();
      setPinDetail({ id: doc.id, ...data });
      setLikes(data?.likes || []);
      setHasLiked(data?.likes?.includes(session?.user?.email) || false);
    });
  
    const unsubscribeComments = onSnapshot(commentsRef, (snapshot) => {
      const commentsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setComments(commentsList);
      updateDoc(postRef, { commentCount: commentsList.length });
    });
  
    return () => {
      unsubscribe();
      unsubscribeComments();
    };
  }, [db, pinDetail.id, session?.user?.email]);

  const handleDelete = async () => {
    if (!isPostOwner) return;

    try {
      setIsDeleting(true);
      // Delete all comments related to the post
      const commentsRef = collection(db, 'pinterest-post', pinDetail.id, 'comments');
      const commentsSnapshot = await getDocs(commentsRef);
      const deletionPromises = commentsSnapshot.docs.map(doc => deleteDoc(doc.ref));
      await Promise.all(deletionPromises);

      // Delete the main post document
      await deleteDoc(doc(db, 'pinterest-post', pinDetail.id));

      // Close delete confirmation modal
      onDeleteModalChange(false);
      
      // Show success modal instead of toast
      onSuccessModalOpen();
      
      // We'll navigate after they close the success modal
      
    } catch (error) {
      toast.error("Error deleting post and comments. Please try again.");
      console.error("Error deleting document and comments: ", error);
      setIsDeleting(false);
      onDeleteModalChange(false);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSuccessModalClose = () => {
    onSuccessModalChange(false);
    router.push('/post');
  };

  const handleCommentSubmit = useCallback(async (event) => {
    event.preventDefault();
    if (newComment.trim() === '') return;
  
    try {
      await addDoc(collection(db, 'pinterest-post', pinDetail.id, 'comments'), {
        text: newComment,
        userName: session?.user?.name,
        userImage: session?.user?.image,
        userEmail: session?.user?.email,
        timestamp: new Date()
      });
      setNewComment('');
      toast.success("Comment added successfully!");
    } catch (error) {
      toast.error("Error adding comment. Please try again.");
      console.error("Error adding comment: ", error);
    }
  }, [db, pinDetail.id, newComment, session?.user]);

  const handleCommentDelete = async (commentId) => {
    const confirmed = window.confirm("Are you sure you want to delete this comment?");
    if (confirmed) {
      try {
        await deleteDoc(doc(db, 'pinterest-post', pinDetail.id, 'comments', commentId));
        toast.success("Comment deleted successfully!");
      } catch (error) {
        toast.error("Error deleting comment. Please try again.");
        console.error("Error deleting comment: ", error);
      }
    }
  };

  const handleCommentEdit = async (commentId, newText) => {
    try {
      await updateDoc(doc(db, 'pinterest-post', pinDetail.id, 'comments', commentId), { text: newText });
      toast.success("Comment updated successfully!");
    } catch (error) {
      toast.error("Error updating comment. Please try again.");
      console.error("Error editing comment: ", error);
    }
  };

  const handleLikeToggle = async () => {
    const postRef = doc(db, 'pinterest-post', pinDetail.id);
    const newLikes = hasLiked
      ? likes.filter(email => email !== session?.user?.email)
      : [...likes, session?.user?.email];

    try {
      await updateDoc(postRef, { likes: newLikes });
      setHasLiked(!hasLiked);
    } catch (error) {
      console.error("Error updating likes: ", error);
    }
  };

  const handleSaveChanges = async (updatedData) => {
    try {
      await updateDoc(doc(db, 'pinterest-post', pinDetail.id), updatedData);
      toast.success("Post updated successfully!");
      onOpenChange(false);
      await fetchPinData();
    } catch (error) {
      toast.error("Error updating post. Please try again.");
      console.error("Error updating post: ", error);
    }
  };

  const handleDeleteClick = useCallback(() => {
    onDeleteModalOpen();
  }, [onDeleteModalOpen]);

  return (
    <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4'>
      <PinInfoModal pinDetail={pinDetail} isOpen={isOpen} onOpenChange={onOpenChange} onSave={handleSaveChanges} />
      
      {/* Delete Confirmation Modal */}
      <Modal 
        isOpen={isDeleteModalOpen} 
        onOpenChange={onDeleteModalChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Confirm Delete</ModalHeader>
              <ModalBody>
                <p>Are you sure you want to delete this post? This action cannot be undone.</p>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button 
                  color="danger" 
                  onPress={handleDelete}
                  isLoading={isDeleting}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Success Modal */}
      <Modal 
        isOpen={isSuccessModalOpen} 
        onOpenChange={handleSuccessModalClose}
        hideCloseButton
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <div className='text-center py-4'>
                <div className="flex justify-center mb-4">
                  <CheckCircle size={84} className="text-green-500" />
                </div>
                 <p className="mt-4 text-3xl font-bold">Success</p>
                <p className="mt-2 text-sm text-gray-500">You have successfully deleted your post</p>
                </div>
                </ModalBody>
              <ModalFooter className="justify-center">
                <Button 
                  color="success" 
                  onPress={handleSuccessModalClose}
                >
                  OK
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <div className='relative'>
        <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar={true} />
        <Button 
          variant="light" 
          isIconOnly 
          size='lg' 
          className='text-[25px] mb-2' 
          onPress={() => router.push("/post")} 
          aria-label="Button with Cross for back to homepage"
        >
          <RxCross1 />
        </Button>
        <div className='flex justify-center items-center'>
          <PinImage pinDetail={pinDetail} />
        </div>
      </div>

      <div>
        <div className='flex flex-row justify-between md:flex-row md:justify-between'>
          <h2 className='text-2xl md:text-3xl font-bold'>{pinDetail.title} Section.{pinDetail.section}</h2>
          {isPostOwner && (
            <Dropdown>
              <DropdownTrigger>
                <Button variant="light" isIconOnly size='lg' className='text-[25px]' aria-label="Button for manage post">
                  <IoIosMore />
                </Button>
              </DropdownTrigger>
              <DropdownMenu variant="flat" aria-label="Dropdown menu with shortcut">
                <DropdownItem key="edit" onPress={onOpen} description="Allow you to Edit the post"  startContent={<Edit size={20} />}>
                  Edit 
                </DropdownItem>
                <DropdownItem key="delete" className="text-danger" color="danger" onPress={handleDeleteClick} description="Permanently delete the post" startContent={<Trash2 size={20} />}>
                  Delete 
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
        </div>

        <UserTag user={{ 
          name: pinDetail.userName, 
          email: pinDetail.email,
          image: pinDetail.userImage,
          studentId: pinDetail.studentId,
        }} />

        <p className='text-gray-500'>
          ส่งเมื่อ {new Date(pinDetail.timestamp?.toDate()).toLocaleString('th-TH', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          })}
        </p>

        {Array.isArray(pinDetail.usertaged) && pinDetail.usertaged.length > 0 && (
          <div className='mt-2 flex flex-wrap gap-2'>
            {pinDetail.usertaged.map((tag, index) => (
              <Chip
                color="default" 
                variant="flat"
                key={index}
              >
                {tag}
              </Chip>
            ))}
          </div>
        )}

        <p className='text-xl mt-6'>{pinDetail.desc}</p>

        {Array.isArray(pinDetail.techList) && pinDetail.techList.length > 0 && (
          <div className='mt-6 flex flex-wrap gap-2'>
            {pinDetail.techList.map((tech, index) => (
              <Chip
                color="default" 
                variant="flat"
                key={index}
              >
                {tech}
              </Chip>
            ))}
          </div>
        )}

        <div className='flex'>
          <Tooltip content={(pinDetail.link)}>
            <Button
              radius="full" 
              size='lg' 
              className="font-semibold bg-gradient-to-tr from-cyan-500 to-blue-500 text-white shadow-lg mt-5"
              onPress={() => window.open(pinDetail.link)}
              aria-label="Button for open destination link"
            >
              Open Url
            </Button>
          </Tooltip>
        </div>

        {session ? (
          <CommentSection
            comments={comments}
            handleCommentSubmit={handleCommentSubmit}
            newComment={newComment}
            setNewComment={setNewComment}
            handleCommentDelete={handleCommentDelete}
            handleCommentEdit={handleCommentEdit}
            userEmail={session?.user?.email}
            hasLiked={hasLiked}
            onLikeToggle={handleLikeToggle}
            likesCount={likes.length}
          />
        ) : (
          <p className="mt-5 text-red-500">Please log in to like or comment.</p>
        )}
      </div>
    </div>
  );
}

export default PinInfo;
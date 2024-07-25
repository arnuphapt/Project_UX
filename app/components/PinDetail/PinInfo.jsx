import React, { useState, useEffect } from 'react';
import UserTag from '../UserTag';
import { getFirestore, doc, deleteDoc, collection, addDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import app from '../../Shared/firebaseConfig';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import CommentSection from '../comment';
import LikeButton from '../LikeButton';
import PinImage from './PinImage';
import EditPinForm from '../Editform'; // Import the new EditPinForm component
import UploadImage from '../UploadImage'; // Import UploadImage component

function PinInfo({ pinDetail }) {
  const { data: session } = useSession();
  const db = getFirestore(app);
  const router = useRouter();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(pinDetail.image || ''); // State for new image
  const [imageUrl, setImageUrl] = useState(pinDetail.image || ''); // URL for preview
  // Check if the current user is the owner of the post
  const isPostOwner = session?.user?.email === pinDetail.email;

  useEffect(() => {
    // Get comments from Firestore
    const commentsRef = collection(db, 'pinterest-post', pinDetail.id, 'comments');
    const unsubscribeComments = onSnapshot(commentsRef, (snapshot) => {
      const commentsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setComments(commentsList);
    });

    // Get likes from Firestore
    const postRef = doc(db, 'pinterest-post', pinDetail.id);
    const unsubscribePost = onSnapshot(postRef, (doc) => {
      const data = doc.data();
      setLikes(data?.likes || []);
      setHasLiked(data?.likes?.includes(session?.user?.email) || false);
    });

    return () => {
      unsubscribeComments();
      unsubscribePost();
    };
  }, [db, pinDetail.id, session?.user?.email]);

  const handleDelete = async () => {
    if (!isPostOwner) return;

    const confirmed = window.confirm("Are you sure you want to delete this post?");
    if (confirmed) {
      try {
        await deleteDoc(doc(db, 'pinterest-post', pinDetail.id));
        router.push('/');
      } catch (error) {
        console.error("Error deleting document: ", error);
      }
    }
  };

  const handleCommentSubmit = async (event) => {
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
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };

  const handleCommentDelete = async (commentId) => {
    const confirmed = window.confirm("Are you sure you want to delete this comment?");
    if (confirmed) {
      try {
        await deleteDoc(doc(db, 'pinterest-post', pinDetail.id, 'comments', commentId));
      } catch (error) {
        console.error("Error deleting comment: ", error);
      }
    }
  };

  const handleCommentEdit = async (commentId, newText) => {
    try {
      await updateDoc(doc(db, 'pinterest-post', pinDetail.id, 'comments', commentId), {
        text: newText
      });
    } catch (error) {
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

  const handleEditToggle = () => {
    if (!isPostOwner) return;
    setIsEditing(prev => !prev);
  };

  const handleSaveChanges = async (updatedData) => {
    try {
      await updateDoc(doc(db, 'pinterest-post', pinDetail.id), {
        ...updatedData,
        // Handle image updates here if needed
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating post: ", error);
    }
  };

  return (
    <div className='grid grid-cols-2'>
         <div>
        {isEditing ? (
              <div className='w-[600px] h-[600px]'>

          <UploadImage setFile={setFile} currentImageUrl={imageUrl} />
          </div>

        ) : (
          <PinImage pinDetail={pinDetail} />
        )}
      </div>
      <div>
        {isEditing ? (
          <EditPinForm
            pinDetail={pinDetail}
            onSave={handleSaveChanges}
            onCancel={handleEditToggle}
          />
        ) : (
          <>
            <h2 className='text-[30px] font-bold mb-8'>{pinDetail.title}</h2>
            <UserTag user={{ name: pinDetail.userName, email: pinDetail.email, image: pinDetail.userImage }} />
            <p className='text-gray-500 mb-5'> ส่งเมื่อ {new Date(pinDetail.timestamp?.toDate()).toLocaleString()}</p>
            <p className='text-[20px] mt-10'>{pinDetail.desc}</p>
            {Array.isArray(pinDetail.techList) && pinDetail.techList.length > 0 && (
              <div className='mt-10 flex flex-wrap gap-2'>
                {pinDetail.techList.map((tech, index) => (
                  <span
                    key={index}
                    className='px-3 py-1 bg-[#e9e9e9] rounded-full text-[15px] hover:scale-105 transition-all'
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
            <button
              className='p-2 bg-[#e9e9e9] px-5 text-[23px] mt-10 rounded-full hover:scale-105 transition-all'
              onClick={() => window.open(pinDetail.link)}
            >
              Open Url
            </button>
            {isPostOwner && (
              <>
                <button
                  className='p-2 bg-red-500 text-white px-5 text-[23px] mt-10 rounded-full hover:scale-105 transition-all'
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <button
                  className='p-2 bg-blue-500 text-white px-5 text-[23px] mt-10 rounded-full hover:scale-105 transition-all'
                  onClick={handleEditToggle}
                >
                  Edit
                </button>
              </>
            )}
            <LikeButton
              hasLiked={hasLiked}
              onLikeToggle={handleLikeToggle}
              likesCount={likes.length}
            />
            <CommentSection
              comments={comments}
              handleCommentSubmit={handleCommentSubmit}
              newComment={newComment}
              setNewComment={setNewComment}
              handleCommentDelete={handleCommentDelete}
              handleCommentEdit={handleCommentEdit}
              userEmail={session?.user?.email}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default PinInfo;

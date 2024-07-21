import React, { useState, useEffect } from 'react';
import UserTag from '../UserTag';
import { getFirestore, doc, deleteDoc, collection, addDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import app from '../../Shared/firebaseConfig';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Data from '../Data'; // Assuming this is where your tech data is
import UploadImage from '../UploadImage'; // Import UploadImage component

function PinInfo({ pinDetail }) {
  const user = {
    name: pinDetail.userName,
    email: pinDetail.email,
    image: pinDetail.userImage
  };

  const { data: session } = useSession();
  const db = getFirestore(app);
  const storage = getStorage(app);
  const router = useRouter();
  
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedPin, setEditedPin] = useState({
    title: pinDetail.title,
    desc: pinDetail.desc,
    link: pinDetail.link,
    techList: pinDetail.techList,
    image: pinDetail.image || ''
  });
  const [selectedTechList, setSelectedTechList] = useState(pinDetail.techList || []);
  const [file, setFile] = useState(null);

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
        email: session?.user?.email,
        timestamp: new Date()
      });
      setNewComment('');
    } catch (error) {
      console.error("Error adding comment: ", error);
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

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    const postRef = doc(db, 'pinterest-post', pinDetail.id);

    try {
      let updatedData = {
        title: editedPin.title,
        desc: editedPin.desc,
        link: editedPin.link,
        techList: selectedTechList,
      };

      if (file) {
        const storageRef = ref(storage, 'pinterest/' + file.name);
        await uploadBytes(storageRef, file);
        const imageUrl = await getDownloadURL(storageRef);
        updatedData = { ...updatedData, image: imageUrl };
      }

      await updateDoc(postRef, updatedData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const handleTechSelect = (name, isChecked) => {
    if (isChecked) {
      setSelectedTechList([...selectedTechList, name]);
    } else {
      setSelectedTechList(selectedTechList.filter(item => item !== name));
    }
  };

  return (
    <div>
      {isEditing ? (
        <form onSubmit={handleEditSubmit} className='mb-10'>
          <input
            type='text'
            value={editedPin.title}
            onChange={(e) => setEditedPin({ ...editedPin, title: e.target.value })}
            placeholder='Title'
            className='w-full p-2 border rounded-md mb-4'
          />
          <textarea
            value={editedPin.desc}
            onChange={(e) => setEditedPin({ ...editedPin, desc: e.target.value })}
            placeholder='Description'
            className='w-full p-2 border rounded-md mb-4'
            rows='3'
          />
          <input
            type='text'
            value={editedPin.link}
            onChange={(e) => setEditedPin({ ...editedPin, link: e.target.value })}
            placeholder='URL'
            className='w-full p-2 border rounded-md mb-4'
          />
          <UploadImage
            setFile={setFile}
            currentImageUrl={editedPin.image}
          />
          <div className='mt-2'>
            {Data.Technology.map((item, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  checked={selectedTechList.includes(item.name)}
                  onChange={(e) => handleTechSelect(item.name, e.target.checked)}
                  className="w-4 h-4"
                />
                <label>{item.name}</label>
              </div>
            ))}
          </div>
          <button
            type='submit'
            className='p-2 bg-blue-500 text-white px-5 text-[23px] mt-4 rounded-full hover:scale-105 transition-all'
          >
            Save
          </button>
          <button
            type='button'
            className='p-2 bg-gray-500 text-white px-5 text-[23px] mt-4 rounded-full hover:scale-105 transition-all'
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <h2 className='text-[30px] font-bold mb-10'>{pinDetail.title}</h2>
          <UserTag user={user} />
          <h2 className='mt-10'>{pinDetail.desc}</h2>

          {Array.isArray(pinDetail.techList) && pinDetail.techList.length > 0 && (
            <div className='mt-10 flex flex-wrap gap-2'>
              {pinDetail.techList.map((tech, index) => (
                <span
                  key={index}
                  className='px-3 py-1 bg-[#e9e9e9] rounded-full text-[20px] hover:scale-105 transition-all'
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

          {session?.user.email === pinDetail.email && (
            <>
              <button
                className='p-2 bg-red-500 text-white px-5 text-[23px] mt-10 rounded-full hover:scale-105 transition-all'
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                className='p-2 bg-blue-500 text-white px-5 text-[23px] mt-10 rounded-full hover:scale-105 transition-all'
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            </>
          )}

          {/* Like Button */}
          <button
            className={`p-2 text-[23px] mt-10 rounded-full ${hasLiked ? 'bg-red-500 text-white' : 'bg-gray-300'}`}
            onClick={handleLikeToggle}
          >
            {hasLiked ? 'Unlike' : 'Like'} ({likes.length})
          </button>
          {/* Comment Section */}
          <div className='mt-10 relative'>
            <form onSubmit={handleCommentSubmit} className='mb-5'>
              <div className='relative'>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder='Add a comment...'
                  className='w-full p-2 border rounded-md pr-16'
                  rows='3'
                />
                <button
                  type='submit'
                  className='absolute right-2 top-2 p-2 bg-blue-500 text-white rounded-full hover:scale-105 transition-all'
                >
                  Send
                </button>
              </div>
            </form>

            <div className='mt-5'>
              {comments.map((comment) => (
                <div key={comment.id} className='border-b py-2'>
                  <div className='font-semibold'>{comment.email}</div>
                  <p>{comment.text}</p>
                  <span className='text-gray-500 text-sm'>{new Date(comment.timestamp?.toDate()).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default PinInfo;

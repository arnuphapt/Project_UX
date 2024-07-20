import React, { useState, useEffect } from 'react';
import UserTag from '../UserTag';
import { getFirestore, doc, deleteDoc, collection, addDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import app from '../../Shared/firebaseConfig';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

function PinInfo({ pinDetail }) {
  const user = {
    name: pinDetail.userName,
    email: pinDetail.email,
    image: pinDetail.userImage
  };

  const { data: session } = useSession();
  const db = getFirestore(app);
  const router = useRouter();
  
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

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

  return (
    <div>
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
        <button
          className='p-2 bg-red-500 text-white px-5 text-[23px] mt-10 rounded-full hover:scale-105 transition-all'
          onClick={handleDelete}
        >
          Delete
        </button>
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
              className='w-full p-2 border rounded-md pr-16' // Added padding-right for button
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
    </div>
  );
}

export default PinInfo;

import React, { useState, useEffect } from 'react';
import { Heart, Eye, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getFirestore, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { app } from '../../Shared/firebaseConfig';

const AwwardsPinItem = ({ pin }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasLiked, setHasLiked] = useState(false);
  const [likes, setLikes] = useState(pin?.likes || []);
  const { data: session } = useSession();
  const db = getFirestore(app);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const postRef = doc(db, 'pinterest-post', pin.id);
    const unsubscribePost = onSnapshot(postRef, (doc) => {
      const data = doc.data();
      setLikes(data?.likes || []);
      setHasLiked(data?.likes?.includes(session?.user?.email) || false);
    });

    return () => {
      unsubscribePost();
    };
  }, [db, pin.id, session?.user?.email]);

  const handleLikeToggle = async (e) => {
    e.stopPropagation();
    if (!session?.user?.email) return;

    const postRef = doc(db, 'pinterest-post', pin.id);
    const newLikes = hasLiked
      ? likes.filter(email => email !== session?.user?.email)
      : [...likes, session?.user?.email];

    try {
      await updateDoc(postRef, { likes: newLikes });
    } catch (error) {
      console.error("Error updating likes: ", error);
    }
  };

  const handlePinClick = () => {
    router.push("/post/" + pin.userName + "/" + pin.id);
  };
  const handleProfileClick = () => {
    router.push("/users/" + pin.email);
  };
  return (
    <div className="flex flex-col">
      {/* Image Card */}
      <div 
        onClick={handlePinClick}
        className="group relative w-full bg-white overflow-hidden rounded-lg cursor-pointer shadow-md"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >

        {/* Main Image with Hover Overlay */}
        <div className="relative aspect-[3/2] overflow-hidden">
          <div className={`absolute inset-0 bg-black/20 z-10 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
          {loading ? (
            <div className="w-full h-full bg-gray-200 animate-pulse" />
          ) : (
            <img
              src={pin.image || '/api/placeholder/800/600'}
              alt={pin.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          )}
          

          {/* Hover Content */}
          <div className={`absolute inset-x-0 bottom-0 z-20 p-4 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex justify-between items-end">
              <div className="space-y-2">
              <span className="text-xs uppercase text-white bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
            Section {pin.section}
          </span>
                <h3 className="text-white text-lg font-bold">{pin.title}</h3>
                <div className="flex items-center space-x-4 text-white/90 text-sm">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{pin.viewCount || 0}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4" />
                    <span>{likes.length}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons - Now at bottom right */}
              <div className="flex space-x-2 ml-4">
                <button className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-colors">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </button>
                <button
                  onClick={handleLikeToggle}
                  className={`p-2 rounded-full ${hasLiked ? 'bg-red-500' : 'bg-white/20 backdrop-blur-sm hover:bg-white/40'} transition-colors`}
                >
                  <Heart className={`w-4 h-4 text-white ${hasLiked ? 'fill-white' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Creator Name */}
      <div className="flex items-center mt-3 gap-2">
<h1 className='font-bold text-large'>Created</h1>
        <span className="text-gray-500 dark:text-gray-400">by</span>
        <div className="flex items-center">
          <img
            src={pin.userImage || '/api/placeholder/24/24'}
            alt={pin.userName}
            className="w-6 h-6 rounded-full mr-2"
          />
          <span onClick={handleProfileClick} className="font-medium hover:text-gray-900 dark:text-gray-200 dark:hover:text-white cursor-pointer">
            {pin.userName}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AwwardsPinItem;
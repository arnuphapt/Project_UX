import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { app } from '../../Shared/firebaseConfig';
import PostItem from '../Pins/PostItem';

const UserPosts = ({ userInfo }) => {
  const [activeTab, setActiveTab] = useState('posts');
  const [userPosts, setUserPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const db = getFirestore(app);

  useEffect(() => {
    if (userInfo) {
      fetchUserPosts();
      fetchLikedPosts();
    }
  }, [userInfo]);

  const fetchUserPosts = async () => {
    try {
      const q = query(
        collection(db, 'pinterest-post'),
        where("email", '==', userInfo.email)
      );
      const querySnapshot = await getDocs(q);
      const posts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUserPosts(posts);
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  };

  const fetchLikedPosts = async () => {
    try {
      const q = query(
        collection(db, 'pinterest-post'),
        where('likes', 'array-contains', userInfo.email)
      );
      const querySnapshot = await getDocs(q);
      const posts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLikedPosts(posts);
    } catch (error) {
      console.error("Error fetching liked posts:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-48">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  const displayedPosts = activeTab === 'posts' ? userPosts : likedPosts;
  const emptyMessage = activeTab === 'posts'
    ? "No posts created yet. Start sharing!"
    : "No liked posts yet. Start exploring!";

  return (
    <div className="max-w-[1920px] mx-auto px-4">

      <div className="flex flex-col items-center gap-6 mb-8">
        <div className="flex justify-center gap-8 border-gray-200">
          <button
            className={`px-2 py-2 font-medium ${
              activeTab === 'posts'
                ? 'border-b-2 border-black text-black'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('posts')}
          >
            Post
          </button>
          <button
            className={`px-2 py-2 font-medium ${
              activeTab === 'likes'
                ? 'border-b-2 border-black text-black'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('likes')}
          >
            Liked post
          </button>
        </div>
      </div>
      <h1 className="text-3xl font-bold mb-4">
        {activeTab === 'posts' 
          ? `${userInfo.userName}'s Posts`
          : `${userInfo.userName}'s Liked Posts`
        }
      </h1>
      {displayedPosts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">{emptyMessage}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {displayedPosts.map((post) => (
            <PostItem key={post.id} pin={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserPosts;
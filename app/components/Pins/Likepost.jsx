import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import app from '../../Shared/firebaseConfig';
import PinItem from '../Pins/PinItem';

const LikedPosts = () => {
  const { data: session } = useSession();
  const db = getFirestore(app);
  const [likedPosts, setLikedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      const fetchLikedPosts = async () => {
        const q = query(
          collection(db, 'pinterest-post'),
          where('likes', 'array-contains', session.user.email)
        );
        const querySnapshot = await getDocs(q);
        const posts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setLikedPosts(posts);
        setLoading(false);
      };

      fetchLikedPosts();
    }
  }, [session, db]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (likedPosts.length === 0) {
    return <p>No liked posts found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {likedPosts.map(post => (
        <PinItem key={post.id} pin={post} />
      ))}
    </div>
  );
};

export default LikedPosts;

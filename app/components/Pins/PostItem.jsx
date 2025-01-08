import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GrView } from 'react-icons/gr';
import { AiOutlineComment } from 'react-icons/ai';
import { IoHeart } from 'react-icons/io5';
import { Share2, Heart } from 'lucide-react';
import { Card, CardHeader, CardFooter, Image } from "@nextui-org/react";
import { getFirestore, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { app } from '../../Shared/firebaseConfig';
import { useSession } from 'next-auth/react';

const PLACEHOLDER = '/Images/placeholder.jpg';

function PinItem({ pin }) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [likes, setLikes] = useState(pin.likes || []);
  const [hasLiked, setHasLiked] = useState(false);
  const { data: session } = useSession();

  const db = getFirestore(app);

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
  }, [session?.user?.email, pin.id]);

  const handleLikeToggle = async (e) => {
    e.stopPropagation();
    if (!session?.user?.email) return;

    const postRef = doc(db, 'pinterest-post', pin.id);
    const newLikes = hasLiked
      ? likes.filter(email => email !== session.user.email)
      : [...likes, session.user.email];

    try {
      await updateDoc(postRef, { likes: newLikes });
    } catch (error) {
      console.error("Error updating likes: ", error);
    }
  };

  return (
    <div
      className="cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => router.push("/post/" + pin.userName + "/" + pin.id)}

    >
      <Card className="col-span-12 sm:col-span-4">
        <div className="relative w-full aspect-square h-[260px]">
          <Image
            removeWrapper
            alt={pin.title}
            className="z-0 w-full h-full object-cover"
            src={pin.image ? pin.image : PLACEHOLDER}
            loading="lazy"
          />

          {isHovered && (
            <div className="absolute inset-0 bg-black/40 transition-opacity duration-300">
              <div className="absolute top-3 right-3 flex flex-row gap-2">
                <button 
                  onClick={handleLikeToggle}
                  className="p-2 bg-white rounded-full shadow hover:bg-gray-100 transition-colors"
                >
                  <Heart 
                    className={`w-5 h-5 ${hasLiked ? 'fill-red-500 text-red-500' : 'text-gray-700'}`}
                  />
                </button>
              </div>
              
              <div className="absolute bottom-3 left-3">
                <div>
                  <h1 className="text-white font-bold text-base">Section: {pin.section}</h1>
                  <p className="text-white text-sm font-medium mt-1">{pin.userName}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <CardFooter className="bg-white p-3">
          <div className="flex flex-grow gap-2 items-center">
            <div className="flex flex-col flex-1">
                <div>
                  <h4 className="text-black font-medium text-large truncate">{pin.title}</h4>
                  <div className='flex mt-1'>
                    {pin.viewCount !== undefined && (
                      <div className="mr-3 text-sm text-black flex items-center">
                        <GrView className="mr-1" />
                        <span>{pin.viewCount}</span>
                      </div>
                    )}
                    {likes !== undefined && (
                      <div className="mr-3 text-sm text-black flex items-center">
                        <IoHeart 
                          className={`mr-1 ${hasLiked ? 'text-red-500' : ''}`}
                        />
                        <span>{likes.length}</span>
                      </div>
                    )}
                    {pin.commentCount !== undefined && (
                      <div className="mr-3 text-sm text-black flex items-center">
                        <AiOutlineComment className="mr-1" />
                        <span>{pin.commentCount}</span>
                      </div>
                    )}
                  </div>
                </div>
            </div>
            <Image
              alt="User icon"
              className="rounded-full bg-black w-8 h-8"
              src={pin.userImage}
            />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default PinItem;
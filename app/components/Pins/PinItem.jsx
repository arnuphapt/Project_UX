import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GrView } from 'react-icons/gr';
import { AiOutlineComment } from 'react-icons/ai';
import { IoHeart } from 'react-icons/io5';

import { Card, CardHeader, CardFooter, Image, Skeleton } from "@nextui-org/react";
import { getFirestore, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import app from '../../Shared/firebaseConfig';
import LikeButton from '../LikeButton';
import { useSession } from 'next-auth/react';

const PLACEHOLDER = '/Images/placeholder.jpg';

function PinItem({ pin }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [likes, setLikes] = useState(pin.likes || []);
  const [hasLiked, setHasLiked] = useState(false);
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
  }, []);

  const handleLikeToggle = async () => {
    const postRef = doc(db, 'pinterest-post', pin.id);
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
    <div
      className="cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card isFooterBlurred className="col-span-12 sm:col-span-4 h-[300px]" >
        {loading ? (<Skeleton className="w-full h-full rounded-3xl" />

        ) : (<Image
          removeWrapper
          alt={pin.title}
          className="z-0 w-full h-full object-cover"
          src={pin.image ? pin.image : PLACEHOLDER}
          onClick={() => router.push("/pin/" + pin.id)}
        />)}

        <CardHeader className="absolute ml-4 flex-col !items-end">
          {isHovered && (
            <LikeButton
              hasLiked={hasLiked}
              onLikeToggle={handleLikeToggle}
            />
          )}
        </CardHeader>

        <CardFooter className="absolute bg-slate-400/60 bottom-0  z-10 justify-between">
          <div className="flex flex-grow gap-2 items-center">
            <div className="flex flex-col">
              {isHovered ? (
                <div>
                  <h1 className="text-white font-bold">Section: {pin.section}</h1>
                  <p className="text-tiny text-white font-bold mt-2">{pin.userName}</p>
                </div>
              ) : (
                <div>
                  <h4 className="text-white font-medium text-large ">{pin.title}</h4>
                  <div className='flex'>
                    {pin.viewCount !== undefined && (
                      <div className="mt-2 mr-3 text-sm text-white flex items-center">
                        <GrView className="mr-1" />
                        <span>{pin.viewCount}</span>
                      </div>
                    )}
                    {pin.likes !== undefined && (
                      <div className="mt-2 mr-3 text-sm text-white flex items-center">
                        <IoHeart className="mr-1" />
                        <span>{pin.likes.length}</span>
                      </div>
                    )}
                    {pin.commentCount !== undefined && (
                      <div className="mt-2 mr-3 text-sm text-white flex items-center">
                        <AiOutlineComment className="mr-1" />
                        <span>{pin.commentCount}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <Image
            alt="User icon"
            className="rounded-full bg-black"
            src={pin.userImage}
            width={45}
            height={45}
            style={{
              height: "auto",
              width: "auto"
            }}
          />
        </CardFooter>
      </Card>
    </div>
  );
}

export default PinItem;

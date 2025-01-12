"use client"
import React, { useEffect, useState } from 'react'
import PinInfo from '../../../components/PinDetail/PinInfo'
import { doc, getDoc, updateDoc, getFirestore, query, collection, where, getDocs } from 'firebase/firestore'
import { app } from '@/app/Shared/firebaseConfig'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import Breadcrumbs from '../../../components/Breadcrumbs'
import Image from 'next/image'
import Link from 'next/link'

function PinDetail({ params }) {
  const router = useRouter();
  const db = getFirestore(app);
  const [pinDetail, setPinDetail] = useState(null);
  const [listOfPins, setListOfPins] = useState([]);

  useEffect(() => {
    getPinDetail();
  }, []);

  const getPinDetail = async () => {
    const docRef = doc(db, 'pinterest-post', params.pinId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setPinDetail(data);

      // Check if the user has already viewed this pin
      const hasViewed = Cookies.get(`viewed-${params.pinId}`);
      if (!hasViewed) {
        // Mark the pin as viewed for this user
        Cookies.set(`viewed-${params.pinId}`, 'true', { expires: 365 });

        // Update the view count in the database
        await updateDoc(docRef, {
          viewCount: (data.viewCount || 0) + 1
        });
      }

      // Fetch more pins from the same user
      getUserPins(data.email);
    } else {
      console.log("No such document!");
    }
  }

  const getUserPins = async (email) => {
    const q = query(collection(db, 'pinterest-post'), where("email", '==', email));
    const querySnapshot = await getDocs(q);
    const pins = [];
    querySnapshot.forEach((doc) => {
      if (doc.id !== params.pinId) { // Exclude the current pin
        pins.push({ ...doc.data(), id: doc.id });
      }
    });
    setListOfPins(pins);
  }

  return (
    <>
      {pinDetail ? (
        <div className='bg-white p-3 md:p-12 rounded-2xl md:px-24 lg:px-36'>
          <Breadcrumbs />
          <div className='shadow-2xl rounded-2xl p-3 md:p-7 lg:p-12 xl:pd-16'>
            <PinInfo pinDetail={pinDetail} />
          </div>

          {/* More Posts Section */}
          {listOfPins.length > 0 && (
            <div className='mt-12'>
              <h2 className='text-2xl font-bold mb-6'>More from {pinDetail.userName}</h2>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {listOfPins.map((pin) => (
                  <Link href={`/post/${pin.userName}/${pin.id}`} key={pin.id}>
                    <div className='relative group cursor-pointer'>
                      <div className='relative w-full pb-[100%] rounded-2xl overflow-hidden'>
                        <Image
                          src={pin.image}
                          alt={pin.title}
                          fill={true}
                          className='object-cover group-hover:scale-105 transition-transform duration-300'
                        />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : null}
    </>
  )
}

export default PinDetail;
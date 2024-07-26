"use client"
import React, { useEffect, useState } from 'react'
import PinInfo from './../../components/PinDetail/PinInfo'
import { doc, getDoc, updateDoc, getFirestore } from 'firebase/firestore'
import app from '@/app/Shared/firebaseConfig'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

function PinDetail({ params }) {
  const router = useRouter();
  const db = getFirestore(app);
  const [pinDetail, setPinDetail] = useState(null);

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
    } else {
      console.log("No such document!");
    }
  }

  return (
    <>
      {pinDetail ? 
        <div className='bg-white p-3 md:p-12 rounded-2xl md:px-24 lg:px-36'>
          <div className='shadow-2xl rounded-2xl p-3 md:p-7 lg:p-12 xl:pd-16'>
            <div className="">

              <PinInfo pinDetail={pinDetail} />
            </div>
          </div>
        </div>
        : null}
    </>
  )
}

export default PinDetail

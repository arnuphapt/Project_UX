"use client";
import React, { useEffect, useState } from 'react';
import { app } from '../../Shared/firebaseConfig';
import UserInfo from '../../components/UserInfo';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import UserPosts from '../../components/Pins/UserPosts';

function Profile({ params }) {
  const db = getFirestore(app);
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    if (params) {
      const email = params.userId.replace('%40', '@');
      getUserInfo(email);
    }
  }, [params]);

  const getUserInfo = async (email) => {
    const docRef = doc(db, "user", email);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const userData = docSnap.data();
      const studentInfo = await getStudentInfo(email);
      setUserInfo({ ...userData, ...studentInfo });
    } else {
      console.log("No such document!");
    }
  }

  const getStudentInfo = async (email) => {
    try {
      const docRef = doc(db, 'student-info', email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      }
      return { studentId: '', section: '' };
    } catch (error) {
      console.error("Error fetching student info: ", error);
      return { studentId: '', section: '' };
    }
  };

  return (
    <div className=" mb-10 px-10">
      {userInfo && (
        <div>
          <div className="mb-10">
            <UserInfo userInfo={userInfo} />
          </div>
          <UserPosts userInfo={userInfo} />
        </div>
      )}
    </div>
  );
}

export default Profile;
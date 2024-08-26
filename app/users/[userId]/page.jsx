"use client"
import React, { useEffect, useState } from 'react'
import app from '../../Shared/firebaseConfig';
import UserInfo from '../../components/UserInfo'
import { collection, getDocs, getDoc, doc, getFirestore, query, where } from 'firebase/firestore'
import Pin from '../../components/Pins/Pin'

function Profile({ params }) {
  const db = getFirestore(app);
  const [userInfo, setUserInfo] = useState();
  const [listOfPins, setListOfPins] = useState([]);

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

  useEffect(() => {
    if (userInfo) {
      getUserPins();
    }
  }, [userInfo])

  const getUserPins = async () => {
    setListOfPins([])
    const q = query(collection(db, 'pinterest-post'), where("email", '==', userInfo.email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setListOfPins(listOfPins => [...listOfPins, doc.data()]);
    });
  }

  return (
    <div className='mt-10'>
      {userInfo ? 
        <div>
          <UserInfo userInfo={userInfo} />
          <Pin listOfPins={listOfPins} userInfo={userInfo} />
        </div> : null}
    </div>
  )
}

export default Profile;

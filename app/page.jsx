"use client"

import app from './Shared/firebaseConfig';
import PinList from './components/Pins/PinList';
import { getFirestore, doc, setDoc, getDoc, 
  collection, getDocs, query, where, limit, startAfter } from "firebase/firestore";
import { useEffect, useState } from 'react'

export default function Home() {
  const db = getFirestore(app);
  const [listOfPins, setListOfPins] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllPins();
  }, [])

  const getAllPins = async () => {
    setLoading(true);
    const q = query(collection(db, 'pinterest-post'), limit(150));
    const querySnapshot = await getDocs(q);
  
    const pins = [];
    querySnapshot.forEach((doc) => {
      pins.push({...doc.data(), id: doc.id});
    });
  
    setListOfPins(pins);
    setLastVisible(querySnapshot.docs[querySnapshot.docs.length-1]);
    setLoading(false);
  }

  const getMorePins = async () => {
    if (!lastVisible) return;
    
    setLoading(true);
    const q = query(
      collection(db, 'pinterest-post'),
      limit(12),
      startAfter(lastVisible)
    );
    const querySnapshot = await getDocs(q);
  
    const newPins = [];
    querySnapshot.forEach((doc) => {
      newPins.push({...doc.data(), id: doc.id});
    });
  
    setListOfPins(prevPins => [...prevPins, ...newPins]);
    setLastVisible(querySnapshot.docs[querySnapshot.docs.length-1]);
    setLoading(false);
  }

  return (
    <>
      <div className="p-4">
      <PinList 
        listOfPins={listOfPins} 
        getMorePins={getMorePins}
        loading={loading}
      />
      </div>
    </>
  )
}
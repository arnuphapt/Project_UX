"use client"

import app from './Shared/firebaseConfig';
import PinList from './components/Pins/PinList';
import { getFirestore, doc, setDoc, getDoc, 
  collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from 'react'
export default function Home() {
  const db = getFirestore(app);
  const [listOfPins, setListOfPins] = useState([]);
  useEffect(() => {
    getAllPins();
  }, [])


  const getAllPins = async () => {
    const q = query(collection(db, 'pinterest-post'));
    const querySnapshot = await getDocs(q);
  
    // Collect all pins in an array
    const pins = [];
    querySnapshot.forEach((doc) => {
      pins.push(doc.data());
    });
  
    // Update the state once with all collected pins
    setListOfPins(pins);
  }


  return (
    <>
      <div className="p-4">
      <PinList listOfPins={listOfPins}  />
      </div>
    </>
  )
}

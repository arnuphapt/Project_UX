"use client"

import app from './Shared/firebaseConfig';
import PinList from './components/Pins/PinList';
import Head from 'next/head'
import Image from 'next/image'
import Posts from './components/Posts'
import { getFirestore, doc, setDoc, getDoc, 
  collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from 'react'
export default function Home() {
  const db = getFirestore(app);
  const [listOfPins, setListOfPins] = useState([]);
  const [posts,setPosts]=useState([])
  useEffect(()=>{
    getPost();
  },[])
  useEffect(() => {
    getAllPins();
  }, [])

  const getPost=async()=>{
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {
    
   setPosts(posts=>[...posts,doc.data()]);
});
  }
  const onGamePress=async(gameName)=>{
    setPosts([]);
    if(gameName=='Other Games')
    {
      getPost();
      return ;
    }
    const q=query(collection(db,"posts"),
    where("game","==",gameName));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let data=doc.data();
      data.id=doc.id
      setPosts(posts=>[...posts,doc.data()]);
   
});
  }
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
      {posts? <Posts posts={posts}/>:null}

      </div>
    </>
  )
}

"use client";
import { app } from './Shared/firebaseConfig';
import PinList from './components/Pins/PinList';
import { getFirestore, collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from 'react';
import Image from "next/image";

export default function Home() {
    const db = getFirestore(app);
    const [listOfPins, setListOfPins] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(true)

    useEffect(() => {
        getAllPins();
    }, []);

    const getAllPins = async () => {
        try {
            setIsLoading(true);
            const q = query(collection(db, 'pinterest-post'));
            const querySnapshot = await getDocs(q);
            
            // Collect all pins in an array
            const pins = [];
            querySnapshot.forEach((doc) => {
                pins.push(doc.data());
            });
            
            // Update the state once with all collected pins
            setListOfPins(pins);
        } catch (error) {
            console.error("Error fetching pins:", error);
        } finally {
            setIsLoading(false);
            setLoading(false)
        }
    }

    if (loading) {
        return (
          <div className='bg-[#e9e9e9] p-8 px-[10px] md:px-[160px]'>
            <div className="flex justify-center items-center h-full min-h-screen">
            <Image
            src='/image.png'
            alt='logo'
            width={160}
            height={160}
            className='mb-52 animate-bounce'
            style={{ maxWidth: "100%", height: "auto" }}
          />
            </div>
          </div>
        )
      }
    return (
        <>
            <div className="p-4">
                <PinList 
                    listOfPins={listOfPins} 
                    isLoading={isLoading} 
                />
            </div>

        </>
    );
}
"use client";
import { app } from '../Shared/firebaseConfig';
import PostList from '../components/Pins/PostList';
import { getFirestore, collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox } from "@heroui/react";
import Image from "next/image";

export default function Home() {
    const db = getFirestore(app);
    const [listOfPins, setListOfPins] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(true);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [Loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for modal preference and timestamp
        const modalPreference = localStorage.getItem("modalTimestamp");
        if (modalPreference) {
            const lastClosedTime = new Date(modalPreference);
            const currentTime = new Date();
            const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
            
            if (currentTime - lastClosedTime < oneDayInMilliseconds) {
                // Less than one day has passed, do not show modal
                setShowModal(false);
            } else {
                // More than one day has passed, show modal
                onOpen();
            }
        } else {
            // No preference found, show modal
            onOpen();
        }
        
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
  if (Loading) {
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
            <div className="p-4">
                <PostList 
                    listOfPins={listOfPins} 
                    isLoading={isLoading} 
                />
            </div>

    );
}
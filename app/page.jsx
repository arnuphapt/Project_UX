"use client";
import { app } from './Shared/firebaseConfig';
import PinList from './components/Pins/PinList';
import { getFirestore, collection, getDocs, query, limit, startAfter } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure,Checkbox } from "@nextui-org/react";

export default function Home() {
  const db = getFirestore(app);
  const [listOfPins, setListOfPins] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();


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


  const handleDoNotShowAgain = () => {
    // Set current time in local storage
    localStorage.setItem("modalTimestamp", new Date().toISOString());
    setShowModal(false);
    onOpenChange(false);
  };
  const handleok = () => {
    // Set current time in local storage
    setShowModal(false);
  };

  return (
    <>
      <div className="p-4">
        <PinList 
          listOfPins={listOfPins} 
          loading={loading}
        />
      </div>

      {showModal && (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">ประกาศ!!</ModalHeader>
                <ModalBody>
                  <p> 
                  ให้ไปที่ Edit Profile สำหรับทุกคนที่ยังไม่ได้เพิ่ม ข้อมูลรหัสนักศึกษา และ Section ก่อนทำการสร้างโพสต์
                  </p>
                </ModalBody>
          <ModalFooter className="flex flex-col items-stretch gap-2">
          <div className="flex items-center justify-between">
            <Checkbox onValueChange={handleDoNotShowAgain}>ไม่แสดงหน้านี้อีก</Checkbox>
            <Button color="primary" onPress={handleok}>
            OK
          </Button>
          </div>

        </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  );
}

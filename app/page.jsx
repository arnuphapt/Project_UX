"use client";
import app from './Shared/firebaseConfig';
import PinList from './components/Pins/PinList';
import { getFirestore, collection, getDocs, query, limit, startAfter } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

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
    setLoading(true);
    const q = query(collection(db, 'pinterest-post'), limit(150));
    const querySnapshot = await getDocs(q);

    const pins = [];
    querySnapshot.forEach((doc) => {
      pins.push({ ...doc.data(), id: doc.id });
    });

    setListOfPins(pins);
    setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
    setLoading(false);
  };

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
      newPins.push({ ...doc.data(), id: doc.id });
    });

    setListOfPins(prevPins => [...prevPins, ...newPins]);
    setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
    setLoading(false);
  };

  const handleDoNotShowAgain = () => {
    // Set current time in local storage
    localStorage.setItem("modalTimestamp", new Date().toISOString());
    setShowModal(false);
    onOpenChange(false);
  };

  return (
    <>
      <div className="p-4">
        <PinList 
          listOfPins={listOfPins} 
          getMorePins={getMorePins}
          loading={loading}
        />
      </div>

      {showModal && (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">ประกาศๆ</ModalHeader>
                <ModalBody>
                  <p> 
                    ไปเพิ่มรหัสนักศึกษากับกลุ่มที่นักศึกษาอยู่ที่โปรไฟล์ของตัวก่อนทำการสร้างโพสต์ด้วยนะครับบ
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onPress={onClose}>
                    OK
                  </Button>
                  <Button color="secondary" onPress={handleDoNotShowAgain}>
                    Do not show again
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  );
}

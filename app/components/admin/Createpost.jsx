'use client';

import React, { useState } from 'react';
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Textarea } from "@nextui-org/react";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { app } from '../../Shared/firebaseConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaLink } from 'react-icons/fa';
import { useSession } from "next-auth/react";

export default function CreatePost({ isOpen, onClose }) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    link: '' // เพิ่มฟิลด์สำหรับเก็บลิงก์
  });

  const db = getFirestore(app);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ฟังก์ชันตรวจสอบความถูกต้องของ URL
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSave = async () => {
    if (!session?.user) {
      toast.error('You must be logged in to create a post');
      return;
    }

    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    // ตรวจสอบ URL ถ้ามีการกรอก
    if (formData.link && !isValidUrl(formData.link)) {
      toast.error('Please enter a valid URL');
      return;
    }

    setLoading(true);
    try {
      const postData = {
        title: formData.title,
        content: formData.content,
        link: formData.link, // เพิ่มลิงก์ในข้อมูลที่จะบันทึก
        authorName: session.user.name,
        authorEmail: session.user.email,
        authorImage: session.user.image,
        createdAt: serverTimestamp()
      };

      await addDoc(collection(db, 'admin-posts'), postData);
      toast.success('Post created successfully');
      onClose();
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('An error occurred while creating the post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalHeader>Create New Post</ModalHeader>
        <ModalBody className="gap-4">
          <Input
            type="text"
            name="title"
            label="Title"
            placeholder="Enter post title"
            value={formData.title}
            onChange={handleInputChange}
          />
          <Textarea
            name="content"
            label="Content"
            placeholder="Write your post content"
            value={formData.content}
            onChange={handleInputChange}
          />
          <Input
            type="url"
            name="link"
            label="Link (Optional)"
            placeholder="Enter URL"
            value={formData.link}
            onChange={handleInputChange}
            startContent={<FaLink className="text-default-400" />}
          />
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} variant="light">Cancel</Button>
          <Button 
            onClick={handleSave} 
            isLoading={loading}
            color="primary"
          >
            {loading ? 'Creating...' : 'Create'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
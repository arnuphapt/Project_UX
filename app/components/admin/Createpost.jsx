'use client';

import React, { useState } from 'react';
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Textarea } from "@nextui-org/react";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { app } from '../../Shared/firebaseConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaHeading, FaFileAlt } from 'react-icons/fa';
import { useSession } from "next-auth/react";

export default function CreatePost() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });

  const db = getFirestore(app);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    setFormData({ title: '', content: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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

    setLoading(true);
    try {
      const postData = {
        title: formData.title,
        content: formData.content,
        authorName: session.user.name,
        authorEmail: session.user.email,
        authorImage: session.user.image,
        createdAt: serverTimestamp()
      };

      await addDoc(collection(db, 'admin-posts'), postData);
      toast.success('Post created successfully');
      handleClose();
    } catch (error) {
      console.error("Error creating post: ", error);
      toast.error('An error occurred while creating the post');
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return null;
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <Button 
        onClick={handleOpen}
        className="w-full bg-gradient-to-tr from-cyan-500 to-blue-500 text-white font-semibold p-6"
      >
        Create New Post
      </Button>

      <Modal 
        isOpen={isOpen} 
        onClose={handleClose}
        size="2xl"
      >
        <ModalContent>
          <ModalHeader className="text-xl font-bold">Create New Post</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                type="text"
                name="title"
                label="Post Title"
                placeholder="Enter post title"
                value={formData.title}
                onChange={handleInputChange}
                variant="bordered"
                size="lg"
                endContent={<FaHeading />}
                isRequired
              />

              <Textarea
                name="content"
                label="Post Content"
                placeholder="Write your post content here..."
                value={formData.content}
                onChange={handleInputChange}
                variant="bordered"
                size="lg"
                minRows={5}
                endContent={<FaFileAlt />}
                isRequired
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button 
              color="danger" 
              variant="light" 
              onClick={handleClose}
              className="font-semibold"
            >
              Cancel
            </Button>
            <Button 
              color="primary"
              onClick={handleSave}
              isLoading={loading}
              className="font-semibold bg-gradient-to-tr from-cyan-500 to-blue-500 text-white"
            >
              {loading ? 'Creating...' : 'Create Post'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ToastContainer position="bottom-center" autoClose={3000} />
    </div>
  );
}
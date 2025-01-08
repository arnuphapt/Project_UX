"use client";

import React, { useEffect, useState } from "react";
import { db } from "../../Shared/firebaseConfig";
import { collection, getDocs, orderBy, query, doc, updateDoc, deleteDoc, addDoc, serverTimestamp } from "firebase/firestore";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
  useDisclosure,
  Spinner,
  Badge
} from "@nextui-org/react";
import { MoreVertical, Edit, Trash2, Link as LinkIcon } from 'lucide-react';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useSession } from "next-auth/react";

const AdminPosts = () => {
  const { data: session } = useSession();
  const [adminPosts, setAdminPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
  const { 
    isOpen: isDeleteModalOpen, 
    onOpen: onDeleteModalOpen, 
    onClose: onDeleteModalClose 
  } = useDisclosure();
  const [selectedPost, setSelectedPost] = useState(null);
  const [postToDelete, setPostToDelete] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    link: ""
  });
  const [modalMode, setModalMode] = useState('create');

  useEffect(() => {
    fetchAdminPosts();
  }, []);

  const fetchAdminPosts = async () => {
    try {
      const q = query(
        collection(db, "admin-posts"),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAdminPosts(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching admin posts: ", error);
      setIsLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setModalMode('create');
    setFormData({
      title: "",
      content: "",
      link: ""
    });
    onModalOpen();
  };

  const handleOpenEdit = (post) => {
    setModalMode('edit');
    setSelectedPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      link: post.link || ""
    });
    onModalOpen();
  };

  const handleOpenDelete = (post) => {
    setPostToDelete(post);
    onDeleteModalOpen();
  };

  const handleDelete = async () => {
    if (!postToDelete) return;
    
    setIsProcessing(true);
    try {
      await deleteDoc(doc(db, "admin-posts", postToDelete.id));
      toast.success("Post deleted successfully!");
      fetchAdminPosts();
      onDeleteModalClose();
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("เกิดข้อผิดพลาดในการลบโพสต์");
    } finally {
      setIsProcessing(false);
      setPostToDelete(null);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!session?.user) {
      toast.error('You must be logged in to manage posts');
      return;
    }

    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.link && !isValidUrl(formData.link)) {
      toast.error('Please enter a valid URL');
      return;
    }

    setIsProcessing(true);
    try {
      if (modalMode === 'create') {
        const postData = {
          title: formData.title,
          content: formData.content,
          link: formData.link,
          authorName: session.user.name,
          authorEmail: session.user.email,
          authorImage: session.user.image,
          createdAt: serverTimestamp()
        };
        await addDoc(collection(db, 'admin-posts'), postData);
        toast.success('Post created successfully');
      } else {
        const postRef = doc(db, "admin-posts", selectedPost.id);
        await updateDoc(postRef, {
          title: formData.title,
          content: formData.content,
          link: formData.link
        });
        toast.success("Post updated successfully!");
      }
      fetchAdminPosts();
      onModalClose();
    } catch (error) {
      console.error("Error managing post:", error);
      toast.error(modalMode === 'create' ? 
        'An error occurred while creating the post' : 
        'เกิดข้อผิดพลาดในการอัปเดตโพสต์'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "ไม่ทราบวันที่";
    const date = timestamp.toDate();
    return date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer position="bottom-center" autoClose={2000} />
      <div className="flex justify-between items-center mb-6">
      <h1 className="text-black text-2xl font-bold">All Posts</h1>
        <Button
          className="font-semibold bg-gradient-to-tr from-cyan-500 to-blue-500 text-white"
          onPress={handleOpenCreate}
          isDisabled={isLoading}
        >
          Create new post
        </Button>
      </div>

      {isLoading ? (
        <div className="min-h-[200px] flex justify-center items-center">
          <Spinner
            size="lg"
            color="primary"
            label="Loading posts..."
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminPosts.map((post) => (
            <Card key={post.id} className="w-full shadow-md">
              <CardHeader className="flex justify-between items-center">
                <div className="flex gap-3">
                <Badge color="success" content="" placement="bottom-right" shape="circle">

                  <Avatar
                    radius="full"
                    size="md"
                    src={post.authorImage}
                    alt={`${post.authorName}'s avatar`}
                  />
                  </Badge>
                  <div className="flex flex-col">
                    <p className="text-md font-bold">{post.authorName}</p>
                    <p className="text-small text-default-500">{post.authorEmail}</p>
                  </div>
                </div>
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      isIconOnly
                      variant="light"
                      className="text-default-400"
                    >
                      <MoreVertical size={20} />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Post actions">
                    <DropdownItem
                      key="edit"
                      startContent={<Edit size={18} />}
                      onPress={() => handleOpenEdit(post)}
                    >
                      Edit
                    </DropdownItem>
                    <DropdownItem
                      key="delete"
                      className="text-danger"
                      color="danger"
                      startContent={<Trash2 size={18} />}
                      onPress={() => handleOpenDelete(post)}
                    >
                      Delete
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </CardHeader>
              <CardBody className="flex-grow">
              <h2 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h2>
              <p className="mb-2 flex-grow line-clamp-3">{post.content}</p>
                <p className="text-sm text-default-500 mt-2">
                  โพสต์เมื่อ: {formatDate(post.createdAt)}
                </p>
              </CardBody>
              <Divider />
              <CardFooter>
                {post.link ? (
                  <Link
                    isExternal
                    showAnchorIcon
                    href={post.link}
                    className="text-primary"
                  >
                    See More
                  </Link>
                ) : (
                  <span className="text-default-400">No additional links</span>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      <Modal
    isOpen={isModalOpen}
    onOpenChange={onModalClose}
    size="2xl"
  >
    <ModalContent>
      {(onClose) => (
        <form onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}>
          <ModalHeader className="flex flex-col gap-1">
            {modalMode === 'create' ? 'Create New Post' : 'Edit Post'}
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                type="text"
                name="title"
                label="Title"
                placeholder="Enter post title"
                value={formData.title}
                onChange={handleInputChange}
                isRequired
              />
              <Textarea
                name="content"
                label="Content"
                placeholder="Write your post content"
                value={formData.content}
                onChange={handleInputChange}
                minRows={3}
                isRequired
              />
              <Input
                type="url"
                name="link"
                label="Link (Optional)"
                placeholder="Enter URL"
                value={formData.link}
                onChange={handleInputChange}
                startContent={<LinkIcon className="text-default-400" size={18} />}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              onPress={onClose}
              isDisabled={isProcessing}
              type="button"
            >
              Close
            </Button>
            <Button
              color="primary"
              type="submit"
              isLoading={isProcessing}
              isDisabled={isProcessing}
            >
              {isProcessing ? 
                (modalMode === 'create' ? 'Creating...' : 'Saving...') : 
                (modalMode === 'create' ? 'Create' : 'Save')}
            </Button>
          </ModalFooter>
        </form>
      )}
    </ModalContent>
  </Modal>
      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onOpenChange={onDeleteModalClose}
        size="sm"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
              Confirm Delete
              </ModalHeader>
              <ModalBody>
                <p>Are you sure you want to delete this post? This action cannot be undone.</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="default"
                  variant="light"
                  onPress={onClose}
                  isDisabled={isProcessing}
                >
                  Cancel
                </Button>
                <Button
                  color="danger"
                  onPress={handleDelete}
                  isLoading={isProcessing}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AdminPosts;
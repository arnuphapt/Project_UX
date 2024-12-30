import React, { useEffect, useState } from "react";
import { db } from "../../Shared/firebaseConfig";
import { collection, getDocs, orderBy, query, doc, updateDoc, deleteDoc } from "firebase/firestore";
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
  CircularProgress
} from "@nextui-org/react";
import { MoreVertical, Edit, Trash2 } from 'lucide-react';
import { ToastContainer,toast } from "react-toastify";

const AdminPosts = () => {
  const [adminPosts, setAdminPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedPost, setSelectedPost] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [editForm, setEditForm] = useState({
    title: "",
    content: "",
    link: ""
  });

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

  const handleEdit = (post) => {
    setSelectedPost(post);
    setEditForm({
      title: post.title,
      content: post.content,
      link: post.link || ""
    });
    onOpen();
  };

  const handleDelete = async (postId) => {
    if (window.confirm("คุณแน่ใจหรือไม่ที่จะลบโพสต์นี้?")) {
      try {
        await deleteDoc(doc(db, "admin-posts", postId));
        toast.success("Post deleted successfully!");
        fetchAdminPosts(); // รีเฟรชข้อมูล
      } catch (error) {
        console.error("Error deleting post:", error);
        toast.error("เกิดข้อผิดพลาดในการลบโพสต์");
      }
    }
  };

  const handleSaveEdit = async (onClose) => {
    setIsSaving(true);
    try {
      const postRef = doc(db, "admin-posts", selectedPost.id);
      await updateDoc(postRef, {
        title: editForm.title,
        content: editForm.content,
        link: editForm.link
      });

      toast.success("Post updated successfully!");
      fetchAdminPosts(); // รีเฟรชข้อมูล
      onClose();
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("เกิดข้อผิดพลาดในการอัปเดตโพสต์");
    }
    finally {
      setIsSaving(false);
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

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-full min-h-screen">
          <CircularProgress
            aria-label="Loading student information..."
            size="lg"
            color='primary'
            label="Loading post..."
          />
        </div>
      </div>
    )
  }

  return (
    
    <div className="container mx-auto px-4 py-8">
            <ToastContainer position="bottom-center" autoClose={2000} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminPosts.map((post) => (
          <Card key={post.id} className="w-full">
            <CardHeader className="flex justify-between items-center">
              <div className="flex gap-3">
                <Avatar
                  isBordered
                  radius="full"
                  size="md"
                  src={post.authorImage}
                  alt={`${post.authorName}'s avatar`}
                />
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
                    onPress={() => handleEdit(post)}
                  >
                    Edit
                  </DropdownItem>
                  <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                    startContent={<Trash2 size={18} />}
                    onPress={() => handleDelete(post.id)}
                  >
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </CardHeader>
            <Divider />
            <CardBody className="flex-grow">
              <h3 className="font-bold mb-2 text-lg">{post.title}</h3>
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
                  ดูเพิ่มเติม
                </Link>
              ) : (
                <span className="text-default-400">ไม่มีลิงก์เพิ่มเติม</span>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="2xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Edit Post</ModalHeader>
              <ModalBody>
                <Input
                  label="Title"
                  placeholder="Edit post title"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="mb-4"
                />
                <Textarea
                  label="Content"
                  placeholder="Edit Content"
                  value={editForm.content}
                  onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                  className="mb-4"
                  minRows={3}
                />
                <Input
                  label="Link (Optional)"
                  placeholder="Edit Link"
                  value={editForm.link}
                  onChange={(e) => setEditForm({ ...editForm, link: e.target.value })}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  isDisabled={isSaving}  // ปิดปุ่ม Close ระหว่าง saving
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => handleSaveEdit(onClose)}
                  isLoading={isSaving}   // แสดง loading spinner
                  isDisabled={isSaving}  // ปิดปุ่มระหว่าง saving
                >
                  {isSaving ? "Saving..." : "Save"}
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
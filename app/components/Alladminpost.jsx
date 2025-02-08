"use client";
import React, { useEffect, useState } from "react";
import { db } from "../Shared/firebaseConfig";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Avatar,
  Spinner,
  Badge
} from "@heroui/react";

import Breadcrumbs from "../components/Breadcrumbs";
const AdminPosts = () => {
  const [adminPosts, setAdminPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    <div className="p-4 space-y-4">
              <Breadcrumbs/>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">All Admin Post</h2>
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
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
                  <span className="text-default-400">No additional links
                  </span>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPosts;
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "../../Shared/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Pagination,
  Spinner,
  getKeyValue
} from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";

const PostList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const router = useRouter();

  const list = useAsyncList({
    async load({ signal }) {
      try {
        const postsCollection = collection(db, "pinterest-post");
        const postsSnapshot = await getDocs(postsCollection);
        const postsList = postsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setIsLoading(false);
        return {
          items: postsList,
        };
      } catch (error) {
        console.error("Error fetching posts: ", error);
        setIsLoading(false);
        return { items: [] };
      }
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          let first = a[sortDescriptor.column];
          let second = b[sortDescriptor.column];
          let cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;
          if (sortDescriptor.direction === "descending") {
            cmp *= -1;
          }
          return cmp;
        }),
      };
    },
  });

  const navigateToProfile = (email) => {
    if (email) {
      router.push(`/users/${email}`);
    }
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = list.items.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(list.items.length / postsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto p-4">
      <Table
        aria-label="Post Data Table with sorting"
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort}
        classNames={{
          table: "min-h-[400px]",
        }}
      >
        <TableHeader>
          <TableColumn key="title" allowsSorting>Title</TableColumn>
          <TableColumn key="userName" allowsSorting>User</TableColumn>
          <TableColumn key="section" allowsSorting>Section</TableColumn>
          <TableColumn key="viewCount" allowsSorting>View Count</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody 
          items={currentPosts}
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
        >
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>{getKeyValue(item, 'title') || "N/A"}</TableCell>
              <TableCell>
                <User
                  name={item.userName || "N/A"}
                  description={item.email}
                  avatarProps={{
                    src: item.userImage || "/path/to/default/image.png",
                  }}
                />
              </TableCell>
              <TableCell>{getKeyValue(item, 'section') || "N/A"}</TableCell>
              <TableCell>{getKeyValue(item, 'viewCount') || 0}</TableCell>
              <TableCell>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                  onClick={() => navigateToProfile(item.email)}
                >
                  View
                </button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex w-full justify-center">
        <Pagination
          isCompact
          showControls
          total={totalPages}
          initialPage={currentPage}
          onChange={handlePageChange}
          className="mt-4"
        />
      </div>
    </div>
  );
};

export default PostList;
"use client";
import { useEffect, useState } from "react";
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
} from "@nextui-org/react";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10; // Adjust the number of posts per page

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch posts from "pinterest-post" collection
        const postsCollection = collection(db, "pinterest-post");
        const postsSnapshot = await getDocs(postsCollection);
        const postsList = postsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPosts(postsList);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    };

    fetchPosts();
  }, []);

  // Calculate the current posts to display
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto p-4">
      <Table aria-label="Post Data Table">
        <TableHeader>
          <TableColumn>No.</TableColumn>
          <TableColumn>Title</TableColumn>
          <TableColumn>User</TableColumn>
          <TableColumn>Section</TableColumn>
          <TableColumn>View Count</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No posts to display."}>
          {currentPosts.map((post, index) => (
            <TableRow key={post.id}>
              <TableCell>{indexOfFirstPost + index + 1}</TableCell>
              <TableCell>{post.title || "N/A"}</TableCell>
              <TableCell>
                <User
                  name={post.userName || "N/A"}
                  description={post.userImage}
                  avatarProps={{
                    src: post.userImage || "/path/to/default/image.png",
                  }}
                />
              </TableCell>
              <TableCell>{post.section || "N/A"}</TableCell>
              <TableCell>{post.viewCount || 0}</TableCell>
              <TableCell>
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                  View
                </button>
              </TableCell>
            </TableRow>
          ))}
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

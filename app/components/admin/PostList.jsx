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
  getKeyValue,
  Button,
  Input,
  Select,
  SelectItem
} from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { Search } from "lucide-react";

const PostList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [filters, setFilters] = useState({
    section: new Set([])
  });
  const [filterOptions, setFilterOptions] = useState({
    section: []
  });
  
  const router = useRouter();

  const list = useAsyncList({
    async load({ signal }) {
      try {
        const postsCollection = collection(db, "pinterest-post");
        const postsSnapshot = await getDocs(postsCollection);
        const postsList = postsSnapshot.docs.map((doc, index) => ({
          id: doc.id,
          ...doc.data(),
          no: index + 1,
        }));

        // Extract unique sections and sort them numerically
        const sections = [...new Set(postsList.map(post => post.section).filter(Boolean))]
          .sort((a, b) => {
            // Extract numbers from section strings and compare
            const numA = parseInt(a.match(/\d+/)[0]);
            const numB = parseInt(b.match(/\d+/)[0]);
            return numA - numB;
          });

        setFilterOptions({
          section: sections.map(section => ({ key: section, label: section }))
        });

        setFilteredItems(postsList);
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

  useEffect(() => {
    // Filter items based on search query and selected filters
    const filtered = list.items.filter((item) => {
      const searchTerm = searchQuery.toLowerCase();
      const matchesSearch = 
        item.title?.toLowerCase().includes(searchTerm) ||
        item.userName?.toLowerCase().includes(searchTerm) ||
        item.section?.toLowerCase().includes(searchTerm) ||
        item.email?.toLowerCase().includes(searchTerm);

      const matchesSection = filters.section.size === 0 || filters.section.has(item.section);

      return matchesSearch && matchesSection;
    });

    setFilteredItems(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [searchQuery, filters, list.items]);

  const handleFilterChange = (selectedValues) => {
    setFilters({
      section: new Set(selectedValues)
    });
  };

  const navigateToPost = (userName, postId) => {
    if (userName && postId) {
      router.push(`/post/${userName}/${postId}`);
    }
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredItems.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredItems.length / postsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center mb-4">
        <Input
          isClearable
          className="w-full md:w-[44%]"
          placeholder="Search by title, user, section, or email..."
          startContent={<Search className="text-default-300" />}
          value={searchQuery}
          onClear={() => setSearchQuery("")}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Select
          label="Filter by Section"
          selectionMode="multiple"
          placeholder="Select sections"
          className="w-full md:w-[30%]"
          selectedKeys={filters.section}
          onSelectionChange={handleFilterChange}
        >
          {filterOptions.section.map((section) => (
            <SelectItem key={section.key} value={section.key}>
              {section.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      <Table
        aria-label="Post Data Table with sorting"
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort}
        classNames={{
          table: "min-h-[400px]",
        }}
      >
        <TableHeader>
          <TableColumn key="no" allowsSorting>No.</TableColumn>
          <TableColumn key="title" allowsSorting>Title</TableColumn>
          <TableColumn key="userName" allowsSorting>User</TableColumn>
          <TableColumn key="section" allowsSorting>Section</TableColumn>
          <TableColumn key="viewCount" allowsSorting>Link</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody 
          items={currentPosts}
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
        >
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>{item.no}</TableCell>
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
              <TableCell>
                <Button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                  onClick={() => window.open(item.link)}
                  aria-label="Button for open destination link"
                >
                  Open Url
                </Button>
              </TableCell>
              <TableCell>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                  onClick={() => navigateToPost(item.userName, item.id)}
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
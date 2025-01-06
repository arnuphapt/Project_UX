"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "../../Shared/firebaseConfig";
import { collection, getDocs, deleteDoc, doc, query, orderBy } from "firebase/firestore";
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
  SelectItem,
  Link,
  Tooltip,
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  useDisclosure,
  Tabs,
  Tab
} from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { Search } from "lucide-react";
import { FaEye } from "react-icons/fa";
import { MdOutlineLink } from "react-icons/md";
import { Trash2 } from 'lucide-react';

const PostList = () => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [filters, setFilters] = useState({
    section: new Set([])
  });
  const [filterOptions, setFilterOptions] = useState({
    section: []
  });
  const [dateFilters, setDateFilters] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("");
  
  const router = useRouter();

  const rowsPerPageOptions = [
    { key: "5", value: "5" },
    { key: "10", value: "10" },
    { key: "15", value: "15" },
    { key: "20", value: "20" },
  ];

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat('th-TH', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }).format(date);
  };

  const formatDateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return `${start.toLocaleDateString('th-TH', { 
      year: '2-digit',
      month: 'short'
    })} - ${end.toLocaleDateString('th-TH', { 
      year: '2-digit',
      month: 'short'
    })}`;
  };

  // Fetch date filters
  useEffect(() => {
    const fetchDateFilters = async () => {
      try {
        const q = query(collection(db, 'filterdata'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const filtersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setDateFilters(filtersData);
      } catch (error) {
        console.error('Error fetching date filters:', error);
      }
    };

    fetchDateFilters();
  }, []);

  const getSelectionText = () => {
    if (selectedKeys === "all") {
      return `All ${filteredItems.length} posts selected`;
    }
    if (selectedKeys.size === 0) {
      return `Total ${filteredItems.length} posts`;
    }
    if (selectedKeys.size === filteredItems.length) {
      return `All ${filteredItems.length} posts selected`;
    }
    return `${selectedKeys.size} of ${filteredItems.length} posts selected`;
  };

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

        const sections = [...new Set(postsList.map(post => post.section).filter(Boolean))]
          .sort((a, b) => {
            const numA = parseInt(a.match(/\d+/)?.[0] || '0');
            const numB = parseInt(b.match(/\d+/)?.[0] || '0');
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
          
          if (sortDescriptor.column === 'timestamp') {
            first = first?.toDate?.() || new Date(0);
            second = second?.toDate?.() || new Date(0);
          }
          
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
    const filtered = list.items.filter((item) => {
      const searchTerm = searchQuery.toLowerCase();
      const matchesSearch = 
        item.title?.toLowerCase().includes(searchTerm) ||
        item.userName?.toLowerCase().includes(searchTerm) ||
        item.section?.toLowerCase().includes(searchTerm) ||
        item.email?.toLowerCase().includes(searchTerm);

      const matchesSection = filters.section.size === 0 || filters.section.has(item.section);

      // Date filter
      let matchesDate = true;
      if (selectedPeriod) {
        const selectedFilter = dateFilters.find(filter => filter.id === selectedPeriod);
        if (selectedFilter) {
          const postDate = item.timestamp?.toDate();
          const filterStart = new Date(selectedFilter.startDate);
          const filterEnd = new Date(selectedFilter.endDate);
          matchesDate = postDate >= filterStart && postDate <= filterEnd;
        }
      }

      return matchesSearch && matchesSection && matchesDate;
    });

    setFilteredItems(filtered);
    setCurrentPage(1);
  }, [searchQuery, filters, list.items, selectedPeriod, dateFilters]);

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

  const indexOfLastPost = currentPage * rowsPerPage;
  const indexOfFirstPost = indexOfLastPost - rowsPerPage;
  const currentPosts = filteredItems.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredItems.length / rowsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSelectionChange = (selection) => {
    setSelectedKeys(selection);
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const selectedIds = Array.from(selectedKeys);
      
      for (const id of selectedIds) {
        await deleteDoc(doc(db, "pinterest-post", id));
      }

      const result = await list.reload();
      setSelectedKeys(new Set([]));
      onClose();
      
    } catch (error) {
      console.error("Error deleting documents: ", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-black text-2xl font-bold mb-4">All Posts</h1>
      
      <div className="flex flex-col gap-4 md:flex-row md:items-center mb-4">

        <Input
          isClearable
          label="Search Bar"
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
          className="w-[200px]"
          selectedKeys={filters.section}
          onSelectionChange={handleFilterChange}
        >
          {filterOptions.section.map((section) => (
            <SelectItem key={section.key} value={section.key}>
              {section.label}
            </SelectItem>
          ))}
        </Select>

                <Select
          label="Filter by Period"
          placeholder="Select time period"
          className="w-[200px]"
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
        >
          <SelectItem key="" value="">All Periods</SelectItem>
          {dateFilters.map((filter) => (
            <SelectItem key={filter.id} value={filter.id}>
              {filter.name}
            </SelectItem>
          ))}
        </Select>
        {(selectedKeys.size > 0 || selectedKeys === "all") && (
          <Button 
            color="danger" 
            variant="flat"
            onPress={onOpen}
            className="ml-4"
            startContent={<Trash2 size={16} />}
          >
            Delete Selected
          </Button>
        )}
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Confirm Deletion</ModalHeader>
              <ModalBody>
                Are you sure you want to delete {selectedKeys.size === filteredItems.length ? "all" : selectedKeys.size} selected items? This action cannot be undone.
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button 
                  color="danger" 
                  onPress={handleDelete}
                  isLoading={isDeleting}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <p className="text-gray-500 text-sm">{getSelectionText()}</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Rows per page:</span>
            <Select 
              size="sm"
              className="w-24"
              value={rowsPerPage.toString()}
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
              defaultSelectedKeys={["10"]}
            >
              {rowsPerPageOptions.map((option) => (
                <SelectItem key={option.key} value={option.value}>
                  {option.key}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
      </div>

      <Table
        aria-label="Post Data Table with sorting and selection"
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort}
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={handleSelectionChange}
      >
        <TableHeader>
          <TableColumn key="no" allowsSorting>No.</TableColumn>
          <TableColumn key="title" allowsSorting>Title</TableColumn>
          <TableColumn key="userName" allowsSorting>User</TableColumn>
          <TableColumn key="section" allowsSorting>Section</TableColumn>
          <TableColumn key="timestamp" allowsSorting>Posted At</TableColumn>
          <TableColumn></TableColumn>
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
              <TableCell>{formatTimestamp(item.timestamp)}</TableCell>
              <TableCell>
                <Tooltip content="Link">
                  <Link 
                    color="foreground"
                    className="cursor-pointer p-4"
                    onPress={() => window.open(item.link)}
                    aria-label="Button for open destination link"
                  >
                    <MdOutlineLink className="text-xl"/>
                  </Link>
                </Tooltip>
                <Tooltip content="View post">
                  <Link 
                    color="foreground"
                    className="cursor-pointer p-4"
                    onPress={() => navigateToPost(item.userName, item.id)}
                  >
                    <FaEye className="text-xl"/>
                  </Link>
                </Tooltip>
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
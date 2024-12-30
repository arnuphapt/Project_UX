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
  Input,
  Link,
  Tooltip
} from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { Search } from "lucide-react";
import { FaEye } from "react-icons/fa";

const UserList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const router = useRouter();

  const list = useAsyncList({
    async load({ signal }) {
      try {
        const usersCollection = collection(db, "user");
        const userSnapshot = await getDocs(usersCollection);
        const userList = userSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const studentInfoCollection = collection(db, "student-info");
        const studentInfoSnapshot = await getDocs(studentInfoCollection);
        const studentInfoList = studentInfoSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const combinedData = userList.map((user, index) => {
          const student = studentInfoList.find((info) => info.id === user.id);
          return {
            ...user,
            no: index + 1,
            studentId: student ? student.studentId : null,
            section: student ? student.section : "N/A",
            role: student && student.studentId ? "student" : "guest",
          };
        });

        // Adjust users per page based on total items
        const totalItems = combinedData.length;
        const newUsersPerPage = Math.ceil(totalItems / Math.ceil(totalItems / 10));
        setUsersPerPage(newUsersPerPage);
        setFilteredItems(combinedData);

        setIsLoading(false);
        return {
          items: combinedData,
        };
      } catch (error) {
        console.error("Error fetching data: ", error);
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
    // Filter items based on search query
    const filtered = list.items.filter((item) => {
      const searchTerm = searchQuery.toLowerCase();
      return (
        (item.studentId?.toLowerCase().includes(searchTerm) || '') ||
        item.userName?.toLowerCase().includes(searchTerm) ||
        item.section?.toLowerCase().includes(searchTerm) ||
        item.role?.toLowerCase().includes(searchTerm)
      );
    });
    setFilteredItems(filtered);
    setCurrentPage(1); // Reset to first page when searching
  }, [searchQuery, list.items]);

  const navigateToProfile = (email) => {
    if (email) {
      router.push(`/users/${email}`);
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredItems.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredItems.length / usersPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Search by name, student ID, section, or role..."
          startContent={<Search className="text-default-300" />}
          value={searchQuery}
          onClear={() => setSearchQuery("")}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Table
        aria-label="User Data Table with sorting"
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort}
        classNames={{
          table: "min-h-[400px]",
        }}
      >
        <TableHeader>
          <TableColumn key="studentId" allowsSorting>Student ID</TableColumn>
          <TableColumn key="userName" allowsSorting>NAME</TableColumn>
          <TableColumn key="section" allowsSorting>SECTION</TableColumn>
          <TableColumn key="role" allowsSorting>ROLE</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody 
          items={currentUsers}
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
        >
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>{item.studentId || "N/A"}</TableCell>
              <TableCell>
                <User
                  name={item.userName || "N/A"}
                  description={item.id}
                  avatarProps={{
                    src: item.userImage || "/path/to/default/image.png",
                  }}
                />
              </TableCell>
              <TableCell>{getKeyValue(item, 'section')}</TableCell>
              <TableCell>{getKeyValue(item, 'role')}</TableCell>
              <TableCell>
                <Tooltip content="View User">
                <Link color="foreground"
                className="cursor-pointer"
                  onClick={() => navigateToProfile(item.email)}
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

export default UserList;
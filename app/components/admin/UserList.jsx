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
  Tooltip,
  Select,
  SelectItem,
  Card,
  CardBody,
  Chip
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
  const [filters, setFilters] = useState({
    section: new Set([]),
    role: new Set([])
  });


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
    const filtered = list.items.filter((item) => {
      const searchTerm = searchQuery.toLowerCase();
      const matchesSearch = 
        (item.studentId?.toLowerCase().includes(searchTerm) || '') ||
        item.userName?.toLowerCase().includes(searchTerm) ||
        item.section?.toLowerCase().includes(searchTerm) ||
        item.role?.toLowerCase().includes(searchTerm);

      const matchesSection = filters.section.size === 0 || filters.section.has(item.section);
      const matchesRole = filters.role.size === 0 || filters.role.has(item.role);

      return matchesSearch && matchesSection && matchesRole;
    });
    setFilteredItems(filtered);
    setCurrentPage(1);
  }, [searchQuery, filters, list.items]);

  const handleFilterChange = (filterType, selectedValues) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: new Set(selectedValues)
    }));
  };

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
      <h1 className="text-black text-2xl font-bold mb-4">All Accounts</h1>
      <div className="flex flex-col gap-4 md:flex-row md:items-center mb-4">
        <Input
          isClearable
          label="Search Bar"
          className="w-full md:w-[44%]"
          placeholder="Search by name, student ID, section, or role..."
          startContent={<Search className="text-default-300" />}
          value={searchQuery}
          onClear={() => setSearchQuery("")}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex gap-2 flex-wrap md:flex-nowrap">
          <Select
            label="Filter by Section"
            selectionMode="multiple"
            placeholder="Select sections"
            className="w-[200px]"
            selectedKeys={filters.section}
            onSelectionChange={(keys) => handleFilterChange('section', keys)}
          >
            <SelectItem key="1" value="1"> 1</SelectItem>
            <SelectItem key="2" value="2"> 2</SelectItem>
            <SelectItem key="3" value="3"> 3</SelectItem>
            <SelectItem key="4" value="4"> 4</SelectItem>
          </Select>
          <Select
            label="Filter by Role"
            selectionMode="multiple"
            placeholder="Select roles"
            className="w-[200px]"
            selectedKeys={filters.role}
            onSelectionChange={(keys) => handleFilterChange('role', keys)}
          >
            <SelectItem key="student" value="student">Student</SelectItem>
            <SelectItem key="guest" value="guest">Guest</SelectItem>
          </Select>
        </div>
      </div>

      {/* Table */}
      <Table
        aria-label="User Data Table with sorting"
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort}
      >
        <TableHeader>
          <TableColumn key="studentId" allowsSorting>Student ID</TableColumn>
          <TableColumn key="userName" allowsSorting>NAME</TableColumn>
          <TableColumn key="section" allowsSorting>SECTION</TableColumn>
          <TableColumn key="role" allowsSorting>ROLE</TableColumn>
          <TableColumn>Actions</TableColumn>
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
                  <Link 
                    color="foreground"
                    className="cursor-pointer"
                    onPress={() => navigateToProfile(item.email)}
                  >
                    <FaEye className="text-xl"/>
                  </Link>
                </Tooltip>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
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
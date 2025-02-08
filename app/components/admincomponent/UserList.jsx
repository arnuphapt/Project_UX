"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "../../Shared/firebaseConfig";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
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
  Button,
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  useDisclosure
} from "@heroui/react";
import { useAsyncList } from "@react-stately/data";
import { Search, Trash2 } from "lucide-react";
import { FaEye } from "react-icons/fa";
import { RiEdit2Line } from "react-icons/ri";

const UserList = () => {
  const {isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose} = useDisclosure();
  const {isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose} = useDisclosure();
  const [editingUser, setEditingUser] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [filters, setFilters] = useState({
    section: new Set([]),
    role: new Set([])
  });

  const router = useRouter();

  const rowsPerPageOptions = [
    { key: "5", value: "5" },
    { key: "10", value: "10" },
    { key: "15", value: "15" },
    { key: "20", value: "20" },
  ];

  const getSelectionText = () => {
    if (selectedKeys == "all") {
      return `All ${filteredItems.length} users selected`;
    }
    if (selectedKeys.size === 0) {
      return `Total ${filteredItems.length} users`;
    }
    if (selectedKeys.size === filteredItems.length) {
      return `All ${filteredItems.length} users selected`;
    }
    return `${selectedKeys.size} of ${filteredItems.length} users selected`;
  };

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

    const handleEdit = async (values) => {
    try {
      if (!editingUser) return;

      // Update user document
      const userRef = doc(db, "user", editingUser.id);
      await updateDoc(userRef, {
        userName: values.userName,
        email: values.email
      });

      // Update student-info document if it exists and section is changed
      if (editingUser.role === "student") {
        const studentInfoRef = doc(db, "student-info", editingUser.id);
        await updateDoc(studentInfoRef, {
          section: values.section,
          studentId: values.studentId
        });
      }

      await list.reload();
      onEditClose();
      setEditingUser(null);

    } catch (error) {
      console.error("Error updating user: ", error);
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    onEditOpen();
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const selectedIds = Array.from(selectedKeys);
      
      for (const id of selectedIds) {
        await deleteDoc(doc(db, "user", id));
        // Also delete corresponding student-info if exists
        const studentInfoRef = doc(db, "student-info", id);
        await deleteDoc(studentInfoRef);
      }

      const result = await list.reload();
      setSelectedKeys(new Set([]));
      onDeleteClose();
      
    } catch (error) {
      console.error("Error deleting documents: ", error);
    } finally {
      setIsDeleting(false);
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
            <SelectItem key="1" value="1">1</SelectItem>
            <SelectItem key="2" value="2">2</SelectItem>
            <SelectItem key="3" value="3">3</SelectItem>
            <SelectItem key="4" value="4">4</SelectItem>
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
        {(selectedKeys.size > 0 || selectedKeys === "all") && (
          <Button 
            color="danger" 
            variant="flat"
            onPress={onDeleteOpen}
            className="ml-4"
            startContent={<Trash2 size={16} />}
          >
            Delete Selected
          </Button>
        )}
      </div>

      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Confirm Deletion</ModalHeader>
              <ModalBody>
                Are you sure you want to delete {selectedKeys.size == filteredItems.length ? "all" : selectedKeys.size} selected users? This action cannot be undone.
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

      <Modal isOpen={isEditOpen} onClose={onEditClose} size="2xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Edit User</ModalHeader>
              <ModalBody>
                {editingUser && (
                  <div className="flex flex-col gap-4">
                    <Input
                      label="Name"
                      defaultValue={editingUser.userName}
                      onChange={(e) => {
                        setEditingUser(prev => ({
                          ...prev,
                          userName: e.target.value
                        }));
                      }}
                      isDisabled
                    />
                    <Input
                      label="Email"
                      defaultValue={editingUser.email}
                      onChange={(e) => {
                        setEditingUser(prev => ({
                          ...prev,
                          email: e.target.value
                        }));
                      }}
                      isDisabled
                    />
                    {editingUser.role === "student" && (
                      <>
                        <Input
                          label="Student ID"
                          defaultValue={editingUser.studentId}
                          onChange={(e) => {
                            setEditingUser(prev => ({
                              ...prev,
                              studentId: e.target.value
                            }));
                          }}
                        />
                        <Select
                          label="Section"
                          defaultSelectedKeys={[editingUser.section]}
                          onChange={(e) => {
                            setEditingUser(prev => ({
                              ...prev,
                              section: e.target.value
                            }));
                          }}
                        >
                          <SelectItem key="1" value="1">1</SelectItem>
                          <SelectItem key="2" value="2">2</SelectItem>
                          <SelectItem key="3" value="3">3</SelectItem>
                          <SelectItem key="4" value="4">4</SelectItem>
                        </Select>
                      </>
                    )}
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button 
                  color="primary"
                  onPress={() => handleEdit(editingUser)}
                >
                  Save Changes
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
              value={usersPerPage.toString()}
              onChange={(e) => setUsersPerPage(Number(e.target.value))}
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
        aria-label="User Data Table with sorting and selection"
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort}
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <TableHeader>
          <TableColumn key="studentId" allowsSorting>Student ID</TableColumn>
          <TableColumn key="userName" allowsSorting>Name</TableColumn>
          <TableColumn key="section" allowsSorting>Section</TableColumn>
          <TableColumn key="role" allowsSorting>Role</TableColumn>
          <TableColumn></TableColumn>
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
                <div className="flex gap-4">
                  <Tooltip content="View User">
                    <Link 
                      color="foreground"
                      className="cursor-pointer px-4"
                      onPress={() => navigateToProfile(item.email)}
                    >
                      <FaEye className="text-xl"/>
                    </Link>
                  </Tooltip>
                  <Tooltip content="Edit User">
                    <Link 
                      color="foreground"
                      className="cursor-pointer px-4"
                      onPress={() => handleEditClick(item)}
                    >
                      <RiEdit2Line className="text-xl"/>
                    </Link>
                  </Tooltip>
                </div>
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
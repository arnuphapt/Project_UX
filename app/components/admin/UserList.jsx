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

const UserList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
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

        const combinedData = userList.map((user) => {
          const student = studentInfoList.find((info) => info.id === user.id);
          return {
            ...user,
            studentId: student ? student.studentId : null,
            section: student ? student.section : "N/A",
            role: student && student.studentId ? "student" : "guest",
          };
        });

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

  const navigateToProfile = (email) => {
    if (email) {
      router.push(`/users/${email}`);
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = list.items.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(list.items.length / usersPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto p-4">
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

export default UserList;
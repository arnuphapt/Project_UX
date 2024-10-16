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

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10; // Adjust this number based on how many users you want to show per page

  useEffect(() => {
    const fetchUsersAndStudentInfo = async () => {
      try {
        // Fetch user data from "user" collection
        const usersCollection = collection(db, "user");
        const userSnapshot = await getDocs(usersCollection);
        const userList = userSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Fetch student info from "student-info" collection
        const studentInfoCollection = collection(db, "student-info");
        const studentInfoSnapshot = await getDocs(studentInfoCollection);
        const studentInfoList = studentInfoSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Combine user and student info data based on some key
        const combinedData = userList.map((user) => {
          const student = studentInfoList.find((info) => info.id === user.id);
          return {
            ...user,
            studentId: student ? student.studentId : "N/A", // Assign studentId or "N/A" if not found
            section: student ? student.section : "N/A",    // Assign section or "N/A" if not found
          };
        });

        setUsers(combinedData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchUsersAndStudentInfo();
  }, []);

  // Calculate the current users to display
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto p-4">
      <Table aria-label="User Data Table">
        <TableHeader>
          <TableColumn>No.</TableColumn>
          <TableColumn>Student ID</TableColumn>
          <TableColumn>NAME</TableColumn>
          <TableColumn>SECTION</TableColumn>
          <TableColumn>ROLE</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No rows to display."}>
          {currentUsers.map((user, index) => (
            <TableRow key={user.id}>
              <TableCell>{indexOfFirstUser + index + 1}</TableCell>
              <TableCell>{user.studentId}</TableCell>
              <TableCell>
                <User
                  name={user.userName || "N/A"}
                  description={user.id}
                  avatarProps={{
                    src: user.userImage || "/path/to/default/image.png",
                  }}
                />
              </TableCell>
              <TableCell>{user.section || "N/A"}</TableCell>
              <TableCell>N/A</TableCell>
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

export default UserList;

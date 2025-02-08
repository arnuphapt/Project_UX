import React, { useState, useEffect } from 'react';
import { db } from '../Shared/firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  Button, 
  Input, 
  Select, 
  SelectItem, 
  Table, 
  TableHeader, 
  TableColumn, 
  TableBody, 
  TableRow, 
  TableCell, 
  useDisclosure, 
  Chip, 
  Link,
  Spinner,
  Tooltip
} from "@heroui/react";
import { RiEdit2Line } from "react-icons/ri";
import { FaRegTrashAlt } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminEmailManagement = () => {
  const [admins, setAdmins] = useState([]);
  const [formData, setFormData] = useState({
    email: '',
    role: 'ta',
    status: 'active'
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { 
    isOpen: isDeleteModalOpen, 
    onOpen: onDeleteModalOpen, 
    onClose: onDeleteModalClose 
  } = useDisclosure();
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [isLoading, setIsLoading] = useState(true); // Loading state for table data
  const [isSaving, setIsSaving] = useState(false); // Loading state for save operations
  const [adminToDelete, setAdminToDelete] = useState(null);

  const roles = [
    { value: 'admin', label: 'Admin' },
    { value: 'ta', label: 'Teaching Assistant' }
  ];

  const statuses = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ];

  const getRoleLabel = (roleValue) => {
    return roles.find(role => role.value === roleValue)?.label || roleValue;
  };

  const getStatusLabel = (statusValue) => {
    return statuses.find(status => status.value === statusValue)?.label || statusValue;
  };

  const fetchAdmins = async () => {
    setIsLoading(true);
    try {
      const snapshot = await getDocs(collection(db, 'adminEmails'));
      setAdmins(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    } catch (error) {
      console.error('Error fetching admins:', error);
      toast.error('Error loading admin data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      toast.error('Please enter email address');
      return;
    }
    
    setIsSaving(true);
    try {
      if (modalMode === 'add') {
        await addDoc(collection(db, 'adminEmails'), formData);
        toast.success('Admin added successfully');
      } else {
        await updateDoc(doc(db, 'adminEmails', formData.id), {
          role: formData.role,
          status: formData.status
        });
        toast.success('Admin updated successfully');
      }
      resetAndCloseModal();
      fetchAdmins();
    } catch (error) {
      console.error('Error managing admin:', error);
      toast.error('An error occurred while managing admin');
    } finally {
      setIsSaving(false);
    }
  };

  const handleOpenAdd = () => {
    setModalMode('add');
    setFormData({
      email: '',
      role: 'ta',
      status: 'active'
    });
    onOpen();
  };

  const handleOpenEdit = (admin) => {
    setModalMode('edit');
    setFormData(admin);
    onOpen();
  };

  const resetAndCloseModal = () => {
    setFormData({
      email: '',
      role: 'ta',
      status: 'active'
    });
    onClose();
  };

  const handleOpenDelete = (admin) => {
    setAdminToDelete(admin);
    onDeleteModalOpen();
  };

  const removeAdmin = async () => {
    if (!adminToDelete) return;

    setIsSaving(true);
    try {
      await deleteDoc(doc(db, 'adminEmails', adminToDelete.id));
      toast.success('Admin removed successfully');
      onDeleteModalClose();
      fetchAdmins();
    } catch (error) {
      console.error('Error removing admin:', error);
      toast.error('An error occurred while removing admin');
    } finally {
      setIsSaving(false);
      setAdminToDelete(null);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <ToastContainer position="bottom-center" autoClose={3000} />
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Admin Management</h2>
        <Button 
          className="font-semibold bg-gradient-to-tr from-cyan-500 to-blue-500 text-white" 
          onPress={handleOpenAdd}
          isDisabled={isLoading}
        >
          Add New Admin
        </Button>
      </div>

      <Table aria-label="Admin management table"         selectionMode="single"
      >
        <TableHeader>
          <TableColumn>Email</TableColumn>
          <TableColumn>Role</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn></TableColumn>
        </TableHeader>
        <TableBody 
          items={admins}
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading admins..." />}
          emptyContent={!isLoading ? "No admins found" : null}
        >
          {(admin) => (
            <TableRow key={admin.id}>
              <TableCell>{admin.email}</TableCell>
              <TableCell>
                <span className="capitalize">{getRoleLabel(admin.role)}</span>
              </TableCell>
              <TableCell>
                <Chip
                  color={admin.status === 'active' ? 'success' : 'warning'}
                  variant="flat"
                  className="capitalize"
                >
                  {admin.status}
                </Chip>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                <Tooltip content="Edit user">

                  <Link
                    color='foreground'
                    className="cursor-pointer p-4 "
                    onPress={() => handleOpenEdit(admin)}
                  >
                    <RiEdit2Line className='text-xl'/>
                  </Link>
                  </Tooltip>
                  <Tooltip content="Delete user">

                  <Link
                    color='danger'
                    className="cursor-pointer p-4 text-xl"
                    onPress={() => handleOpenDelete(admin)}
                  >
                    <FaRegTrashAlt  className='text-xl'/>
                  </Link>
                  </Tooltip>

                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Add/Edit Modal */}
      <Modal isOpen={isOpen} onClose={resetAndCloseModal}>
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>
              {modalMode === 'add' ? 'Add New Admin' : 'Edit Admin'}
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <Input
                  type="email"
                  label="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="Enter admin email"
                  isRequired
                  isReadOnly={modalMode === 'edit'}
                  isDisabled={modalMode === 'edit'}
                />
                <Select
                  label="Role"
                  selectedKeys={[formData.role]}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  placeholder="Select Role"
                  isRequired
                >
                  {roles.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  label="Status"
                  selectedKeys={[formData.status]}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  placeholder="Select Status"
                  isRequired
                >
                  {statuses.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button 
                color="danger" 
                variant="light" 
                onPress={onClose}
                isDisabled={isSaving}
                type="button"
              >
                Cancel
              </Button>
              <Button 
                color="primary" 
                type="submit"
                isLoading={isSaving}
                isDisabled={isSaving}
              >
                {modalMode === 'add' ? 'Add Admin' : 'Save Changes'}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={onDeleteModalClose}
        size="sm"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Confirm Delete
              </ModalHeader>
              <ModalBody>
                {adminToDelete && (
                  <p>
                    Are you sure you want to delete the admin <span className="font-semibold">{adminToDelete.email}</span>? 
                    This action cannot be undone.
                  </p>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  color="default"
                  variant="light"
                  onPress={onClose}
                  isDisabled={isSaving}
                  type="button"
                >
                  Cancel
                </Button>
                <Button
                  color="danger"
                  onPress={removeAdmin}
                  isLoading={isSaving}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AdminEmailManagement;
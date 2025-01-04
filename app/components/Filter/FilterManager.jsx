import React, { useState, useEffect } from 'react';
import {
  Input,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Card,
  CardBody,
  CardHeader,
  Spinner
} from '@nextui-org/react';
import { db } from '../../Shared/firebaseConfig';
import { collection, addDoc, getDocs, orderBy, query, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import { MoreVertical, Edit, Trash2 } from 'lucide-react';

const FilterManager = () => {
  const [filterName, setFilterName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filters, setFilters] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Changed to true initially
  const [isSaving, setIsSaving] = useState(false); // Added separate saving state
  const [editingFilter, setEditingFilter] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchFilters = async () => {
    setIsLoading(true);
    try {
      const q = query(collection(db, 'filterdata'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const filtersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFilters(filtersData);
    } catch (error) {
      console.error('Error fetching filters:', error);
      toast.error('เกิดข้อผิดพลาดในการโหลดข้อมูล');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFilters();
  }, []);

  const handleSaveFilter = async (onClose) => {
    if (!filterName.trim() || !startDate || !endDate) {
      toast.error('กรุณากรอกชื่อ Filter และเลือกช่วงเวลา');
      return;
    }

    setIsSaving(true);
    try {
      const filterData = {
        name: filterName.trim(),
        startDate: startDate,
        endDate: endDate,
        createdAt: new Date().toISOString()
      };

      if (editingFilter) {
        await updateDoc(doc(db, 'filterdata', editingFilter.id), filterData);
        toast.success('อัปเดต Filter สำเร็จ');
      } else {
        await addDoc(collection(db, 'filterdata'), filterData);
        toast.success('เพิ่ม Filter สำเร็จ');
      }

      setFilterName('');
      setStartDate('');
      setEndDate('');
      setEditingFilter(null);
      onClose();
      fetchFilters();
    } catch (error) {
      console.error('Error saving filter:', error);
      toast.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (filter) => {
    setEditingFilter(filter);
    setFilterName(filter.name);
    setStartDate(filter.startDate);
    setEndDate(filter.endDate);
    onOpen();
  };

  const handleDelete = async (filterId) => {
    if (!window.confirm('คุณแน่ใจหรือไม่ที่จะลบ Filter นี้?')) {
      return;
    }

    setIsSaving(true);
    try {
      await deleteDoc(doc(db, 'filterdata', filterId));
      toast.success('ลบ Filter สำเร็จ');
      fetchFilters();
    } catch (error) {
      console.error('Error deleting filter:', error);
      toast.error('เกิดข้อผิดพลาดในการลบข้อมูล');
    } finally {
      setIsSaving(false);
    }
  };

  const handleModalClose = () => {
    setFilterName('');
    setStartDate('');
    setEndDate('');
    setEditingFilter(null);
    onClose();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    });
  };

  return (
    <div className="p-4 space-y-4">
      <ToastContainer position="bottom-center" autoClose={2000} />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">All Filter</h2>
        <Button
          className='font-semibold bg-gradient-to-tr from-cyan-500 to-blue-500 text-white' onPress={onOpen}
        >
          Add new Filter
        </Button>
      </div>

      {/* Filter Cards Grid with Loading State */}
      {isLoading ? (
        <div className="min-h-[200px] flex justify-center items-center">
          <Spinner
            size="lg"
            color="primary"
            label="Loading filters..."
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filters.map((filter) => (
            <Card key={filter.id} className="w-full">
              <CardHeader className="flex justify-between items-center px-4 pt-4">
                <h3 className="text-lg font-semibold">{filter.name}</h3>
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      isDisabled={isSaving}
                    >
                      <MoreVertical size={16} />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Filter actions">
                    <DropdownItem
                      key="edit"
                      startContent={<Edit size={16} />}
                      onPress={() => handleEdit(filter)}
                    >
                      Edit
                    </DropdownItem>
                    <DropdownItem
                      key="delete"
                      className="text-danger"
                      color="danger"
                      startContent={<Trash2 size={16} />}
                      onPress={() => handleDelete(filter.id)}
                    >
                      Delete
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </CardHeader>
              <CardBody className="px-4 py-2">
                <div className="space-y-1">
                  <p className="text-sm text-default-500">
                    Start Date: {formatDate(filter.startDate)}
                  </p>
                  <p className="text-sm text-default-500">
                    End Date: {formatDate(filter.endDate)}
                  </p>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal isOpen={isOpen} onOpenChange={handleModalClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                {editingFilter ? 'Edit Filter' : 'Add New Filter'}
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Filter Name"
                  placeholder="Name"
                  value={filterName}
                  onChange={(e) => setFilterName(e.target.value)}
                  className="mb-4"
                />
                <div className="flex flex-col gap-4">
                  <Input
                    type="date"
                    label="Start Date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  <Input
                    type="date"
                    label="End Date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  isDisabled={isSaving}
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => handleSaveFilter(onClose)}
                  isLoading={isSaving}
                  isDisabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default FilterManager;
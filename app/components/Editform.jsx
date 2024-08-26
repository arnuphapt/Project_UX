import React, { useState } from 'react';
import Data from './Data';
import UploadImage from './UploadImage'; // Import UploadImage component
import { Input, CheckboxGroup, Checkbox, Button, Modal, ModalContent, ModalBody, ModalFooter, ModalHeader, Select,SelectItem } from "@nextui-org/react";

const PinInfoModal = ({ isOpen, onOpenChange, pinDetail, onSave }) => {
  const [title, setTitle] = useState(pinDetail.title);
  const [desc, setDesc] = useState(pinDetail.desc);
  const [section, setsection] = useState(pinDetail.section);
  const [link, setLink] = useState(pinDetail.link);
  const [techList, setTechList] = useState(pinDetail.techList || []);
  const [image, setImage] = useState(pinDetail.image || '');
  const [imageUrl, setImageUrl] = useState(pinDetail.image || '');
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const handleImageUpload = async (uploadedImageUrl) => {
    setImageUrl(uploadedImageUrl);
  };

  const handleTechChange = (values) => {
    setTechList(values);
  };

  const handleSave = async () => {
    // Validation checks
    if (!title || !desc || !link || !techList || !imageUrl) {
      toast.error('All fields are required and a file must be uploaded.');
      return;
    }

    setLoading(true);
    let imageUrlToSave = imageUrl;

    if (image && typeof image === 'object') {
      imageUrlToSave = await uploadImage(image);
    }

    try {
      // สร้างอ็อบเจ็กต์ข้อมูลที่จะอัพเดท
      const updatedData = {
        title,
        desc,
        section,
        link,
        techList,
        image: imageUrl // รวม URL ของรูปภาพใหม่
      };

      // เรียกใช้ฟังก์ชัน onSave ที่ส่งมาจาก parent component
      await onSave(updatedData);

      setLoading(false);
      onOpenChange(false); // ปิด modal
    } catch (error) {
      setLoading(false);
      console.error('Error updating pin:', error);
      toast.error('Failed to update pin. Please try again.');
    }


  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='5xl'>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Edit Pin</ModalHeader>
            <ModalBody>
            <div className='grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8'>
              <div className='col-span-2'>
            <UploadImage
                  setFile={setFile}
                  currentImageUrl={imageUrl}
                  onUploadComplete={handleImageUpload}
                  postId={pinDetail.id} // Pass the postId here
                />
                </div>
                <div className='col-span-2'>

                <Input
                  type="text"
                  label='ADD A TITLE'
                  variant='underlined'
                  size='lg'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className='text-2xl md:text-3xl lg:text-4xl outline-none font-bold w-full mt-2'
                />
                <h2 className='text-xs md:text-sm text-gray-400 mt-2'>Name your work</h2>
                <Input
                  type="text"
                  variant='underlined'
                  size='lg'
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  label='Description'
                  className='text-base md:text-lg lg:text-xl outline-none w-full pb-2 mt-4'
                />
                <Select
                  type="text"
                  variant='underlined'
                  size='lg'
                  defaultSelectedKeys={section}
                  onChange={(e) => setsection(e.target.value)}
                  label='Section'
                  className='text-base md:text-lg lg:text-xl outline-none w-full pb-2 mt-4'
                  isDisabled
                >
                  <SelectItem key="1" value="1">1</SelectItem>
                  <SelectItem key="2" value="2">2</SelectItem>
                  <SelectItem key="3" value="3">3</SelectItem>
                  <SelectItem key="4" value="4">4</SelectItem>
                  </Select>

                <Input
                  type="text"
                  variant='underlined'
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  label='Destination Link'
                  size='lg'
                  className='text-base md:text-lg lg:text-xl outline-none w-full pb-2 mt-4'
                />
                <CheckboxGroup
                  label="Select Type"
                  color="success"
                  orientation="horizontal"
                  defaultValue={techList}
                  onChange={handleTechChange}
                >
                  {Data.Technology.map((item, index) => (
                    <Checkbox key={index} value={item.name} className='p-4' checked={techList.includes(item.name)}>
                      {item.name}
                    </Checkbox>
                  ))}
                </CheckboxGroup>
              </div>
              </div>

            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose} isDisabled={loading}>
                Close
              </Button>
              <Button className='font-semibold bg-gradient-to-tr from-cyan-500 to-blue-500 text-white shadow-lg '
                size='md'
                onClick={handleSave}
                isLoading={loading}
                auto
              >
                {loading ? 'Loading...' : 'Update'}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default PinInfoModal;
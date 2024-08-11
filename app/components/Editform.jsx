import React, { useState } from 'react';
import Data from './Data';
import UploadImage from './UploadImage'; // Import UploadImage component
import { Input, CheckboxGroup, Checkbox, Button, Modal, ModalContent, ModalBody, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";

const PinInfoModal = ({ isOpen, onOpenChange, pinDetail, onSave }) => {
  const [title, setTitle] = useState(pinDetail.title);
  const [desc, setDesc] = useState(pinDetail.desc);
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
    setLoading(true);
    let imageUrlToSave = imageUrl;

    if (image && typeof image === 'object') {
      imageUrlToSave = await uploadImage(image);
    }

    onSave({
      title,
      desc,
      link,
      techList,
      image: imageUrlToSave
    });


  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Edit Pin</ModalHeader>
            <ModalBody>

              <div className='w-full'>
                <UploadImage setFile={setFile} currentImageUrl={imageUrl} onUploadComplete={handleImageUpload} />
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
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose} isDisabled={loading}>
                Close
              </Button>
              <Button className='font-semibold'
          size='md'
          color="primary"
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

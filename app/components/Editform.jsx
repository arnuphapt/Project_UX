import React, { useState } from 'react';
import UploadImage from './UploadImage';
import { Input, Button, Modal, ModalContent, ModalBody, 
  ModalFooter, ModalHeader, Select, SelectItem, Chip } from "@nextui-org/react";

const PinInfoModal = ({ isOpen, onOpenChange, pinDetail, onSave }) => {
  const [title, setTitle] = useState(pinDetail.title);
  const [desc, setDesc] = useState(pinDetail.desc);
  const [section, setsection] = useState(pinDetail.section);
  const [link, setLink] = useState(pinDetail.link);
  const [techList, setTechList] = useState(pinDetail.techList || []);
  const [imageUrl, setImageUrl] = useState(pinDetail.image || '');
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [newTag, setNewTag] = useState('');

  const handleImageUpload = async (uploadedImageUrl) => {
    setImageUrl(uploadedImageUrl);
  };

  const handleRemoveTech = (techToRemove) => {
    setTechList(techList.filter(tech => tech !== techToRemove));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !techList.includes(newTag.trim())) {
      setTechList([...techList, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSave = async () => {
    if (!title || !desc || !link || !techList.length || !imageUrl) {
      toast.error('All fields are required and a file must be uploaded.');
      return;
    }

    setLoading(true);
    try {
      const updatedData = {
        title,
        desc,
        section,
        link,
        techList,
        image: imageUrl
      };

      await onSave(updatedData);
      setLoading(false);
      onOpenChange(false);
    } catch (error) {
      setLoading(false);
      console.error('Error updating pin:', error);
      toast.error('Failed to update pin. Please try again.');
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Edit Post</ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
                <div className="col-span-2">
                  <UploadImage
                    setFile={setFile}
                    currentImageUrl={imageUrl}
                    onUploadComplete={handleImageUpload}
                    postId={pinDetail.id}
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    type="text"
                    label="ADD A TITLE"
                    variant="underlined"
                    size="lg"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-2xl md:text-3xl lg:text-4xl outline-none font-bold w-full mt-2"
                  />
                  <h2 className="text-xs md:text-sm text-gray-400 mt-2">Name your work</h2>
                  
                  <Input
                    type="text"
                    variant="underlined"
                    size="lg"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    label="Description"
                    className="text-base md:text-lg lg:text-xl outline-none w-full pb-2 mt-4"
                  />
                  
                  <Select
                    type="text"
                    variant='underlined'
                    size='lg'
                    defaultSelectedKeys={section}
                    onChange={(e) => setsection(e.target.value)}
                    label='Section'
                    className='text-base md:text-lg lg:text-xl outline-none w-full pb-2 mt-4'
                  >
                    <SelectItem key="1" value="1">1</SelectItem>
                    <SelectItem key="2" value="2">2</SelectItem>
                    <SelectItem key="3" value="3">3</SelectItem>
                    <SelectItem key="4" value="4">4</SelectItem>
                  </Select>

                  <Input
                    type="text"
                    variant="underlined"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    label="Destination Link"
                    size="lg"
                    className="text-base md:text-lg lg:text-xl outline-none w-full pb-2 mt-4"
                  />

                  <div className="mt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Input
                        type="text"
                        variant="underlined"
                        size="sm"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Add new technology tag"
                        className="flex-1"
                      />
                      <Button
                        size="sm"
                        onPress={handleAddTag}
                        className="bg-gradient-to-tr from-cyan-500 to-blue-500 text-white"
                      >
                        Add Tag
                      </Button>
                    </div>
                    <p className="text-sm font-medium mb-3">Selected Technologies:</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {techList.map((tech, index) => (
                        <Chip
                          key={index}
                          onClose={() => handleRemoveTech(tech)}
                          variant="flat"
                          color="default"
                        >
                          {tech}
                        </Chip>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button 
                color="danger" 
                variant="light" 
                onPress={onClose} 
                isDisabled={loading}
              >
                Close
              </Button>
              <Button
                className="font-semibold bg-gradient-to-tr from-cyan-500 to-blue-500 text-white shadow-lg"
                size="md"
                onPress={handleSave}
                isLoading={loading}
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
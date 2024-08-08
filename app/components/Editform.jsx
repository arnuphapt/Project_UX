import React, { useState } from 'react';
import Data from './Data';
import UploadImage from './UploadImage'; // Import UploadImage component
import { Input, CheckboxGroup, Checkbox, Button } from "@nextui-org/react";

const EditPinForm = ({ pinDetail, onSave, onCancel }) => {
  const [title, setTitle] = useState(pinDetail.title);
  const [desc, setDesc] = useState(pinDetail.desc);
  const [link, setLink] = useState(pinDetail.link);
  const [techList, setTechList] = useState(pinDetail.techList || []);
  const [image, setImage] = useState(pinDetail.image || ''); // State for new image
  const [imageUrl, setImageUrl] = useState(pinDetail.image || ''); // URL for preview
  const [loading, setLoading] = useState(false);

  const handleTechChange = (values) => {
    setTechList(values);
  };

  const handleSave = async () => {
    let imageUrlToSave = imageUrl; // Use current image URL by default

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
    <div className='bg-white p-6 md:p-8 lg:p-12 xl:p-16 rounded-2xl'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8'>
        <div className="lg:col-span-2">
          <div className='w-full'>
            <Input type="text" label='ADD A TITLE' variant='underlined' size='lg'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='text-2xl md:text-3xl lg:text-4xl outline-none font-bold w-full mt-2 ' />
            <h2 className='text-xs md:text-sm text-gray-400 mt-2'>Name your work</h2>
            <Input type="text" variant='underlined' size='lg'
              value={desc}
              onChange={(e) => setDesc(e.target.value)} label='Description'
              className='text-base md:text-lg lg:text-xl outline-none w-full pb-2  mt-4  ' />
            <Input type="text" variant='underlined'
              value={link}
              onChange={(e) => setLink(e.target.value)} label='Destination Link' size='lg'
              className='text-base md:text-lg lg:text-xl outline-none w-full pb-2 mt-4' />
            <CheckboxGroup
              label="Select Type"
              color="success"
              orientation="horizontal"
              defaultValue={techList}
              onChange={handleTechChange}

            >
              {Data.Technology.map((item, index) => (
                <Checkbox key={index} value={item.name} className='p-4' checked={techList.includes(item.name)}
                >
                  {item.name}
                </Checkbox>
              ))}
            </CheckboxGroup>
          </div>
          <div className='flex items-center justify-between mb-6 mt-4'>
        <Button className='font-semibold'
          size='md'
          color="primary"
          onClick={handleSave}
          isLoading={loading}
          auto
        >
          {loading ? 'Loading...' : 'Update'}
        </Button>
        <Button
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
        </div>

      </div>
    </div>
  );
};

export default EditPinForm;

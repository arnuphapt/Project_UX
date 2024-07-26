import React, { useState } from 'react';
import Data from './Data';
import UploadImage from './UploadImage'; // Import UploadImage component

const EditPinForm = ({ pinDetail, onSave, onCancel }) => {
  const [title, setTitle] = useState(pinDetail.title);
  const [desc, setDesc] = useState(pinDetail.desc);
  const [link, setLink] = useState(pinDetail.link);
  const [techList, setTechList] = useState(pinDetail.techList || []);
  const [image, setImage] = useState(pinDetail.image || ''); // State for new image
  const [imageUrl, setImageUrl] = useState(pinDetail.image || ''); // URL for preview

  const handleTechChange = (tech, isChecked) => {
    setTechList(prevTechList =>
      isChecked ? [...prevTechList, tech] : prevTechList.filter(item => item !== tech)
    );
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
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className='text-[35px] outline-none font-bold w-full border-b-[2px] border-gray-400 placeholder-gray-400 mt-8'
      />
      <textarea
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        className='text-[20px] outline-none w-full mt-[50px] border-b-[2px] border-gray-400 placeholder-gray-400'
      />
      <input
        type="text"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        className='text-[20px] outline-none w-full pb-4 mt-[50px] border-b-[2px] border-gray-400 placeholder-gray-400'
      />
      <div className="grid grid-cols-2 mb-4 md:grid-cols-3 border-b-[2px] border-gray-400 pb-8 mt-[50px]">
        {Data.Technology.map((item, index) => (
          <div key={index} className="flex gap-2 items-center">
            <input
              id={item.name}
              type="checkbox"
              checked={techList.includes(item.name)}
              onChange={(e) => handleTechChange(item.name, e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor={item.name}>{item.name}</label>
          </div>
        ))}
      </div>
      <button
        className='p-2 bg-blue-500 text-white px-5 text-[23px] mt-10 rounded-full hover:scale-105 transition-all'
        onClick={handleSave}
      >
        Save Changes
      </button>
      <button
        className='p-2 bg-gray-500 text-white px-5 text-[23px] mt-10 rounded-full hover:scale-105 transition-all'
        onClick={onCancel}
      >
        Cancel
      </button>
    </div>
  );
};

export default EditPinForm;

import React, { useState } from 'react';
import { HiArrowUpCircle } from 'react-icons/hi2';

function UploadImage({ setFile, currentImageUrl }) {
  const [selectedFile, setSelectedFile] = useState();
  const [imageUrl, setImageUrl] = useState(currentImageUrl);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFile(file);
    setImageUrl(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setFile(null);
    setImageUrl(null);
  };

  return (
    <div className='h-[450px] bg-[#e9e9e9] rounded-lg'>
      <label className='m-5 flex flex-col justify-center items-center cursor-pointer h-[90%] border-[2px] border-gray-300 border-dashed rounded-lg text-gray-600'>
        {!selectedFile && !imageUrl ? (
          <div className='flex items-center flex-col'>
            <HiArrowUpCircle className='text-[22px]' />
            <h2 className='font-semibold'>Click to Upload</h2>
          </div>
        ) : (
          <>
            {imageUrl && (
              <div className='relative w-full h-full'>
                <img
                  src={imageUrl}
                  alt='selected'
                  className='object-contain w-full h-full'
                />
                <button
                  type='button'
                  onClick={handleRemoveImage}
                  className='absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full'
                >
                  X
                </button>
              </div>
            )}
          </>
        )}
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
}

export default UploadImage;

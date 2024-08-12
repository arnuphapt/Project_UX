import React, { useState, useEffect } from 'react';
import { HiArrowUpCircle } from 'react-icons/hi2';
import { Button } from '@nextui-org/react';
import { doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from '../Shared/firebaseConfig';

function UploadImage({ setFile, currentImageUrl, postId }) {
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(currentImageUrl);
  const [error, setError] = useState('');

  useEffect(() => {
    setImageUrl(currentImageUrl);
  }, [currentImageUrl]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (file && file.size > 5 * 1024 * 1024) {
      setError('File size exceeds 5 MB.');
      return;
    }

    if (file && !file.type.startsWith('image/')) {
      setError('Only image files are allowed.');
      return;
    }

    setSelectedFile(file);
    setFile(file);

    const storage = getStorage();
    const storageRef = ref(storage, `images/${postId}/${file.name}`);

    try {
      // Upload the file to Firebase Storage
      await uploadBytes(storageRef, file);
      // Get the download URL
      const newImageUrl = await getDownloadURL(storageRef);

      // Update Firestore with the new image URL
      if (postId) {
        const postRef = doc(db, 'pinterest-post', postId);
        await updateDoc(postRef, {
          image: newImageUrl
        });
      }

      // Update the image URL in the component state
      setImageUrl(newImageUrl);
      setError('');
      console.log('Image uploaded and URL updated successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Failed to upload image. Please try again.');
    }
  };

  const handleRemoveImage = async () => {
    try {
      if (postId) {
        const postRef = doc(db, 'pinterest-post', postId);
        await updateDoc(postRef, {
          image: null
        });
      }
      setSelectedFile(null);
      setFile(null);
      setImageUrl(null);
      console.log('Image removed successfully');
    } catch (error) {
      console.error('Error removing image:', error);
      setError('Failed to remove image. Please try again.');
    }
  };

  return (
    <div className='h-[250px] bg-[#f5f5f5] border-[2px] border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-4'>
      {!imageUrl ? (
        <label
          htmlFor='dropzone-file'
          className='flex flex-col items-center justify-center cursor-pointer h-full w-full'
        >
          <div className='flex flex-col items-center text-gray-600'>
            <HiArrowUpCircle className='text-[40px] mb-4' />
            <p className='text-center text-gray-500 font-medium'>Drag and Drop or Browse assets here</p>
            <p className='text-gray-500 my-2'>image (5MB)</p>
            <Button color='primary' className='mt-2'>Browse</Button>
          </div>
          <input
            id='dropzone-file'
            type='file'
            accept='image/*'
            className='hidden'
            onChange={handleFileChange}
          />
        </label>
      ) : (
        <div className='relative h-full w-full'>
          <img
            src={imageUrl}
            alt='selected'
            className='object-contain w-full h-full rounded-lg'
          />
          <Button
            type='button'
            onClick={handleRemoveImage}
            color='danger'
            className='absolute top-2 right-2 text-white rounded-full'
          >
            X
          </Button>
        </div>
      )}
      {error && <p className='text-red-500 mt-2'>{error}</p>}
    </div>
  );
}

export default UploadImage;

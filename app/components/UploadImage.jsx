import React, { useState, useEffect } from 'react';
import { HiArrowUpCircle } from 'react-icons/hi2';
import { Button, Progress } from '@nextui-org/react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function UploadImage({ setFile, currentImageUrl, postId, onUploadComplete }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(currentImageUrl);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    setImageUrl(currentImageUrl);
  }, [currentImageUrl]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && file.size > 5 * 1024 * 1024) {
      setError('File size exceeds 5 MB.');
      return;
    }

    if (file && !file.type.startsWith('image/')) {
      setError('Only image files are allowed.');
      return;
    }

    setError('');
    setSelectedFile(file);
    setFile(file);

    const storage = getStorage();
    const storageRef = ref(storage, `images/${postId}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setLoading(true);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Calculate the upload progress as a percentage
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error('Error uploading image:', error);
        setError('Error uploading image');
        setLoading(false);
        setUploadProgress(0);
      },
      async () => {
        // Handle successful upload
        try {
          const newImageUrl = await getDownloadURL(uploadTask.snapshot.ref);
          setImageUrl(newImageUrl);
          onUploadComplete(newImageUrl);
        } catch (error) {
          console.error('Error getting download URL:', error);
        } finally {
          setLoading(false);
          setUploadProgress(0);
        }
      }
    );
  };

  const handleRemoveImage = () => {
    try {
      setSelectedFile(null);
      setFile(null);
      setImageUrl(null);
      onUploadComplete(null);
      console.log('Image removed');
    } catch (error) {
      console.error('Error removing image:', error);
    }
  };
  
  return (
    <div className='h-full bg-[#f5f5f5] border-[2px] border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-4'>
      {!imageUrl ? (
        <>
          <label
            htmlFor='dropzone-file'
            className='flex flex-col items-center justify-center cursor-pointer h-full w-full'
          >
            <div className='flex flex-col items-center text-gray-600'>
              <HiArrowUpCircle className='text-[40px] mb-4' />
              <p className='text-center text-gray-500 font-medium'>Upload image here</p>
              <p className='text-gray-500 my-2'>image (5MB)</p>
            </div>
            <input
              id='dropzone-file'
              type='file'
              accept='image/*'
              className='hidden'
              onChange={handleFileChange}
            />
          </label>
          {loading && (
            <Progress
              aria-label="Uploading..."
              size="md"
              value={uploadProgress}
              color="success"
              showValueLabel={true}
              className="max-w-md mt-4"
            />
          )}
        </>
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
            aria-label='Remove image'
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

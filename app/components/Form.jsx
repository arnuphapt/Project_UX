"use client";

import React, { useState } from 'react';
import UploadImage from './UploadImage';
import { useSession } from "next-auth/react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import UserTag from './UserTag';
import app from '../Shared/firebaseConfig';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Data from './Data';
import { HiArrowSmallLeft } from "react-icons/hi2";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Input, CheckboxGroup, Checkbox, Button, Select, SelectItem } from "@nextui-org/react";

function Form() {
  const [techList, setTechList] = useState([]);
  const [section, setSection] = useState(''); // State for section
  const { data: session } = useSession();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [link, setLink] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const storage = getStorage(app);
  const db = getFirestore(app);
  const postId = Date.now().toString();
  const [errors, setErrors] = useState({
    title: '',
    desc: '',
    link: '',
    section: '',
    techList: '',
  });

  const validate = () => {
    let isValid = true;
    let newErrors = { title: '', desc: '', link: '', section: '', techList: '' };
  
    if (!title.trim()) {
      newErrors.title = 'Title is required';
      isValid = false;
    }
  
    if (!desc.trim()) {
      newErrors.desc = 'Description is required';
      isValid = false;
    }
  
    if (!link.trim()) {
      newErrors.link = 'Link is required';
      isValid = false;
    } else {
      try {
        new URL(link);
      } catch (_) {
        newErrors.link = 'Invalid URL format';
        isValid = false;
      }
    }
  
    if (!section) {
      newErrors.section = 'Section is required';
      isValid = false;
    }
  
    if (techList.length === 0) {
      newErrors.techList = 'At least one technology must be selected';
      isValid = false;
    }
  
    setErrors(newErrors);
    return isValid;
  };
  const onSave = () => {
    if (!validate()) {
      return;
    }
    if (!file) {
      toast.error('A Image must be uploaded.');
      return;
    }
    toast.success('Post success.');
    setLoading(true);
    uploadFile();
  };

  const uploadFile = () => {
    const storageRef = ref(storage, 'pinterest/' + file.name);
    uploadBytes(storageRef, file).then(() => {
      getDownloadURL(storageRef).then(async (url) => {
        const postData = {
          title: title,
          desc: desc,
          link: link,
          image: url,
          techList: techList,
          section: section, // Include section in the post data
          userName: session.user.name,
          email: session.user.email,
          userImage: session.user.image,
          id: postId,
          timestamp: new Date()
        };

        await setDoc(doc(db, 'pinterest-post', postId), postData).then(() => {
          setLoading(false);
          router.push("/users/" + session.user.email);
        });
      });
    });
  };
  const handleSelectChange = (selectedValue) => {
    setSection(selectedValue); // This stores "1", "2", "3", or "4" directly.
  };

  return (
    <div className='bg-white p-6 md:p-8 lg:p-12 xl:p-16 rounded-2xl'>
      <div className='flex items-center justify-between mb-6'>
        <HiArrowSmallLeft
          className='text-3xl lg:text-4xl font-bold cursor-pointer'
          onClick={() => router.push("/")} />
        <Button className='font-semibold'
          size='md'
          color="primary"
          onClick={onSave}
          isLoading={loading}
          auto
        >
          {loading ? 'Loading...' : 'Upload'}
        </Button>
      </div>
      <ToastContainer position="bottom-center" autoClose={2000} />
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8'>
        <UploadImage setFile={setFile} />
        <div className="lg:col-span-2">
          <UserTag user={session?.user} className='outline-none' />
          <div className='w-full'>
          <Input 
  type="text" 
  label='ADD A TITLE' 
  variant='underlined' 
  size='lg'
  onChange={(e) => setTitle(e.target.value)}
  className='text-2xl md:text-3xl lg:text-4xl outline-none font-bold w-full mt-2'
  errorMessage={errors.title}
  isInvalid={!!errors.title}
/>
            <h2 className='text-xs md:text-sm text-gray-400 mt-2'>Name your work</h2>
            <div className='grid grid-cols-3 gap-4'>
            <Input 
  type="text" 
  variant='underlined' 
  size='lg'
  onChange={(e) => setDesc(e.target.value)}
  label='Description'
  className='text-base md:text-lg lg:text-xl outline-none w-full pb-2  mt-4 col-span-2'
  errorMessage={errors.desc}
  isInvalid={!!errors.desc}
/>

              <div className="mt-4">
              <Select
  size='lg'
  variant='underlined' 
  label="Section"
  onChange={(e) => handleSelectChange(e.target.value)}
  errorMessage={errors.section}
  isInvalid={!!errors.section}
>
  <SelectItem key="1" value="1">1</SelectItem>
  <SelectItem key="2" value="2">2</SelectItem>
  <SelectItem key="3" value="3">3</SelectItem>
  <SelectItem key="4" value="4">4</SelectItem>
</Select>
              </div>

            </div>


            <Input 
  type='url' 
  variant='underlined'
  onChange={(e) => setLink(e.target.value)}
  label='Destination Link' 
  size='lg'
  className='text-base md:text-lg lg:text-xl outline-none w-full pb-2 mt-4'
  errorMessage={errors.link}
  isInvalid={!!errors.link}
/>



<div className="border-b-2 border-gray-300 p-2 pb-4 mt-6 md:mt-5">
  <CheckboxGroup
    label="Select Type"
    color="success"
    orientation="horizontal"
    defaultValue={techList}
    onChange={setTechList}
  >
    {Data.Technology.map((item, index) => (
      <Checkbox key={index} value={item.name} className='p-4'>
        {item.name}
      </Checkbox>
    ))}
  </CheckboxGroup>
  {errors.techList && <p className="text-red-500 text-sm mt-1">{errors.techList}</p>}
</div>





          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
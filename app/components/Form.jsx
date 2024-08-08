"use client";

import React, { useState } from 'react';
import UploadImage from './UploadImage';
import { useSession } from "next-auth/react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import UserTag from './UserTag';
import app from '../Shared/firebaseConfig';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Data from './Data';
import { HiArrowSmallLeft } from "react-icons/hi2";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Input, CheckboxGroup, Checkbox,Button } from "@nextui-org/react";

function Form() {
  const [techList, setTechList] = useState([]);
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

  const onSave = () => {
    if (!title || !desc || !link || !file) {
      toast.error('All fields are required and a file must be uploaded.');
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
          userName: session.user.name,
          email: session.user.email,
          userImage: session.user.image,
          id: postId,
          timestamp: new Date()
        };

        await setDoc(doc(db, 'pinterest-post', postId), postData).then(() => {
          setLoading(false);
          router.push("/" + session.user.email);
        });
      });
    });
  };

  const handleTechChange = (values) => {
    setTechList(values);
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
            <Input type="text" label='ADD A TITLE' variant='underlined' size='lg'
              onChange={(e) => setTitle(e.target.value)}
              className='text-2xl md:text-3xl lg:text-4xl outline-none font-bold w-full mt-2 ' />
            <h2 className='text-xs md:text-sm text-gray-400 mt-2'>Name your work</h2>

            <Input type="text" variant='underlined' size='lg'
              onChange={(e) => setDesc(e.target.value)}
              label='Description'
              className='text-base md:text-lg lg:text-xl outline-none w-full pb-2  mt-4  ' />

            <Input type="text" variant='underlined'
              onChange={(e) => setLink(e.target.value)}
              label='Destination Link' size='lg'
              className='text-base md:text-lg lg:text-xl outline-none w-full pb-2 mt-4' />

            <div className="border-b-2 border-gray-300 p-2 pb-4 mt-6 md:mt-5">
              <CheckboxGroup
                label="Select Type"
                color="success"
                orientation="horizontal"
                defaultValue={techList}
                onChange={handleTechChange}
              >
                {Data.Technology.map((item, index) => (
                  <Checkbox key={index} value={item.name} className='p-4'>
                    {item.name}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;

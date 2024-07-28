"use client"
import React, { useState } from 'react'
import UploadImage from './UploadImage'
import { useSession } from "next-auth/react"
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"
import UserTag from './UserTag'
import app from '../Shared/firebaseConfig'
import { doc, getFirestore, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import Image from "next/image"
import Data from './Data'
import { HiArrowSmallLeft } from "react-icons/hi2";

function Form() {
  const [techList, setTechList] = useState([]);
  const { data: session } = useSession();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [link, setLink] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const storage = getStorage(app)
  const db = getFirestore(app);
  const postId = Date.now().toString();

  const onSave = () => {
    if (!title || !desc || !link || !file) {
      setError('All fields are required and a file must be uploaded.');
      return;
    }
    setLoading(true);
    uploadFile();
  }

  const uploadFile = () => {
    const storageRef = ref(storage, 'pinterest/' + file.name);
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log("File Uploaded");
    }).then(resp => {
      getDownloadURL(storageRef).then(async (url) => {
        console.log("DownloadUrl", url);
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

        await setDoc(doc(db, 'pinterest-post', postId), postData).then(resp => {
          console.log("Saved");
          setLoading(false);
          router.push("/" + session.user.email);
        });
      });
    });
  };


  const onTechSelect = (name, isChecked) => {
    if (isChecked) {
      setTechList(techList =>
        [...techList, name]);
    } else {
      let techListItem =
        techList.filter(item => item !== name)
      setTechList(techListItem);
    }
  }

  return (
    <div className='bg-white p-16 rounded-2xl'>
    <div className='flex justify-between mb-6'>
      <HiArrowSmallLeft
        className='text-[50px] font-bold cursor-pointer hover:bg-gray-200 rounded-full p-2'
        onClick={() => router.back()} />
      <button onClick={() => onSave()}
        className='bg-blue-500 p-2 text-white font-semibold px-3 rounded-lg'>
        {loading ? <Image
          src="/loading-indicator.png"
          width={30}
          height={30}
          alt='loading'
          className='animate-spin'
          style={{
            maxWidth: "100%",
            height: "auto"
          }} /> :
          <span>Upload</span>}
      </button>
    </div>
    {error && <p className="text-red-500">{error}</p>}
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
      <UploadImage setFile={(file) => setFile(file)} />
      <div className="col-span-2">
        <UserTag user={session?.user} className='outline-none' />
        <div className='w-[100%]'>
          <input type="text" placeholder='Add a title'
            onChange={(e) => setTitle(e.target.value)}
            className='text-[35px] outline-none font-bold w-full border-b-[2px] border-gray-400 placeholder-gray-400 mt-8' />
          <h2 className='text-[12px] w-full text-gray-400'>Name your work</h2>
          <input type="text"
            onChange={(e) => setDesc(e.target.value)}
            placeholder='Description'
            className='text-[20px] outline-none w-full pb-4 mt-[50px] border-b-[2px] border-gray-400 placeholder-gray-400' />
          <input type="text"
            onChange={(e) => setLink(e.target.value)}
            placeholder='Destination Link'
            className='text-[20px] outline-none w-full pb-4 mt-[50px] border-b-[2px] border-gray-400 placeholder-gray-400' />
          <div className="grid grid-cols-2 mb-4 md:grid-cols-3 border-b-[2px] border-gray-400 pb-8 mt-[50px]">
            {Data.Technology.map((item, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input id="technology"
                  onClick={(e) => onTechSelect(item.name, e.target.checked)}
                  type="checkbox"
                  className="w-4 h-4" />
                <label>{item.name}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Form;
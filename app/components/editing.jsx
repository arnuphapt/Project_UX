import React, { useState } from 'react';
import UploadImage from './UploadImage';
import Data from './Data';
import { useSession } from 'next-auth/react';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import app from '../Shared/firebaseConfig';
import { useRouter } from 'next/navigation';

function EditForm({ editedPin, setEditedPin, selectedTechList, setSelectedTechList, setIsEditing, setFile }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { data: session } = useSession();
  const router = useRouter();
  const db = getFirestore(app);

  const handleTechSelect = (name, isChecked) => {
    if (isChecked) {
      setSelectedTechList([...selectedTechList, name]);
    } else {
      setSelectedTechList(selectedTechList.filter(item => item !== name));
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editedPin.title || !editedPin.desc || !editedPin.link) {
      setError('All fields are required.');
      return;
    }
    
    setLoading(true);
    
    try {
      const postData = {
        title: editedPin.title,
        desc: editedPin.desc,
        link: editedPin.link,
        techList: selectedTechList,
        userName: session.user.name,
        email: session.user.email,
        userImage: session.user.image,
        id: editedPin.id,
        timestamp: new Date()
      };
      
      await setDoc(doc(db, 'pinterest-post', editedPin.id), postData);
      console.log('Post updated successfully');
      router.push('/' + session.user.email);
    } catch (error) {
      console.error('Error updating post:', error);
      setError('Failed to update post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleEditSubmit} className='mb-10'>
        <input
          type='text'
          value={editedPin.title}
          onChange={(e) => setEditedPin({ ...editedPin, title: e.target.value })}
          placeholder='Title'
          className='text-[35px] outline-none font-bold w-full border-b-[2px] border-gray-400 placeholder-gray-400 mb-8'
        />
        <input
          type='text'
          value={editedPin.desc}
          onChange={(e) => setEditedPin({ ...editedPin, desc: e.target.value })}
          placeholder='Description'
          className='text-[20px] outline-none w-full pb-4 mt-[50px] border-b-[2px] border-gray-400 placeholder-gray-400'
        />
        <input
          type='text'
          value={editedPin.link}
          onChange={(e) => setEditedPin({ ...editedPin, link: e.target.value })}
          placeholder='Destination Link'
          className='text-[20px] outline-none w-full pb-4 mt-[50px] border-b-[2px] border-gray-400 placeholder-gray-400'
        />
        <div className="grid grid-cols-2 mb-4 md:grid-cols-3 border-b-[2px] border-gray-400 pb-8 mt-[50px]">
          {Data.Technology.map((item, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                type="checkbox"
                checked={selectedTechList.includes(item.name)}
                onChange={(e) => handleTechSelect(item.name, e.target.checked)}
                className="w-4 h-4"
              />
              <label>{item.name}</label>
            </div>
          ))}
        </div>
        <button
          type='submit'
          className='p-2 bg-blue-500 text-white px-5 text-[23px] mt-4 rounded-full hover:scale-105 transition-all'
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
        <button
          type='button'
          className='p-2 bg-gray-500 text-white px-5 text-[23px] mt-4 rounded-full hover:scale-105 transition-all'
          onClick={() => setIsEditing(false)}
        >
          Cancel
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
    </div>
  );
}

export default EditForm;

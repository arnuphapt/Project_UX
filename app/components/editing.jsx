// EditForm.jsx
import React from 'react';
import UploadImage from './UploadImage';
import Data from './Data';

function EditForm({ editedPin, setEditedPin, selectedTechList, setSelectedTechList, setFile, handleEditSubmit, setIsEditing }) {
  const handleTechSelect = (name, isChecked) => {
    if (isChecked) {
      setSelectedTechList([...selectedTechList, name]);
    } else {
      setSelectedTechList(selectedTechList.filter(item => item !== name));
    }
  };

  return (
    <form onSubmit={handleEditSubmit} className='mb-10'>
      <input
        type='text'
        value={editedPin.title}
        onChange={(e) => setEditedPin({ ...editedPin, title: e.target.value })}
        placeholder='Title'
        className='w-full p-2 border rounded-md mb-4'
      />
      <textarea
        value={editedPin.desc}
        onChange={(e) => setEditedPin({ ...editedPin, desc: e.target.value })}
        placeholder='Description'
        className='w-full p-2 border rounded-md mb-4'
        rows='3'
      />
      <input
        type='text'
        value={editedPin.link}
        onChange={(e) => setEditedPin({ ...editedPin, link: e.target.value })}
        placeholder='URL'
        className='w-full p-2 border rounded-md mb-4'
      />
      <UploadImage setFile={setFile} currentImageUrl={editedPin.image} />
      <div className='mt-2'>
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
        Save
      </button>
      <button
        type='button'
        className='p-2 bg-gray-500 text-white px-5 text-[23px] mt-4 rounded-full hover:scale-105 transition-all'
        onClick={() => setIsEditing(false)}
      >
        Cancel
      </button>
    </form>
  );
}

export default EditForm;

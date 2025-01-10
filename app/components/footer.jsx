// components/Footer.tsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white ">
      <div className='flex justify-center items-center p-4'>
        <div className=' items-center gap-3'>
        <p className=" text-md mb-5">Web-classroom © {new Date().getFullYear()} All rights reserved
        </p>
        </div>


      </div>
    </footer>
  );
};

export default Footer;
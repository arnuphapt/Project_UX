// components/Footer.tsx
import React from 'react';
import Link from 'next/link';
import { Github, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white mt-10">
      <div className='flex justify-between items-center p-4 px-10'>
        <div className=' items-center gap-3'>
        <h3 className="font-semibold text-lg mb-2">Web-classroom</h3>
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} All rights reserved
            </p>
        </div>

        <div className='flex items-center gap-3'>
                  <div className="flex items-center gap-6">
            <Link href="/about" className="text-gray-600 hover:text-gray-900 text-sm">
              About
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900 text-sm">
              Contact
            </Link>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900"
            >
              <Facebook size={20} />
            </a>
          </div>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
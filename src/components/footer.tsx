import React from 'react';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-950 to-gray-800 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between max-w-screen-lg">
        <div className="mb-4 md:mb-0">
          <h2 className="text-xl font-semibold">Movie Quest</h2>
        </div>
        <div className="mb-4 md:mb-0">
          <ul className="flex space-x-6">
            <li>
              <Link 
                href="https://github.com/Shinkhal" 
                className="hover:text-gray-400"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FaGithub size={24} />
              </Link>
            </li>
            <li>
              <Link 
                href="https://www.linkedin.com/in/shinkhal-sinha/" 
                className="hover:text-gray-400"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FaLinkedin size={24} />
              </Link>
            </li>
            <li>
              <Link 
                href="mailto:shinkhalsinha@gmail.com" 
                className="hover:text-gray-400"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <HiOutlineMail size={24} />
              </Link>
            </li>
            <li>
              <Link 
                href="https://www.instagram.com/shinkhal_sinha_/" 
                className="hover:text-gray-400"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FaInstagram size={24} />
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Shinkhal Sinha. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

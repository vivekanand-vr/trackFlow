import React, { useState, useContext, useRef, useEffect } from 'react';
import { UserContext } from '../context/userContext';
import { User, LogOut } from 'lucide-react';
import { doSignOut } from '../authentication/authMethods';

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logoutUser } = useContext(UserContext);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    // Signout from firebase as well as from local state
    doSignOut();
    logoutUser();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-white hover:bg-black hover:text-white focus:outline-none"
      >
        <User size={24} />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 bg-white rounded-md shadow-lg z-10">
          <div className="px-4 py-2 text-sm border-b hover:bg-black hover:text-white">
            {user.email}
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center w-full px-4 py-2 text-sm hover:bg-black hover:text-white"
          >
            <LogOut size={18} className="mr-2" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
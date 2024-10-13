import React, { useState } from 'react';

function DisplayType({ displayType, setDisplayType }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const displayTypeOptions = ['All', 'Offered', 'Rejected', 'Applied', 'Interviewing', 'Paused', 'Scheduled', 'Pending'];

  const handleDisplayTypeChange = (type) => {
    setDisplayType(type);
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setShowDropdown(!showDropdown)}
        className="px-4 py-2 font-semibold rounded bg-white border-2 border-black hover:bg-[#640d14] hover:text-white hover:border-white"
      >
        Display Type: {displayType}
      </button>
      {showDropdown && (
        <ul className="absolute mt-2 w-40 bg-[#640d14] text-white border border-gray-300 rounded-md shadow-lg z-10">
          {displayTypeOptions.map((option) => (
            <li 
              key={option}
              onClick={() => handleDisplayTypeChange(option)} 
              className="px-4 py-2 hover:bg-gray-200 hover:text-black cursor-pointer"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DisplayType;
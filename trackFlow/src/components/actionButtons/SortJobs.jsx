import React, { useState } from 'react';
import Button from "../design/Button";

function SortJobs({ onSort }) {
  const [showSort, setShowSort] = useState(false);

  const handleSort = (type) => {
    onSort(type);
    setShowSort(false);
  };

  return (
    <div className="relative">
      <Button onClick={() => setShowSort(!showSort)}>
        Sort By
      </Button>
      {showSort && (
        <ul className="absolute -right-28 mt-2 w-52 bg-[#640d14] text-white border border-gray-300 rounded-md shadow-lg z-10">
          <li onClick={() => handleSort('Most Recent')} className="px-4 py-2 hover:bg-gray-200 hover:text-black cursor-pointer">Most Recent</li>
          <li onClick={() => handleSort('Least Recent')} className="px-4 py-2 hover:bg-gray-200 hover:text-black cursor-pointer">Least Recent</li>
          <li onClick={() => handleSort('CTC Highest First')} className="px-4 py-2 hover:bg-gray-200 hover:text-black cursor-pointer">CTC - High to Low</li>
          <li onClick={() => handleSort('CTC Lowest First')} className="px-4 py-2 hover:bg-gray-200 hover:text-black cursor-pointer">CTC - Low to High</li>
        </ul>
      )}
    </div>
  );
}

export default SortJobs;
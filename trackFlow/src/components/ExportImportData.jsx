import React from 'react';

function ExportImportData({ jobs, setJobs }) {
  // Export function
  const exportData = () => {
    const dataStr = JSON.stringify(jobs, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'job-data.json';
    link.click();
  };

  // Import function
  const importData = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const importedJobs = JSON.parse(event.target.result);
      setJobs(importedJobs);
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex justify-center items-center my-4 space-x-4 pb-4">
      <button
        onClick={exportData}
        className="bg-[#006769] text-white rounded hover:bg-gray-700 px-4 py-2 transition duration-300"
      >
        Export Data
      </button>
      <span className="flex items-center space-x-2">
        <input
          type="file"
          onChange={importData}
          className="border border-gray-400 rounded px-2 py-2"
          accept=".json"
        />
        <span className="text-gray-600">Choose a JSON file to import</span>
      </span>
    </div>
  );
}

export default ExportImportData;

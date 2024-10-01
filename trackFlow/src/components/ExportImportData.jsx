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
    <div className="flex flex-col items-center mt-4 space-y-4">
      <button
        onClick={exportData}
        className="bg-purple-700 text-white rounded hover:bg-gray-700 px-4 py-2 transition duration-300"
      >
        Export Data
      </button>
      <div className="flex items-center space-x-2 pb-5">
        <input
          type="file"
          onChange={importData}
          className="border border-gray-300 rounded px-2 py-2"
          accept=".json"
        />
        <span className="text-gray-600">Choose a JSON file to import</span>
      </div>
    </div>
  );
}

export default ExportImportData;

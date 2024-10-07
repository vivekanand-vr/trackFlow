import React, { useState, useEffect } from 'react';
import { sortJobsByCTC, sortJobsByDate } from '../utils/Functions';
import JobForm from '../components/JobForm';
import JobList from '../components/JobList';
import ExportImportData from '../components/ExportImportData';

const WarningNote = () => {
  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded-r-lg shadow-md">
      <div className="flex items-center">
        <span className="text-l mr-2" role="img" aria-label="warning">⚠️</span>
        <p className="font-semibold">Important:</p>
      </div>
      <p className="mt-2">
        Please export your data before clearing your browser cache. 
        Failure to do so may result in loss of your job Dashboardlication records.
      </p>
    </div>
  );
};

function Dashboard() {
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem('jobs');
    return savedJobs ? JSON.parse(savedJobs) : [];
  });
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSort, setShowSort] = useState(false);

  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);

  const handleSort = (type) => {
    if (type === 'Date') {
      const sortedByDate = sortJobsByDate(jobs);
      setJobs(sortedByDate);
    } else if (type === 'CTC') {
      const sortedByCTC = sortJobsByCTC(jobs);
      setJobs(sortedByCTC);
    }
    setShowSort(false);
  };

  const addJob = (job) => {
    setJobs(prevJobs => [...prevJobs, job]);
  };
  
  const deleteJob = (id) => {
    setJobs(prevJobs => prevJobs.filter(job => job.id !== id));
  };

  const updateJob = (updatedJob) => {
    setJobs(prevJobs => prevJobs.map(job => (job.id === updatedJob.id ? updatedJob : job)));
    setSelectedJob(null);
    setShowModal(false);
  };

  const handleUpdateClick = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedJob(null);
  };

  return (
    <div className="p-6 mx-6">
      <WarningNote />
        <h1 className='text-center text-4xl text-gray-600 font-semibold'>Dashboard</h1>
        <div className="flex justify-between mb-4">
            <button 
              onClick={() => setShowModal(true)} 
              className="px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800 transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            >
              Add Application
            </button>

          <div className="relative">
            <button 
                onClick={() => setShowSort(!showSort)}
                className="px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800 transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            >
              Sort By
            </button>
              {showSort && (
                <ul className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                  <li onClick={() => handleSort('Date')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Date</li>
                  <li onClick={() => handleSort('CTC')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">CTC</li>
                </ul>
              )}
          </div>
        </div>

          {showModal && (
            <JobForm 
              onSubmit={selectedJob ? updateJob : addJob} 
              selectedJobData={selectedJob} 
              onClose={handleCloseModal}
            />
          )}

          <JobList jobs={jobs} onDelete={deleteJob} onUpdate={handleUpdateClick} />
          <ExportImportData jobs={jobs} setJobs={setJobs} />
    </div>
  );
}

export default Dashboard;
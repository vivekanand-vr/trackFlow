import React, { useState, useEffect } from 'react';
import { sortJobsByCTC, sortJobsByDate } from '../utils/Functions';
import JobForm from '../components/JobForm';
import JobList from '../components/JobList';
import Charts from '../components/Charts';
import ExportImportData from '../components/ExportImportData';

const WarningNote = () => {
  return (
    <div className="bg-[#FDFFC2] border-l-4 border-yellow-500 p-4 mb-6 rounded-r-lg shadow-md">
      <div className="flex items-center">
        <span className="text-l mr-2" role="img" aria-label="warning">⚠️</span>
        <p className="font-semibold">Important:</p>
      </div>
      <p className="mt-2">
        Please export your data before clearing your browser cache. 
        Failure to do so may result in loss of your job Dashboard Application records.
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
  const [viewAnalytics, setViewAnalytics] = useState(false);
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
      <div className='flex justify-center'>
        <h1 className='w-fit text-4xl text-gray-600 font-semibold tracking-wider [background:linear-gradient(_to_bottom,transparent_40%,#fce041_)] px-2 py-2'>
          Dashboard
        </h1>
      </div>
        <div className="flex space-x-4 mb-4">
            <button 
              onClick={() => setShowModal(true)} 
              className="px-4 py-2 bg-[#006769] font-semibold  text-white rounded-md hover:bg-[#16423C] transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            >
              Add Application
            </button>

          <div className="relative">
            <button 
                onClick={() => setShowSort(!showSort)}
                className="px-4 py-2 bg-[#006769] font-semibold  text-white rounded-md hover:bg-[#16423C] transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            >
              Sort By
            </button>
              {showSort && (
                <ul className="absolute -right-20 mt-2 w-40 bg-[#e2ece3] border border-gray-300 rounded-md shadow-lg z-10">
                  <li onClick={() => handleSort('Date')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Date</li>
                  <li onClick={() => handleSort('CTC')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">CTC</li>
                </ul>
              )}
          </div>

          <button onClick={() => setViewAnalytics(!viewAnalytics)}
                  className='px-4 py-2 bg-[#006769] font-semibold  hover:bg-[#16423C] text-white rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50'>
              { viewAnalytics ? 'Hide Analytics' : 'Show Analytics'}
          </button>
        </div>

          {showModal && (
            <JobForm 
              onSubmit={selectedJob ? updateJob : addJob} 
              selectedJobData={selectedJob} 
              onClose={handleCloseModal}
            />
          )}

          <JobList jobs={jobs} onDelete={deleteJob} onUpdate={handleUpdateClick} />
          { viewAnalytics && <Charts data={jobs} />}
          <ExportImportData jobs={jobs} setJobs={setJobs} />
    </div>
  );
}

export default Dashboard;
import React, { useState, useEffect } from 'react';
import Button from './components/design/Button';
import JobForm from './components/JobForm';
import JobList from './components/JobList';
import Charts from './components/Charts';
import SortJobs from "./components/actionButtons/SortJobs";
import DisplayType from './components/actionButtons/DisplayType';
import ExportImportData from './components/actionButtons/ExportImportData';
import { sortJobsByCtcAsc, sortJobsByCtcDes, sortJobsByDateAsc, sortJobsByDateDes } from './utils/Functions';

const HeroSection = () => {
  return (
    <div className='text-white'>
      <h1 className="text-6xl font-bold mb-2 text-center">
          Track Flow
      </h1>
      <p className="text-2xl mb-6 text-center">
          Streamline your job search journey
      </p>
    </div>
  )
}

const Popup = ({ onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-lg text-center">
        <h2 className="text-lg font-bold mb-4">Important!</h2>
        <p className="text-gray-800">
          Please export your data before clearing your browser cache.
          Failure to do so may result in the loss of your records.
        </p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-maroon-600 text-white font-semibold rounded hover:bg-gray-800"
        >
          Got it
        </button>
      </div>
    </div>
  );
};

function Dashboard() {
  
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem('jobs');
    return savedJobs ? JSON.parse(savedJobs) : [];
  });
  const [popup, setPopup] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [displayType, setDisplayType] = useState('All');

  useEffect(() => {
    // Show the popup every time the page is loaded
    setPopup(true);
  }, [])

  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);

  const handleSort = (type) => {
    switch (type) {
      case 'Most Recent':
        setJobs(sortJobsByDateDes([...jobs]));
        break;
      case 'Least Recent':
        setJobs(sortJobsByDateAsc([...jobs]));
        break;
      case 'CTC Highest First':
        setJobs(sortJobsByCtcDes([...jobs]));
        break;
      default:
        setJobs(sortJobsByCtcAsc([...jobs]));
        break;
    }
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

  const closeStats = () => setShowStats(false);

  const filterJobs = (jobs) => {
    if (displayType === 'All') return jobs;
    return jobs.filter(job => job.status === displayType);
  };

  return (
    <div className="p-6 mx-8">
      {popup && (
        <Popup
          message=""
          onClose={() => setPopup(false)}
        />
      )}
      
      <HeroSection />
     
      {/* All Buttons */}
      <div className="flex space-x-4 mb-4 font-poppins">
        <Button onClick={() => setShowModal(true)}> Add Application </Button>
        
        <SortJobs onSort={handleSort} />
        
        <DisplayType displayType={displayType} setDisplayType={setDisplayType} />
        
        <Button disabled={jobs.length === 0} onClick={() => setShowStats(true)}>
          Show Stats
        </Button>
      </div>

      {showModal && (
        <JobForm 
          onSubmit={selectedJob ? updateJob : addJob} 
          selectedJobData={selectedJob} 
          onClose={handleCloseModal}
        />
      )}

      {showStats && (
        <Charts data={jobs} onClose={closeStats} />
      )}

      <JobList jobs={filterJobs(jobs)} onDelete={deleteJob} onUpdate={handleUpdateClick} />
      <ExportImportData jobs={jobs} setJobs={setJobs} />
    </div>
  );
}

export default Dashboard;
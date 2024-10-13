import React, { useState, useEffect } from 'react';
import { sortJobsByCTC, sortJobsByDate } from '../utils/Functions';
import Profile from '../components/Profile';
import JobForm from '../components/JobForm';
import JobList from '../components/JobList';
import Charts from '../components/Charts';
import SortJobs from "../components/actionButtons/SortJobs";
import DisplayType from '../components/actionButtons/DisplayType';
import ExportImportData from '../components/actionButtons/ExportImportData';

const WarningNote = () => {
  return (
    <div className="bg-[#FDFFC2] w-fit border-l-4 border-yellow-500 p-4 mb-6 rounded-r-lg shadow-md">
      <div className="flex items-center font-poppins">
        <span className="text-l mr-2" role="img" aria-label="warning">⚠️</span>
        <p className="font-semibold">Important:</p>
      </div>
      <p className="mt-2 font-poppins">
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
  const [displayType, setDisplayType] = useState('All');

  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);

  const handleSort = (type) => {
    if (type === 'Date') {
      setJobs(sortJobsByDate([...jobs]));
    } else if (type === 'CTC') {
      setJobs(sortJobsByCTC([...jobs]));
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

  const filterJobs = (jobs) => {
    if (displayType === 'All') return jobs;
    return jobs.filter(job => job.status === displayType);
  };

  return (
    <div className="p-6 mx-8">
      <div className='flex justify-between'>
        <WarningNote />
        <Profile />
      </div>

      {/* All Buttons */}
      <div className="flex space-x-4 mb-4 font-poppins">
        <button onClick={() => setShowModal(true)} 
                className="px-4 py-2 font-semibold rounded bg-white border-2 border-black hover:bg-[#640d14] hover:text-white hover:border-white">
          Add Application
        </button>

        <SortJobs onSort={handleSort} />

        <DisplayType displayType={displayType} setDisplayType={setDisplayType} />

        <button onClick={() => setViewAnalytics(!viewAnalytics)}
                className='px-4 py-2 font-semibold rounded bg-white border-2 border-black hover:bg-[#640d14] hover:text-white hover:border-white'>
          { viewAnalytics ? 'Hide Stats' : 'Show Stats'}
        </button>
      </div>

      {showModal && (
        <JobForm 
          onSubmit={selectedJob ? updateJob : addJob} 
          selectedJobData={selectedJob} 
          onClose={handleCloseModal}
        />
      )}

      <JobList jobs={filterJobs(jobs)} onDelete={deleteJob} onUpdate={handleUpdateClick} />
      { viewAnalytics && <Charts data={jobs} />}
      <ExportImportData jobs={jobs} setJobs={setJobs} />
    </div>
  );
}

export default Dashboard;
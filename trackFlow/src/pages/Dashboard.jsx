import React, { useState, useEffect } from 'react';
import Button from '../components/design/Button';
import Profile from '../components/Profile';
import JobForm from '../components/JobForm';
import JobList from '../components/JobList';
import Charts from '../components/Charts';
import SortJobs from "../components/actionButtons/SortJobs";
import DisplayType from '../components/actionButtons/DisplayType';
import ExportImportData from '../components/actionButtons/ExportImportData';
import { sortJobsByCtcAsc, sortJobsByCtcDes, sortJobsByDateAsc, sortJobsByDateDes } from '../utils/Functions';

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
  const [showModal, setShowModal] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [displayType, setDisplayType] = useState('All');

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
      <div className='flex justify-between'>
        <WarningNote />
        <Profile />
      </div>

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
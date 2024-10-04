import React, { useState, useEffect, useRef } from 'react';
import { sortJobsByCTC, sortJobsByDate } from './utils/Functions';
import JobForm from './components/JobForm';
import JobList from './components/JobList';
import ExportImportData from './components/ExportImportData';

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
          Track Flow
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl font-semibold mb-8">
          Streamline Your Job Search Journey
        </p>
        <p className="text-lg sm:text-xl md:text-2xl mb-2">
          Organize, monitor, and optimize your job applications with ease
        </p>
      </div>
    </div>
  );
};

const WarningNote = () => {
  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded-r-lg shadow-md">
      <div className="flex items-center">
        <span className="text-l mr-2" role="img" aria-label="warning">⚠️</span>
        <p className="font-semibold">Important:</p>
      </div>
      <p className="mt-2">
        Please export your data before clearing your browser cache. 
        Failure to do so may result in loss of your job application records.
      </p>
    </div>
  );
};

function App() {
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem('jobs');
    return savedJobs ? JSON.parse(savedJobs) : [];
  });
  const [selectedJob, setSelectedJob] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showSort, setShowSort] = useState(false);

  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);

  const handleSort = (type) => {
    if (type === 'Date') {
      const sortedByDate = sortJobsByDate(jobs);
      setJobs(sortedByDate);  // Set sorted jobs by date
    } else if (type === 'CTC') {
      const sortedByCTC = sortJobsByCTC(jobs);
      setJobs(sortedByCTC);  // Set sorted jobs by CTC
    }
    setShowSort(false);  // Close the sort dropdown
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
    setShowForm(false);
  };

  const handleUpdateClick = (job) => {
    setSelectedJob(job);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <HeroSection />
      <div className="mx-auto py-6 sm:px-6 lg:px-8">
        <WarningNote />
        <div className="bg-white shadow-xl rounded-lg">
          <button onClick={() => {setShowForm(!showForm); if (!showForm) setSelectedJob(null);}} 
                  className="mb-4 p-2 bg-purple-700 text-white rounded hover:bg-gray-700 transition duration-300">
            {showForm ? 'Cancel' : 'Add Application'}
          </button>

          <button onClick={() => setShowSort(!showSort)}
                 className='ml-4 p-2 bg-purple-700 text-white rounded hover:bg-gray-700'>Sort By</button>
          { // Sort By drop down menu
            showSort && 
            ( <ul className="font-semibold absolute left-52 ml-10 -mt-14 min-w-32 bg-violet-200 border-1 border-gray-400 rounded-md shadow-lg">
                <li onClick={() => handleSort('Date')} className="px-3 py-2 border-b border-gray-300 hover:bg-gray-500 hover:text-white">
                      Date
                </li>
                <li onClick={() => handleSort('CTC')} className="px-3 py-2 border-b border-gray-300 hover:bg-gray-500 hover:text-white cursor-pointer">
                      CTC
                </li>
              </ul>)
          }
          { // Conditionally rendering JobForm
            showForm && 
            <JobForm onSubmit={selectedJob ? updateJob : addJob} selectedJobData={selectedJob} />
          }
          <JobList jobs={jobs} onDelete={deleteJob} onUpdate={handleUpdateClick} />
          <ExportImportData jobs={jobs} setJobs={setJobs} />
        </div>
      </div>
    </div>
  );
}

export default App;
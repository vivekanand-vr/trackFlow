import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);

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
        <div className="bg-white shadow-xl rounded-lg p-6">
          <button 
            onClick={() => {
              setShowForm(!showForm);
              if (!showForm) setSelectedJob(null);
            }} 
            className="mb-4 p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
          >
            {showForm ? 'Cancel' : 'Add Application'}
          </button>
          {showForm && <JobForm onSubmit={selectedJob ? updateJob : addJob} selectedJobData={selectedJob} />}
          <JobList jobs={jobs} onDelete={deleteJob} onUpdate={handleUpdateClick} />
          <ExportImportData jobs={jobs} setJobs={setJobs} />
        </div>
      </div>
    </div>
  );
}

export default App;
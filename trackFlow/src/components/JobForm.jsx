import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SkillsInput from './SkillsInput';

const JobForm = ({ onSubmit, selectedJobData, onClose }) => {
  const [jobData, setJobData] = useState({
    id: uuidv4(),
    company: '',
    position: '',
    salary: '',
    hiringProcess: '',
    round1: '',
    round2: '',
    keySkills: [],
    status: '',
    date: '',
    location: '',
    notes: '',
    recruiterContact: '',
  });

  const [recruiterName, setRecruiterName] = useState('');
  const [recruiterContact, setRecruiterContact] = useState('');

  useEffect(() => {
    if (selectedJobData) {
      setJobData(selectedJobData);
      // Split recruiterContact into name and contact
      const [name, contact] = (selectedJobData.recruiterContact || '').split(' ');
      setRecruiterName(name || '');
      setRecruiterContact(contact || '');
    } else {
      setJobData({
        id: uuidv4(),
        company: '',
        position: '',
        salary: '',
        hiringProcess: '',
        round1: '',
        round2: '',
        keySkills: [],
        status: '',
        date: '',
        location: '',
        notes: '',
        recruiterContact: '',
      });
      setRecruiterName('');
      setRecruiterContact('');
    }
  }, [selectedJobData]);

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSkillsChange = (newSkills) => {
    setJobData(prevData => ({ ...prevData, keySkills: newSkills }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedJobData = {
      ...jobData,
      recruiterContact: `${recruiterName} ${recruiterContact}`.trim(),
    };
    onSubmit(updatedJobData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center pb-3">
          <p className="text-3xl mx-auto font-semibold text-gray-800">{selectedJobData ? 'Update Job' : 'Add New Job'}</p>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="company"
              placeholder="Company"
              value={jobData.company}
              onChange={handleChange}
              maxLength={40}
              required
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <input
              type="text"
              name="position"
              placeholder="Position"
              value={jobData.position}
              onChange={handleChange}
              required maxLength={45}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <input
              type="number"
              name="salary"
              placeholder="Salary/CTC"
              value={jobData.salary}
              onChange={handleChange}
              min={1} max={50}
              required
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <select
              name="hiringProcess"
              value={jobData.hiringProcess}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Hiring Process</option>
              <option value="Aptitude and Coding">Aptitude and Coding</option>
              <option value="DSA Coding Round">DSA Coding Round</option>
              <option value="Coding Contest">Coding Contest</option>
              <option value="Development Task">Development Task</option>
              <option value="Hackathon">Hackathon</option>
              <option value="Interview">Interview</option>
            </select>
            
            <select
              name="round1"
              value={jobData.round1}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Round 1</option>
              <option value="Scheduled 📆">Scheduled 📆</option>
              <option value="Passed ✔️">Passed ✔️</option>
              <option value="Failed ❌">Failed ❌</option>
              <option value="Pending ⌛">Pending ⌛</option>
            </select>
            
            <select
              name="round2"
              value={jobData.round2}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Round 2</option>
              <option value="Scheduled 📆">Scheduled 📆</option>
              <option value="Passed ✔️">Passed ✔️</option>
              <option value="Failed ❌">Failed ❌</option>
              <option value="Pending ⌛">Pending ⌛</option>
              <option value="N/A ⛔"> N/A ⛔</option>
            </select>

            <div className="col-span-2">
              <h2 className="ml-1 mb-2 font-semibold">Key Skills</h2>
              <div className="">
                <SkillsInput 
                  skills={jobData.keySkills}
                  onSkillsChange={handleSkillsChange}
                />
              </div>
            </div>
            
            <select
              name="status"
              value={jobData.status}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Status</option>
              <option value="Applied">Applied</option>
              <option value="Paused">Paused</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Offered">Offered</option>
              <option value="Rejected">Rejected</option>
            </select>
            
            <input
              type="date"
              name="date"
              value={jobData.date}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              name="location"
              placeholder="Location"
              value={jobData.location} maxLength={50}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="col-span-2">
              <h2 className="mb-2 font-semibold">Recruiter Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Recruiter Name (Without Space)" maxLength={20}
                  value={recruiterName}
                  onChange={(e) => setRecruiterName(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Recruiter Contact (Email/Phone)" maxLength={20}
                  value={recruiterContact}
                  onChange={(e) => setRecruiterContact(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="col-span-2">
              <textarea
                name="notes"
                placeholder="Additional Notes"
                value={jobData.notes}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3" maxLength={300}
              ></textarea>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              {selectedJobData ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobForm;
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SkillsInput from './SkillsInput';

const JobForm = ({ onSubmit, selectedJobData }) => {
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
  });

  useEffect(() => {
    if (selectedJobData) {
      setJobData(selectedJobData);
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
      });
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
    onSubmit(jobData);

    if (!selectedJobData) {
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
      });
    }
  };

  return (
    <table>
      <tr>
        <td colSpan="10">
          <form onSubmit={handleSubmit} className="flex flex-wrap space-x-3 mt-2 mb-5">
            {/* Company Name */}
            <input
              type="text"
              name="company"
              placeholder="Company"
              value={jobData.company}
              onChange={handleChange}
              required
              className="p-2 border border-stone-400 rounded w-1/8"
            />
            
            {/* Position */}
            <input
              type="text"
              name="position"
              placeholder="Position"
              value={jobData.position}
              onChange={handleChange}
              required
              className="p-2 border border-stone-400 rounded w-1/7"
            />
            
            {/* Salary */}
            <input
              type="number"
              name="salary"
              placeholder="Salary/CTC"
              value={jobData.salary}
              onChange={handleChange}
              required
              className="p-2 border border-stone-400 rounded w-28"
            />
            
            {/* Hiring Process */}
            <select
              name="hiringProcess"
              value={jobData.hiringProcess}
              onChange={handleChange}
              className="p-2 border border-stone-400 rounded w-1/8"
            >
              <option value="">Hiring Process</option>
              <option value="Aptitude and Coding">Aptitude and Coding</option>
              <option value="DSA Coding Round">DSA Coding Round</option>
              <option value="Coding Contest">Coding Contest</option>
              <option value="Development Assessment">Development Assessment</option>
              <option value="Hackathon">Hackathon</option>
              <option value="Direct Interview">Direct Interview</option>
            </select>
            
            {/* Round 1 */}
            <select
              name="round1"
              value={jobData.round1}
              onChange={handleChange}
              className="p-2 border border-stone-400 rounded w-1/8"
            >
              <option value="">Round 1</option>
              <option value="Passed ✔️">Passed ✔️</option>
              <option value="Failed ❌">Failed ❌</option>
              <option value="Pending ⌛">Pending ⌛</option>
            </select>
            
            {/* Round 2 */}
            <select
              name="round2"
              value={jobData.round2}
              onChange={handleChange}
              className="p-2 border border-stone-400 rounded w-1/8"
            >
              <option value="">Round 2</option>
              <option value="Passed ✔️">Passed ✔️</option>
              <option value="Failed ❌">Failed ❌</option>
              <option value="Pending ⌛">Pending ⌛</option>
            </select>

            {/* Key Skills */}
            <h2 className='flex justify-center items-center'>Key Skills</h2>
            <div className='max-h-11 w-60 overflow-y-auto border border-stone-400'>
                <SkillsInput 
                  skills={jobData.keySkills}
                  onSkillsChange={handleSkillsChange}
                />
            </div>
            
            {/* Status */}
            <select
              name="status"
              value={jobData.status}
              onChange={handleChange}
              className="p-2 rounded w-1/8 border border-stone-400"
            >
              <option value="">Status</option>
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Offered">Offered</option>
              <option value="Rejected">Rejected</option>
            </select>
            
            {/* Date */}
            <input
              type="date"
              name="date"
              value={jobData.date}
              onChange={handleChange}
              required
              className="p-2 border border-stone-400 rounded w-1/8"
            />
            
            {/* Submit Button */}
            <button type="submit" className="p-2 px-3 bg-blue-500 text-white rounded">
              {selectedJobData ? 'Update' : 'Add'}
            </button>
          </form>
        </td>
      </tr>
    </table>
  );
};

export default JobForm;

import React from 'react';

const JobList = ({ jobs, onDelete, onUpdate }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border-b p-2 w-1/7 text-left">Company</th>
            <th className="border-b p-2 w-1/7 text-left">Position</th>
            <th className="border-b p-2 w-1/10 text-left">Salary/CTC</th>
            <th className="border-b p-2 w-1/8 text-left">Hiring Process</th>
            <th className="border-b p-2 w-1/12 text-left">Round 1</th>
            <th className="border-b p-2 w-1/12 text-left">Round 2</th>
            <th className="border-b p-2 w-1/6 text-left">Key Skills</th>
            <th className="border-b p-2 w-1/8 text-left">Status</th>
            <th className="border-b p-2 w-1/8 text-left">Date</th>
            <th className="border-b p-2 w-1/6 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id} className="hover:bg-gray-100">
              <td className="border-b p-2 text-left">{job.company}</td>
              <td className="border-b p-2 text-left">{job.position}</td>
              <td className="border-b p-2 text-left">{job.salary} LPA</td>
              <td className="border-b p-2 text-left">{job.hiringProcess}</td>
              <td className="border-b p-2 text-left">{job.round1}</td>
              <td className="border-b p-2 text-left">{job.round2}</td>
              <td className="border-b p-2 text-left">
                <div className="flex flex-wrap gap-2 max-w-xs">
                  {job.keySkills.map((skill) => (
                    <span 
                      key={skill} 
                      className="px-2 py-1 bg-gray-200 rounded-full text-sm whitespace-nowrap"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </td>
              <td className="border-b p-2 text-left">{job.status}</td>
              <td className="border-b p-2 text-left">{job.date}</td>
              <td className="border-b p-2">
                <button onClick={() => onUpdate(job)} className="text-blue-500">Update</button>
                <button onClick={() => onDelete(job.id)} className="ml-2 text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobList;

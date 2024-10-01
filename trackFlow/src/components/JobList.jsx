import React from 'react';

const JobList = ({ jobs, onDelete, onUpdate }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-500">
        <thead>
          <tr className="bg-gray-200">
            <th className="border-b border-r border-slate-600 p-2 w-1/7 text-left">Company</th>
            <th className="border-b border-r border-slate-600 p-2 w-1/7 text-left">Position</th>
            <th className="border-b border-r border-slate-600 p-2 w-1/10 text-left">Salary/CTC</th>
            <th className="border-b border-r border-slate-600 p-2 w-1/8 text-left">Hiring Process</th>
            <th className="border-b border-r border-slate-600 p-2 w-1/12 text-left">Round 1</th>
            <th className="border-b border-r border-slate-600 p-2 w-1/12 text-left">Round 2</th>
            <th className="border-b border-r border-slate-600 p-2 w-1/6 text-left">Key Skills</th>
            <th className="border-b border-r border-slate-600 p-2 w-1/8 text-left">Status</th>
            <th className="border-b border-r border-slate-600 p-2 w-1/8 text-left">Date</th>
            <th className="border-b border-slate-600 p-2 w-1/8 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, index) => (
            <tr key={job.id} className="hover:bg-gray-100 last:border-b border-gray-500">
              <td className="border-t border-r border-neutral-300 p-2 text-left">{job.company}</td>
              <td className="border-t border-r border-neutral-300 p-2 text-left">{job.position}</td>
              <td className="border-t border-r border-neutral-300 p-2 text-left">{job.salary} LPA</td>
              <td className="border-t border-r border-neutral-300 p-2 text-left">{job.hiringProcess}</td>
              <td className="border-t border-r border-neutral-300 p-2 text-left">{job.round1}</td>
              <td className="border-t border-r border-neutral-300 p-2 text-left">{job.round2}</td>
              <td className="border-t border-r border-neutral-300 p-2 text-left">
                <div className="flex flex-wrap gap-2 max-w-xs">
                  {job.keySkills.map((skill) => (
                    <span key={skill} className="px-2 py-1 bg-teal-100 rounded-xl text-sm whitespace-nowrap">
                      {skill}
                    </span>
                  ))}
                </div>
              </td>
              <td
                className={`font-semibold border-t border-r border-neutral-300 p-2 text-left ${
                  job.status === "Applied"
                    ? "bg-blue-200"
                    : job.status === "Interviewing"
                    ? "bg-yellow-200"
                    : job.status === "Offered"
                    ? "bg-green-200"
                    : job.status === "Rejected"
                    ? "bg-red-200"
                    : ""
                }`}
              >
                {job.status}
              </td>
              <td className="border-t border-r border-neutral-300 p-2 text-left">{job.date}</td>
              <td className="border-t border-neutral-300 p-2">
                <button onClick={() => onUpdate(job)} className="text-blue-500 font-semibold">Update</button>
                <button onClick={() => onDelete(job.id)} className="ml-3 text-red-500 font-semibold">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobList;

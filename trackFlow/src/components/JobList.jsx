import React, { useState } from 'react';
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaRegStickyNote } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line, RiAddLargeLine } from "react-icons/ri";

const JobList = ({ jobs, onDelete, onUpdate }) => {
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [selectedNotes, setSelectedNotes] = useState('');

  const handleNotesClick = (notes) => {
    setSelectedNotes(notes);
    setShowNotesModal(true);
  };

  const NotesModal = ({ notes, onClose }) => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50" id="notes-modal">
      <div className="relative p-5 border w-96 shadow-lg rounded-md bg-white">
        {/* Close Icon at top right */}
        <button className="absolute top-3 right-3 text-2xl text-gray-500 hover:text-gray-700" onClick={onClose}>
          <IoCloseCircleOutline />
        </button>
        
        {/* Modal Content */}
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Note</h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-sm text-gray-700">{notes}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-500">
        <thead>
          <tr className="bg-gray-200">
            <th className="border-b border-r border-slate-600 p-2 text-left">Company</th>
            <th className="border-b border-r border-slate-600 p-2 text-left">Position</th>
            <th className="border-b border-r border-slate-600 p-2 text-left">CTC</th>
            <th className="border-b border-r border-slate-600 p-2 text-left">Hiring Process</th>
            <th className="border-b border-r border-slate-600 p-2 text-left">Note</th>
            <th className="border-b border-r border-slate-600 p-2 text-left">Round 1</th>
            <th className="border-b border-r border-slate-600 p-2 text-left">Round 2</th>
            <th className="border-b border-r border-slate-600 p-2 text-left">Key Skills</th>
            <th className="border-b border-r border-slate-600 p-2 text-left">Status</th>
            <th className="border-b border-r border-slate-600 p-2 text-left">Date</th>
            <th className="border-b border-r border-slate-600 p-2 text-left">Location</th>
            <th className="border-b border-r border-slate-600 p-2 text-left">Recruiter Contact</th>
            <th className="border-b border-slate-600 py-2 pl-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id} className="hover:bg-gray-100 last:border-b border-gray-500">
              <td className="border-t border-r border-neutral-300 p-2 text-left">{job.company}</td>
              <td className="border-t border-r border-neutral-300 p-2 text-left">{job.position}</td>
              <td className="border-t border-r border-neutral-300 p-2 text-left">{job.salary} LPA</td>
              <td className="border-t border-r border-neutral-300 p-2 text-left">{job.hiringProcess}</td>
              <td className="border-t border-r border-neutral-300 p-2 text-center">
                {job.notes ? (
                  <button onClick={() => handleNotesClick(job.notes)} className="text-blue-500">
                    <FaRegStickyNote />
                  </button>
                ):(
                  <button onClick={() => onUpdate(job)} className="text-blue-500">
                    <RiAddLargeLine />
                  </button>
                )
                
                }
              </td>
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
                    ? "bg-blue-200 text-blue-800"
                    : job.status === "Interviewing"
                    ? "bg-yellow-100 text-yellow-700"
                    : job.status === "Offered"
                    ? "bg-green-200 text-green-800"
                    : job.status === "Rejected"
                    ? "bg-red-200 text-red-800"
                    : job.status === "Paused"
                    ? "bg-cyan-200 text-cyan-800"
                    : ""
                }`}
              >
                {job.status}
              </td>
              <td className="border-t border-r border-neutral-300 p-2 text-left">
                { // Formatting date in 'DD-MM-YY' format
                  new Date(job.date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit', })}
              </td>
              <td className="border-t border-r border-neutral-300 p-2 text-left">{job.location}</td>
              <td className="border-t border-r border-neutral-300 p-2 text-left">{job.recruiterContact}</td>
              <td className="border-t border-neutral-300 p-2">
                <button onClick={() => onUpdate(job)} className="text-blue-600"> <FiEdit /> </button>
                <button onClick={() => onDelete(job.id)} className="ml-4 text-red-600"> <RiDeleteBin6Line /> </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showNotesModal && (
        <NotesModal notes={selectedNotes} onClose={() => setShowNotesModal(false)} />
      )}
    </div>
  );
};

export default JobList;
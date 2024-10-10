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
      <table className="min-w-full border border-black">
        <thead>
          <tr className="bg-[#0D9276] text-white text-left">
            <th className="p-2">COMPANY</th>
            <th className="p-2">POSITION</th>
            <th className="p-2">CTC</th>
            <th className="p-2">HIRING PROCESS</th>
            <th className="p-2">NOTE</th>
            <th className="p-2">ROUND 1</th>
            <th className="p-2">ROUND 2</th>
            <th className="p-2">KEY SKILLS</th>
            <th className="p-2">STATUS</th>
            <th className="p-2">DATE</th>
            <th className="p-2">LOCATION</th>
            <th className="p-2">RECRUITER CONTACT</th>
            <th className="p-2">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id} className="bg-[#FEFDED] hover:bg-[#C4DAD2] last:border-b border-black">
              <td className="p-2.5">{job.company}</td>
              <td className="p-2.5">{job.position}</td>
              <td className="p-2.5">{job.salary} LPA</td>
              <td className="p-2.5">{job.hiringProcess}</td>
              <td className="p-2.5 text-center">
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
              <td className="p-2.5">{job.round1}</td>
              <td className="p-2.5">{job.round2}</td>
              <td className="p-2.5">
                <div className="flex flex-wrap gap-2 max-w-xs">
                  {job.keySkills.map((skill) => (
                    <span key={skill} className="px-2 py-1 bg-indigo-100 rounded-xl text-sm whitespace-nowrap">
                      {skill}
                    </span>
                  ))}
                </div>
              </td>
              <td
                className={`font-semibold p-2.5 ${
                  job.status === "Applied"
                    ? "bg-slate-200 text-stone-600"
                    : job.status === "Interviewing"
                    ? "bg-yellow-100 text-yellow-600"
                    : job.status === "Offered"
                    ? "bg-green-100 text-green-700"
                    : job.status === "Rejected"
                    ? "bg-red-100 text-red-600"
                    : job.status === "Paused"
                    ? "bg-zinc-200 text-gray-700"
                    : job.status === "Scheduled"
                    ? "bg-blue-100 text-blue-600"
                    : job.status === "Pending"
                    ? "bg-neutral-200 text-slate-700"
                    : ""
                }`}
              >
                {job.status}
              </td>
              <td className="p-2.5">
                { // Formatting date in 'DD-MM-YY' format
                  new Date(job.date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit', })}
              </td>
              <td className="p-2.5">{job.location}</td>
              <td className="p-2.5">{job.recruiterContact}</td>
              <td className="p-2.5">
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
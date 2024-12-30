import React, { useState } from 'react';
import { HiringStagesCell } from './HiringStages';
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
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50" id="notes-modal">
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
    <div className="overflow-x-auto rounded-md">
      <table className="min-w-full">
        <thead className='font-poppins'>
          <tr className="bg-black text-white text-left">
          <th className="p-2">COMPANY</th>
          <th className="p-2">POSITION</th>
          <th className="p-2">CTC</th>
          <th className="p-2">HIRING STAGES</th>
          <th className="p-2">NOTE</th>
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
            <tr key={job.id} className="bg-white hover:bg-blue-100 transition-colors duration-200">
              <td className="p-2.5">{job.company}</td>
              <td className="p-2.5">{job.position}</td>
              <td className="p-2.5">{job.salary} LPA</td>
              <td className="p-2.5">
                <HiringStagesCell stages={job.hiringStages ?? []} />
              </td>
              <td className="p-2.5 pl-5">
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
              <td className="p-2.5">
                <div className="flex flex-wrap gap-2 max-w-xs">
                  {job.keySkills.map((skill) => (
                    <span key={skill} className="px-2 py-1 bg-rose-200 rounded-md text-sm whitespace-nowrap">
                      {skill}
                    </span>
                  ))}
                </div>
              </td>
              <td
                className={`p-2.5 ${
                    job.status === "Interviewing"
                    ? "bg-yellow-100"
                    : job.status === "Offered"
                    ? "bg-green-200"
                    : job.status === "Rejected"
                    ? "bg-red-100"
                    : job.status === "Scheduled"
                    ? "bg-blue-100"
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
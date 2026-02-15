import React, { useState } from 'react';
import { HiringStagesCell } from './HiringStages';
import { FaRegStickyNote } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line, RiAddLargeLine } from "react-icons/ri";
import { LuFolderSearch } from "react-icons/lu";
import NotesModal from './modals/NotesModal';
import Button from './design/Button';

const JobList = ({ jobs, onDelete, onUpdate }) => {
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [selectedNotes, setSelectedNotes] = useState('');

  const handleNotesClick = (notes) => {
    setSelectedNotes(notes);
    setShowNotesModal(true);
  };

  // Empty State UI when there are no job applications 
  if(jobs.length === 0 ){
    return (
      <div className='flex flex-col items-center justify-center min-h-[600px] gap-6 bg-white/95 p-10 rounded-md shadow-md'>
        <div className='flex flex-col items-center gap-4'>
          <LuFolderSearch size={40} className='text-black'/>
          <h2 className='text-center text-2xl font-poppins'>
            No job applications found. Start adding you applications now!
          </h2>
        </div>
        
        <Button onClick={() => onUpdate(null)} >
          Add Application 
        </Button>
      </div>
    )
  }

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
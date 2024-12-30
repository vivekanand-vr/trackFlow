import React, { useState } from 'react';
import { IoCloseCircleOutline } from "react-icons/io5";
import { BiMath, BiTask } from "react-icons/bi";
import { BsCheckCircleFill, BsXCircleFill, BsClockFill } from "react-icons/bs";
import { FaCode, FaUserTie, FaLaptopCode, FaUsers } from "react-icons/fa";
import { MdOutlineTimeline, MdDragIndicator, MdManageAccounts } from "react-icons/md";
import { RiAddLine, RiDeleteBin6Line } from "react-icons/ri";

// Stage type options and their corresponding icons
const STAGE_TYPES = {
  'aptitude': { label: 'Aptitude Test', icon:BiMath },
  'online_assessment': { label: 'Online Assessment', icon: FaLaptopCode },
  'assignment': { label: 'Practical Assignment', icon: BiTask },
  'interview': { label: 'Interview', icon: FaUserTie },
  'managerial_interview': { label: 'Managerial Interview', icon: MdManageAccounts },
  'hr_round': { label: 'HR Interview', icon: FaUsers }
};

const StageIcon = ({ type, status }) => {
  const stageInfo = STAGE_TYPES[type] || STAGE_TYPES['interview'];
  const Icon = stageInfo.icon;

  const getStatusColor = () => {
    switch (status) {
      case 'completed': return 'text-green-500';
      case 'failed': return 'text-red-500';
      case 'pending': return 'text-yellow-500';
      case 'scheduled': return 'text-blue-500';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className={`${getStatusColor()}`}>
      <Icon className="w-6 h-6" />
    </div>
  );
};

const StageStatus = ({ status }) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'completed': return <BsCheckCircleFill className="w-5 h-5 text-green-500" />;
      case 'failed': return <BsXCircleFill className="w-5 h-5 text-red-500" />;
      case 'pending': return <BsClockFill className="w-5 h-5 text-yellow-500" />;
      case 'scheduled': return <BsClockFill className="w-5 h-5 text-blue-500" />;
      default: return null;
    }
  };
  return getStatusIcon();
};

const HiringStagesModal = ({ stages, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
    <div className="relative p-6 border w-[32rem] shadow-lg rounded-md bg-white">
      <button 
        className="absolute top-3 right-3 text-2xl text-gray-500 hover:text-gray-700" 
        onClick={onClose}
      >
        <IoCloseCircleOutline />
      </button>
      
      <div className="mt-3">
        <h3 className="text-xl font-medium text-gray-900 mb-6">Hiring Stages Progress</h3>
        <div className="space-y-6">
          {stages.map((stage, index) => (
            <div key={index} className="flex items-center space-x-4">
              <StageIcon type={stage.type} status={stage.status} />
              <div className="flex-1">
                <h4 className="text-lg font-medium text-gray-900">
                  Stage {index + 1}: {STAGE_TYPES[stage.type]?.label}
                </h4>
                <p className="text-sm text-gray-500">{stage.date}</p>
              </div>
              <StageStatus status={stage.status} />
              {index < stages.length - 1 && (
                <div className="absolute left-[2.15rem] h-12 w-0.5 bg-gray-200" 
                     style={{ top: `${index * 96 + 88}px` }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const HiringStageForm = ({ stages, onChange, onAddStage, onRemoveStage }) => {
  const handleStageChange = (index, field, value) => {
    const updatedStages = [...stages];
    updatedStages[index] = { ...updatedStages[index], [field]: value };
    onChange(updatedStages);
  };

  return (
    <div className="space-y-4 mb-4">
      {stages.map((stage, index) => (
        <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg bg-slate-200">
          <div className="mt-2">
            <MdDragIndicator className="w-6 h-6 text-gray-600" />
          </div>
          
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                Stage {index + 1} Type
              </label>
              <select
                value={stage.type}
                onChange={(e) => handleStageChange(index, 'type', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Type</option>
                {Object.entries(STAGE_TYPES).map(([value, { label }]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Status</label>
              <select
                value={stage.status}
                onChange={(e) => handleStageChange(index, 'status', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Status</option>
                <option value="pending">Pending</option>
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Date</label>
              <input
                type="date"
                value={stage.date}
                onChange={(e) => handleStageChange(index, 'date', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            onClick={() => onRemoveStage(index)}
            className="mt-8 text-red-500 hover:text-red-700"
          >
            <RiDeleteBin6Line className="w-5 h-5" />
          </button>
        </div>
      ))}

      {stages.length < 6 && (
        <button
          onClick={onAddStage}
          className="flex items-center space-x-2 ml-2 rounded-lg border border-black p-2 text-blue-700"
        >
          <RiAddLine className="w-5 h-5" />
          <span>Add Stage</span>
        </button>
      )}
    </div>
  );
};

const HiringStagesCell = ({ stages }) => {
  const [showModal, setShowModal] = useState(false);

  const getOverallStatus = () => {
    if (stages.some(stage => stage.status === 'failed')) return 'failed';
    if (stages.every(stage => stage.status === 'completed')) return 'completed';
    if (stages.some(stage => stage.status === 'scheduled')) return 'scheduled';
    return 'pending';
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center space-x-2 p-1"
      >
        <MdOutlineTimeline className="w-5 h-5 text-blue-500" />
        <span className="text-sm text-gray-600">
          {stages.length} {stages.length === 1 ? 'Stage' : 'Stages'}
        </span>
      </button>
      
      {showModal && (
        <HiringStagesModal
          stages={stages}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export { HiringStagesCell, HiringStageForm };
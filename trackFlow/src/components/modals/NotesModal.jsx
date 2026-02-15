import { IoCloseCircleOutline } from "react-icons/io5";

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

export default NotesModal;
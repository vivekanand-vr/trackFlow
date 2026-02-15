const NotificationModal = ({ onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-lg text-center">
        <h2 className="text-lg font-bold mb-4">Important!</h2>
        <p className="text-gray-800">
          Please export your data before clearing your browser cache.
          Failure to do so may result in the loss of your records.
        </p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-maroon-600 text-white font-semibold rounded hover:bg-gray-800"
        >
          Got it
        </button>
      </div>
    </div>
  );
};

export default NotificationModal;
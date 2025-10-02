import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Hide the toast after 5 seconds
    return () => clearTimeout(timer);  // Cleanup the timer
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 w-96 p-4 rounded-lg shadow-lg flex items-center ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
      } text-white`}
    >
      {/* Icon */}
      <span className="mr-3 text-xl">
        {type === 'success' ? '✅' : '❌'}
      </span>

      {/* Message */}
      <p className="flex-1">{message}</p>

      {/* Close Button */}
      <button onClick={onClose} className="ml-3 text-lg">
        ✖
      </button>
    </div>
  );
};

export default Toast;

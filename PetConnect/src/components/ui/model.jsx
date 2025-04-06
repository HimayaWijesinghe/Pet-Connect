// Modal.jsx
import React from 'react';
import ReactDOM from 'react-dom';

function Modal({ children, onClose }) {
  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose} // Close when clicking outside
    >
      <div
        className="bg-white p-5 rounded-lg max-w-[55vw] max-h-[80vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}

export default Modal;
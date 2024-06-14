import React from 'react';

const DeleteModal = ({ onConfirm, onClose }) => {
  return (
    <div>
      <dialog id="my_modal_1" className="modal" open>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you sure?</h3>
          <p className="py-4">Do you really want to delete this lesson?</p>
          <div className="modal-action">
            {/* Close button */}
            <button className="btn" onClick={onClose}>Close</button>
            {/* Confirm button */}
            <button className="btn btn-primary" onClick={onConfirm}>Confirm</button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default DeleteModal;

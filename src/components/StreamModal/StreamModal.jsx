// components/StreamModal/StreamModal.jsx

import React from "react";
import TVPlayer from "../TVPlayer/TVPlayer"; // آدرس TVPlayer را چک کنید
import "./StreamModal.css"; // استایل‌های مودال را ایمپورت می‌کنیم

const StreamModal = ({ isOpen, onClose, streamUrl }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlayy" onClick={onClose}>
      <div className="modal-contentt" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>
          &times;
        </button>
        <div className="modal-body">
          <h3>پخش زنده</h3>
          <TVPlayer streamUrl={streamUrl} />
        </div>
      </div>
    </div>
  );
};

export default StreamModal;

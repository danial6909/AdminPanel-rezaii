import React from "react";
import "./Modals.css";

// کامپوننت مودال عمومی برای نمایش فرم و محتوای دیگر
export const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className={`modal ${isOpen ? "active" : ""}`}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

// کامپوننت دیالوگ برای گرفتن تایید از کاربر (مثلا برای حذف)
export const ConfirmationDialog = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  title,
}) => {
  if (!isOpen) return null;

  return (
    <div className={`modal ${isOpen ? "active" : ""}`}>
      <div className="modal-content small-modal">
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <p className="modal-message">{message}</p>
        <div className="modal-footer">
          <button className="btn btn-cancel" onClick={onClose}>
            انصراف
          </button>
          <button className="btn btn-submit" onClick={onConfirm}>
            تایید حذف
          </button>
        </div>
      </div>
    </div>
  );
};

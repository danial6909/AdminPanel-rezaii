// RecordModal.js - این فایل نیازی به تغییر ندارد
import React from "react";
import "./RecordModal.css";

const RecordModal = ({
  isOpen,
  onClose,
  title,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onSubmit,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>{title}</h2>
          <button onClick={onClose} className="close-button">
            &times;
          </button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="startDate">تاریخ و ساعت شروع:</label>

            <input
              type="datetime-local"
              id="startDate"
              value={startDate}
              onChange={onStartDateChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="endDate">تاریخ و ساعت پایان:</label>

            <input
              type="datetime-local"
              id="endDate"
              value={endDate}
              onChange={onEndDateChange}
            />
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={onSubmit} className="submit-button">
            شروع رکورد
          </button>

          <button onClick={onClose} className="cancel-button">
            انصراف
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordModal;

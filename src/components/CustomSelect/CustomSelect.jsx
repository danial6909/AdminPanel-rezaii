import React, { useState, useEffect, useRef } from "react";
import "./CustomSelect.css"; // مطمئن شو که فایل استایل رو داری

const CustomSelect = ({ label, name, options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null); // رفرنس برای بستن منو با کلیک بیرون

  // پیدا کردن "لیبل" گزینه انتخاب شده برای نمایش در دکمه
    // این کار باعث می‌شه اگه value شما مثلا "val1" هست، لیبل نمایشی اون یعنی "گزینه ۱" نشون داده بشه
  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || value;

  const handleSelect = (optionValue) => {
    // یک رویداد شبیه‌سازی شده می‌سازیم تا با handler عمومی فرم سازگار باشه
    const simulatedEvent = {
      target: {
        name: name,
        value: optionValue,
      },
    };
    onChange(simulatedEvent);
    setIsOpen(false);
  };

  // این useEffect برای بستن منو با کلیک در هر جای صفحه به جز خود سلکت باکس هست
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="form-field">
      {label && <label className="form-label">{label}</label>}
      <div className="custom-select" ref={selectRef}>
        <div
          className="custom-select-button"
          onClick={() => setIsOpen(!isOpen)}
          tabIndex={0}
        >
          <span>{selectedLabel}</span>
          <svg
            className={isOpen ? "open" : ""}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>
        {isOpen && (
          <ul className="custom-select-options">
            {options.map((opt) => (
              <li
          
                key={opt.value}
                className={opt.value === value ? "selected" : ""}
                onMouseDown={() => handleSelect(opt.value)}
              >
                {opt.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;

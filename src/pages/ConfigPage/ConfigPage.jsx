// Configuration.js
import React, { useState, useMemo } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import "./ConfigPage.css"; // وارد کردن فایل CSS

// کامپوننت‌های کوچک‌تر برای خوانایی بهتر کد

// کامپوننت برای Select Box سفارشی
const CustomSelect = ({ label, options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="form-field">
      <label className="form-label">{label}</label>
      <div className="custom-select">
        <div
          className="custom-select-button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{value}</span>
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
              <li key={opt} onClick={() => handleSelect(opt)}>
                {opt}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

// کامپوننت برای Checkbox سفارشی
const IosCheckbox = ({ label, checked, onChange, name }) => {
  return (
    <div className="form-field">
      <label className="form-label">{label}</label>
      <label className="ios-checkbox-wrapper" htmlFor={name}>
        <span>فعال</span>
        <div className="ios-checkbox">
          <input
            type="checkbox"
            id={name}
            name={name}
            checked={checked}
            onChange={onChange}
          />
          <div className="checkbox-wrapper">
            <div className="checkbox-bg"></div>
            <svg className="checkbox-icon" viewBox="0 0 24 24" fill="none">
              <path
                className="check-path"
                d="M4 12L10 18L20 6"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </div>
        </div>
      </label>
    </div>
  );
};

// کامپوننت اصلی
const Configuration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  const [formData, setFormData] = useState({
    networkType: "ماهواره‌ای",
    networkName: "",
    status: true,
    initialSearch: true,
    cardNetwork: "شبکه ۱",
    addCardAction: "اضافه کردن شبکه",
  });

  // مدیریت تغییرات در input ها و checkbox ها
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // مدیریت تغییرات در select box های سفارشی
  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // رفتن به مرحله بعد
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // نمایش پیام اتمام با SweetAlert2
      Swal.fire({
        icon: "success",
        title: "فرایند تکمیل شد!",
        text: "شما تمام مراحل را با موفقیت به پایان رساندید.",
        confirmButtonText: "باشه",
      });
    }
  };

  // برگشت به مرحله قبل
  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // متن دکمه "بعدی" بر اساس مرحله فعلی
  const nextButtonText = useMemo(() => {
    if (currentStep === 1) return "ایجاد";
    if (currentStep === 2) return "ثبت";
    return "اتمام";
  }, [currentStep]);

  // محاسبه عرض نوار پیشرفت
  const progressWidth = useMemo(() => {
    return `${((currentStep - 1) / (totalSteps - 1)) * 100}%`;
  }, [currentStep, totalSteps]);

  return (
    <div className="configuration-wrapper">
      <h1 className="main-title">تنظیمات شبکه</h1>

      {/* Progress Bar */}
      <div className="progress-bar-container">
        <div className="progress-line-bg"></div>
        <div className="progress-line" style={{ width: progressWidth }}></div>
        {["ایجاد شبکه", "تعیین کارت", "جستجو شبکه"].map((name, index) => (
          <div
            key={index}
            className={`step ${index + 1 === currentStep ? "active" : ""} ${
              index + 1 < currentStep ? "completed" : ""
            }`}
          >
            <span className="step-number">{index + 1}</span>
            <span className="step-name">{name}</span>
          </div>
        ))}
      </div>

      {/* Form Content */}
      <div className="form-content">
        {/* Step 1 */}
        {currentStep === 1 && (
          <div>
            <h2 className="step-title-header">جزئیات شبکه جدید را وارد کنید</h2>
            <div className="form-grid">
              <CustomSelect
                label="نوع شبکه"
                options={["ماهواره‌ای", "زمینی"]}
                value={formData.networkType}
                onChange={(value) => handleSelectChange("networkType", value)}
              />
              <div className="form-field">
                <label htmlFor="networkName" className="form-label">
                  نام
                </label>
                <input
                  type="text"
                  id="networkName"
                  name="networkName"
                  value={formData.networkName}
                  onChange={handleChange}
                  placeholder="نام شبکه را وارد کنید"
                  className="form-input"
                />
              </div>
              <IosCheckbox
                label="وضعیت"
                name="status"
                checked={formData.status}
                onChange={handleChange}
              />
              <IosCheckbox
                label="جستجو اولیه کانال"
                name="initialSearch"
                checked={formData.initialSearch}
                onChange={handleChange}
              />
            </div>
          </div>
        )}
        {/* Step 2 */}
        {currentStep === 2 && (
          <div>
            <h2 className="step-title-header">کارت مورد نظر را انتخاب کنید</h2>
            <div className="form-grid">
              <CustomSelect
                label="شبکه"
                options={["شبکه ۱", "شبکه ۲"]}
                value={formData.cardNetwork}
                onChange={(value) => handleSelectChange("cardNetwork", value)}
              />
              <CustomSelect
                label="افزودن شبکه"
                options={["اضافه کردن شبکه", "ویرایش شبکه"]}
                value={formData.addCardAction}
                onChange={(value) => handleSelectChange("addCardAction", value)}
              />
            </div>
          </div>
        )}
        {/* Step 3 */}
        {currentStep === 3 && (
          <div>
            <h2 className="step-title-header">شبکه‌های در حال اسکن</h2>
            <div className="table-container">
              <table className="results-table">
                <thead>
                  <tr>
                    <th>نام شبکه</th>
                    <th>شبکه‌ها</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">اسکن</th>
                    <td>yahsat</td>
                  </tr>
                  <tr>
                    <th scope="row">اسکن</th>
                    <td>yah</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="navigation-buttons">
        <button
          onClick={handlePrev}
          disabled={currentStep === 1}
          className="nav-btn prev-btn"
        >
          قبلی
        </button>
        <button onClick={handleNext} className="nav-btn next-btn">
          {nextButtonText}
        </button>
      </div>
    </div>
  );
};

export default Configuration;

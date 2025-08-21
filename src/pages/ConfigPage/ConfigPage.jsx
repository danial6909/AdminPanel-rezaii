import React, { useState, useMemo , useEffect} from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import "./ConfigPage.css"; // وارد کردن فایل CSS اصلی
import CustomSelect from "../../components/CustomSelect/CustomSelect"; // ایمپورت کردن کامپوننت جدا شده

import axiosInstance from "../../utils/axiosInstance";


// کامپوننت IosCheckbox رو هم برای تمیزی بیشتر می‌تونیم جدا کنیم، ولی فعلا اینجا نگهش می‌داریم
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      Swal.fire({
        icon: "success",
        title: "فرایند تکمیل شد!",
        text: "شما تمام مراحل را با موفقیت به پایان رساندید.",
        confirmButtonText: "باشه",
      });
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const nextButtonText = useMemo(() => {
    if (currentStep === 1) return "ایجاد";
    if (currentStep === 2) return "ثبت";
    return "اتمام";
  }, [currentStep]);

  const progressWidth = useMemo(() => {
    return `${((currentStep - 1) / (totalSteps - 1)) * 100}%`;
  }, [currentStep, totalSteps]);

  // تعریف آپشن‌ها برای خوانایی بهتر
   const networkTypeOptions = [
     { value: "satellite", label: "ماهواره‌ای" },
     { value: "terrestrial", label: "زمینی" },
   ];

   const cardNetworkOptions = [
     { value: "net1", label: "شبکه ۱" },
     { value: "net2", label: "شبکه ۲" },
   ];

   const addCardActionOptions = [
     { value: "add", label: "اضافه کردن شبکه" },
     { value: "edit", label: "ویرایش شبکه" },
   ];


  return (
    <>

  

      <div className="configuration-wrapper">
        <h1 className="main-title">تنظیمات شبکه</h1>

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

        <div className="form-content">
          {currentStep === 1 && (
            <div>
              <h2 className="step-title-header">
                جزئیات شبکه جدید را وارد کنید
              </h2>
              <div className="form-grid">
                <CustomSelect
                  label="نوع شبکه"
                  name="networkType"
                  options={networkTypeOptions}
                  value={formData.networkType}
                  onChange={handleChange}
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

          {currentStep === 2 && (
            <div>
              <h2 className="step-title-header">
                کارت مورد نظر را انتخاب کنید
              </h2>
              <div className="form-grid">
                <CustomSelect
                  label="شبکه"
                  name="cardNetwork"
                  options={cardNetworkOptions}
                  value={formData.cardNetwork}
                  onChange={handleChange}
                />
                <CustomSelect
                  label="افزودن شبکه"
                  name="addCardAction"
                  options={addCardActionOptions}
                  value={formData.addCardAction}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

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
    </>
  );
};

export default Configuration;

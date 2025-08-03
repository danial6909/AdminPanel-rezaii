import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./ResourceForm.css";


const ResourceForm = ({
  formFields,
  initialData,
  isEditing,
  onSubmit,
  onCancel,
}) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState(initialData);

  // اگر داده‌های اولیه تغییر کرد (مثلاً کاربر روی آیتم دیگری برای ویرایش کلیک کرد)
  // فرم را با داده‌های جدید به‌روز کن
  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e); // رویداد را به والد پاس می‌دهیم تا به داده‌های فرم دسترسی داشته باشد
  };

  return (
    <form onSubmit={handleSubmit}>
      {formFields.map((field) => (
        <div className="form-group" key={field.id}>
          <label htmlFor={field.id}>{field.label}</label>
          {field.type === "select" ? (
            <select
              id={field.id}
              name={field.id}
              className="form-control"
              value={formData?.[field.id] || ""}
              onChange={handleInputChange}
              required={field.required}
            >
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              id={field.id}
              name={field.id}
              className="form-control"
              value={formData?.[field.id] || ""}
              onChange={handleInputChange}
              required={field.required && !isEditing} // فیلد فقط در حالت افزودن اجباری باشد
              placeholder={field.placeholder || ""}
            />
          )}
        </div>
      ))}
      <div className="modal-footer">
        <button type="button" className="btn btn-cancel" onClick={onCancel}>
          {t("management.cancel")}
        </button>
        <button type="submit" className="btn btn-submit">
          {t("management.save")}
        </button>
      </div>
    </form>
  );
};

export default ResourceForm;

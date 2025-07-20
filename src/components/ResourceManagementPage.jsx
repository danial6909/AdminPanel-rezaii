// src/components/ResourceManagement/ResourceManagementPage.js

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import axiosInstance from "../utils/axiosInstance";
import "./ResourceManagementPage.css"; // می‌توانید استایل‌های UsersPage.css را به اینجا منتقل کنید

// --- آیکون‌ها ---
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useAuth } from "../context/AuthContext";

// --- کامپوننت‌های مودال (بدون تغییر باقی می‌مانند) ---
const Modal = ({ isOpen, onClose, children, title }) => {
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

const ConfirmationDialog = ({ isOpen, onClose, onConfirm, message, title }) => {
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

// --- کامپوننت اصلی و عمومی مدیریت منابع ---
const ResourceManagementPage = ({
  // نام منبع برای ساخت URL های API و کلیدهای ترجمه (مثال: 'user' یا 'role')
  resourceName,
  // تعریف ستون‌های جدول
  columns,
  // تعریف فیلدهای فرم افزودن/ویرایش
  formFields,
  // فیلدهایی که در جستجو باید در نظر گرفته شوند
  searchFields,
  // تابع برای فرمت کردن داده‌های دریافتی از API قبل از نمایش
  formatDataForDisplay,
  // مقادیر اولیه برای فرم افزودن یک آیتم جدید
  initialState,
  // برای فیلتر کردن اضافی (مانند فیلتر نقش‌ها در صفحه کاربران)
  FilterComponent,

  filterField,

  filterValue,
}) => {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();

  // --- State ها ---
  const [items, setItems] = useState([]); // لیست آیتم‌ها (کاربران یا نقش‌ها)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState(null);

  // --- واکشی داده‌ها از سرور ---
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/${resourceName}`);
      // استفاده از تابع فرمت‌کننده که از props دریافت شده است

      const formattedData = formatDataForDisplay
        ? response.data.map(formatDataForDisplay)
        : response.data;
      setItems(formattedData);

      setError(null);
    } catch (err) {
      setError(t(`${resourceName}Management.fetchError`));
      console.error(`Failed to fetch ${resourceName}:`, err);
    } finally {
      setLoading(false);
    }
  }, [resourceName, t, formatDataForDisplay]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // --- فیلتر کردن آیتم‌ها ---
  const filteredItems = items.filter((item) => {
    if (!item) return false;
    // شرط اول: بررسی تطابق با جستجوی متنی
    if (searchFields) {
      const matchesSearch = searchFields.some((field) =>
        item[field]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );

      // شرط دوم: بررسی تطابق با فیلتر کشویی
      // اگر فیلتری انتخاب نشده (!filterValue)، شرط درست است
      const matchesSelect = !filterValue || item[filterField] === filterValue;
      return matchesSearch && matchesSelect;
    } else {
      return items;
    }

    // یک آیتم باید هر دو شرط را داشته باشد تا نمایش داده شود
  });

  // --- مدیریت رویدادها ---
  const handleAddItemClick = () => {
    setIsEditing(false);
    setCurrentItem(initialState);
    setIsModalOpen(true);
  };

  const handleEditClick = (item) => {
    setIsEditing(true);
    setCurrentItem(JSON.parse(JSON.stringify(item))); // کپی عمیق برای جلوگیری از تغییر ناخواسته
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    setItemToDeleteId(id);
    setIsConfirmDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axiosInstance.delete(`/${resourceName}/${itemToDeleteId}`);
      setItems(items.filter((item) => item.id !== itemToDeleteId));

      // ✨ نمایش پیام موفقیت
      Swal.fire({
        icon: "success",
        title: "حذف شد!",
        text: "آیتم مورد نظر با موفقیت حذف شد.",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      console.error(`Failed to delete ${resourceName}:`, err);

      // ✨ نمایش پیام خطا
      Swal.fire({
        icon: "error",
        title: "خطا",
        text: err.response?.data?.message || "مشکلی در حذف آیتم پیش آمد.",
      });
    } finally {
      setIsConfirmDialogOpen(false);
      setItemToDeleteId(null);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // حذف فیلد پسورد اگر خالی باشد (در حالت ویرایش)
    if (isEditing && !data.password) {
      delete data.password;
    }

    try {
      let response;
      if (isEditing) {
        response = await axiosInstance.patch(
          `/${resourceName}/${currentItem.id}`,
          data
        );
      } else {
        response = await axiosInstance.post(`/${resourceName}`, data);
      }

      // بعد از هر تغییر، داده‌ها را مجددا واکشی می‌کنیم تا اطلاعات بروز باشد
      fetchData();
      setIsModalOpen(false);
      setCurrentItem(null);
    } catch (err) {
      // Check for duplicate username (400)
      if (
        err.response &&
        err.response.status === 400 &&
        err.response.data?.message?.includes("username is unique")
      ) {
        setIsModalOpen(false);

        Swal.fire({
          title: "خطا!",
          text: "این نام کاربری قبلاً استفاده شده است. لطفاً نام دیگری انتخاب کنید.",
          icon: "error",
          confirmButtonText: "متوجه شدم",
        });
      }
      // START NEW CODE: Check for permission error (403)
      else if (err.response && err.response.status === 403) {
        setIsModalOpen(false);

        Swal.fire({
          title: "خطای دسترسی!",
          text: "شما سطح دسترسی لازم برای انجام این عملیات را ندارید.",
          icon: "error",
          confirmButtonText: "متوجه شدم",
        });
      }
      // END NEW CODE
      else {
        setIsModalOpen(false);

        // General error for other issues
        Swal.fire({
          title: "عملیات ناموفق!",
          text: "مشکلی در ذخیره اطلاعات پیش آمد. لطفاً دوباره تلاش کنید.",
          icon: "error",
          confirmButtonText: "باشه",
        });
      }

      console.error(
        `Failed to save ${resourceName}:`,
        err.response?.data || err.message
      );
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem((prev) => ({ ...prev, [name]: value }));
  };

  // --- توابع رندر ---
  const renderTableContent = () => {
    if (loading)
      return (
        <tr>
          <td colSpan={columns.length + 1} className="status-cell">
            {t("management.loading")}
          </td>
        </tr>
      );
    if (error)
      return (
        <tr>
          <td colSpan={columns.length + 1} className="status-cell error">
            {error}
          </td>
        </tr>
      );
    if (filteredItems.length === 0)
      return (
        <tr>
          <td colSpan={columns.length + 1} className="status-cell">
            {t(`${resourceName}Management.noItemsFound`)}
          </td>
        </tr>
      );

    return filteredItems.map((item) => (
      <tr
        key={item.id}
        className={item.id === user.id ? "highlighted-row" : ""}
      >
        {columns.map((col) => (
          <td key={col.key}>{col.render ? col.render(item) : item[col.key]}</td>
        ))}

        {item.id !== user.id ? (
          <td>
            <div className="action-buttons">
              <button
                className="btn btn-edit"
                title={t("management.edit")}
                onClick={() => handleEditClick(item)}
              >
                <EditIcon fontSize="small" />
              </button>
              <button
                className="btn btn-delete"
                title={t("management.delete")}
                onClick={() => handleDeleteClick(item.id)}
              >
                <DeleteIcon fontSize="small" />
              </button>
            </div>
          </td>
        ) : (
          <td></td>
        )}
      </tr>
    ));
  };

  // --- JSX نهایی ---
  return (
    <div className="container" dir={i18n.dir()}>
      <div className="header">
        <h1>{t(`${resourceName}Management.title`)}</h1>
      </div>

      <div className="controls">
        <div className="search-box">
          <span className="search-icon">
            <SearchIcon />
          </span>
          <input
            type="text"
            placeholder={t("management.searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* نمایش کامپوننت فیلتر اگر از props ارسال شده باشد */}
        {FilterComponent && <FilterComponent />}

        <button className="add-user-btn" onClick={handleAddItemClick}>
          <PersonAddAltIcon />
          <span>{t(`${resourceName}Management.addButton`)}</span>
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              {/* ایجاد هدرهای جدول به صورت داینامیک */}
              {columns.map((col) => (
                <th key={col.key}>{col.header}</th>
              ))}
              <th>{t("management.actions")}</th>
            </tr>
          </thead>
          <tbody>{renderTableContent()}</tbody>
        </table>
      </div>

      {/* مودال افزودن/ویرایش */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={t(
          isEditing
            ? `${resourceName}Management.editTitle`
            : `${resourceName}Management.addTitle`
        )}
      >
        <form onSubmit={handleFormSubmit}>
          {/* ===== تغییر اصلی در این بخش است ===== */}
          {formFields.map((field) => (
            <div className="form-group" key={field.id}>
              <label htmlFor={field.id}>{field.label}</label>

              {/* اگر نوع فیلد 'select' بود، یک منوی کشویی رندر کن */}
              {field.type === "select" ? (
                <select
                  id={field.id}
                  name={field.id}
                  className="form-control"
                  value={currentItem?.[field.id] || ""}
                  onChange={handleInputChange}
                  required={field.required}
                >
                  {/* گزینه‌های منو را از پراپرتی options که در نقشه تعریف شده، بخوان */}
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                // در غیر این صورت، یک ورودی متنی ساده رندر کن
                <input
                  type={field.type}
                  id={field.id}
                  name={field.id}
                  className="form-control"
                  value={currentItem?.[field.id] || ""}
                  onChange={handleInputChange}
                  required={field.required && !isEditing}
                  placeholder={field.placeholder || ""}
                />
              )}
            </div>
          ))}
          {/* ======================================= */}

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-cancel"
              onClick={() => setIsModalOpen(false)}
            >
              {t("management.cancel")}
            </button>
            <button type="submit" className="btn btn-submit">
              {t("management.save")}
            </button>
          </div>
        </form>
      </Modal>

      {/* دیالوگ تایید حذف */}
      <ConfirmationDialog
        isOpen={isConfirmDialogOpen}
        onClose={() => setIsConfirmDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title={t("management.confirmDeleteTitle")}
        message={t("management.confirmDeleteMessage", { id: itemToDeleteId })}
      />
    </div>
  );
};

export default ResourceManagementPage;

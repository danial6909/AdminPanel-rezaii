import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../utils/axiosInstance";
import { useAuth } from "../../context/AuthContext";
import "./ResourceManagementPage.css";
// import "../../components/ResourceManagementPage.css";

// --- وارد کردن کامپوننت‌های جدا شده ---
import { Modal, ConfirmationDialog } from "../../components/Modals/Modals";
import ResourceControls from "../../components/ResourceControls/ResourceControls";
import ResourceTable from "../../components/ResourceTable/ResourceTable";
import ResourceForm from "../../components/ResourceForm/ResourceForm";

const ResourceManagementPage = ({
  resourceName,
  columns,
  formFields,
  searchFields,
  formatDataForDisplay,
  initialState,
  FilterComponent,
  filterField,
  filterValue,
}) => {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();

  // --- استیت‌ها بدون تغییر باقی می‌مانند ---
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState(null);

  // --- توابع اصلی مدیریت داده بدون تغییر باقی می‌مانند ---
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/${resourceName}`);
      const formattedData = formatDataForDisplay
        ? response.data.map(formatDataForDisplay)
        : response.data;
      setItems(formattedData);
      setError(null);
    } catch (err) {
      setError(t(`${resourceName}Management.fetchError`));
      console.error(`Failed to fetch ${resourceName}:`, err);
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  }, [resourceName, t, formatDataForDisplay]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredItems = items.filter((item) => {
    if (!item) return false;
    const matchesSearch = searchFields.some((field) =>
      item[field]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesSelect = !filterValue || item[filterField] === filterValue;
    return matchesSearch && matchesSelect;
  });

  const handleAddItemClick = () => {
    setIsEditing(false);
    setCurrentItem(initialState);
    setIsModalOpen(true);
  };

  const handleEditClick = (item) => {
    setIsEditing(true);
    setCurrentItem(item); // نیازی به کپی عمیق نیست چون فرم استیت داخلی خودش را مدیریت می‌کند
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
      Swal.fire({
        icon: "success",
        title: "حذف شد!",
        text: "آیتم مورد نظر با موفقیت حذف شد.",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      console.error(`Failed to delete ${resourceName}:`, err);
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

    const handleFormSubmit = async (data) => {
      // ✅ یک کپی از دیتا می‌سازیم تا state اصلی رو تغییر ندیم
      const submissionData = { ...data };

      // ✅ فیلدهایی که بک‌اند انتظار نداره رو از آبجکت ارسالی حذف می‌کنیم
      delete submissionData.id;
      delete submissionData.avatar;

      // حذف فیلد پسورد اگر خالی باشد (در حالت ویرایش)
      if (isEditing && !submissionData.password) {
        delete submissionData.password;
      }

      try {
        let response;
        if (isEditing) {
          response = await axiosInstance.patch(
            `/${resourceName}/${currentItem.id}`,
            submissionData // ✅ ارسال دیتای تمیز شده
          );
        } else {
          response = await axiosInstance.post(
            `/${resourceName}`,
            submissionData // ✅ ارسال دیتای تمیز شده
          );
        }
        Swal.fire({
          icon: "success",
          title: "موفق!",
          text: `آیتم با موفقیت ${isEditing ? "ویرایش شد" : "ذخیره شد"}.`,
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
        fetchData();
        setIsModalOpen(false);
        setCurrentItem(null);
        // نمایش پیام موفقیت‌آمیز در اینجا هم می‌تواند ایده خوبی باشد
      } catch (err) {
        // منطق مدیریت خطا بدون تغییر
        setIsModalOpen(false);
        if (
          err.response &&
          err.response.status === 400 &&
          err.response.data?.message?.includes("username is unique")
        ) {
          Swal.fire({
            title: "خطا!",
            text: "این نام کاربری قبلاً استفاده شده است. لطفاً نام دیگری انتخاب کنید.",
            icon: "error",
            confirmButtonText: "متوجه شدم",
          });
        } else if (err.response && err.response.status === 403) {
          Swal.fire({
            title: "خطای دسترسی!",
            text: "شما سطح دسترسی لازم برای انجام این عملیات را ندارید.",
            icon: "error",
            confirmButtonText: "متوجه شدم",
          });
        } else {
          Swal.fire({
            title: "عملیات ناموفق!",
            text: " رمز عبور باید حداقل 8 کاراکتر باشد.",
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

  return (
    <div className="container" dir={i18n.dir()}>
      <div className="header">
        <h1>{t(`${resourceName}Management.title`)}</h1>
      </div>

      <ResourceControls
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAddItemClick={handleAddItemClick}
        FilterComponent={FilterComponent}
        resourceName={resourceName}
      />

      <ResourceTable
        loading={loading}
        error={error}
        columns={columns}
        items={filteredItems}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
        currentUserId={user.id}
        resourceName={resourceName}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={t(
          isEditing
            ? `${resourceName}Management.editTitle`
            : `${resourceName}Management.addTitle`
        )}
      >
        {/* currentItem باید وجود داشته باشد تا فرم رندر شود */}
        {currentItem && (
          <ResourceForm
            formFields={formFields}
            initialData={currentItem}
            isEditing={isEditing}
            onSubmit={handleFormSubmit}
            onCancel={() => setIsModalOpen(false)}
          />
        )}
      </Modal>

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

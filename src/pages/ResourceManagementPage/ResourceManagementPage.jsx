import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../utils/axiosInstance";
import { useAuth } from "../../context/AuthContext";
import "./ResourceManagementPage.css";
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
  onDataChange,
  isReadOnly = false,
  overrideAddItemClick,
  manualDataFetching = false, // پراپ جدید برای کنترل گرفتن دیتا
  items: parentItems, // پراپ جدید برای دریافت آیتم‌ها از والد
  loading: parentLoading, // پراپ جدید برای دریافت وضعیت لودینگ از والد
}) => {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState(null);

  const fetchData = useCallback(async () => {
    // فقط اگر به صورت دستی کنترل نمی‌شد، دیتا بگیر
    if (manualDataFetching) return;

    try {
      setLoading(true);
      const response = await axiosInstance.get(`/${resourceName}`);
      const formattedData = formatDataForDisplay
        ? response.data.map(formatDataForDisplay)
        : response.data;
      console.log("get",formattedData);
      setItems(formattedData);
      setError(null);
    } catch (err) {
      setError(t(`${resourceName}Management.fetchError`));
      console.error(`Failed to fetch ${resourceName}:`, err);
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  }, [resourceName, t, formatDataForDisplay, manualDataFetching]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // اگر دیتا به صورت دستی پاس داده شده بود، از اون استفاده کن
  const displayItems = manualDataFetching ? parentItems : items;
  const displayLoading = manualDataFetching ? parentLoading : loading;

  const filteredItems = displayItems.filter((item) => {
    if (!item) return false;
    const matchesSearch = searchFields.some((field) =>
      item[field]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesSelect = !filterValue || item[filterField] === filterValue;
    return matchesSearch && matchesSelect;
  });

  // ... بقیه توابع (handleAddItemClick, handleEditClick, و ...) بدون تغییر باقی می‌مونن ...
  const handleAddItemClick = () => {
    setIsEditing(false);
    setCurrentItem(initialState);
    setIsModalOpen(true);
  };
  const handleEditClick = (item) => {
    setIsEditing(true);
    console.log(item)
    setCurrentItem(item);
    setIsModalOpen(true);
  };
  const handleDeleteClick = (id) => {
    setItemToDeleteId(id);
    setIsConfirmDialogOpen(true);
  };
  const handleConfirmDelete = async () => {
    try {
      await axiosInstance.delete(`/${resourceName}/${itemToDeleteId}`);
      // اگر به صورت دستی کنترل می‌شد، باید تابع آپدیت رو هم از والد بگیریم
      // فعلا فرض می‌کنیم حذف برای این صفحه غیرفعاله
      if (manualDataFetching) {
        if (onDataChange) onDataChange();
        
      }else {
          setItems(items.filter((item) => item.id !== itemToDeleteId));
        }
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
    const allowedFieldIds = formFields.map((field) => field.id);

    // 2. آبجکت ارسالی را با فیلتر کردن دیتای فرم ایجاد کن
    //    فقط کلیدهایی را انتخاب کن که در آرایه بالا وجود دارند
    // چون ارایه چیز های دیگه هم داشت که نباید به بک اند ارسال میکردم برای همین باید فیلتر میکردم
    const submissionData = Object.keys(data)
      .filter((key) => allowedFieldIds.includes(key))
      .reduce((obj, key) => {
        obj[key] = data[key];
        return obj;
      }, {});

    console.log("Clean data to be submitted:", submissionData);

    delete submissionData.id;
    delete submissionData.avatar;
    console.log("Created new item:", submissionData);
    if (isEditing && !submissionData.password) {
      delete submissionData.password;
    }
    try {
      let response;
      if (isEditing) {
        response = await axiosInstance.patch(
          `/${resourceName}/${currentItem.id}`,
          submissionData
        );
      } else {
        response = await axiosInstance.post(`/${resourceName}`, submissionData);
      }
      Swal.fire({
        icon: "success",
        title: "موفق!",
        text: `آیتم با موفقیت ${isEditing ? "ویرایش شد" : "ذخیره شد"}.`,
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
      if (manualDataFetching) {
        if (onDataChange) onDataChange(); // <-- خبر دادن به والد برای رفرش
      } else {
        // در حالت خودکار، خودش رفرش می‌کند
        fetchData();
      }
      setIsModalOpen(false);
      setCurrentItem(null);
    } catch (err) {
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
        onAddItemClick={overrideAddItemClick || handleAddItemClick}
        FilterComponent={FilterComponent}
        resourceName={resourceName}
      />

      <ResourceTable
        loading={displayLoading} // استفاده از استیت لودینگ درست
        error={error}
        columns={columns}
        items={filteredItems} // استفاده از آیتم‌های درست
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
        currentUserId={user.id}
        resourceName={resourceName}
        isReadOnly={isReadOnly}
      />

      {/* بقیه کامپوننت مودال بدون تغییر */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={t(
          isEditing
            ? `${resourceName}Management.editTitle`
            : `${resourceName}Management.addTitle`
        )}
      >
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

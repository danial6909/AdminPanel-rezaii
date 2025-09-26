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
  searchFields,
  formatDataForDisplay,
  initialState,
  FilterComponent,
  filterField,
  filterValue,
  onDataChange,
  isReadOnly = false,
  overrideAddItemClick,
  manualDataFetching = false,
  items: parentItems,
  loading: parentLoading,
  disableEdit = false,
  disableDelete = false,
  disableAdd = false, 
  formFields,
  getFormFields,
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
    if (manualDataFetching) return;

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
  }, [resourceName, t, formatDataForDisplay, manualDataFetching]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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

  const handleAddItemClick = () => {
    setIsEditing(false);
    setCurrentItem(initialState);
    setIsModalOpen(true);
  };

  const handleEditClick = (item) => {
    setIsEditing(true);
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
      if (manualDataFetching && onDataChange) {
        onDataChange();
      } else {
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
    // ✅ منطق جدید برای انتخاب فیلدهای فرم
    const currentFormFields = getFormFields
      ? getFormFields(currentItem)
      : formFields; // ⚠️ افزودن بررسی null/undefined برای جلوگیری از خطا
    if (!currentFormFields) {
      console.error(
        "Form fields are not defined. Check your parent component props."
      );
      return;
    }
    const allowedFieldIds = currentFormFields.map((field) => field.id); // 2. Filter the submission data to include only allowed fields

    const submissionData = Object.keys(data)
      .filter((key) => allowedFieldIds.includes(key))
      .reduce((obj, key) => {
        obj[key] = data[key];
        return obj;
      }, {}); // ✅ بررسی نوع فیلد قبل از تبدیل

    const valueField = currentFormFields.find((field) => field.id === "value");
    if (valueField && valueField.type === "number") {
      submissionData.value = Number(submissionData.value);
    }
    console.log(submissionData);
    try {
      let response;
      if (isEditing) {
        response = await axiosInstance.patch(
          `/${resourceName}/${currentItem.id}`,
          submissionData
        );
      } else {
        response = await axiosInstance.post(`/${resourceName}`, submissionData);
        console.log(submissionData);
      }

      Swal.fire({
        icon: "success",
        title: "موفق!",
        text: `آیتم با موفقیت ${isEditing ? "ویرایش شد" : "ذخیره شد"}.`,
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });

      if (manualDataFetching && onDataChange) {
        onDataChange();
      } else {
        fetchData();
      }

      setIsModalOpen(false);
      setCurrentItem(null);
    } catch (err) {
      setIsModalOpen(false);
      const errorMessage =
        err.response?.data?.message || "مشکلی در ذخیره آیتم پیش آمد.";

      if (err.response && err.response.status === 400) {
        if (errorMessage && errorMessage.includes("Field type")) {
          Swal.fire({
            title: "خطا!",
            text: "مقدار وارد شده با نوع فیلد (مانند عدد یا متن) سازگار نیست.",
            icon: "error",
            confirmButtonText: "متوجه شدم",
          });
        } else if (
          errorMessage &&
          errorMessage.includes("username is unique")
        ) {
          Swal.fire({
            title: "خطا!",
            text: "این نام کاربری قبلاً استفاده شده است. لطفاً نام دیگری انتخاب کنید.",
            icon: "error",
            confirmButtonText: "متوجه شدم",
          });
        } else {
          Swal.fire({
            title: "عملیات ناموفق!",
            text: errorMessage || "مشکلی در داده‌های ارسالی پیش آمد.",
            icon: "error",
            confirmButtonText: "باشه",
          });
        }
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
          text: "مشکلی در ارتباط با سرور پیش آمد.",
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
        disableAdd={disableAdd}
      />

      <ResourceTable
        loading={displayLoading}
        error={error}
        columns={columns}
        items={filteredItems}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
        currentUserId={user.id}
        resourceName={resourceName}
        isReadOnly={isReadOnly}
        disableEdit={disableEdit}
        disableDelete={disableDelete}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={t(
          isEditing
            ? `${resourceName}Management.editTitle`
            : `${resourceName}Management.addButton`
        )}
      >
        {currentItem && (
          <ResourceForm // ✅ استفاده از منطق شرطی برای انتخاب فیلدهای فرم
            formFields={getFormFields ? getFormFields(currentItem) : formFields}
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

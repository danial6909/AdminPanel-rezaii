// src/pages/UsersPage/UsersPage.js

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ResourceManagementPage from "../../components/ResourceManagementPage";
import axiosInstance from "../../utils/axiosInstance";

// کامپوننت UsersPage به عنوان یک "نقشه" یا "پیکربندی" برای کامپوننت عمومی ResourceManagementPage عمل می‌کند.
const UsersPage = () => {
  const { t } = useTranslation();

  // State برای نگهداری لیست نقش‌ها (برای فیلتر و فرم)
  const [roles, setRoles] = useState([]);
  // State برای کنترل مقدار انتخاب شده در فیلتر نقش‌ها
  const [roleFilter, setRoleFilter] = useState("");

  // این هوک در ابتدای لود شدن کامپوننت، لیست نقش‌ها را از سرور دریافت می‌کند
  // این لیست برای نمایش گزینه‌ها در Select Box فرم و همچنین برای فیلتر کردن لازم است
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axiosInstance.get("/role");
        setRoles(response.data);
      } catch (error) {
        console.error("Failed to fetch roles:", error);
      }
    };
    fetchRoles();
  }, []); // آرایه وابستگی خالی به این معنی است که این افکت فقط یک بار اجرا می‌شود

  // 1. تعریف ستون‌های جدول برای کاربران
  // از تابع render برای نمایش سفارشی آواتار و نشان نقش استفاده می‌کنیم
  const userColumns = [
    { key: "id", header: t("userManagement.table.id") },
    {
      key: "firstName",
      header: t("userManagement.table.firstName"),
      render: (item) => (
        <div className="table-cell-with-avatar">
          <img
            src={`${item.avatar ? item.avatar : "https://placehold.co/30x30/4f46e5/ffffff?text="+item.firstName?.charAt(0).toUpperCase()}`}
        
            alt="Avatar"
            className="avatar-small"
          />
   
          <span>{item.firstName || "N/A"}</span>
        </div>
      ),
    },
    { key: "lastName", header: t("userManagement.table.lastName") },
    { key: "username", header: t("userManagement.table.username") },
    {
      key: "role",
      header: t("userManagement.table.role"),
      render: (user) => (
        <span className={`role-badge role-${user.role?.toLowerCase()}`}>
          {user.role || "N/A"}
        </span>
      ),
    },
  ];

  // 2. تعریف فیلدهای فرم افزودن/ویرایش کاربر
  // این بخش به کامپوننت عمومی دستور می‌دهد که چه فیلدهایی را با چه نوعی بسازد
  const userFormFields = [
    {
      id: "firstName",
      label: t("userManagement.form.firstName"),
      type: "text",
      required: true,
    },
    {
      id: "lastName",
      label: t("userManagement.form.lastName"),
      type: "text",
      required: true,
    },
    {
      id: "username",
      label: t("userManagement.form.username"),
      type: "text",
      required: true,
    },
    {
      id: "password",
      label: t("userManagement.form.password"),
      type: "password",
      required: false, // رمز عبور در حالت ویرایش اختیاری است
      placeholder: t("userManagement.form.passwordPlaceholder"),
    },
    {
      // تعریف فیلد "نقش" به عنوان یک منوی کشویی (Select Box)
      id: "role",
      label: t("userManagement.form.role"),
      type: "select", // نوع فیلد: 'select'
      required: true,
      // گزینه‌های منو از لیست نقش‌هایی که از state خوانده می‌شود، ساخته می‌شود
      options: roles.map((role) => ({
        value: role.name, // مقداری که هنگام ذخیره به سرور ارسال می‌شود
        label: role.name, // متنی که کاربر در منو می‌بیند
      })),
    },
  ];

  // 3. تعریف فیلدهایی که باید در آن‌ها جستجو انجام شود
  const searchFields = ["firstName", "lastName", "username"];

  // 4. مقادیر اولیه برای فرم افزودن یک کاربر جدید
  const initialUserState = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    role: roles.length > 0 ? roles[0].name : "", // به صورت پیش‌فرض اولین نقش انتخاب می‌شود
  };

  // 5. تابعی برای فرمت کردن داده‌های دریافتی از API قبل از نمایش در جدول
  // این تابع آبجکت تو در توی کاربر را به یک آبجکت ساده‌تر تبدیل می‌کند
  const formatUserData = (user) => ({
    id: user.id,
    username: user.username,
    avatar:user.avatar,
    firstName: user.firstName || "N/A",
    lastName: user.lastName || "N/A",
    role: user.role?.name || "N/A", // استخراج نام نقش از آبجکت role
  });

  // 6. تعریف یک کامپوننت کوچک برای فیلتر کردن کاربران بر اساس نقش
  // این کامپوننت به عنوان prop به موتور اصلی ارسال می‌شود
  const RoleFilterComponent = () => (
   
      <select
      className="filter-select"
      value={roleFilter}
      onChange={(e) => setRoleFilter(e.target.value)}
    >
      <option value="">{t("userManagement.allRoles")}</option>
      {roles.map((role) => (
        <option key={role.id} value={role.name}>
          {role.name}
        </option>
      ))}
    </select>

    
  );

  return (
    // رندر کردن کامپوننت عمومی و ارسال تمام پیکربندی‌ها به عنوان props
    <ResourceManagementPage
      resourceName="user"
      columns={userColumns}
      formFields={userFormFields}
      searchFields={searchFields}
      initialState={initialUserState}
      formatDataForDisplay={formatUserData}
      FilterComponent={RoleFilterComponent}
    />
  );
};

export default UsersPage;

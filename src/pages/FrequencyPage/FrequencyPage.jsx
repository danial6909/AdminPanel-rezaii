// src/pages/UsersPage/UsersPage.js
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ResourceManagementPage from "../ResourceManagementPage/ResourceManagementPage";
import axiosInstance from "../../utils/axiosInstance";
//////////////////////////////////////////////////////////////////////////////////////


const FrequencyPage = () => {
  const { t } = useTranslation();

  const [roleFilter, setRoleFilter] = useState("");



  // 1. تعریف ستون‌های جدول برای کاربران
  // از تابع render برای نمایش سفارشی آواتار و نشان نقش استفاده می‌کنیم
  const frequencyColumns = [
    { key: "id", header: t("userManagement.table.id") },
    { key: "Name", header: t("frequenciesManagement.table.name") },
    { key: "ChanelNumber", header: t("frequenciesManagement.table.channelCount") },
    { key: "ServiceNumber", header: t("frequenciesManagement.table.providerCount") },
    { key: "Network", header: t("frequenciesManagement.table.network") },
    { key: "status", header: t("frequenciesManagement.table.status") },
  ];

  // 2. تعریف فیلدهای فرم افزودن/ویرایش کاربر
  // این بخش به کامپوننت عمومی دستور می‌دهد که چه فیلدهایی را با چه نوعی بسازد
  const userFormFields = [
    {
      id: "Name",
      label: t("frequenciesManagement.form.name"),
      type: "text",
      required: true,
    },
    {
      id: "ChanelNumber",
      label: t("frequenciesManagement.form.channelCount"),
      type: "text",
      required: true,
    },
    {
      id: "ServiceNumber",
      label: t("frequenciesManagement.form.providerCount"),
      type: "text",
      required: true,
    },
    {
      id: "Network",
      label: t("frequenciesManagement.form.network"),
      type: "password",
      required: false, // رمز عبور در حالت ویرایش اختیاری است
      placeholder: t("userManagement.form.passwordPlaceholder"),
    },
    {
      id: "status",
      label: t("frequenciesManagement.form.status"),
      type: "checkbox",
      required: false,
    },
  ];

  // 3. تعریف فیلدهایی که باید در آن‌ها جستجو انجام شود
  const searchFields = ["Name", "ChanelNumber", "ServiceNumber"];

  // 4. مقادیر اولیه برای فرم افزودن یک کاربر جدید
  const initialUserState = {
    Name: "",
    ChanelNumber: "",
    ServiceNumber: "",
    Network: "",
    status: true,
  };

  // 5. تابعی برای فرمت کردن داده‌های دریافتی از API قبل از نمایش در جدول
  // این تابع آبجکت تو در توی کاربر را به یک آبجکت ساده‌تر تبدیل می‌کند
  const formatUserData = (user) => ({
    id: user.id,
    Name: user.name || "N/A",
    ChanelNumber: user.channel_count || "0",
    ServiceNumber: user.provider_count || "0",
    Network: user.network || "N/A",
    status: user.status || "false",
  });

 const RoleFilterComponent = () => (
   <select
     className="filter-select"
     value="فعال"
     onChange={(e) => setRoleFilter(e.target.value)}
   >
     <option value="">{t("userManagement.allRoles")}</option>
     
       <option  value="فعال">
         فعال
       </option>
       <option  value="غیرفعال">
         غبرفعال
       </option>
   </select>
 );
  return (
    // رندر کردن کامپوننت عمومی و ارسال تمام پیکربندی‌ها به عنوان props
    <ResourceManagementPage
      resourceName="frequencies"
      columns={frequencyColumns}
      formFields={userFormFields}
      searchFields={searchFields}
      initialState={initialUserState}
      formatDataForDisplay={formatUserData}
      FilterComponent={RoleFilterComponent}
      // filterValue={roleFilter}
      // filterField="role" // نام فیلدی که در آبجکت کاربر باید چک شود
    />
  );
};

export default FrequencyPage;

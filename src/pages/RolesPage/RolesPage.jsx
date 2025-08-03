// src/pages/RolesPage/RolesPage.js

import React from "react";
import { useTranslation } from "react-i18next";
import ResourceManagementPage from "../ResourceManagementPage/ResourceManagementPage";

const RolesPage = () => {
  const { t } = useTranslation();

  // 1. تعریف ستون‌های جدول برای نقش‌ها
  const roleColumns = [
    { key: "id", header: t("roleManagement.table.id") },
    { key: "name", header: t("roleManagement.table.name") },
    { key: "rank", header: t("roleManagement.table.rank") },
  ];

  // 2. تعریف فیلدهای فرم افزودن/ویرایش برای نقش‌ها
  const roleFormFields = [
    {
      id: "name",
      label: t("roleManagement.form.name"),
      type: "text",
      required: true,
    },
    {
      id: "rank",
      label: t("roleManagement.form.rank"),
      type: "number",
      required: true,
    },
  ];

  // 3. تعریف فیلدهایی که باید در آن‌ها جستجو انجام شود
  const roleSearchFields = ["name", "rank"];

  // 4. مقادیر اولیه برای یک نقش جدید
  const initialRoleState = {
    name: "",
    rank: "",
  };

  return (
    <ResourceManagementPage
      resourceName="role" // نام منبع برای API و ترجمه‌ها
      columns={roleColumns}
      formFields={roleFormFields}
      searchFields={roleSearchFields}
      initialState={initialRoleState}
      // برای نقش‌ها نیازی به فرمت‌دهی خاص یا فیلتر اضافی نداریم
      formatDataForDisplay={(data) => data} // تابع ساده برای بازگرداندن خود داده
    />
  );
};

export default RolesPage;

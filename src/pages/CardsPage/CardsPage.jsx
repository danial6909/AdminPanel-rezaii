import React from "react";
import { useTranslation } from "react-i18next";
import ResourceManagementPage from "../ResourceManagementPage/ResourceManagementPage";

export default function CartsPage() {
  const { t } = useTranslation();

  const cardsColumns = [
    { key: "device", header: t("dvb/cardsManagement.table.device") },
    { key: "adapter", header: t("dvb/cardsManagement.table.adapter") },
    { key: "frontend", header: t("dvb/cardsManagement.table.frontend") },
    { key: "name", header: t("dvb/cardsManagement.table.name") },
    { key: "type", header: t("dvb/cardsManagement.table.type") },
    { key: "frequency", header: t("dvb/cardsManagement.table.frequency") },
    { key: "enabled", header: t("dvb/cardsManagement.table.enabled") },
  ];

  const formatUserData = (card) => ({
    device: card.device,
    adapter: card.adapter,
    frontend: card.frontend,
    name: card.name || "N/A",
    type: `${card.type} (${card.parsedType})` || "N/A",
    frequency: `${card.fmin}~${card.fmax}` || "N/A",
    enabled: card.enabled,
  });

  const searchFields = ["adapter", "Name", "type"];


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
  ];

  return (
    <ResourceManagementPage
      resourceName="dvb/cards"
      columns={cardsColumns}
      formFields={userFormFields}
      searchFields={searchFields}
      // initialState={initialUserState}
      formatDataForDisplay={formatUserData}
      // FilterComponent={RoleFilterComponent}
      // filterValue={roleFilter}
      // filterField="role" // نام فیلدی که در آبجکت کاربر باید چک شود
    />
  );
}

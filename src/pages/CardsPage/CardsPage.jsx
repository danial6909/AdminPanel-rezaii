import React from "react";
import { useTranslation } from "react-i18next";
import ResourceManagementPage from "../../components/ResourceManagementPage";

export default function CartsPage() {
  const { t } = useTranslation();

  const cardsColumns = [
    { key: "device", header: t("cards.table.device") },
    { key: "adapter", header: t("cards.table.adapter") },
    { key: "frontend", header: t("cards.table.frontend") },
    { key: "name", header: t("cards.table.name") },
    { key: "type", header: t("cards.table.type") },
    { key: "frequency", header: t("cards.table.frequency") },
    { key: "enabled", header: t("cards.table.enabled") },
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
      // searchFields={searchFields}
      // initialState={initialUserState}
      formatDataForDisplay={formatUserData}
      // FilterComponent={RoleFilterComponent}
      // filterValue={roleFilter}
      // filterField="role" // نام فیلدی که در آبجکت کاربر باید چک شود
    />
  );
}

import React from "react";
import { useTranslation } from "react-i18next";
import ResourceManagementPage from "../ResourceManagementPage/ResourceManagementPage";

const ServicePage = () => {
  const { t } = useTranslation();

  const columns = [
    { key: "name", header: t("servicesManagement.table.name") },
    { key: "channel_number", header: t("servicesManagement.table.channel") },
    { key: "frequency_name", header: t("servicesManagement.table.frequency") },
    { key: "provider_name", header: t("servicesManagement.table.provider") },
    { key: "network", header: t("servicesManagement.table.network") },
    { key: "status", header: t("servicesManagement.table.status") },
  ];

  const formFields = [
    {
      id: "name",
      label: t("servicesManagement.form.name"),
      type: "text",
      required: true,
    },
    {
      id: "channel_number",
      label: t("servicesManagement.form.channel"),
      type: "number",
      required: true,
    },
    {
      id: "frequency_name",
      label: t("servicesManagement.form.frequency"),
      type: "text",
      required: true,
    },
    {
      id: "provider_name",
      label: t("servicesManagement.form.provider"),
      type: "text",
      required: true,
    },
    {
      id: "network",
      label: t("servicesManagement.form.network"),
      type: "text",
      required: true,
    },
    {
      id: "status",
      label: t("servicesManagement.form.status"),
      type: "select",
      options: ["فعال", "غیر فعال"],
      required: true,
    },
  ];

  const searchFields = ["name", "frequency_name", "provider_name", "network"];

  const initialState = {
    name: "",
    channel_number: "",
    frequency_name: "",
    provider_name: "",
    network: "",
    status: "فعال",
  };

  const formatDataForDisplay = (data) => ({
    ...data,
  });

  return (
    <ResourceManagementPage
      resourceName="services"
      columns={columns}
      formFields={formFields}
      searchFields={searchFields}
      initialState={initialState}
      formatDataForDisplay={formatDataForDisplay}
    />
  );
};

export default ServicePage;

import React from "react";
import { useTranslation } from "react-i18next";
import ResourceManagementPage from "../ResourceManagementPage/ResourceManagementPage";

const NetworkPage = () => {
  const { t } = useTranslation();

  const columns = [
    { key: "name", header: t("networksManagement.table.name") },
    { key: "channel_count", header: t("networksManagement.table.channelCount") },
    { key: "status", header: t("networksManagement.table.status") },
  ];

  const formFields = [
    {
      id: "name",
      label: t("networksManagement.form.name"),
      type: "text",
      required: true,
    },
    {
      id: "channel_count",
      label: t("networksManagement.form.channelCount"),
      type: "number",
      required: true,
    },
    {
      id: "status",
      label: t("networksManagement.form.status"),
      type: "select",
      options: ["فعال", "غیر فعال"],
      required: true,
    },
  ];

  const searchFields = ["name"];

  const initialState = {
    name: "",
    channel_count: 0,
    status: "فعال",
  };

  const formatDataForDisplay = (data) => ({
    ...data,
  });

  return (
    <ResourceManagementPage
      resourceName="networks"
      columns={columns}
      formFields={formFields}
      searchFields={searchFields}
      initialState={initialState}
      formatDataForDisplay={formatDataForDisplay}
    />
  );
};

export default NetworkPage;

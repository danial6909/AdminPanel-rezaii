import React from "react";
import { useTranslation } from "react-i18next";
import ResourceManagementPage from "../ResourceManagementPage/ResourceManagementPage";

const ChannelPage = () => {
  const { t } = useTranslation();

  const columns = [
    { key: "channel_number", header: t("channelsManagement.table.number") },
    { key: "name", header: t("channelsManagement.table.name") },
    { key: "status", header: t("channelsManagement.table.status") },
  ];

  const formFields = [
    {
      id: "channel_number",
      label: t("channelsManagement.form.number"),
      type: "number",
      required: true,
    },
    {
      id: "name",
      label: t("channelsManagement.form.name"),
      type: "text",
      required: true,
    },
    {
      id: "status",
      label: t("channelsManagement.form.status"),
      type: "select",
      options: ["فعال", "غیر فعال"],
      required: true,
    },
  ];

  const searchFields = ["name", "channel_number"];

  const initialState = {
    channel_number: "",
    name: "",
    status: "فعال",
  };

  const formatDataForDisplay = (data) => ({
    ...data,
  });

  return (
    <ResourceManagementPage
      resourceName="channels"
      columns={columns}
      formFields={formFields}
      searchFields={searchFields}
      initialState={initialState}
      formatDataForDisplay={formatDataForDisplay}
    />
  );
};

export default ChannelPage;

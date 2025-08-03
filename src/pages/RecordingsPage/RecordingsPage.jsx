import React from "react";
import { useTranslation } from "react-i18next";
import ResourceManagementPage from "../ResourceManagementPage/ResourceManagementPage";

const RecordingsPage = () => {
  const { t } = useTranslation();

  const columns = [
    { key: "name", header: t("recordingsManagement.table.name") },
    {
      key: "channel_name",
      header: t("recordingsManagement.table.channelName"),
    },
    { key: "status", header: t("recordingsManagement.table.status") },
  ];

  const formFields = [
    {
      id: "name",
      label: t("recordingsManagement.form.name"),
      type: "text",
      required: true,
    },
    {
      id: "channel_name",
      label: t("recordingsManagement.form.channelName"),
      type: "text",
      required: true,
    },
    {
      id: "status",
      label: t("recordingsManagement.form.status"),
      type: "select",
      options: ["ضبط شده", "در حال ضبط", "خطا در ضبط"],
      required: true,
    },
  ];

  const searchFields = ["name", "channel_name"];

  const initialState = {
    name: "",
    channel_name: "",
    status: "در حال ضبط",
  };

  const formatDataForDisplay = (data) => ({
    ...data,
  });

  return (
    <ResourceManagementPage
      resourceName="recordings"
      columns={columns}
      formFields={formFields}
      searchFields={searchFields}
      initialState={initialState}
      formatDataForDisplay={formatDataForDisplay}
    />
  );
};

export default RecordingsPage;

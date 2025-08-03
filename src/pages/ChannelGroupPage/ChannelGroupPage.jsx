import React from "react";
import { useTranslation } from "react-i18next";
import ResourceManagementPage from "../ResourceManagementPage/ResourceManagementPage";

const ChannelGroupPage = () => {
  const { t } = useTranslation();

  const columns = [
    { key: "name", header: t("channelGroupsManagement.table.name") },
  ];

  const formFields = [
    {
      id: "name",
      label: t("channelGroupsManagement.form.name"),
      type: "text",
      required: true,
    },
  ];

  const searchFields = ["name"];

  const initialState = {
    name: "",
  };

  const formatDataForDisplay = (data) => ({
    ...data,
  });

  return (
    <ResourceManagementPage
      resourceName="channelGroups"
      columns={columns}
      formFields={formFields}
      searchFields={searchFields}
      initialState={initialState}
      formatDataForDisplay={formatDataForDisplay}
    />
  );
};

export default ChannelGroupPage;

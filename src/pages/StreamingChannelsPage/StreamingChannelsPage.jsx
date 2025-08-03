import React from "react";
import { useTranslation } from "react-i18next";
import ResourceManagementPage from "../ResourceManagementPage/ResourceManagementPage";

const StreamingChannelsPage = () => {
  const { t } = useTranslation();

  const columns = [
    {
      key: "channel_name",
      header: t("streamingChannelsManagement.table.channel"),
    },
    { key: "ip_address", header: t("streamingChannelsManagement.table.ip") },
    { key: "date", header: t("streamingChannelsManagement.table.date") },
    { key: "time", header: t("streamingChannelsManagement.table.time") },
    {
      key: "input_bitrate",
      header: t("streamingChannelsManagement.table.input"),
    },
    {
      key: "output_bitrate",
      header: t("streamingChannelsManagement.table.output"),
    },
  ];
    const searchFields = ["channel_name", "ip_address"];

  // This page is likely read-only.
  const formatDataForDisplay = (data) => ({
    ...data,
  });

  return (
    <ResourceManagementPage
      resourceName="streamingChannels"
      columns={columns}
      formatDataForDisplay={formatDataForDisplay}
      isReadOnly={true}
      searchFields={searchFields}
    />
  );
};

export default StreamingChannelsPage;

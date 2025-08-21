import React from "react";
import { useTranslation } from "react-i18next";
import ResourceManagementPage from "../ResourceManagementPage/ResourceManagementPage";

const ChannelPage = () => {
  const { t } = useTranslation();

  const columns = [
    { key: "channelNumber", header: t("channelsManagement.table.number") },
    { key: "channelName", header: t("channelsManagement.table.name") },
    { key: "serviceId", header: "service-ID" },
    { key: "multicastIpv4",header: "multicast-ipv4" },
  ];

  const formFields = [
    {
      id: "channelNumber",
      label: t("channelsManagement.form.number"),
      type: "number",
      required: true,
    },
    {
      id: "channelName",
      label: t("channelsManagement.form.name"),
      type: "text",
      required: true,
    },
    {
      id: "serviceId",
      label: t("channelsManagement.form.status"),
      type: "select",
      options: ["فعال", "غیر فعال"],
      required: true,
    },
    {
      id: "multicastIpv4",
      label: "ipv4",
      type: "select",
      options: ["فعال", "غیر فعال"],
      required: true,
    },
  ];
  

  const searchFields = ["channelName", "channelNumber"];

  const initialState = {
    channel_number: "",
    name: "",
    status: "فعال",
  };

  const formatDataForDisplay = (data) => ({
    ...data
    // channelName: data.channelName,
    // channelNumber: data.channelNumber,
  });

  return (
    <ResourceManagementPage
      resourceName="channels"
      columns={columns}
      formFields={formFields}
      searchFields={searchFields}
      initialState={initialState}
      isReadOnly={true}
      formatDataForDisplay={formatDataForDisplay}
    />
  );
};

export default ChannelPage;

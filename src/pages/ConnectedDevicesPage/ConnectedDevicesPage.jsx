import React from "react";
import { useTranslation } from "react-i18next";
import ResourceManagementPage from "../ResourceManagementPage/ResourceManagementPage";

const ConnectedDevicesPage = () => {
  const { t } = useTranslation();

  const columns = [
    { key: "id", header: t("connectedDevicesManagement.table.id") },
    { key: "ip_address", header: t("connectedDevicesManagement.table.ip") },
    {
      key: "connection_date",
      header: t("connectedDevicesManagement.table.connectionDate"),
    },
    {
      key: "connection_time",
      header: t("connectedDevicesManagement.table.connectionTime"),
    },
    {
      key: "disconnection_time",
      header: t("connectedDevicesManagement.table.disconnectionTime"),
    },
  ];
  const searchFields = ["ip_address"];
    // const initialState = {
    //     id: "",
    //     ip_address: "",
    //     connection_date: "",
    //     connection_time: "",
    //     disconnection_time: "",
    // };
  // This page is likely read-only, so formFields, search, and initialState are empty.
  // The component can be simplified if no add/edit/delete is needed.
  const formatDataForDisplay = (data) => ({
    ...data,
    disconnection_time: data.disconnection_time || t("connectedDevices.active"),
  });

  return (
    <ResourceManagementPage
      resourceName="connectedDevices"
      columns={columns}
      formatDataForDisplay={formatDataForDisplay}
      isReadOnly={true} // A prop to disable add/edit/delete in the generic component
      searchFields={searchFields}
    />
  );
};

export default ConnectedDevicesPage;

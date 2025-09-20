import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ResourceManagementPage from "../ResourceManagementPage/ResourceManagementPage";
import axiosInstance from "../../utils/axiosInstance";

const SettingPage = () => {
  const { t } = useTranslation();

  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { key: "fieldName", header: t("settingsManagement.table.name") },
    { key: "value", header: t("settingsManagement.table.value") },
  ];

  const searchFields = ["fieldName"];

  // Function to fetch data from the server
  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/setting");
      setSettings(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Failed to fetch settings:", error);
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // ✅ New and improved function to generate form fields dynamically
  const generateFormFields = (item) => {
    if (!item) return [];

    let inputType = "text"; // Default to text
    let options = [];

    if (item.enum) {
      // If 'enum' exists, use a select box
      inputType = "select";
      options = item.enum.map((value) => ({ value, label: value }));
    } else if (item.fieldType) {
      // If no 'enum', check 'fieldType'
      switch (item.fieldType) {
        case "Number":
          inputType = "number";
          break;
        case "String":
          inputType = "text";
          break;
        // You can add more cases for other types like 'Boolean' or 'Date' if needed
        // case "Boolean":
        //   inputType = "checkbox";
        //   break;
        default:
          inputType = "text";
      }
    }

    const formFields = [
      {
        id: "value",
        label: t("settingsManagement.form.value"),
        type: inputType,
        options: options,
        required: true,
      },
    ];
    return formFields;
  };

  const handleDataChange = () => {
    fetchSettings();
  };

  return (
    <ResourceManagementPage
      resourceName="setting"
      columns={columns}
      searchFields={searchFields}
      manualDataFetching={true}
      items={settings}
      loading={loading}
      getFormFields={generateFormFields}
      disableDelete={true}
      disableAdd={true}
      onDataChange={handleDataChange}
    />
  );
};

export default SettingPage;

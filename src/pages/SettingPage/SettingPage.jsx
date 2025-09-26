import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ResourceManagementPage from "../ResourceManagementPage/ResourceManagementPage";
import axiosInstance from "../../utils/axiosInstance";

const SettingPage = () => {
  const { t } = useTranslation();

  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ State جدید برای نگهداری فیلدهای فرم
  const [formFields, setFormFields] = useState([]);

  const columns = [
    { key: "fieldName", header: t("settingManagement.table.name") },
    { key: "value", header: t("settingManagement.table.value") },
  ];

  const searchFields = ["fieldName"];

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/setting");
      const receivedSettings = response.data;
      setSettings(receivedSettings); // ✅ تولید فیلدهای فرم بر اساس داده های دریافتی

      if (receivedSettings.length > 0) {
        const firstItem = receivedSettings[0];
        let inputType = "text";
        let options = [];

        if (firstItem.enum) {
          inputType = "select";
          options = firstItem.enum.map((value) => ({ value, label: value }));
        } else if (firstItem.fieldType) {
          switch (firstItem.fieldType) {
            case "Number":
              inputType = "number";
              break;
            case "String":
              inputType = "text";
              break;
            default:
              inputType = "text";
          }
        }

        const dynamicFormFields = [
          {
            id: "value",
            label: t("settingManagement.form.value"),
            type: inputType,
            options: options,
            required: true,
          },
        ]; // ✅ فیلدهای تولید شده را در state ذخیره می‌کنیم
        setFormFields(dynamicFormFields);
      }
      console.log(receivedSettings);
    } catch (error) {
      console.error("Failed to fetch settings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

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
      formFields={formFields} // ✅ فیلدها را از state جدید پاس می‌دهیم
      disableDelete={true}
      disableAdd={true}
      onDataChange={handleDataChange}
    />
  );
};

export default SettingPage;

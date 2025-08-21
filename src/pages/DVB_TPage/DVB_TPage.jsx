import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import ResourceManagementPage from "../ResourceManagementPage/ResourceManagementPage";
import axiosInstance from "../../utils/axiosInstance";
import ToggleSwitch from "../../components/ToggleSwitch/ToggleSwitch";
import { useMemo } from "react";


export default function DVB_TPage() {
  const { t } = useTranslation();
  const [config, setconfig] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCards] = useState([]);
  // 1. تابع برای گرفتن دیتا از سرور
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/mumudvb/dvb-t");
      setconfig(response.data);
    } catch (error) {
      console.error("Failed to fetch stream configs:", error);
      Swal.fire({
        icon: "error",
        title: "خطا",
        text: "دریافت اطلاعات از سرور با مشکل مواجه شد.",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
      fetchData();
  }, [fetchData]);


  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axiosInstance.get(
          "/cards?autoscan=false&type=DVB-T"
        );
        setCards(response.data);
      } catch (error) {
        console.error("Failed to fetch cards:", error);
        Swal.fire({
          icon: "error",
          title: "خطا در دریافت اطلاعات",
          text: "نتوانستیم لیست کارت‌ها را از سرور دریافت کنیم.",
        });
      }
    }
    fetchCards();
}, []);

  const cardOptions = useMemo(() => {
    return cards.map((card) => ({
      value: card.id,
      label: card.name,
    }));
  }, [cards]);

 

  // 2. تابع برای تغییر وضعیت فعال/غیرفعال
  const handleStatusToggle = async (cardId, newEnabledStatus) => {
    const originalconfig = [...config];
    const updatedconfig = config.map((card) =>
      card.id === cardId ? { ...card, enabled: newEnabledStatus } : card
    );
    setconfig(updatedconfig); // آپدیت لحظه‌ای UI
    setIsLoading(true);

    try {
      await axiosInstance.patch(`/mumudvb/dvb-t/${cardId}`, {
        enabled: newEnabledStatus,
      });

      // نیازی به نمایش پیام موفقیت نیست مگر اینکه بخواهید
    } catch (error) {
      console.error("Failed to update status:", error);
      setconfig(originalconfig); // بازگرداندن به حالت قبل در صورت خطا
      Swal.fire({
        icon: "error",
        title: "خطا",
        text: "مشکلی در تغییر وضعیت پیش آمد.",
      });
    } finally {
      setIsLoading(false);
      fetchData();
    }
  };

// 3. تابع فرمت کردن دیتا برای نمایش (نسخه اصلاح شده)
const formatCardData = (stream) => ({
  ...stream, // ۱. تمام خصوصیات اصلی شیء stream را کپی کن
  ...stream.convertedConfig, // ۲. تمام خصوصیات شیء تودرتوی convertedConfig را هم کپی کن (برای frequency, polarization و غیره)
  id: stream.id, 
  name: stream.card.name || "N/A", 
  status: stream.enabled ? "فعال" : "غیرفعال", 
  cardId: stream.card.id, 
});

  // دیتای خام را به دیتای فرمت‌شده برای نمایش تبدیل می‌کنیم
  const formattedconfig = config.map(formatCardData);


  // 4. تعریف ستون‌ها با تابع render برای وضعیت
  const configColumns = [
    { key: "id", header: t("mumudvb/dvb-sManagement.table.id") },
    { key: "name", header: t("mumudvb/dvb-sManagement.table.name") },
    {
      key: "frequency",
      header: t("mumudvb/dvb-sManagement.table.frequency"),
    },
    {
      key: "status",
      header: t("mumudvb/dvb-sManagement.table.status"), // هدر ستون
      render: (item) => (
        <ToggleSwitch
          checked={item.enabled}
          onChange={(e) => handleStatusToggle(item.id, e.target.checked)}
        />
      ),
    },
  ];

  const searchFields = [ "id", "frequency"];



    const FormFields = [
      {
        id: "cardId",
        label: t("mumudvb/dvb-sManagement.form.name"),
        type: "select",
        required: true,
        options: cardOptions,
      },
      {
        id: "frequency",
        label: t("mumudvb/dvb-sManagement.form.frequency"),
        type: "number",
        required: true,
        placeholder: "564000",
      },
      {
        id: "bandwidth",
        label: t("mumudvb/dvb-sManagement.form.bandwidth"),
        type: "number",
        required: true,
        placeholder: "8",
      },

      {
        id: "multicastIpAddressAndPort",
        label: t("mumudvb/dvb-sManagement.form.multicastIpAddressAndPort"),
        type: "text",
        required: true,
        placeholder: "239.0.0.1",
      },
      {
        id: "rewritePat",
        label: t("mumudvb/dvb-sManagement.form.rewritePat"),
        type: "checkbox",
        // required: true,
      },
      {
        id: "dedicatedThread",
        label: t("mumudvb/dvb-sManagement.form.dedicatedThread"),
        type: "checkbox",
        // required: true,
      },
      {
        id: "dedicatedThreadBufferSize",
        label: t("mumudvb/dvb-sManagement.form.dedicatedThreadBufferSize"),
        type: "number",
        // required: true,
        placeholder: "100",
      },
      {
        id: "multicastTimeToLive",
        label: t("mumudvb/dvb-sManagement.form.multicastTimeToLive"),
        type: "number",
        // required: true,
        placeholder: "10",
      },

      {
        id: "autoConfiguration",
        label: t("mumudvb/dvb-sManagement.form.autoConfiguration"),
        type: "select",
        options: [
          { value: "full", label: "full" },
          { value: "pid", label: "pid" },
          { value: "none", label: "none" },
        ],
        // required: true,
      },
    ];

  

  const initialState = {
    frequency: 0,
    autoConfiguration: "full",
    multicastTimeToLive: 0,
    cardId: "",
  };


  return (
    <ResourceManagementPage
      resourceName="mumudvb/dvb-t"
      columns={configColumns}
      searchFields={searchFields}
      // پراپ‌های جدید برای کنترل دستی دیتا
      manualDataFetching={true}
      initialState={initialState}
      items={formattedconfig}
      loading={isLoading}
      formFields={FormFields}
      onDataChange={fetchData} // برای رفرش شدن صفحه بعد از سابمیت ها
    />
  );
}

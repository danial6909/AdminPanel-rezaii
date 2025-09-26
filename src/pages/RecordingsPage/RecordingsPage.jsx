import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ResourceManagementPage from "../ResourceManagementPage/ResourceManagementPage";
import StreamModal from "../../components/StreamModal/StreamModal";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Swal from "sweetalert2";


const RecordingsPage = () => {
  const { t } = useTranslation();


  const handleCopyUrl = (url) => {
    // روش مدرن با چک وجود clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "کپی شد!",
            text: "لینک با موفقیت کپی شد.",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => {
          console.error("Failed to copy using clipboard API:", err);
          fallbackCopy(url); // اگر شکست خورد، به fallback برو
        });
    } else {
      // اگر clipboard API در دسترس نبود، مستقیم به fallback
      fallbackCopy(url);
    }
  };

  const fallbackCopy = (url) => {
    // fallback با ایجاد یک textarea موقت
    const textArea = document.createElement("textarea");
    textArea.value = url;
    textArea.style.position = "fixed"; // جلوگیری از اسکرول
    textArea.style.top = "0";
    textArea.style.left = "-9999px"; // خارج از دید
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand("copy");
      if (successful) {
        Swal.fire({
          icon: "success",
          title: "کپی شد!",
          text: "لینک با موفقیت کپی شد.",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        throw new Error("Fallback copy failed");
      }
    } catch (err) {
      console.error("Failed to copy using fallback:", err);
      Swal.fire({
        icon: "error",
        title: "خطا",
        text: "مشکلی در کپی کردن لینک پیش آمد.",
      });
    } finally {
      document.body.removeChild(textArea);
    }
  };

  const columns = [
    { key: "id", header: t("channels/admin/recordManagement.table.id") },
    { key: "user", header: t("channels/admin/recordManagement.table.user") },
    {
      key: "previewLink",
      header: t("channels/admin/recordManagement.table.address"),
      render: (row) => (
        <button
          style={{ cursor: "pointer", border: "none", background: "none" }}
          onClick={() => handleCopyUrl(row.previewLink)}
          title="کپی کردن آدرس"
        >
          <ContentCopyIcon />
        </button>
      ),
    },
    {
      key: "status",
      header: t("channels/admin/recordManagement.table.status"),
      render: (row) => (
        <span className={`status-badge status-${row.status?.toLowerCase()}`}>
          {row.status || "N/A"}
        </span>
      ),
    },
  ];

  const formFields = [
    {
      id: "name",
      label: t("channels/admin/recordManagement.form.name"),
      type: "text",
      required: true,
    },
    {
      id: "channel_name",
      label: t("channels/admin/recordManagement.form.channelName"),
      type: "text",
      required: true,
    },
    {
      id: "status",
      label: t("channels/admin/recordManagement.form.status"),
      type: "select",
      options: ["ضبط شده", "در حال ضبط", "خطا در ضبط"],
      required: true,
    },
  ];

  const searchFields = ["user", "status"];

  const initialState = {
    name: "",
    channel_name: "",
    status: "در حال ضبط",
  };

  const formatDataForDisplay = (data) => {
    return {
      id: data.id,
      user: data.user.firstName,
      previewLink: data.previewLink,
      status: data.status,
    };
  };

  return (
    <>
      <ResourceManagementPage
        resourceName="channels/admin/record"
        columns={columns}
        formFields={formFields}
        searchFields={searchFields}
        initialState={initialState}
        formatDataForDisplay={formatDataForDisplay}
        disableEdit={true}
        disableAdd={true}
      />
    </>
  );
};

export default RecordingsPage;

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ResourceManagementPage from "../ResourceManagementPage/ResourceManagementPage";
import StreamModal from "../../components/StreamModal/StreamModal";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Swal from "sweetalert2";

const RecordingsPage = () => {
  const { t } = useTranslation();
  const [selectedStreamUrl, setSelectedStreamUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStreamUrl("");
  };

  // ✅ New function to copy URL to clipboard
  const handleCopyUrl = (url) => {
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
        console.error("Failed to copy:", err);
        Swal.fire({
          icon: "error",
          title: "خطا",
          text: "مشکلی در کپی کردن لینک پیش آمد.",
        });
      });
  };

  const columns = [
    { key: "id", header: t("recordingsManagement.table.id") },
    { key: "user", header: t("recordingsManagement.table.user") },
    {
      key: "previewLink",
      header: t("recordingsManagement.table.address"),
      // ✅ Use a custom render function to display a copy button
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
      header: t("recordingsManagement.table.status"),
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
      />

      {/* StreamModal is no longer needed since the 'preview' button is removed */}
      {/* <StreamModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        streamUrl={selectedStreamUrl}
      /> */}
    </>
  );
};

export default RecordingsPage;

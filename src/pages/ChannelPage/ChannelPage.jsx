import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ResourceManagementPage from "../ResourceManagementPage/ResourceManagementPage";
import RecordModal from "../../components/RecordModal/RecordModal";
import StartIcon from "@mui/icons-material/PlayCircleFilled";
import axiosInstance from "../../utils/axiosInstance";
import Swal from "sweetalert2";
import "./ChannelPage.css";

const ChannelPage = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [recordDates, setRecordDates] = useState({
    startDate: "",
    endDate: "",
  });

  // تابع باز کردن مودال و انتخاب کانال
  const handleRecordClick = (channel) => {
    setSelectedChannel(channel);
    setIsModalOpen(true);
  };

  // تابع بستن مودال و بازنشانی وضعیت
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedChannel(null);
    setRecordDates({ startDate: "", endDate: "" });
  };

  // ✅ تابع اصلی برای ارسال داده به سرور
  const handleRecordSubmit = async () => {
    // بررسی اینکه تاریخ‌ها انتخاب شده‌اند
    if (!recordDates.startDate || !recordDates.endDate) {
      Swal.fire({
        icon: "warning",
        title: "خطا!",
        text: "لطفاً هر دو تاریخ شروع و پایان را انتخاب کنید.",
        confirmButtonText: "باشه",
      });
      return;
    }

    // بررسی اینکه زمان پایان از زمان شروع بزرگتر باشد
    if (new Date(recordDates.endDate) <= new Date(recordDates.startDate)) {
      Swal.fire({
        icon: "warning",
        title: "خطا!",
        text: "زمان پایان باید بعد از زمان شروع باشد.",
        confirmButtonText: "باشه",
      });
      return;
    }

    try {
      // ساختن payload برای ارسال به سرور
      const payload = {
        channelId: selectedChannel.id,
        startTime: new Date(recordDates.startDate).toISOString(),
        endTime: new Date(recordDates.endDate).toISOString(),
      };

      // ارسال درخواست POST با استفاده از axiosInstance
      await axiosInstance.post("/channels/record", payload);

      // نمایش پیام موفقیت
      Swal.fire({
        icon: "success",
        title: "موفق!",
        text: "عملیات ضبط با موفقیت شروع شد.",
        showConfirmButton: false,
        timer: 2000,
      });

      // بستن مودال پس از موفقیت
      handleModalClose();
    } catch (err) {
      console.error("خطا در ارسال داده:", err);
      // نمایش پیام خطا
      Swal.fire({
        icon: "error",
        title: "خطا",
        text:
          err.response?.data?.message || "مشکلی در شروع عملیات ضبط پیش آمد.",
      });
    }
  };

  const columns = [
    { key: "channelNumber", header: t("channelsManagement.table.number") },
    { key: "channelName", header: t("channelsManagement.table.name") },
    { key: "serviceId", header: "service-ID" },
    { key: "multicastIpv4", header: "multicast-ipv4" },
    {
      key: "actions",
      header: "اقدامات",
      render: (channel) => (
        <button
          onClick={() => handleRecordClick(channel)}
          className="record-button"
        >
          <StartIcon />
        </button>
      ),
    },
  ];

  const formFields = [
    // ...
  ];
  const searchFields = ["channelName", "channelNumber"];
  const initialState = {
    channel_number: "",
    name: "",
    status: "فعال",
  };
  const formatDataForDisplay = (data) => ({ ...data });

  return (
    <>
      <ResourceManagementPage
        resourceName="channels"
        columns={columns}
        formFields={formFields}
        searchFields={searchFields}
        initialState={initialState}
        isReadOnly={true}
        formatDataForDisplay={formatDataForDisplay}
      />
      {/* پاس دادن props به RecordModal */}
      <RecordModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={`رکوردینگ کانال: ${selectedChannel?.channelName || ""}`}
        startDate={recordDates.startDate}
        endDate={recordDates.endDate}
        onStartDateChange={(e) =>
          setRecordDates({ ...recordDates, startDate: e.target.value })
        }
        onEndDateChange={(e) =>
          setRecordDates({ ...recordDates, endDate: e.target.value })
        }
        onSubmit={handleRecordSubmit}
      />
    </>
  );
};

export default ChannelPage;

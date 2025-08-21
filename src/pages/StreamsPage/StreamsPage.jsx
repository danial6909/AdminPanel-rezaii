import React, { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import ResourceManagementPage from "../ResourceManagementPage/ResourceManagementPage";
import axiosInstance from "../../utils/axiosInstance";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import StreamModal from "../../components/StreamModal/StreamModal"; // اطمینان حاصل کنید که این مسیر درست است
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
const StreamPage = () => {
  const { t } = useTranslation();
  const [channels, setChannels] = useState([]);
  const [channelFilter, setChannelFilter] = useState("");

  // State برای مدیریت مودال
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStreamUrl, setSelectedStreamUrl] = useState("");

  useEffect(() => {
    const fetchChannelName = async () => {
      try {
        const response = await axiosInstance.get("channels");
        setChannels(response.data);
      } catch (error) {
        console.error("Failed to fetch channelname:", error);
      }
    };
    fetchChannelName();
  }, []);

  const channelNameOptions = useMemo(() => {
    return channels.map((channel) => ({
      value: channel.channelName,
      label: channel.channelName,
    }));
  }, [channels]);

  // توابع برای باز و بسته کردن مودال
  const handleViewStream = (url) => {
    setSelectedStreamUrl(url);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStreamUrl("");
  };

  // تعریف ستون‌های جدول
  const columns = [
    { key: "id", header: "id" },
    { key: "channelName", header: t("channelsManagement.table.name") },
    { key: "protocol", header: "protocol" },
    { key: "unicastIpv4", header: "unicast-ipv4" },
    {
      header: "نمایش",
      render: (row) => (
        <button
          style={{ cursor: "pointer", border: "none", background: "none" }}
          onClick={() => handleViewStream(row.unicastIpv4)}
          title="پخش زنده"
        >
          <RemoveRedEyeIcon />
        </button>
      ),
    },
  ];

  // فیلدهای فرم (در صورت نیاز برای ساخت یا ویرایش)
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

  const searchFields = ["channelName", "id"];

  const initialState = {
    channel_number: "",
    name: "",
    status: "فعال",
  };

  const formatDataForDisplay = (data) => ({
    ...data,
    channelName: data.channel.channelName,
  });

  // کامپوننت فیلتر بر اساس نام کانال
  const ChannelNameFilterComponent = () => {
    const filterOptions = [
      { value: "", label: "همه کانال‌ها" },
      ...channelNameOptions,
    ];

    const handleFilterChange = (e) => {
      setChannelFilter(e.target.value);
    };

    return (
      <CustomSelect
        name="setchannelFilter"
        options={filterOptions}
        value={channelFilter}
        onChange={handleFilterChange}
      />
    );
  };

  return (
    <>
      <ResourceManagementPage
        resourceName="channels/streams"
        columns={columns}
        formFields={formFields}
        searchFields={searchFields}
        initialState={initialState}
        isReadOnly={true}
        formatDataForDisplay={formatDataForDisplay}
        FilterComponent={ChannelNameFilterComponent}
        filterValue={channelFilter}
        filterField="channelName"
      />

      <StreamModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        streamUrl={selectedStreamUrl}
      />
    </>
  );
};

export default StreamPage;

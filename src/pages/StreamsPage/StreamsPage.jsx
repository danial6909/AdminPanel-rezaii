import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import ResourceManagementPage from "../ResourceManagementPage/ResourceManagementPage";
import axiosInstance from "../../utils/axiosInstance";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import StreamModal from "../../components/StreamModal/StreamModal";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Swal from "sweetalert2";
import StreamsForm from "../../components/StreamsForm/StreamsForm";
import { Modal } from "../../components/Modals/Modals";

const StreamPage = () => {
  const { t } = useTranslation();
  const [channels, setChannels] = useState([]);
  const [streams, setStreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [channelFilter, setChannelFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStreamUrl, setSelectedStreamUrl] = useState("");
  const [isAddFormModalOpen, setIsAddFormModalOpen] = useState(false);

  const fetchChannels = async () => {
    try {
      const response = await axiosInstance.get("channels");
      setChannels(response.data);
    
    } catch (error) {
      console.error("Failed to fetch channelname:", error);
    }
  };

  const fetchStreams = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/channels/streams");
      setStreams(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Failed to fetch streams:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChannels();
    fetchStreams();
  }, [fetchStreams]);

  const channelNameOptions = useMemo(() => {
    return channels.map((channel) => ({
      value: channel.channelName,
      label: channel.channelName,
    }));
  }, [channels]);

  const handleViewStream = (url) => {
    setSelectedStreamUrl(url);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStreamUrl("");
  };

  const handleOpenAddFormModal = () => {
    setIsAddFormModalOpen(true);
  }; // ✅ تابع جدید برای ذخیره استریم با آدرس پویا

  const handleAddStream = async (formData) => {
    try {
      // ✅ تعیین آدرس API بر اساس streamType
      const endpoint =
        formData.streamType === "hls" ? "/channels/hls" : "/channels/rtp";
      delete formData.streamType
      console.log("data",formData);
      await axiosInstance.post(endpoint, formData);
      Swal.fire({
        icon: "success",
        title: "موفق!",
        text: "استریم با موفقیت ذخیره شد.",
        showConfirmButton: false,
        timer: 1500,
      });
      setIsAddFormModalOpen(false);
      fetchStreams();
    } catch (error) {
      console.error("Failed to add stream:", error);
      Swal.fire({
        icon: "error",
        title: "خطا",
        text: error.response?.data?.message || "مشکلی در ذخیره استریم پیش آمد.",
      });
    }
  };

  const handleCancelForm = () => {
    setIsAddFormModalOpen(false);
  };

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
    { key: "id", header: "id" },
    { key: "channelName", header: t("channelsManagement.table.name") },
    { key: "protocol", header: t("streams.form.protocol") },
    {
      key: "unicastIpv4",
      header: "unicast-ipv4",
      render: (row) => (
        <button
          style={{ cursor: "pointer", border: "none", background: "none" }}
          onClick={() => handleCopyUrl(row.unicastIpv4)}
          title="کپی کردن آدرس"
        >
          <ContentCopyIcon />
        </button>
      ),
    },
    {
      header: t("streams.form.preview"),
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

  const searchFields = ["channelName", "id"];
  const initialState = {
    channel_number: "",
    name: "",
    status: "فعال",
  };
const formatDataForDisplay = (data) => {

  console.log("Data to format:", data);

  const channelName = data?.channel?.channelName || "N/A";

  console.log("Formatted channelName:", channelName);

  return {
    ...data,
    channelName: channelName,
  };
};


const formattedStreams = useMemo(() => {
  return streams.map(formatDataForDisplay);
}, [streams]);

  const ChannelNameFilterComponent = () => {
    const filterOptions = [
      { value: "", label: t("streams.filter") },
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
        searchFields={searchFields}
        initialState={initialState}
        isReadOnly={false}
        formatDataForDisplay={formatDataForDisplay}
        FilterComponent={ChannelNameFilterComponent}
        filterValue={channelFilter}
        filterField="channelName"
        overrideAddItemClick={handleOpenAddFormModal}
        manualDataFetching={true}
        items={formattedStreams}
        loading={loading}
      />

      <StreamModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        streamUrl={selectedStreamUrl}
      />

      <Modal
        isOpen={isAddFormModalOpen}
        onClose={handleCancelForm}
        title={t("channels/streamsManagement.addButton")}
      >
        <StreamsForm onSubmit={handleAddStream} onCancel={handleCancelForm} />
      </Modal>
    </>
  );
};

export default StreamPage;

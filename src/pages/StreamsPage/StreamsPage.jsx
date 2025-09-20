import React, { useState, useEffect, useMemo } from "react";
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
  const [channelFilter, setChannelFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStreamUrl, setSelectedStreamUrl] = useState("");
  const [isAddFormModalOpen, setIsAddFormModalOpen] = useState(false);

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
  };

  const handleFormSubmit = (formData) => {
    console.log("Form submitted with data:", formData);
    setIsAddFormModalOpen(false);
  };

  const handleCancelForm = () => {
    setIsAddFormModalOpen(false);
  }; // ✅ New function to handle copying the URL

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
  }; // ✅ Updated `columns` array

  const columns = [
    { key: "id", header: "id" },
    { key: "channelName", header: t("channelsManagement.table.name") },
    { key: "protocol", header: "protocol" },
    {
      key: "unicastIpv4",
      header: "unicast-ipv4", // ✅ Use a custom render function to display a copy button
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
        searchFields={searchFields}
        initialState={initialState}
        isReadOnly={true}
        formatDataForDisplay={formatDataForDisplay}
        FilterComponent={ChannelNameFilterComponent}
        filterValue={channelFilter}
        filterField="channelName"
        overrideAddItemClick={handleOpenAddFormModal}
      />
        
      <StreamModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        streamUrl={selectedStreamUrl}
      />
        
      <Modal
        isOpen={isAddFormModalOpen}
        onClose={handleCancelForm}
        title={t("Stream.addStream")}
      >
           
        <StreamsForm onSubmit={handleFormSubmit} onCancel={handleCancelForm} />
         
      </Modal>
       
    </>
  );
};

export default StreamPage;

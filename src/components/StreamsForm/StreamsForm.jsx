import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./StreamsForm.css";
import CustomSelect from "../CustomSelect/CustomSelect";
import axiosInstance from "../../utils/axiosInstance"; // فرض بر این است که این فایل وجود دارد

const StreamsForm = ({ onSubmit, onCancel }) => {
  const { t } = useTranslation();

  // استیت برای نگهداری داده‌های فرم
  const [formData, setFormData] = useState({
    streamType: "hls", // مقدار پیش‌فرض
    duration: "",
    sourceType: "channelId", // مقدار پیش‌فرض
    channelId: "",
    url: "",
  });

  // استیت برای گزینه‌های سلکت باکس کانال‌ها
  const [channelOptions, setChannelOptions] = useState([]);
  const [isChannelsLoading, setIsChannelsLoading] = useState(true);

  // دریافت لیست کانال‌ها از API
  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await axiosInstance.get("/channels"); // آدرس API کانال‌ها را وارد کنید
        console.log(response.data)
        const options = response.data.map((channel) => ({
          label: channel.channelName,
          value: channel.id,
        }));
        setChannelOptions(options);
      } catch (error) {
        console.error("Failed to fetch channels:", error);
      } finally {
        setIsChannelsLoading(false);
      }
    };
    fetchChannels();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ✅ اولین سلکت باکس برای hls و rtp */}
      <div className="form-group">
        <label htmlFor="streamType">{t("streams.form.streamTypeLabel")}</label>
        <CustomSelect
          name="streamType"
          options={[
            { value: "hls", label: "HLS" },
            { value: "rtp", label: "RTP" },
          ]}
          value={formData.streamType}
          onChange={handleInputChange}
        />
      </div>

      {/* ✅ نمایش شرطی اینپوت مدت زمان فقط برای HLS */}
      {formData.streamType === "hls" && (
        <div className="form-group">
          <label htmlFor="duration">{t("streams.form.durationLabel")}</label>
          <input
            type="number"
            id="duration"
            name="duration"
            className="form-control"
            value={formData.duration}
            onChange={handleInputChange}
            min={0}
            required
            placeholder={"0"}
          />
        </div>
      )}

      {formData.streamType === "rtp" && (
        <div className="form-group">
          <label htmlFor="rtpUrl">{t("streams.form.rtpUrlLabel")}</label>
          <input
            type="text"
            id="rtpUrl"
            name="rtpUrl"
            className="form-control"
            value={formData.rtpUrl}
            onChange={handleInputChange}
            required
            placeholder={"192.168.1.10"}
          />
        </div>
      )}

      {/* ✅ دومین سلکت باکس برای channelId و url */}
      <div className="form-group">
        <label htmlFor="sourceType"> </label>
        <CustomSelect
          name="sourceType"
          options={[
            { value: "channelId", label: "Channel ID" },
            { value: "url", label: "URL" },
          ]}
          value={formData.sourceType}
          onChange={handleInputChange}
        />
      </div>

      {/* ✅ نمایش شرطی سلکت باکس کانال یا اینپوت URL */}
      {formData.sourceType === "channelId" ? (
        <div className="form-group">
          <label htmlFor="channelId">{t("streams.form.channelLabel")}</label>
          <CustomSelect
            name="channelId"
            options={channelOptions}
            value={formData.channelId}
            onChange={handleInputChange}
          />
          {isChannelsLoading && <p>{t("form.loadingChannels")}</p>}
        </div>
      ) : (
        <div className="form-group">
          <label htmlFor="url">{t("streams.form.urlLabel")}</label>
          <input
            type="text"
            id="url"
            name="url"
            className="form-control"
            value={formData.url}
            onChange={handleInputChange}
            required
            placeholder={"192.168.1.10"}
          />
        </div>
      )}

      <div className="modal-footer">
        <button type="button" className="btn btn-cancel" onClick={onCancel}>
          {t("management.cancel")}
        </button>
        <button type="submit" className="btn btn-submit">
          {t("management.save")}
        </button>
      </div>
    </form>
  );
};

export default StreamsForm;

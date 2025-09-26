import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./StreamsForm.css";
import CustomSelect from "../CustomSelect/CustomSelect";
import axiosInstance from "../../utils/axiosInstance";

const StreamsForm = ({ onSubmit, onCancel }) => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    streamType: "hls",
    timeshiftMinute: "",
    sourceType: "channelId",
    channelId: "",
    url: "",
    destinationIp: "", // ✅ اضافه کردن فیلد جدید
  });

  const [channelOptions, setChannelOptions] = useState([]);
  const [isChannelsLoading, setIsChannelsLoading] = useState(true);

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await axiosInstance.get("/channels");
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
    const dataToSend = {}; // ✅ منطق جدید برای آماده‌سازی داده‌ها

    if (formData.streamType === "hls") {
      dataToSend.streamType = "hls";
      dataToSend.timeshiftMinute = Number(formData.timeshiftMinute);
      if (formData.sourceType === "channelId") {
        dataToSend.channelId = formData.channelId;
      } else if (formData.sourceType === "url") {
        dataToSend.url = formData.url;
      }
    } else if (formData.streamType === "rtp") {
      dataToSend.streamType = "rtp";
      dataToSend.destinationIp = formData.destinationIp; // ✅ ارسال فیلد جدید
      if (formData.sourceType === "channelId") {
        dataToSend.channelId = formData.channelId;
      } else if (formData.sourceType === "url") {
        dataToSend.url = formData.url;
      }
    }

    onSubmit(dataToSend);
  };

  return (
    <form onSubmit={handleSubmit}>
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

      {formData.streamType === "hls" && (
        <div className="form-group">
          <label htmlFor="timeshiftMinute">
            {t("streams.form.timeshiftMinuteLabel")}
          </label>

          <input
            type="number"
            id="timeshiftMinute"
            name="timeshiftMinute"
            className="form-control"
            value={formData.timeshiftMinute}
            onChange={handleInputChange}
            min={0}
            required
            placeholder={"0"}
          />
        </div>
      )}

      {formData.streamType === "rtp" && (
        <div className="form-group">
          <label htmlFor="destinationIp">IP مقصد</label>

          <input
            type="text"
            id="destinationIp"
            name="destinationIp"
            className="form-control"
            value={formData.destinationIp}
            onChange={handleInputChange}
            required
            placeholder={"239.0.0.1"}
          />
        </div>
      )}

      <div className="form-group">
        <label htmlFor="sourceType">{t("streams.form.sourceTypeLabel")}</label>

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

      {formData.sourceType === "channelId" ? (
        <div className="form-group">
          <label htmlFor="channelId">{t("streams.form.channelLabel")}</label>

          <CustomSelect
            name="channelId"
            options={channelOptions}
            value={formData.channelId}
            onChange={handleInputChange}
            required
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
            placeholder={"http://example.com/stream"}
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

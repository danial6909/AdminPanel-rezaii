import React from "react";
import { useDropzone } from "react-dropzone"; 
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import {
  Avatar, 
  Typography, 
  TextField, 
  Box, 
  IconButton, 
  Tooltip,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import PhotoCamera from "@mui/icons-material/PhotoCamera"; 
import EditIcon from "@mui/icons-material/Edit"; 
import CloseIcon from "@mui/icons-material/Close"; 
import "./ProfileHeader.css";
import axiosInstance from "../../utils/axiosInstance";


const ProfileHeader = ({
  user, // آبجکت حاوی اطلاعات کاربر
  setUser, // تابعی برای به‌روزرسانی اطلاعات کاربر در state والد
  avatarPreview, // URL پیش‌نمایش آواتار
  coverPreview, // URL پیش‌نمایش عکس کاور
  isNameEditing, // یک مقدار boolean که مشخص می‌کند آیا حالت ویرایش نام فعال است یا خیر
  setIsNameEditing, // تابعی برای تغییر وضعیت isNameEditing
  tempUserName, // یک state موقت برای نگهداری نام و نام خانوادگی در حالت ویرایش
  setTempUserName, // تابعی برای به‌روزرسانی state موقت نام
  handleInputChange, // تابع عمومی برای مدیریت تغییرات ورودی‌ها (از والد پاس داده شده)
  onAvatarDrop, // تابع مدیریت آپلود آواتار (از والد پاس داده شده)
  onCoverDrop, // تابع مدیریت آپلود کاور (از والد پاس داده شده)
}) => {
  
  const { t } = useTranslation();

  // استفاده از هوک useDropzone برای مدیریت آپلود آواتار
  const {
    getRootProps: getAvatarRootProps,
    getInputProps: getAvatarInputProps,
  } = useDropzone({ onDrop: onAvatarDrop, accept: { "image/*": [] } });

  // استفاده از هوک useDropzone برای مدیریت آپلود عکس کاور
  const { getRootProps: getCoverRootProps, getInputProps: getCoverInputProps } =
    useDropzone({ onDrop: onCoverDrop, accept: { "image/*": [] } });

  // تابع برای ذخیره کردن نام جدید کاربر
  const handleSaveName = async (e) => {
    e.preventDefault(); 
    try {
      // ارسال درخواست PATCH به سرور برای به‌روزرسانی اطلاعات کاربر
      const response = await axiosInstance.patch("/user/self", {
        firstName: tempUserName.firstName,
        lastName: tempUserName.lastName,
      });
      // به‌روزرسانی اطلاعات کاربر در state سراسری با پاسخ دریافت شده از سرور
      setUser((prevUser) => ({ ...prevUser, ...response.data }));
      Swal.fire({
        icon: "success",
        title: t("common.success"), 
        text: t("profileHeader.nameSaveSuccess"), 
        showConfirmButton: false,
        timer: 1500, 
      });
      // خروج از حالت ویرایش
      setIsNameEditing(false);
    } catch (error) {
      // در صورت بروز خطا، نمایش پیام خطا
      Swal.fire({
        icon: "error",
        title: t("common.error"), // متن ترجمه شده
        text: error.response?.data?.message || t("profileHeader.nameSaveError"), // نمایش پیام خطای سرور یا یک پیام پیش‌فرض
      });
    }
  };


  return (
    <Box>
      {/* بخش بنر (عکس کاور) پروفایل */}
      <div
        {...getCoverRootProps()} // اعمال پراپرتی‌های لازم برای قابلیت Dropzone
        className="p-user-card-banner"
        style={{ backgroundImage: `url(${coverPreview})` }} // تنظیم عکس پس‌زمینه به صورت دینامیک
      >
        {/* دکمه‌ای برای تغییر عکس کاور که روی بنر قرار می‌گیرد */}
        <Box className="p-user-banner-uploader">
          <PhotoCamera sx={{ fontSize: "1rem", mr: 1 }} />
          {t("profileHeader.changeCover")} {/* متن ترجمه شده */}
          <input
            {...getCoverInputProps()} // اعمال پراپرتی‌های لازم به اینپوت مخفی
            className="p-user-hidden-input"
          />
        </Box>
      </div>

      {/* ناحیه هویت کاربر (شامل آواتار، نام و ...) */}
      <Box className="p-user-identity-area">
        {/* بخش آواتار کاربر */}
        <div {...getAvatarRootProps()} className="p-user-avatar-wrapper">
          <Avatar src={avatarPreview} className="p-user-avatar-img" />
          {/* دکمه آپلود که روی آواتار قرار می‌گیرد */}
          <Box className="p-user-avatar-uploader">
            <PhotoCamera sx={{ fontSize: "1.25rem" }} />
          </Box>
          <input {...getAvatarInputProps()} className="p-user-hidden-input" />
        </div>

        {/* بخش جزئیات کاربر (نام، نقش و دکمه‌های ویرایش) */}
        <Box className="p-user-details">
          {isNameEditing ? (
            // اگر در حالت ویرایش نام باشیم، این فرم نمایش داده می‌شود
            <form onSubmit={handleSaveName} className="p-user-inline-form">
              <TextField
                variant="outlined"
                name="firstName"
                label={t("userManagement.form.firstName")} // لیبل ترجمه شده
                value={tempUserName.firstName}
                onChange={(e) => handleInputChange(e, setTempUserName)}
                required
                className="p-user-input-field"
              />
              <TextField
                variant="outlined"
                name="lastName"
                label={t("userManagement.form.lastName")} // لیبل ترجمه شده
                value={tempUserName.lastName}
                onChange={(e) => handleInputChange(e, setTempUserName)}
                required
                className="p-user-input-field"
              />
              {/* دکمه ذخیره با تولتیپ */}
              <Tooltip title={t("management.save")}>
                <IconButton
                  type="submit"
                  className="p-user-inline-action action-save"
                >
                  <SaveIcon />
                </IconButton>
              </Tooltip>
              {/* دکمه انصراف با تولتیپ */}
              <Tooltip title={t("management.cancel")}>
                <IconButton
                  className="p-user-inline-action action-cancel"
                  onClick={() => {
                    setIsNameEditing(false); // خروج از حالت ویرایش
                    // بازگرداندن مقادیر موقت به مقادیر اصلی کاربر
                    if (user)
                      setTempUserName({
                        firstName: user.firstName || "",
                        lastName: user.lastName || "",
                      });
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </form>
          ) : (
            // در غیر این صورت (حالت نمایش)، نام و نقش کاربر نمایش داده می‌شود
            <>
              <Typography variant="h4" className="p-user-name">
                {user?.firstName} {user?.lastName}
                {/* دکمه ویرایش که کاربر را وارد حالت ویرایش می‌کند */}
                <IconButton
                  size="small"
                  className="p-user-edit-icon"
                  onClick={() => setIsNameEditing(true)}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Typography>
              {/* نمایش نقش کاربر */}
              <Typography className="p-user-role-badge">
                {user?.role?.name}
              </Typography>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

// اکسپورت کردن کامپوننت برای استفاده در جاهای دیگر پروژه
export default ProfileHeader;

import React from "react";
import Swal from "sweetalert2"; 
import { useTranslation } from "react-i18next"; 
import {
  Typography,
  Button, 
  TextField,
  Box, 
  InputAdornment, 
} from "@mui/material";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail"; 
import "./UsernameSection.css";
import axiosInstance from "../../utils/axiosInstance";
/////////////////////////////////////////////////////////////////////////////

const UsernameSection = ({
  user, // آبجکت حاوی اطلاعات کاربر
  setUser, // تابعی برای به‌روزرسانی اطلاعات کاربر در state والد
  isUsernameEditing, // یک مقدار boolean که مشخص می‌کند آیا حالت ویرایش نام کاربری فعال است یا خیر
  setIsUsernameEditing, // تابعی برای تغییر وضعیت isUsernameEditing
  tempUsernameValue, // یک state موقت برای نگهداری مقدار نام کاربری در حالت ویرایش
  setTempUsernameValue, // تابعی برای به‌روزرسانی state موقت نام کاربری
}) => {

  const { t } = useTranslation();

  // تابع برای ذخیره کردن نام کاربری جدید
  const handleSaveUsername = async (e) => {
    e.preventDefault(); 
    try {
      // ارسال درخواست PATCH به سرور برای به‌روزرسانی نام کاربری
      const response = await axiosInstance.patch("/user/self", {
        username: tempUsernameValue,
      });
      // به‌روزرسانی اطلاعات کاربر در state سراسری با پاسخ دریافت شده از سرور
      setUser((prevUser) => ({ ...prevUser, ...response.data }));
      
      Swal.fire({
        icon: "success",
        title: t("common.success"), 
        text: t("usernameSection.saveSuccess"), 
        showConfirmButton: false,
        timer: 1500,
      });
      // خروج از حالت ویرایش
      setIsUsernameEditing(false);
    } catch (error) {
      console.error("Failed to save username:", error);
      Swal.fire({
        icon: "error",
        title: t("common.error"), // عنوان ترجمه شده
        text: error.response?.data?.message || t("usernameSection.saveError"), // نمایش پیام خطای سرور یا یک پیام پیش‌فرض
      });
    }
  };


  return (
    <Box className="p-user-section">
      {isUsernameEditing ? (
        // اگر در حالت ویرایش باشیم، فرم ویرایش نام کاربری نمایش داده می‌شود
        <form onSubmit={handleSaveUsername} className="p-user-username-form">
          <TextField
            variant="outlined"
            label={t("usernameSection.newUsernameLabel")} 
            value={tempUsernameValue}
            onChange={(e) => setTempUsernameValue(e.target.value)}
            required
            className="p-user-input-field"
            InputProps={{
              // افزودن آیکون @ در ابتدای فیلد ورودی
              startAdornment: (
                <InputAdornment position="start">
                  <AlternateEmailIcon
                    sx={{ color: "var(--color-text-secondary)" }}
                  />
                </InputAdornment>
              ),
            }}
          />
          {/* دکمه ذخیره تغییرات */}
          <Button type="submit" className="p-user-main-btn p-user-btn-primary">
            {t("management.save")}
          </Button>
          {/* دکمه انصراف */}
          <Button
            variant="text"
            onClick={() => {
              setIsUsernameEditing(false); // خروج از حالت ویرایش
              if (user) setTempUsernameValue(user.username); // بازگرداندن مقدار فیلد به مقدار اولیه
            }}
          >
            {t("management.cancel")} {/* متن ترجمه شده */}
          </Button>
        </form>
      ) : (
        // در غیر این صورت (حالت نمایش)، نام کاربری فعلی نمایش داده می‌شود
        <Box className="p-user-username-view">
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <AlternateEmailIcon sx={{ color: "var(--primary-color)" }} />
            <Box>
              <Typography variant="body2" color="text.secondary">
                {t("usernameSection.usernameLabel")} 
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "var(--color-text-primary)",
                }}
              >
                {user?.username}
              </Typography>
            </Box>
          </Box>
          {/* دکمه ویرایش که کاربر را وارد حالت ویرایش می‌کند */}
          <Button onClick={() => setIsUsernameEditing(true)}>
            {t("management.edit")} 
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default UsernameSection;

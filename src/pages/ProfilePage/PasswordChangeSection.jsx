import React from "react";
import Swal from "sweetalert2"; 
import { useTranslation } from "react-i18next"; 
import {
  Typography,
  Button,
  TextField,
  Box,
  IconButton, 
  InputAdornment,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility"; 
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./PasswordChangeSection.css";
import axiosInstance from "../../utils/axiosInstance";
////////////////////////////////////////////////////////////////////



const PasswordChangeSection = ({
  passwordFields, // آبجکت state که مقادیر فیلدهای رمز عبور را نگهداری می‌کند
  setPasswordFields, // تابعی برای به‌روزرسانی state رمز عبور
  isPasswordEditing, // یک مقدار boolean که مشخص می‌کند آیا حالت ویرایش فعال است یا خیر
  setIsPasswordEditing, // تابعی برای تغییر وضعیت isPasswordEditing
  errors, // آبجکت state که خطاهای اعتبارسنجی را نگهداری می‌کند
  setErrors, // تابعی برای به‌روزرسانی state خطاها
  showPassword, // یک مقدار boolean برای کنترل نمایش یا عدم نمایش رمز عبور
  setShowPassword, // تابعی برای تغییر وضعیت showPassword
  handleInputChange, // تابع عمومی برای مدیریت تغییرات ورودی‌ها (از والد پاس داده شده)
}) => {

  const { t } = useTranslation();

  // تابع برای اعتبارسنجی فیلدهای رمز عبور
  const validatePassword = () => {
    let newErrors = {};
    let isValid = true;
    // بررسی اینکه فیلد رمز عبور جدید خالی نباشد
    if (!passwordFields.newPassword) {
      newErrors.newPassword = t("passwordChangeSection.newPasswordEmpty");
      isValid = false;
    } else if (passwordFields.newPassword.length < 8) {
      // بررسی اینکه طول رمز عبور جدید حداقل ۸ کاراکتر باشد
      newErrors.newPassword = t("passwordChangeSection.newPasswordLength"); 
      isValid = false;
    }
    // بررسی اینکه رمز عبور جدید با تکرار آن مطابقت داشته باشد
    if (passwordFields.newPassword !== passwordFields.confirmPassword) {
      newErrors.confirmPassword = t("passwordChangeSection.passwordMismatch"); 
      isValid = false;
    }
    setErrors(newErrors); // ذخیره خطاها در state
    return isValid; // بازگرداندن وضعیت کلی اعتبارسنجی
  };

  // تابع برای ذخیره کردن رمز عبور جدید
  const handleSavePassword = async (e) => {
    e.preventDefault(); 
    if (!validatePassword()) return; // اگر اعتبارسنجی ناموفق بود، تابع متوقف می‌شود

    try {
      // ارسال درخواست PATCH به سرور برای به‌روزرسانی رمز عبور
      await axiosInstance.patch("/user/self", {
        oldPassword: passwordFields.currentPassword,
        password: passwordFields.newPassword,
      });
    
      Swal.fire({
        icon: "success",
        title: t("common.success"), 
        text: t("passwordChangeSection.changeSuccess"), 
        showConfirmButton: false,
        timer: 1500,
      });
      setIsPasswordEditing(false); // خروج از حالت ویرایش
      // خالی کردن فیلدهای رمز عبور
      setPasswordFields({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setErrors({}); // پاک کردن خطاها
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        // اگر خطای "عدم دسترسی" یا "رمز عبور فعلی اشتباه" رخ داد
        Swal.fire({
          icon: "error",
          title: t("common.error"),
          text: t("passwordChangeSection.currentPasswordIncorrect"),
        });
      } else {
        // برای سایر خطاها
        Swal.fire({
          icon: "error",
          title: t("common.error"),
          text:
            error.response?.data?.message ||
            t("passwordChangeSection.changeError"),
        });
      }
    }
  };


  return (
    <Box className="p-user-main-settings">
      {isPasswordEditing ? (
        // اگر در حالت ویرایش باشیم، فرم تغییر رمز عبور نمایش داده می‌شود
        <form onSubmit={handleSavePassword} className="p-user-password-form">
          <Box className="p-user-settings-title-group">
            <LockIcon />
            <Typography variant="h5" className="p-user-settings-title">
              {t("passwordChangeSection.changePasswordTitle")}
            </Typography>
          </Box>
          <TextField
            variant="outlined"
            className="p-user-input-field"
            label={t("passwordChangeSection.currentPasswordLabel")}
            type="password"
            name="currentPassword"
            value={passwordFields.currentPassword}
            onChange={(e) => handleInputChange(e, setPasswordFields)}
            fullWidth
            required
          />
          <TextField
            variant="outlined"
            className="p-user-input-field"
            label={t("passwordChangeSection.newPasswordLabel")}
            type={showPassword ? "text" : "password"} // تغییر نوع فیلد برای نمایش/عدم نمایش رمز
            name="newPassword"
            value={passwordFields.newPassword}
            onChange={(e) => handleInputChange(e, setPasswordFields)}
            fullWidth
            required
            error={!!errors.newPassword} // اگر خطایی برای این فیلد وجود داشته باشد، آن را قرمز می‌کند
            helperText={errors.newPassword} // نمایش متن خطا در زیر فیلد
            InputProps={{
              endAdornment: (
                // آیکون چشم برای تغییر حالت نمایش رمز عبور
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            variant="outlined"
            className="p-user-input-field"
            label={t("passwordChangeSection.confirmNewPasswordLabel")}
            type="password"
            name="confirmPassword"
            value={passwordFields.confirmPassword}
            onChange={(e) => handleInputChange(e, setPasswordFields)}
            fullWidth
            required
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />
          {/* دکمه‌های فرم */}
          <Box className="p-user-form-buttons">
            <Button
              className="p-user-main-btn p-user-btn-primary"
              type="submit"
            >
              {t("passwordChangeSection.savePasswordButton")}
            </Button>
            <Button
              variant="text"
              onClick={() => {
                setIsPasswordEditing(false); // خروج از حالت ویرایش
                // بازنشانی مقادیر فیلدها و خطاها
                setPasswordFields({
                  currentPassword: "",
                  newPassword: "",
                  confirmPassword: "",
                });
                setErrors({});
              }}
            >
              {t("management.cancel")}
            </Button>
          </Box>
        </form>
      ) : (
        // در غیر این صورت (حالت نمایش)، فقط یک پیش‌نمایش و دکمه "تغییر" نمایش داده می‌شود
        <Box className="p-user-password-view">
          <Box>
            <Typography variant="body2" color="text.secondary">
              {t("passwordChangeSection.passwordLabel")}
            </Typography>
            <Typography variant="h6">••••••••</Typography>
          </Box>
          <Button
            className="p-user-main-btn p-user-btn-secondary"
            onClick={() => setIsPasswordEditing(true)} // ورود به حالت ویرایش با کلیک
          >
            {t("passwordChangeSection.changePasswordButton")}
          </Button>
        </Box>
      )}
    </Box>
  );
};

// اکسپورت کردن کامپوننت برای استفاده در جاهای دیگر پروژه
export default PasswordChangeSection;

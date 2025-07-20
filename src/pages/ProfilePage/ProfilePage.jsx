import React, { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion"; 
import Swal from "sweetalert2"; 
import { useTranslation } from "react-i18next";
import {
  Container,
  Box,
  Paper,
  Divider,
  CircularProgress,
} from "@mui/material";
import "./ProfilePage.css";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../utils/axiosInstance";
import ProfileHeader from "./ProfileHeader";
import UsernameSection from "./UsernameSection";
import PasswordChangeSection from "./PasswordChangeSection";
//////////////////////////////////////////////////////////////////



const ProfilePage = () => {

  // دسترسی به اطلاعات کاربر و تابع به‌روزرسانی آن از کانتکست
  const { user, setUser } = useAuth();
 
  const { i18n } = useTranslation();


  const [isLoading, setIsLoading] = useState(true); // برای نمایش لودینگ هنگام دریافت اطلاعات
  // برای نگهداری مقادیر فیلدهای فرم تغییر رمز عبور
  const [passwordFields, setPasswordFields] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [avatarPreview, setAvatarPreview] = useState(""); // برای پیش‌نمایش آواتار جدید
  // برای پیش‌نمایش عکس کاور، با خواندن مقدار اولیه از localStorage برای ماندگاری
  const [coverPreview, setCoverPreview] = useState(() => {
    const storedCover = localStorage.getItem("userCoverImage");
    return storedCover || "https://picsum.photos/1600/900?random=1"; // در صورت عدم وجود، یک عکس پیش‌فرض نمایش داده می‌شود
  });
  const [isNameEditing, setIsNameEditing] = useState(false); // وضعیت ویرایش نام
  // مقادیر موقت برای فرم ویرایش نام
  const [tempUserName, setTempUserName] = useState({
    firstName: "",
    lastName: "",
  });
  const [isUsernameEditing, setIsUsernameEditing] = useState(false); // وضعیت ویرایش نام کاربری
  const [tempUsernameValue, setTempUsernameValue] = useState(""); // مقدار موقت برای فرم ویرایش نام کاربری
  const [isPasswordEditing, setIsPasswordEditing] = useState(false); // وضعیت ویرایش رمز عبور
  const [errors, setErrors] = useState({}); // برای نگهداری خطاهای اعتبارسنجی فرم‌ها
  const [showPassword, setShowPassword] = useState(false); // برای کنترل نمایش/عدم نمایش رمز عبور


  //  دریافت اطلاعات اولیه کاربر هنگام بارگذاری صفحه
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axiosInstance.get("/user/self"); // درخواست به API برای گرفتن اطلاعات کاربر فعلی
        setUser((prevUser) => ({ ...prevUser, ...response.data })); // به‌روزرسانی اطلاعات کاربر در کانتکست
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        Swal.fire({
          icon: "error",
          title: "خطا در دریافت اطلاعات",
          text: "مشکلی در دریافت اطلاعات کاربری پیش آمد.",
        });
      } finally {
        setIsLoading(false); // پایان حالت لودینگ، چه با موفقیت چه با خطا
      }
    };

    fetchUserProfile();
  }, [setUser]); 

  // هوک همگام‌سازی Stateهای محلی با State سراسری 'user'
  useEffect(() => {
    if (user) {
      // هر زمان که اطلاعات کاربر از سرور دریافت شد، state های محلی را با آن پر می‌کنیم
      setTempUserName({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
      });
      setAvatarPreview(user.avatar || "https://i.pravatar.cc/150?img=32");
      setTempUsernameValue(user.username || "your_username");
    }
  }, [user]); // این هوک با هر بار تغییر در آبجکت user اجرا می‌شود

  // هوک useEffect شماره ۳: تنظیم جهت صفحه (RTL/LTR) بر اساس زبان فعال
  useEffect(() => {
    // این بخش برای پشتیبانی از زبان‌های راست‌چین (مثل فارسی) حیاتی است
    document.body.dir = i18n.language === "fa" ? "rtl" : "ltr";
  }, [i18n.language]); // این هوک با تغییر زبان i18n دوباره اجرا می‌شود

  // تابع عمومی برای مدیریت تغییرات ورودی‌های فرم‌ها (با useCallback برای بهینه‌سازی)
  const handleInputChange = useCallback(
    (e, setter) =>
      setter((prev) => ({ ...prev, [e.target.name]: e.target.value })),
    [] // چون این تابع به state خارجی وابسته نیست، یک بار ساخته می‌شود
  );

  // تابع useCallback برای مدیریت آپلود آواتار
  const onAvatarDrop = useCallback(
    async (files) => {
      if (files[0]) {
        const file = files[0];
        setAvatarPreview(URL.createObjectURL(file)); // نمایش پیش‌نمایش فوری عکس انتخاب شده
        const formData = new FormData();
        formData.append("avatar", file); // آماده‌سازی فایل برای ارسال به سرور
        try {
          const response = await axiosInstance.patch("/user/self", formData, {
            headers: { "Content-Type": "multipart/form-data" }, // هدر ضروری برای آپلود فایل
          });
          setUser((prevUser) => ({ ...prevUser, ...response.data })); // به‌روزرسانی کاربر با اطلاعات جدید
          Swal.fire({
            icon: "success",
            title: "موفق",
            text: "عکس پروفایل با موفقیت به‌روزرسانی شد!",
            showConfirmButton: false,
            timer: 1500,
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "خطا",
            text:
              error.response?.data?.message ||
              "مشکلی در آپلود عکس پروفایل پیش آمد.",
          });
          // در صورت خطا، پیش‌نمایش را به عکس قبلی کاربر برمی‌گردانیم
          if (user)
            setAvatarPreview(user.avatar || "https://i.pravatar.cc/150?img=32");
        }
      }
    },
    [setUser, user]
  );

  // تابع useCallback برای مدیریت آپلود عکس کاور
  const onCoverDrop = useCallback((files) => {
    if (files[0]) {
      const file = files[0];
      const reader = new FileReader(); // از FileReader برای تبدیل عکس به رشته Base64 استفاده می‌کنیم
      reader.onload = (event) => {
        const base64String = event.target.result;
        setCoverPreview(base64String); // نمایش پیش‌نمایش فوری
        localStorage.setItem("userCoverImage", base64String); // ذخیره در localStorage برای ماندگاری
        Swal.fire({
          icon: "success",
          title: "موفق",
          text: "عکس کاور با موفقیت به‌روزرسانی شد!",
          showConfirmButton: false,
          timer: 1500,
        });
      };
      reader.readAsDataURL(file);
    }
  }, []);

  // --- رندر شرطی: نمایش لودینگ در حین دریافت اطلاعات اولیه ---
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress /> {/* نمایش آیکون لودینگ Material-UI */}
      </Box>
    );
  }

  // --- رندر اصلی کامپوننت ProfilePage ---
  return (
    <Box
      className="p-user-page-wrapper"
      dir={i18n.language === "fa" ? "rtl" : "ltr"}
    >
      <Container maxWidth="md">
        {/* انیمیشن با Framer Motion برای نمایش روان و زیبای صفحه */}
        <motion.div
          initial={{ opacity: 0, y: 25 }} // حالت اولیه: شفاف و کمی پایین‌تر
          animate={{ opacity: 1, y: 0 }} // حالت نهایی: کاملاً پیدا و در جای خود
          transition={{ duration: 0.8 }} // مدت زمان انیمیشن
        >
          <Paper className="p-user-card">

            {/* کامپوننت ProfileHeader برای نمایش و ویرایش هدر پروفایل */}
            <ProfileHeader
              user={user}
              setUser={setUser}
              avatarPreview={avatarPreview}
              setAvatarPreview={setAvatarPreview}
              coverPreview={coverPreview}
              setCoverPreview={setCoverPreview}
              isNameEditing={isNameEditing}
              setIsNameEditing={setIsNameEditing}
              tempUserName={tempUserName}
              setTempUserName={setTempUserName}
              handleInputChange={handleInputChange}
              onAvatarDrop={onAvatarDrop}
              onCoverDrop={onCoverDrop}
            />


            <Divider className="p-user-content-divider" /> {/* جداکننده بصری */}


            {/* کامپوننت UsernameSection برای نمایش و ویرایش نام کاربری */}
            <UsernameSection
              user={user}
              setUser={setUser}
              isUsernameEditing={isUsernameEditing}
              setIsUsernameEditing={setIsUsernameEditing}
              tempUsernameValue={tempUsernameValue}
              setTempUsernameValue={setTempUsernameValue}
            />


            <Divider className="p-user-content-divider" /> {/* جداکننده بصری */}


            {/* کامپوننت PasswordChangeSection برای تغییر رمز عبور */}
            <PasswordChangeSection
              passwordFields={passwordFields}
              setPasswordFields={setPasswordFields}
              isPasswordEditing={isPasswordEditing}
              setIsPasswordEditing={setIsPasswordEditing}
              errors={errors}
              setErrors={setErrors}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              handleInputChange={handleInputChange}
            />

          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

// اکسپورت کردن کامپوننت برای استفاده در جاهای دیگر پروژه
export default ProfilePage;

import React, { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useDropzone } from "react-dropzone";
import axios from "axios";

// کامپوننت‌های Material-UI
import {
  Container,
  Avatar,
  Typography,
  Button,
  TextField,
  Box,
  Paper,
  IconButton,
  InputAdornment,
  Divider,
  Tooltip,
} from "@mui/material";

// آیکون‌ها
import SaveIcon from "@mui/icons-material/Save";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import LockIcon from "@mui/icons-material/Lock";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail"; // آیکون برای نام کاربری

import "./ProfilePage.css";

import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../utils/axiosInstance";

const ProfilePage = () => {
  const { user, setUser } = useAuth();

  // State برای نگهداری مقادیر فیلدهای تغییر رمز عبور
  const [passwordFields, setPasswordFields] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // State برای پیش‌نمایش عکس آواتار
  const [avatarPreview, setAvatarPreview] = useState();

  // State برای پیش‌نمایش عکس کاور
  const [coverPreview, setCoverPreview] = useState(() => {
    const storedCover = localStorage.getItem("userCoverImage");
    return storedCover || "https://picsum.photos/1600/900?random=1";
  });

  // State برای مدیریت وضعیت ویرایش نام و نام خانوادگی
  const [isNameEditing, setIsNameEditing] = useState(false);

  // State موقت برای نگهداری تغییرات نام و نام خانوادگی
  const [tempUserName, setTempUserName] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
  });

  // State برای مدیریت ویرایش نام کاربری
  const [isUsernameEditing, setIsUsernameEditing] = useState(false);
  // State برای نگهداری موقت نام کاربری
  const [tempUsernameValue, setTempUsernameValue] = useState(
    user?.username || "your_username"
  );

  // State برای مدیریت وضعیت ویرایش رمز عبور
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);

  // State برای نگهداری خطاهای اعتبارسنجی فرم
  const [errors, setErrors] = useState({});

  // State برای نمایش یا عدم نمایش رمز عبور جدید
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setTempUserName({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
    });
    setAvatarPreview(user?.avatar || "https://i.pravatar.cc/150?img=32");
    setTempUsernameValue(user?.username || "your_username");
  }, [user]);

  const onAvatarDrop = useCallback(
    async (files) => {
      if (files[0]) {
        const file = files[0];
        setAvatarPreview(URL.createObjectURL(file));

        const formData = new FormData();
        formData.append("avatar", file);

        try {
          const response = await axiosInstance.patch("/user/self", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          setUser((prevUser) => ({ ...prevUser, ...response.data }));
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
          setAvatarPreview(user.avatar || "https://i.pravatar.cc/150?img=32");
        }
      }
    },
    [setUser, user?.avatar]
  );

  const onCoverDrop = useCallback((files) => {
    if (files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target.result;
        setCoverPreview(base64String);
        localStorage.setItem("userCoverImage", base64String);
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

  const {
    getRootProps: getAvatarRootProps,
    getInputProps: getAvatarInputProps,
  } = useDropzone({ onDrop: onAvatarDrop, accept: { "image/*": [] } });

  const { getRootProps: getCoverRootProps, getInputProps: getCoverInputProps } =
    useDropzone({ onDrop: onCoverDrop, accept: { "image/*": [] } });

  const handleInputChange = (e, setter) =>
    setter((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSaveName = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      const response = await axiosInstance.patch("/user/self", {
        firstName: tempUserName.firstName,
        lastName: tempUserName.lastName,
      });
      setUser((prevUser) => ({ ...prevUser, ...response.data }));
      Swal.fire({
        icon: "success",
        title: "موفق",
        text: "نام با موفقیت ذخیره شد!",
        showConfirmButton: false,
        timer: 1500,
      });
      setIsNameEditing(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "خطا",
        text: error.response?.data?.message || "مشکلی در ذخیره نام پیش آمد.",
      });
    }
  };

  const handleSaveUsername = async (e) => {
    e.preventDefault();

    try {
      // ✨ متد patch اضافه شد و داده‌ها در قالب یک آبجکت ارسال شدند
      const response = await axiosInstance.patch("/user/self", {
        username: tempUsernameValue,
      });

      // ✨ به‌روزرسانی اطلاعات کاربر در state کلی برنامه
      setUser((prevUser) => ({ ...prevUser, ...response.data }));

      console.log("Username saved successfully:", tempUsernameValue);

      Swal.fire({
        icon: "success",
        title: "موفق",
        text: "نام کاربری با موفقیت ذخیره شد!",
        showConfirmButton: false,
        timer: 1500,
      });

      setIsUsernameEditing(false);
    } catch (error) {
      // ✨ مدیریت خطا در صورت بروز مشکل در ارتباط با سرور
      console.error("Failed to save username:", error);
      Swal.fire({
        icon: "error",
        title: "خطا",
        text:
          error.response?.data?.message || "مشکلی در ذخیره نام کاربری پیش آمد.",
      });
    }
  };
  const validatePassword = () => {
    let newErrors = {};
    let isValid = true;
    if (!passwordFields.newPassword) {
      newErrors.newPassword = "رمز عبور جدید نمی‌تواند خالی باشد.";
      isValid = false;
    } else if (passwordFields.newPassword.length < 6) {
      newErrors.newPassword = "رمز عبور جدید باید حداقل ۶ کاراکتر باشد.";
      isValid = false;
    }
    if (passwordFields.newPassword !== passwordFields.confirmPassword) {
      newErrors.confirmPassword = "رمز عبور جدید و تکرار آن یکسان نیستند.";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSavePassword = async (e) => {
    e.preventDefault();
    if (!validatePassword()) {
      return;
    }
    try {
      const response = await axiosInstance.patch("/user/self", {
        oldPassword: passwordFields.currentPassword,
        password: passwordFields.newPassword,
      });
      Swal.fire({
        icon: "success",
        title: "موفق",
        text: "رمز عبور با موفقیت تغییر یافت!",
        showConfirmButton: false,
        timer: 1500,
      });
      setIsPasswordEditing(false);
      setPasswordFields({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        Swal.fire({
          icon: "error",
          title: "خطا",
          text: "رمز عبور فعلی اشتباه است.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "خطا",
          text:
            error.response?.data?.message || "مشکلی در تغییر رمز عبور پیش آمد.",
        });
      }
    }
  };

  return (
    <Box className="p-user-page-wrapper" dir="rtl">
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Paper className="p-user-card">
            <div
              {...getCoverRootProps()}
              className="p-user-card-banner"
              style={{ backgroundImage: `url(${coverPreview})` }}
            >
              <Box className="p-user-banner-uploader">
                <PhotoCamera sx={{ fontSize: "1rem", mr: 1 }} />
                تغییر کاور
                <input
                  {...getCoverInputProps()}
                  className="p-user-hidden-input"
                />
              </Box>
            </div>

            <Box className="p-user-identity-area">
              <div {...getAvatarRootProps()} className="p-user-avatar-wrapper">
                <Avatar src={avatarPreview} className="p-user-avatar-img" />
                <Box className="p-user-avatar-uploader">
                  <PhotoCamera sx={{ fontSize: "1.25rem" }} />
                </Box>
                <input
                  {...getAvatarInputProps()}
                  className="p-user-hidden-input"
                />
              </div>

              <Box className="p-user-details">
                {isNameEditing ? (
                  <form
                    onSubmit={handleSaveName}
                    className="p-user-inline-form"
                  >
                    <TextField
                      variant="outlined"
                      name="firstName"
                      label="نام"
                      value={tempUserName.firstName}
                      onChange={(e) => handleInputChange(e, setTempUserName)}
                      required
                      className="p-user-input-field"
                    />
                    <TextField
                      variant="outlined"
                      name="lastName"
                      label="نام خانوادگی"
                      value={tempUserName.lastName}
                      onChange={(e) => handleInputChange(e, setTempUserName)}
                      required
                      className="p-user-input-field"
                    />
                    <Tooltip title="ذخیره">
                      <IconButton
                        type="submit"
                        className="p-user-inline-action action-save"
                      >
                        <SaveIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="انصراف">
                      <IconButton
                        className="p-user-inline-action action-cancel"
                        onClick={() => {
                          setIsNameEditing(false);
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
                  <>
                    <Typography variant="h4" className="p-user-name">
                      {user?.firstName} {user?.lastName}
                      <IconButton
                        size="small"
                        className="p-user-edit-icon"
                        onClick={() => setIsNameEditing(true)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Typography>
                    <Typography className="p-user-role-badge">
                      {user?.role?.name}
                    </Typography>
                  </>
                )}
              </Box>
            </Box>

            <Box className="p-user-section">
              {isUsernameEditing ? (
                <form
                  onSubmit={handleSaveUsername}
                  className="p-user-username-form"
                >
                  <TextField
                    variant="outlined"
                    label="نام کاربری جدید"
                    value={tempUsernameValue}
                    onChange={(e) => setTempUsernameValue(e.target.value)}
                    required
                    className="p-user-input-field"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AlternateEmailIcon
                            sx={{ color: "var(--color-text-secondary)" }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    type="submit"
                    className="p-user-main-btn p-user-btn-primary"
                  >
                    ذخیره
                  </Button>
                  <Button
                    variant="text"
                    onClick={() => setIsUsernameEditing(false)}
                  >
                    انصراف
                  </Button>
                </form>
              ) : (
                <Box className="p-user-username-view">
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <AlternateEmailIcon
                      sx={{ color: "var(--primary-color)" }}
                    />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        نام کاربری
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          color: "var(--color-text-primary)",
                        }}
                      >
                        {tempUsernameValue}
                      </Typography>
                    </Box>
                  </Box>
                  <Button onClick={() => setIsUsernameEditing(true)}>
                    ویرایش
                  </Button>
                </Box>
              )}
            </Box>

            <Divider className="p-user-content-divider" />

            <Box className="p-user-main-settings">
              {isPasswordEditing ? (
                <form
                  onSubmit={handleSavePassword}
                  className="p-user-password-form"
                >
                  <Box className="p-user-settings-title-group">
                    <LockIcon />
                    <Typography variant="h5" className="p-user-settings-title">
                      تغییر رمز عبور
                    </Typography>
                  </Box>
                  <TextField
                    variant="outlined"
                    className="p-user-input-field"
                    label="رمز عبور فعلی"
                    type="password"
                    name="currentPassword"
                    value={passwordFields.currentPassword}
                    onChange={(e) => handleInputChange(e, setPasswordFields)}
                    fullWidth
                  />
                  <TextField
                    variant="outlined"
                    className="p-user-input-field"
                    label="رمز عبور جدید"
                    type={showPassword ? "text" : "password"}
                    name="newPassword"
                    value={passwordFields.newPassword}
                    onChange={(e) => handleInputChange(e, setPasswordFields)}
                    fullWidth
                    error={!!errors.newPassword}
                    helperText={errors.newPassword}
                    InputProps={{
                      endAdornment: (
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
                    label="تکرار رمز عبور جدید"
                    type="password"
                    name="confirmPassword"
                    value={passwordFields.confirmPassword}
                    onChange={(e) => handleInputChange(e, setPasswordFields)}
                    fullWidth
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                  />
                  <Box className="p-user-form-buttons">
                    <Button
                      className="p-user-main-btn p-user-btn-primary"
                      type="submit"
                    >
                      ذخیره رمز
                    </Button>
                    <Button
                      variant="text"
                      onClick={() => {
                        setIsPasswordEditing(false);
                        setPasswordFields({
                          currentPassword: "",
                          newPassword: "",
                          confirmPassword: "",
                        });
                        setErrors({});
                      }}
                    >
                      انصراف
                    </Button>
                  </Box>
                </form>
              ) : (
                <Box className="p-user-password-view">
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      رمز عبور
                    </Typography>
                    <Typography variant="h6">••••••••</Typography>
                  </Box>
                  <Button
                    className="p-user-main-btn p-user-btn-secondary"
                    onClick={() => setIsPasswordEditing(true)}
                  >
                    تغییر رمز
                  </Button>
                </Box>
              )}
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ProfilePage;

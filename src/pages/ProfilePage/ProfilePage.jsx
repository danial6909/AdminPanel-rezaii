import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useDropzone } from "react-dropzone";

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

// وارد کردن فایل استایل
import "./ProfilePage.css";

const ProfilePage = () => {
  // ... سایر State ها و توابع بدون تغییر ...
  const [user, setUser] = useState({
    firstName: "آنا",
    lastName: "آدام",
    role: "طراح و توسعه‌دهنده",
  });
  const [passwordFields, setPasswordFields] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [avatarPreview, setAvatarPreview] = useState(
    "https://i.pravatar.cc/150?img=32"
  );
  const [coverPreview, setCoverPreview] = useState(
    "https://source.unsplash.com/random/1600x900?abstract,tech"
  );
  const [isNameEditing, setIsNameEditing] = useState(false);
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);
  const [errors, setErrors] = useState({});

  // ✨ State برای نمایش رمز عبور جدید اضافه شد
  const [showPassword, setShowPassword] = useState(false);

  const onAvatarDrop = useCallback((files) => {
    if (files[0]) setAvatarPreview(URL.createObjectURL(files[0]));
  }, []);
  const onCoverDrop = useCallback((files) => {
    if (files[0]) setCoverPreview(URL.createObjectURL(files[0]));
  }, []);
  const {
    getRootProps: getAvatarRootProps,
    getInputProps: getAvatarInputProps,
  } = useDropzone({ onDrop: onAvatarDrop, accept: { "image/*": [] } });
  const { getRootProps: getCoverRootProps, getInputProps: getCoverInputProps } =
    useDropzone({ onDrop: onCoverDrop, accept: { "image/*": [] } });
  const handleInputChange = (e, setter) =>
    setter((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSaveName = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: "success",
      title: "موفق",
      text: "نام با موفقیت ذخیره شد!",
      showConfirmButton: false,
      timer: 1500,
    });
    setIsNameEditing(false);
  };
  const validatePassword = () => {
    return true;
  };
  const handleSavePassword = (e) => {
    e.preventDefault();
    if (validatePassword()) {
      Swal.fire({
        icon: "success",
        title: "موفق",
        text: "رمز عبور با موفقیت تغییر یافت!",
        showConfirmButton: false,
        timer: 1500,
      });
      setIsPasswordEditing(false);
    }
  };

  return (
    <Box className="p-user-page-wrapper" dir="rtl">
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
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
                      defaultValue={user.firstName}
                      onChange={(e) => handleInputChange(e, setUser)}
                      required
                      className="p-user-input-field"
                    />
                    <TextField
                      variant="outlined"
                      name="lastName"
                      label="نام خانوادگی"
                      defaultValue={user.lastName}
                      onChange={(e) => handleInputChange(e, setUser)}
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
                        onClick={() => setIsNameEditing(false)}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Tooltip>
                  </form>
                ) : (
                  <>
                    <Typography variant="h4" className="p-user-name">
                      {user.firstName} {user.lastName}
                      <IconButton
                        size="small"
                        className="p-user-edit-icon"
                        onClick={() => setIsNameEditing(true)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Typography>
                    <Typography className="p-user-role-badge">
                      {user.role}
                    </Typography>
                  </>
                )}
              </Box>
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
                    onChange={(e) => handleInputChange(e, setPasswordFields)}
                    fullWidth
                  />

                  {/* ✨ آیکون چشم به این فیلد اضافه شد */}
                  <TextField
                    variant="outlined"
                    className="p-user-input-field"
                    label="رمز عبور جدید"
                    type={showPassword ? "text" : "password"}
                    name="newPassword"
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
                      onClick={() => setIsPasswordEditing(false)}
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

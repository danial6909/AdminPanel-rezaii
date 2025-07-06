import React, { useState } from "react"; // useEffect حذف شد
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "./LoginForm.css";
import { useAuth } from "../../context/AuthContext";

// ابزارهای لازم برای راست‌چین‌سازی کامل MUI
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// کامپوننت‌های Material-UI
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  CircularProgress,
  IconButton,
  InputAdornment,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login"; 
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// --- تنظیمات راست‌چین سازی ---
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});

const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "Tahoma, Arial, sans-serif",
  },
});

// --- Schema و انیمیشن‌ها ---
const formSchema = yup.object({
  username: yup
    .string()
    .min(4, "نام کاربری حداقل ۴ کاراکتر")
    .required("نام کاربری الزامی است"),
  password: yup.string().required("رمز عبور الزامی است"),
});

const formAnimation = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delayChildren: 0.2, staggerChildren: 0.15, duration: 0.5 },
  },
};

const itemAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function LoginForm() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(formSchema),
  });
  const { errors, isSubmitting } = formState;
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  // توابع آلرت و لاگین بدون تغییر
  const onSubmit = async (data) => {
    const success = await login(data.username, data.password);
    if (success) showSuccessAlert();
    else showErrorAlert();
  };

  const showSuccessAlert = () => {
    Swal.fire({
      title: "موفقیت‌آمیز!",
      text: "ادمین عزیز، خوش آمدید!",
      icon: "success",
      confirmButtonText: "عالی",
      timer: 1500,
      timerProgressBar: true,
    });
  };
  const showErrorAlert = () => {
    Swal.fire({
      title: "خطا!",
      text: "نام کاربری یا رمز عبور صحیح نمی‌باشد.",
      icon: "error",
      confirmButtonText: "تلاش مجدد",
    });
  };
  const handleClickShowPassword = () => setShowPassword((s) => !s);
  const handleMouseDownPassword = (e) => e.preventDefault();

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <div className="login-page-wrapper">
          <div className="login-background" />

          <Container maxWidth="xs" className="login-container">
            <motion.div
              variants={formAnimation}
              initial="hidden"
              animate="visible"
            >
              <Box className="login-form-box">
                <motion.div variants={itemAnimation}>
                  <Avatar className="login-avatar">
                    <img
                      className="login-logo"
                      src="/src/assets/images/logos/logo1.svg"
                      alt="Logo"
                    />
                  </Avatar>
                </motion.div>

                <motion.div variants={itemAnimation}>
                  <Typography variant="h5" className="login-title">
                    ورود به پنل مدیریت
                  </Typography>
                </motion.div>

                <Box
                  component="form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="login-form"
                  noValidate
                >
                  <motion.div variants={itemAnimation}>
                    <TextField
                      fullWidth
                      label="نام کاربری"
                      autoComplete="username"
                      autoFocus
                      className="login-textfield"
                      {...register("username")}
                      error={!!errors.username}
                      helperText={errors.username?.message}
                      margin="normal"
                    />
                  </motion.div>

                  <motion.div variants={itemAnimation}>
                    <TextField
                      fullWidth
                      label="رمز عبور"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      className="login-textfield"
                      {...register("password")}
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      margin="normal"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </motion.div>

                  <motion.div variants={itemAnimation}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      disabled={isSubmitting}
                      className="login-button"
                      startIcon={
                        isSubmitting ? (
                          <CircularProgress size={22} color="inherit" />
                        ) : (
                          <LoginIcon />
                        )
                      }
                    >
                      {isSubmitting ? "در حال بررسی..." : "ورود به سیستم"}
                    </Button>
                  </motion.div>
                </Box>
              </Box>
            </motion.div>
          </Container>
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}

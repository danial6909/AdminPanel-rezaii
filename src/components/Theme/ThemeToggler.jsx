import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext"; 
import { useTranslation } from "react-i18next"; 
import { IconButton, Tooltip } from "@mui/material"; 
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined"; 
import "./ThemeToggler.css"; 

const ThemeToggler = () => {
  // دریافت وضعیت فعلی تم (theme) و تابع تغییر آن (toggleTheme) از کانتکست
  const { theme, toggleTheme } = useTheme();
  // دریافت تابع ترجمه (t)
  const { t } = useTranslation();
  // تعریف یک state محلی برای کنترل انیمیشن چرخش آیکون
  const [isRotating, setIsRotating] = useState(false);

  // یک متغیر کمکی برای خوانایی بهتر؛ اگر تم 'dark' بود، مقدارش true می‌شود
  const darkMode = theme === "dark";

  // تابعی که هنگام کلیک روی دکمه اجرا می‌شود
  const handleThemeChange = () => {
    // ۱. فعال کردن حالت چرخش برای اجرای انیمیشن
    setIsRotating(true);
    // ۲. فراخوانی تابع اصلی برای تغییر تم در کل برنامه
    toggleTheme();
    // ۳. پس از ۵۰۰ میلی‌ثانیه، حالت چرخش غیرفعال می‌شود تا برای کلیک بعدی آماده باشد
    setTimeout(() => setIsRotating(false), 500); // این زمان باید با زمان انیمیشن در CSS هماهنگ باشد
  };

  return (
 
    <Tooltip title={darkMode ? t("theme_light") : t("theme_dark")}>
      <IconButton
        onClick={handleThemeChange}
        // کلاس CSS به صورت پویا تنظیم می‌شود: اگر isRotating فعال بود، کلاس rotate-icon اضافه می‌شود
        className={`header-icon theme-toggler-btn ${
          isRotating ? "rotate-icon" : ""
        }`}
      >
        {/* از یک عبارت شرطی برای نمایش آیکون مناسب استفاده می‌شود */}
        {darkMode ? (
          // اگر حالت تاریک فعال است، آیکون خورشید را نشان بده
          <LightModeOutlinedIcon sx={{ fontSize: "26px" }} />
        ) : (
          // در غیر این صورت، آیکون ماه را نشان بده
          <DarkModeOutlinedIcon sx={{ fontSize: "26px" }} />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggler;

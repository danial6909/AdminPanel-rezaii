import React, { useState } from "react";
import { useTranslation } from "react-i18next"; // هوک برای دسترسی به توابع ترجمه
import ReactCountryFlag from "react-country-flag"; // کامپوننت برای نمایش پرچم کشورها

import "../../index.css";

import {
  Menu,
  MenuItem,
  ListItemIcon,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import "./LanguageSelector.css"; 

// یک آبجکت برای مرتبط کردن کد زبان با کد کشور جهت نمایش پرچم
const languageCountryMap = {
  en: "US", // انگلیسی -> پرچم آمریکا
  fa: "IR", // فارسی -> پرچم ایران
};

// تعریف کامپوننت انتخاب‌گر زبان
const LanguageSelector = () => {
  
  // دسترسی به تابع ترجمه (t) و نمونه i18n برای تغییر زبان
  const { t, i18n } = useTranslation();

  // تعریف یک state برای مدیریت باز و بسته بودن منو. مقدار اولیه null یعنی منو بسته است.
  const [anchorEl, setAnchorEl] = useState(null);

  // تابعی که هنگام کلیک روی آیکون زبان اجرا می‌شود و منو را باز می‌کند
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);

  // تابعی که برای بستن منو استفاده می‌شود
  const handleMenuClose = () => setAnchorEl(null);

  // تابعی که زبان برنامه را تغییر می‌دهد و سپس منو را می‌بندد
  const handleLanguageSelect = (lang) => {
    i18n.changeLanguage(lang);
    handleMenuClose();
    if (lang === "en") {
      document.body.setAttribute("class","right")
    }
    else {
      document.body.removeAttribute("class","right")
    }
  };

  return (
    <>
      
      {/* ایکن زبان  */}
      <Tooltip title={t("changeLanguage")}>
        {/* دکمه‌ای که آیکون پرچم را نمایش می‌دهد و با کلیک روی آن منو باز می‌شود */}
        <IconButton
          onClick={handleMenuOpen}
          className="header-icon language-selector-btn"
        >
          {/* نمایش پرچم کشور بر اساس زبان فعلی برنامه */}
          <ReactCountryFlag
            countryCode={languageCountryMap[i18n.language] || "US"}
            svg 
            className="main-flag-icon"
            title={i18n.language.toUpperCase()} // نمایش کد زبان با حروف بزرگ
          />
        </IconButton>
      </Tooltip>


      {/* کامپوننت منو از کتابخانه MUI */}
      <Menu
        anchorEl={anchorEl} // موقعیت منو به دکمه‌ای که روی آن کلیک شده متصل می‌شود
        open={Boolean(anchorEl)} // اگر anchorEl مقدار داشت (منو باز)، true وگرنه false
        onClose={handleMenuClose} // تابعی که هنگام بستن منو (مثلا با کلیک بیرون) اجرا می‌شود
        PaperProps={{ className: "custom-menu language-menu" }} // اعمال کلاس‌های CSS سفارشی به منو
      >
        {/* آیتم منو برای زبان فارسی */}
        <MenuItem onClick={() => handleLanguageSelect("fa")}>
          <ListItemIcon>
            <ReactCountryFlag countryCode="IR" svg className="menu-flag-icon" />
          </ListItemIcon>
          <Typography variant="inherit">فارسی</Typography>
        </MenuItem>

        {/* آیتم منو برای زبان انگلیسی */}
        <MenuItem onClick={() => handleLanguageSelect("en")}>
          <ListItemIcon>
            <ReactCountryFlag countryCode="US" svg className="menu-flag-icon" />
          </ListItemIcon>
          <Typography variant="inherit">English</Typography>
        </MenuItem>

      </Menu>
      
    </>
  );
};

export default LanguageSelector;

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Header.css"; // فایل استایل

// وارد کردن هوک ترجمه
import { useTranslation } from "react-i18next";

// وارد کردن کامپوننت‌ها و آیکون‌های لازم از Material-UI
import {
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Box,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import PersonOutline from "@mui/icons-material/PersonOutline";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

// آبجکت نگاشت کد زبان به ایموجی پرچم، مستقیماً در کامپوننت
const flags = {
  en: '🇺🇸',
  fa: '🇮🇷',
};

const Header = () => {
  const { user, logout } = useAuth();
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  const [languageMenuAnchor, setLanguageMenuAnchor] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [isThemeChanging, setIsThemeChanging] = useState(false);

  const { t, i18n } = useTranslation();

  const isProfileMenuOpen = Boolean(profileMenuAnchor);
  const isLanguageMenuOpen = Boolean(languageMenuAnchor);

  // توابع مدیریت منوها
  const handleProfileMenuOpen = (event) => setProfileMenuAnchor(event.currentTarget);
  const handleProfileMenuClose = () => setProfileMenuAnchor(null);
  const handleLanguageMenuOpen = (event) => setLanguageMenuAnchor(event.currentTarget);
  const handleLanguageMenuClose = () => setLanguageMenuAnchor(null);

  // تابع تغییر زبان
  const handleLanguageSelect = (lang) => {
    i18n.changeLanguage(lang);
    handleLanguageMenuClose();
  };

  const handleLogout = () => {
    handleProfileMenuClose();
    logout();
  };

  // تابع تغییر تم
  const handleThemeChange = () => {
    setIsThemeChanging(true);
    setDarkMode(!darkMode);
    setTimeout(() => setIsThemeChanging(false), 500);
  };

  return (
    <header className="app-header">
      <h2 className="header-title">{t("adminPanelTitle")}</h2>

      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        {/* دکمه و منوی تغییر زبان با پرچم */}
        <Tooltip title={t("changeLanguage")}>
          <IconButton onClick={handleLanguageMenuOpen} className="header-icon language-button">
            {/* نمایش پرچم زبان فعلی به صورت مستقیم */}
            <span className="flag-icon">{flags[i18n.language] || '🏳️'}</span>
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={languageMenuAnchor}
          open={isLanguageMenuOpen}
          onClose={handleLanguageMenuClose}
          PaperProps={{ className: "custom-menu language-menu" }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={() => handleLanguageSelect("fa")}>
            <ListItemIcon>
              <span className="menu-flag-icon">{flags['fa']}</span>
            </ListItemIcon>
            <Typography variant="inherit">فارسی</Typography>
          </MenuItem>
          <MenuItem onClick={() => handleLanguageSelect("en")}>
            <ListItemIcon>
                <span className="menu-flag-icon">{flags['en']}</span>
            </ListItemIcon>
            <Typography variant="inherit">English</Typography>
          </MenuItem>
        </Menu>

        {/* دکمه تغییر تم */}
        <Tooltip title={darkMode ? t("theme_light") : t("theme_dark")}>
          <IconButton
            onClick={handleThemeChange}
            className={`header-icon ${isThemeChanging ? "rotate-icon" : ""}`}
          >
            {darkMode ? (
              <LightModeOutlinedIcon sx={{ fontSize: "30px" }} />
            ) : (
              <DarkModeOutlinedIcon sx={{ fontSize: "30px" }} />
            )}
          </IconButton>
        </Tooltip>

        {/* دکمه و منوی پروفایل کاربر */}
        <Tooltip title={t("profile")}>
          <IconButton
            onClick={handleProfileMenuOpen}
            size="small"
            sx={{ ml: 1 }}
          >
            <Avatar className="profile-avatar" sx={{ width: "55px", height: "55px"}}>
              {user?.username ? user.username.charAt(0).toUpperCase() : "U"}
            </Avatar>
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={profileMenuAnchor}
          open={isProfileMenuOpen}
          onClose={handleProfileMenuClose}
          PaperProps={{ className: "custom-menu profile-menu" }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleProfileMenuClose}>
            <ListItemIcon>
              <PersonOutline fontSize="small" sx={{ color: '#5e35b1' }} />
            </ListItemIcon>
            {t("profile")}
          </MenuItem>
          <MenuItem onClick={handleLogout} className="logout-item">
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            {t("logout")}
          </MenuItem>
        </Menu>
      </Box>
    </header>
  );
};

export default Header;
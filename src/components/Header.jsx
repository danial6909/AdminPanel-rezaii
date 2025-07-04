// src/components/Header.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import "./Header.css";

import { useTranslation } from "react-i18next";
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
// آیکون‌های جدید برای دکمه سایدبار
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

const flags = { en: "🇺🇸", fa: "🇮🇷" };

// کامپوننت پراپ‌های جدید را دریافت می‌کند
const Header = ({ toggleSidebar, isSidebarCollapsed }) => {
  const { user, logout } = useAuth();
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  const [languageMenuAnchor, setLanguageMenuAnchor] = useState(null);
  const [isThemeChanging, setIsThemeChanging] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeChange = () => {
    setIsThemeChanging(true);
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    setTimeout(() => setIsThemeChanging(false), 500);
  };

  // بقیه توابع مدیریت منوها (بدون تغییر)
  const handleProfileMenuOpen = (event) =>
    setProfileMenuAnchor(event.currentTarget);
  const handleProfileMenuClose = () => setProfileMenuAnchor(null);
  const handleLanguageMenuOpen = (event) =>
    setLanguageMenuAnchor(event.currentTarget);
  const handleLanguageMenuClose = () => setLanguageMenuAnchor(null);
  const handleLanguageSelect = (lang) => {
    i18n.changeLanguage(lang);
    handleLanguageMenuClose();
  };
  const handleLogout = () => {
    handleProfileMenuClose();
    logout();
  };

  const darkMode = theme === "dark";

  return (
    <header className="app-header">
      <Box sx={{ display: "flex", alignItems: "center" , gap: 2 }}>
        {/* دکمه جدید برای کنترل سایدبار */}
        <Tooltip title={isSidebarCollapsed ? "باز کردن منو" : "بستن منو"}>
          <IconButton
            onClick={toggleSidebar}
            className="header-icon sidebar-toggle-btn"
          >
            {isSidebarCollapsed ? <MenuIcon /> : <MenuOpenIcon />}
          </IconButton>
        </Tooltip>
        <h2 className="header-title">{t("adminPanelTitle")}</h2>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        {/* بقیه آیکون‌های هدر (بدون تغییر) */}
        <Tooltip title={t("changeLanguage")}>
          <IconButton
            onClick={handleLanguageMenuOpen}
            className="header-icon language-button"
          >
            <span className="flag-icon">{flags[i18n.language] || "🏳️"}</span>
          </IconButton>
        </Tooltip>
        <Tooltip title={darkMode ? t("theme_light") : t("theme_dark")}>
          <IconButton
            onClick={handleThemeChange}
            className={`header-icon ${isThemeChanging ? "rotate-icon" : ""}`}
          >
            {darkMode ? (
              <LightModeOutlinedIcon sx={{ fontSize: "26px" }} />
            ) : (
              <DarkModeOutlinedIcon sx={{ fontSize: "26px" }} />
            )}
          </IconButton>
        </Tooltip>
        <Tooltip title={t("profile")}>
          <IconButton
            onClick={handleProfileMenuOpen}
            size="small"
            sx={{ ml: 1 }}
          >
            <Avatar
              className="profile-avatar"
              sx={{ width: "50px", height: "50px" }}
            >
              {user?.username ? user.username.charAt(0).toUpperCase() : "U"}
            </Avatar>
          </IconButton>
        </Tooltip>
        {/* منوها (بدون تغییر) */}
        <Menu
          anchorEl={languageMenuAnchor}
          open={Boolean(languageMenuAnchor)}
          onClose={handleLanguageMenuClose}
          PaperProps={{ className: "custom-menu language-menu" }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={() => handleLanguageSelect("fa")}>
            <ListItemIcon>
              <span className="menu-flag-icon">{flags["fa"]}</span>
            </ListItemIcon>
            <Typography variant="inherit">فارسی</Typography>
          </MenuItem>
          <MenuItem onClick={() => handleLanguageSelect("en")}>
            <ListItemIcon>
              <span className="menu-flag-icon">{flags["en"]}</span>
            </ListItemIcon>
            <Typography variant="inherit">English</Typography>
          </MenuItem>
        </Menu>
        <Menu
          anchorEl={profileMenuAnchor}
          open={Boolean(profileMenuAnchor)}
          onClose={handleProfileMenuClose}
          PaperProps={{ className: "custom-menu profile-menu" }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleProfileMenuClose}>
            <ListItemIcon>
              <PersonOutline fontSize="small" className="profile-menu-icon" />
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

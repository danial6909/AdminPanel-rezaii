import React, { useState, useEffect } from "react";
import ReactCountryFlag from "react-country-flag";
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
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

const languageCountryMap = {
  en: "US",
  fa: "IR",
};

const Header = ({ toggleSidebar, isSidebarCollapsed }) => {
  const { user, logout } = useAuth();
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  const [languageMenuAnchor, setLanguageMenuAnchor] = useState(null);
  const [isThemeChanging, setIsThemeChanging] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const { t, i18n } = useTranslation();

  // --- تغییر کلیدی: این هوک جهت صفحه را به صورت پویا مدیریت می‌کند -----------------------------------------------------------------------

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeChange = () => {
    setIsThemeChanging(true);
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    setTimeout(() => setIsThemeChanging(false), 500);
  };

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
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Tooltip title={isSidebarCollapsed ? t("باز کردن منو") : t("بستن منو")}>
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
        <Tooltip title={t("changeLanguage")}>
          <IconButton
            onClick={handleLanguageMenuOpen}
            className="header-icon language-button"
          >
            <ReactCountryFlag
              countryCode={languageCountryMap[i18n.language] || "US"}
              svg
              style={{
                width: "0.9em",
                height: "0.9em",
                fontSize: "1.5em",
              }}
              title={i18n.language.toUpperCase()}
            />
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
              sx={{ width: "55px", height: "55px" }}
              src="/src/assets/images/icons/user.jpg"
              alt={user?.username || "User Avatar"}
            >
              {user?.username ? user.username.charAt(0).toUpperCase() : "U"}
            </Avatar>
          </IconButton>
        </Tooltip>

        {/* منوی انتخاب زبان */}
        <Menu
          anchorEl={languageMenuAnchor}
          open={Boolean(languageMenuAnchor)}
          onClose={handleLanguageMenuClose}
          PaperProps={{ className: "custom-menu language-menu" }}
        >
          <MenuItem onClick={() => handleLanguageSelect("fa")}>
            <ListItemIcon>
              <ReactCountryFlag
                countryCode="IR"
                svg
                style={{ fontSize: "1.8em" }}
              />
            </ListItemIcon>
            <Typography variant="inherit">فارسی</Typography>
          </MenuItem>
          <MenuItem onClick={() => handleLanguageSelect("en")}>
            <ListItemIcon>
              <ReactCountryFlag
                countryCode="US"
                svg
                style={{ fontSize: "1.8em" }}
              />
            </ListItemIcon>
            <Typography variant="inherit">English</Typography>
          </MenuItem>
        </Menu>

        {/* منوی پروفایل */}
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

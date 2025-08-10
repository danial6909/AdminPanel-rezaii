// src/components/Header/Header.jsx

import React from "react";
import { useTranslation } from "react-i18next";
import { Box, IconButton, Tooltip } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import CloseIcon from "@mui/icons-material/Close"; // آیکون بستن رو لازم داریم

import ThemeToggler from "../Theme/ThemeToggler";
import LanguageSelector from "../Language/LanguageSelector";
import UserProfileMenu from "../User/UserProfileMenu";
import "./Header.css";

// ۱. prop جدید `viewMode` رو دریافت کن
const Header = ({ toggleSidebar, isSidebarOpen, viewMode }) => {
  const { t } = useTranslation();

  return (
    <header className="app-header">
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {/* ۲. دکمه فقط در حالت تبلت نمایش داده نمی‌شه */}
        {viewMode !== "tablet" && (
          <Tooltip title={isSidebarOpen ? t("close_btn") : t("open_btn")}>
            <IconButton
              onClick={toggleSidebar}
              className="sidebar-toggle-btn"
              aria-label="toggle sidebar"
            >
              {/* ۳. منطق نمایش آیکون بر اساس حالت */}
              {viewMode === "mobile" ? (
                isSidebarOpen ? (
                  <CloseIcon />
                ) : (
                  <MenuIcon />
                )
              ) : isSidebarOpen ? (
                <MenuOpenIcon />
              ) : (
                <MenuIcon />
              )}
            </IconButton>
          </Tooltip>
        )}

        <h2 className="header-title">{t("adminPanelTitle")}</h2>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <LanguageSelector />
        <ThemeToggler />
        <UserProfileMenu />
      </Box>
    </header>
  );
};

export default Header;

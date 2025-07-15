import React from "react";
import { useTranslation } from "react-i18next";
import { Box, IconButton, Tooltip } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

import ThemeToggler from "../Theme/ThemeToggler";
import LanguageSelector from "../Language/LanguageSelector";
import UserProfileMenu from "../User/UserProfileMenu";
import "./Header.css";


const Header = ({ toggleSidebar, isSidebarCollapsed }) => {
  const { t } = useTranslation();
 


  return (
    <header className="app-header">

      {/* دکمه باز بسته کردن ساید بار */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Tooltip title={isSidebarCollapsed ? t("open_btn") : t("close_btn")}>
          <IconButton onClick={toggleSidebar} className="sidebar-toggle-btn">
            {isSidebarCollapsed ? <MenuIcon /> : <MenuOpenIcon />}
          </IconButton>
        </Tooltip>
        <h2 className="header-title">{t("adminPanelTitle")}</h2>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        {/* دکمه تغییر زبان  */}
        <LanguageSelector /> 
        {/* دکمه تغییر تم */}
        <ThemeToggler />
        {/* دکمه پروفایل کاربر */}
        <UserProfileMenu />
      </Box>
    </header>
  );
};

export default Header;

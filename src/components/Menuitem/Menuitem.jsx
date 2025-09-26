// src/components/Menuitem/Menuitem.jsx

import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Menuitem.css";

// --- آیکون‌های مورد نیاز ---
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
// ... و بقیه آیکون‌ها
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LanIcon from "@mui/icons-material/Lan";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import ViewListIcon from "@mui/icons-material/ViewList";
import DevicesIcon from "@mui/icons-material/Devices";
import VideocamIcon from "@mui/icons-material/Videocam";
import StyleIcon from "@mui/icons-material/Style";
import SensorsIcon from "@mui/icons-material/Sensors";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import PermDataSettingIcon from "@mui/icons-material/PermDataSetting";
import SettingsIcon from "@mui/icons-material/Settings";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import AlarmIcon from "@mui/icons-material/Alarm";
// ۱. prop های جدید `viewMode` و `closeMobileSidebar` را از ورودی بگیر
function MenuList({ isCollapsed, viewMode, closeMobileSidebar }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = React.useMemo(
    () => [
      { text: t("ConfigPage"), icon: <DashboardIcon />, path: "/Dashboard" },
      { text: t("Cards"), icon: <StyleIcon />, path: "/cards" },
      {
        text: t("ConfigStream"),
        icon: <PermDataSettingIcon />,
        path: "/ConfigStream",
        subItems: [
          {
            text: t("dvb-s_list"),
            icon: <ChecklistRtlIcon />,
            path: "/ConfigStream/DVB-S",
          },
          {
            text: t("dvb-t_list"),
            icon: <AdminPanelSettingsIcon />,
            path: "/ConfigStream/DVB-T",
          },
        ],
      },

      {
        text: t("Channel"),
        icon: <LiveTvIcon />,
        path: "/Channel",
        subItems: [
          {
            text: t("channelsList"),
            icon: <ChecklistRtlIcon />,
            path: "/Channel/Channellist",
          },
          {
            text: t("streamss"),
            icon: <AdminPanelSettingsIcon />,
            path: "/Channel/streams",
          },
        ],
      },
      {
        text: t("users"),
        icon: <PeopleIcon />,
        path: "/users",
        subItems: [
          {
            text: t("user_list"),
            icon: <ChecklistRtlIcon />,
            path: "/users/userslist",
          },
          {
            text: t("roles"),
            icon: <AdminPanelSettingsIcon />,
            path: "/users/roles",
          },
        ],
      },
      {
        text: t("EPG"),
        icon: <AlarmIcon />,
        path: "/EPG",
      },
      { text: t("Recordings"), icon: <VideocamIcon />, path: "/Recordings" },
      {
        text: t("Settings"),
        icon: <SettingsIcon />,
        path: "/Setting",
      },
    ],
    [t]
  );

  const [openMenu, setOpenMenu] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [activeParent, setActiveParent] = useState(null);

  useEffect(() => {
    const currentParent = menuItems.find(
      (item) => item.subItems && location.pathname.startsWith(item.path)
    );
    if (currentParent) {
      setActiveParent(currentParent.path);
      if (!isCollapsed) {
        setOpenMenu(currentParent.path);
      }
    } else {
      // این خط باگ فعال ماندن دکمه قبلی را حل می‌کند
      setActiveParent(null);
    }
  }, [location.pathname, menuItems, isCollapsed]);

  // ۲. یک تابع برای بستن منو در موبایل تعریف کن
  const handleMobileMenuClose = () => {
    // اگر viewMode برابر 'mobile' بود، تابع closeMobileSidebar را صدا بزن
    if (viewMode === "mobile") {
      closeMobileSidebar();
    }
  };

  const handleParentMenuClick = (item) => {
    // ۳. تابع بستن منو را اینجا هم صدا بزن
    handleMobileMenuClose();

    if (item.subItems && item.subItems.length > 0) {
      navigate(item.subItems[0].path);
    }
    const path = item.path;
    setActiveParent(path);
    if (!isCollapsed) {
      setOpenMenu(openMenu === path ? null : path);
    }
  };

  const handleTopLevelLinkClick = () => {
    // ۳. تابع بستن منو را اینجا هم صدا بزن
    handleMobileMenuClose();

    setOpenMenu(null);
    setActiveParent(null);
  };

  return (
    <nav>
      <ul className={`menu-list ${isCollapsed ? "collapsed" : ""}`}>
        {menuItems.map((item) => {
          const hasSubItems = item.subItems && item.subItems.length > 0;
          const isOpen = !isCollapsed && openMenu === item.path;
          // ⭐ باگ فعال ماندن دکمه قبلی با این خط اصلاح می‌شود
          const isParentActive = activeParent === item.path;

          return (
            <li
              key={item.path}
              className="menu-item"
              onMouseEnter={() =>
                isCollapsed && hasSubItems && setHoveredItem(item.path)
              }
              onMouseLeave={() =>
                isCollapsed && hasSubItems && setHoveredItem(null)
              }
            >
              {hasSubItems ? (
                <>
                  <div
                    className={`menu-link ${isOpen ? "open" : ""} ${
                      isParentActive ? "active" : ""
                    }`}
                    onClick={() => handleParentMenuClick(item)}
                    title={isCollapsed ? item.text : ""}
                  >
                    <div className="menu-icon">{item.icon}</div>
                    {!isCollapsed && (
                      <>
                        <span className="menu-text">{item.text}</span>
                        <span
                          className={`dropdown-icon ${isOpen ? "open" : ""}`}
                        >
                          <ExpandMoreIcon />
                        </span>
                      </>
                    )}
                  </div>
                  {!isCollapsed && (
                    <ul className={`submenu-list ${isOpen ? "open" : ""}`}>
                      {item.subItems.map((subItem) => (
                        <li key={subItem.path} className="submenu-item">
                          <NavLink
                            to={subItem.path}
                            end
                            // ۴. onClick رو به همه لینک‌های نهایی اضافه کن
                            onClick={() => {
                              setActiveParent(item.path);
                              handleMobileMenuClose();
                            }}
                            className={({ isActive }) =>
                              isActive ? "submenu-link active" : "submenu-link"
                            }
                          >
                            {subItem.text}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                  {isCollapsed && (
                    <div
                      className={`sub-icon-container ${
                        hoveredItem === item.path ? "visible" : ""
                      }`}
                    >
                      {item.subItems.map((subItem) => (
                        <NavLink
                          to={subItem.path}
                          key={subItem.path}
                          className="sub-icon-item"
                          title={subItem.text}
                          // ۴. onClick رو به همه لینک‌های نهایی اضافه کن
                          onClick={() => {
                            setActiveParent(item.path);
                            handleMobileMenuClose();
                          }}
                        >
                          <div className="sub-icon-image">{subItem.icon}</div>
                          <span className="sub-icon-text">{subItem.text}</span>
                        </NavLink>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <NavLink
                  to={item.path}
                  end
                  onClick={handleTopLevelLinkClick}
                  className={({ isActive }) =>
                    isActive ? "menu-link active" : "menu-link"
                  }
                  title={isCollapsed ? item.text : ""}
                >
                  <div className="menu-icon">{item.icon}</div>
                  {!isCollapsed && (
                    <span className="menu-text">{item.text}</span>
                  )}
                </NavLink>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default MenuList;

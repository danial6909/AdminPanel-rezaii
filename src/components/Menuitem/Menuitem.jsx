import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Menuitem.css";

// آیکون‌های مورد نیاز از کتابخانه Material-UI
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SecurityIcon from "@mui/icons-material/Security";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PasswordIcon from "@mui/icons-material/Password";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import SensorsIcon from "@mui/icons-material/Sensors";
import StyleIcon from "@mui/icons-material/Style";
// --- آیکون‌های جدید --- // ADDED
import LanIcon from '@mui/icons-material/Lan';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import ViewListIcon from '@mui/icons-material/ViewList';
import DevicesIcon from '@mui/icons-material/Devices';
import StreamIcon from '@mui/icons-material/Stream';
import VideocamIcon from '@mui/icons-material/Videocam';
///////////////////////////////////////////////////////////////////////////////


function MenuList({ isCollapsed }) {

  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = React.useMemo(
    () => [
      {
        text: t("ConfigPage"),
        icon: <DashboardIcon />,
        path: "/ConfigPage",
      },
      { text: t("Cards"), icon: <StyleIcon />, path: "/cards" },
     
      {
        text: t("Frequency"),
        icon: <SignalCellularAltIcon />,
        path: "/Frequency",
      },
      {
        text: t("Service"),
        icon: <SensorsIcon />,
        path: "/Service",
      },
      // --- منوهای جدید --- // ADDED
      {
        text: t("Network"),
        icon: <LanIcon />,
        path: "/Network",
      },
      {
        text: t("Channel"),
        icon: <LiveTvIcon />,
        path: "/Channel",
      },
      {
        text: t("ChannelGroup"),
        icon: <ViewListIcon />,
        path: "/ChannelGroup",
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
            path: "/users/roles", // CORRECTED
          },
        ],
      },
      {
        text: t("ConnectedDevices"),
        icon: <DevicesIcon />,
        path: "/ConnectedDevices",
      },
      // {
      //   text: t("StreamingChannels"),
      //   icon: <StreamIcon />,
      //   path: "/StreamingChannels",
      // },
      {
        text: t("Recordings"),
        icon: <VideocamIcon />,
        path: "/Recordings",
      },
      // --- پایان منوهای جدید ---
      // {
      //   text: t("settings"),
      //   icon: <SettingsIcon />,
      //   path: "/settings",
      //   subItems: [
      //     {
      //       text: t("profile"),
      //       icon: <AccountCircleIcon />,
      //       path: "/settings/profile",
      //     },
      //     {
      //       text: t("security"),
      //       icon: <VpnKeyIcon />,
      //       path: "/settings/security",
      //     },
      //   ],
      // },
     
    ],
    [t]
  );


  // بقیه کد بدون تغییر باقی می‌ماند
  // ...
  const [openMenu, setOpenMenu] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [activeParent, setActiveParent] = useState(null);

  useEffect(() => {
    const currentParent = menuItems.find(
      (item) => item.subItems && location.pathname.startsWith(item.path)
    );
    if (currentParent) {
      setActiveParent(currentParent.path);
      // Open the parent menu if a child is active and menu is not collapsed
      if (!isCollapsed) {
          setOpenMenu(currentParent.path);
      }
    }
  }, [location.pathname, menuItems, isCollapsed]);

  const handleParentMenuClick = (item) => {
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
    setOpenMenu(null);
    setActiveParent(null);
  };

  return (
    <nav>
      <ul className={`menu-list ${isCollapsed ? "collapsed" : ""}`}>
        {menuItems.map((item) => {
          const hasSubItems = item.subItems && item.subItems.length > 0;
          const isOpen = !isCollapsed && openMenu === item.path;
          const isParentActive =
            (hasSubItems && location.pathname.startsWith(item.path)) ||
            activeParent === item.path;

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
                            onClick={() => setActiveParent(item.path)}
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
                          onClick={() => setActiveParent(item.path)}
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